-- =========================================================
-- CLEANUP SCRIPT: DELETE ALL DEMO / PLACEHOLDER PRODUCTS
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ipatasdbyqezqkkejnrf/sql
-- =========================================================

-- 1. Delete all procedural demo/placeholder products with generated patterns
DELETE FROM public.products
WHERE title LIKE '% Pro #%'
   OR title LIKE '% Node #%'
   OR title LIKE '% Protocol #%'
   OR domain LIKE '%-app%.com'
   OR domain LIKE '%-tool%.io'
   OR domain LIKE '%-platform%.io';

-- 2. Recalculate and update claim count, total volume, and top bid for all categories
UPDATE public.categories c
SET 
  claim_count = COALESCE((SELECT COUNT(*) FROM public.products p WHERE p.category_slug = c.slug), 0),
  top_bid = COALESCE((SELECT MAX(current_bid) FROM public.products p WHERE p.category_slug = c.slug), 0),
  total_volume = COALESCE((SELECT SUM(current_bid) FROM public.products p WHERE p.category_slug = c.slug), 0),
  updated_at = 'Just now';

-- 3. Re-index rank for remaining genuine products within each category
WITH ranked_products AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY category_slug ORDER BY current_bid DESC) as new_rank
  FROM public.products
)
UPDATE public.products p
SET rank = r.new_rank
FROM ranked_products r
WHERE p.id = r.id;
