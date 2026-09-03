// Supabase Edge Function: Dodo Payments Webhook Handler
// Endpoint URL: https://ipatasdbyqezqkkejnrf.supabase.co/functions/v1/dodo-webhook
// Deploy with Supabase CLI: npx supabase functions deploy dodo-webhook --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://ipatasdbyqezqkkejnrf.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
  Deno.env.get('SUPABASE_ANON_KEY') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYXRhc2RieXFlenFra2VqbnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzMjg4MjAsImV4cCI6MjEwMzkwNDgyMH0.5BVTBiN9q0q53CxkfrCPzWD3cO01WAHVA6eyZDxmeXg';

// Dodo Payments Credentials Direct In Function
const DODO_PAYMENTS_API_KEY = Deno.env.get('DODO_PAYMENTS_API_KEY') || 'CsMVOehU4Q1KiiF-.j9qGOxOAVEvzIkKC4EeK7o66kgjskhNpN2GohMaEHnttTXXg';
const DODO_ENDPOINT_ID = Deno.env.get('DODO_PAYMENTS_ENDPOINT_ID') || 'ep_3IoV75tsZG1LDpuwHzy4FLgmdMY';
const DODO_SIGNING_SECRET = Deno.env.get('DODO_PAYMENTS_WEBHOOK_SIGNING_SECRET') || 'whsec_kc2aNuqvlbaPv7aGLnR7/bSpwga1D3CE';
const DODO_ENV = Deno.env.get('DODO_PAYMENTS_ENV') || 'live';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-signature, webhook-timestamp',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody || '{}');

    console.log('[Dodo Payments Webhook Received]:', JSON.stringify(payload, null, 2));

    const eventType = payload.type || payload.event || 'payment.succeeded';
    const data = payload.data || payload;

    // Process successful payment events
    if (
      eventType === 'payment.succeeded' ||
      eventType === 'checkout.session.completed' ||
      data.status === 'succeeded'
    ) {
      const paymentId = data.payment_id || data.id || `dodo_pay_${Date.now()}`;
      const amount =
        (data.amount ? (data.amount > 1000 ? data.amount / 100 : data.amount) : 0) ||
        Number(data.metadata?.amount) ||
        100;
      const metadata = data.metadata || {};
      const userEmail =
        data.customer?.email || data.customer_email || metadata.user_email || 'founder@outbid.lol';
      const productTitle =
        data.product_name || metadata.product_name || metadata.productTitle || 'Claimed Product';
      const productUrl = metadata.product_url || metadata.productUrl || 'https://outbid.lol';
      const categorySlug =
        metadata.category_slug || metadata.categorySlug || 'ai-agents-infrastructure';
      const targetProductId = metadata.target_product_id || metadata.targetProductId;
      const targetProductTitle = metadata.target_product_title || metadata.targetProductTitle;
      const targetProductBid = metadata.target_product_bid ? Number(metadata.target_product_bid) : null;
      const newProductId = metadata.productId || `prod_${Math.random().toString(36).substring(2, 9)}`;

      let domain = '';
      try {
        domain = new URL(productUrl).hostname.replace(/^www\./, '');
      } catch {
        domain = productUrl.replace(/^https?:\/\//, '').split('/')[0];
      }

      const faviconUrl =
        metadata.favicon_url ||
        metadata.productFavicon ||
        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;

      // 1. Record Transaction in public.payments table
      const { error: payError } = await supabase.from('payments').upsert({
        id: paymentId,
        user_email: userEmail,
        product_id: newProductId,
        product_title: productTitle,
        product_url: productUrl,
        category_slug: categorySlug,
        target_product_id: targetProductId || null,
        target_product_title: targetProductTitle || null,
        target_product_bid: targetProductBid,
        amount: amount,
        currency: data.currency || 'USD',
        status: 'succeeded',
        payment_method: 'dodo_payments',
        dodo_payment_id: paymentId,
        metadata: data,
        created_at: new Date().toISOString(),
      });

      if (payError) {
        console.error('Error inserting payment record:', payError);
      }

      // 2. Insert or update the product on the leaderboard
      const { error: prodError } = await supabase.from('products').upsert({
        id: newProductId,
        title: productTitle,
        url: productUrl,
        favicon_url: faviconUrl,
        description: metadata.description || metadata.productDescription || 'Claimed via Dodo Payments Checkout',
        category_slug: categorySlug,
        current_bid: amount,
        rank: 1,
        claimed_at: 'Just now',
        domain: domain,
        user_email: userEmail,
        verified: true,
      });

      if (prodError) {
        console.error('Error updating product rank:', prodError);
      }

      // 3. Log into bids activity table
      await supabase.from('bids').insert({
        id: 'bid_' + Date.now(),
        product_id: newProductId,
        product_title: productTitle,
        product_favicon: faviconUrl,
        product_url: productUrl,
        category_slug: categorySlug,
        category_name: categorySlug,
        amount: amount,
        previous_product_title: targetProductTitle || null,
        previous_amount: targetProductBid,
      });

      // 4. Update category stats
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

      if (catData) {
        await supabase
          .from('categories')
          .update({
            claim_count: (catData.claim_count || 0) + 1,
            top_bid: Math.max(catData.top_bid || 0, amount),
            total_volume: (catData.total_volume || 0) + amount,
            updated_at: 'Just now',
          })
          .eq('slug', categorySlug);
      }
    }

    return new Response(
      JSON.stringify({
        received: true,
        status: 'processed',
        event: eventType,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (err: any) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Webhook processing failed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
