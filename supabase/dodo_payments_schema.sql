-- =========================================================
-- DODO PAYMENTS & PLATFORM REVENUE TRACKING SCHEMA
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ipatasdbyqezqkkejnrf/sql
-- =========================================================

-- 1. Create Payments / Transactions Table
CREATE TABLE IF NOT EXISTS public.payments (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  product_id TEXT,
  product_title TEXT NOT NULL,
  product_url TEXT NOT NULL,
  category_slug TEXT REFERENCES public.categories(slug) ON DELETE SET NULL,
  category_name TEXT,
  target_product_id TEXT,
  target_product_title TEXT,
  target_product_bid NUMERIC,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'succeeded', -- 'pending' | 'succeeded' | 'failed' | 'refunded'
  payment_method TEXT DEFAULT 'dodo_payments',
  dodo_payment_id TEXT,
  dodo_checkout_session_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_email ON public.payments(user_email);
CREATE INDEX IF NOT EXISTS idx_payments_product_id ON public.payments(product_id);
CREATE INDEX IF NOT EXISTS idx_payments_category_slug ON public.payments(category_slug);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- 3. Row Level Security (RLS)
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view succeeded payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Anyone can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Anyone can update payments" ON public.payments;

CREATE POLICY "Public can view succeeded payments" 
  ON public.payments FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert payments" 
  ON public.payments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update payments" 
  ON public.payments FOR UPDATE 
  USING (true) WITH CHECK (true);

-- 4. Function & Trigger to automatically update total_spent & category volume on new payment
CREATE OR REPLACE FUNCTION public.handle_payment_success()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'succeeded' THEN
    -- Update User profile total spent
    IF NEW.user_id IS NOT NULL THEN
      UPDATE public.profiles
      SET total_spent = total_spent + NEW.amount,
          active_claims_count = active_claims_count + 1,
          updated_at = NOW()
      WHERE id = NEW.user_id;
    END IF;

    -- Update Category total volume and top bid
    IF NEW.category_slug IS NOT NULL THEN
      UPDATE public.categories
      SET total_volume = total_volume + NEW.amount,
          top_bid = GREATEST(top_bid, NEW.amount),
          claim_count = claim_count + 1,
          updated_at = 'Just now'
      WHERE slug = NEW.category_slug;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_payment_inserted ON public.payments;
CREATE TRIGGER on_payment_inserted
  AFTER INSERT ON public.payments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_payment_success();

-- 5. RPC Helper: Calculate Platform Total Revenue & Telemetry
CREATE OR REPLACE FUNCTION public.get_platform_revenue_stats()
RETURNS JSON AS $$
DECLARE
  v_total_revenue NUMERIC;
  v_total_count INTEGER;
  v_avg_order NUMERIC;
  v_last_24h_revenue NUMERIC;
BEGIN
  SELECT 
    COALESCE(SUM(amount), 0),
    COUNT(*),
    COALESCE(AVG(amount), 0)
  INTO 
    v_total_revenue,
    v_total_count,
    v_avg_order
  FROM public.payments
  WHERE status = 'succeeded';

  SELECT COALESCE(SUM(amount), 0)
  INTO v_last_24h_revenue
  FROM public.payments
  WHERE status = 'succeeded' AND created_at >= NOW() - INTERVAL '24 hours';

  RETURN json_build_object(
    'total_revenue', v_total_revenue,
    'total_transactions', v_total_count,
    'average_bid_amount', ROUND(v_avg_order, 2),
    'revenue_last_24h', v_last_24h_revenue
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Enable Realtime on payments table
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
  EXCEPTION WHEN others THEN NULL;
  END;
END $$;
