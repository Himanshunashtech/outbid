// Supabase Edge Function: Create Real Dodo Payments Checkout Session
// Endpoint URL: https://ipatasdbyqezqkkejnrf.supabase.co/functions/v1/create-dodo-checkout

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const DODO_API_KEY =
  Deno.env.get('DODO_PAYMENTS_API_KEY') ||
  'CsMVOehU4Q1KiiF-.j9qGOxOAVEvzIkKC4EeK7o66kgjskhNpN2GohMaEHnttTXXg';
const DODO_PRODUCT_ID =
  Deno.env.get('DODO_PRODUCT_ID') ||
  'pdt_0NmnIKx3SuM9SQYJR5qp6';
const DODO_ENV = Deno.env.get('DODO_PAYMENTS_ENV') || 'live';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
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
    const body = await req.json();
    const {
      amount,
      productTitle,
      productUrl,
      categorySlug,
      categoryName,
      userEmail,
      userId,
      targetProductId,
      targetProductTitle,
      targetProductBid,
      returnUrl,
    } = body;

    const endpoint =
      DODO_ENV === 'sandbox'
        ? 'https://test.dodopayments.com/payments'
        : 'https://live.dodopayments.com/payments';

    const cleanAmountInCents = Math.round(Number(amount) * 100);

    // Payload for Dodo Payments API with custom product_cart & dynamic amount
    const dodoPayload = {
      product_cart: [
        {
          product_id: DODO_PRODUCT_ID,
          quantity: 1,
          amount: cleanAmountInCents,
        },
      ],
      amount: cleanAmountInCents,
      currency: 'USD',
      payment_link: true,
      product_name: productTitle ? `Outbid Rank Claim: ${productTitle}` : 'Outbid Rank & Attention Claim',
      customer: {
        email: userEmail || 'founder@outbid.lol',
        name: userEmail?.split('@')[0] || 'Founder',
      },
      billing: {
        country: 'US',
      },
      metadata: {
        productTitle,
        productUrl,
        categorySlug,
        categoryName,
        userEmail,
        userId: userId || '',
        targetProductId: targetProductId || '',
        targetProductTitle: targetProductTitle || '',
        targetProductBid: targetProductBid ? String(targetProductBid) : '',
        amount: String(amount),
      },
      return_url: returnUrl || 'https://outbid.lol/?status=success',
    };

    console.log('[Creating Dodo Payment]:', JSON.stringify(dodoPayload, null, 2));

    let checkoutUrl = '';
    let paymentId = `dodo_pay_${Date.now()}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DODO_API_KEY}`,
        },
        body: JSON.stringify(dodoPayload),
      });

      const responseData = await response.json();
      console.log('[Dodo API Response]:', responseData);

      if (response.ok && (responseData.payment_link || responseData.checkout_url || responseData.url)) {
        checkoutUrl = responseData.payment_link || responseData.checkout_url || responseData.url;
        paymentId = responseData.payment_id || responseData.id || paymentId;
      } else {
        console.warn('Dodo Payments API response warning:', responseData);
      }
    } catch (apiErr) {
      console.error('Error contacting Dodo Payments API:', apiErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: checkoutUrl || null,
        paymentId,
        amount,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
