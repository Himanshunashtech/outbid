-- =========================================================
-- Business, Finance & Legal (business-finance-legal) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-1', 'business-finance-legal', 'Business, Finance & Legal', 'Briefcase', 30, 1, 137470, 13760, 'Just now', 'Fintech, corporate legal, compliance, invoicing, payroll and tax tools.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-business-finance-legal-1', 'Artul.ai - Wall Street Semantic AI', 'https://artul.ai', 'https://www.google.com/s2/favicons?domain=artul.ai&sz=128', 'Discover hidden patterns in millions of financial documents with real-time semantic analysis.', 'business-finance-legal', 13760, 1, 'Just now', 4640, 'today', 'artul.ai', TRUE),
  ('p-business-finance-legal-2', 'Stripe — Financial infrastructure for the internet', 'https://stripe.com', 'https://www.google.com/s2/favicons?domain=stripe.com&sz=128', 'Accept payments, send payouts, and manage international business online.', 'business-finance-legal', 11200, 2, 'Just now', 5778, 'today', 'stripe.com', TRUE),
  ('p-business-finance-legal-3', 'Mercury — Banking for ambitious startups', 'https://mercury.com', 'https://www.google.com/s2/favicons?domain=mercury.com&sz=128', 'Startup checking accounts, treasury yield management, and corporate credit cards.', 'business-finance-legal', 9400, 3, 'Just now', 2529, 'today', 'mercury.com', TRUE),
  ('p-business-finance-legal-4', 'Ramp — Finance automation platform', 'https://ramp.com', 'https://www.google.com/s2/favicons?domain=ramp.com&sz=128', 'Corporate cards, bill pay, and accounting automation designed to save businesses time.', 'business-finance-legal', 8600, 4, 'Just now', 8737, 'today', 'ramp.com', TRUE),
  ('p-business-finance-legal-5', 'Brex — Spend management and corporate cards', 'https://brex.com', 'https://www.google.com/s2/favicons?domain=brex.com&sz=128', 'Global corporate credit cards, automated expense management, and travel booking.', 'business-finance-legal', 7900, 5, 'Just now', 4239, 'today', 'brex.com', TRUE),
  ('p-business-finance-legal-6', 'FloPay — Payment Orchestration Platform', 'https://flopay.io', 'https://www.google.com/s2/favicons?domain=flopay.io&sz=128', 'Zero-downtime routing, payment orchestration, and chargeback dispute mitigation.', 'business-finance-legal', 7200, 6, 'Just now', 6132, 'today', 'flopay.io', TRUE),
  ('p-business-finance-legal-7', 'Deel — Global HR and payroll platform', 'https://deel.com', 'https://www.google.com/s2/favicons?domain=deel.com&sz=128', 'Hire, onboard, and pay contractors and international employees in 150+ countries.', 'business-finance-legal', 6700, 7, 'Just now', 2222, 'today', 'deel.com', TRUE),
  ('p-business-finance-legal-8', 'Rippling — Workforce management system', 'https://rippling.com', 'https://www.google.com/s2/favicons?domain=rippling.com&sz=128', 'Unify HR, IT, and Finance apps across entire global employee operations.', 'business-finance-legal', 6200, 8, 'Just now', 3955, 'today', 'rippling.com', TRUE),
  ('p-business-finance-legal-9', 'Gusto — People platform for payroll and benefits', 'https://gusto.com', 'https://www.google.com/s2/favicons?domain=gusto.com&sz=128', 'Modern online payroll, employee benefits, and HR tools for growing teams.', 'business-finance-legal', 5800, 9, 'Just now', 7231, 'today', 'gusto.com', TRUE),
  ('p-business-finance-legal-10', 'Carta — Equity management and cap table software', 'https://carta.com', 'https://www.google.com/s2/favicons?domain=carta.com&sz=128', 'Manage cap tables, 409A valuations, and employee equity grants effortlessly.', 'business-finance-legal', 5400, 10, 'Just now', 1448, 'today', 'carta.com', TRUE),
  ('p-business-finance-legal-11', 'Pulley — Fast cap table management', 'https://pulley.com', 'https://www.google.com/s2/favicons?domain=pulley.com&sz=128', 'Track equity, model fundraising rounds, and issue employee stock options with zero delay.', 'business-finance-legal', 5000, 11, 'Just now', 4260, 'today', 'pulley.com', TRUE),
  ('p-business-finance-legal-12', 'Pilot — Bookkeeping, tax, and CFO services', 'https://pilot.com', 'https://www.google.com/s2/favicons?domain=pilot.com&sz=128', 'Dedicated bookkeeping and fractional CFO services for venture-backed startups.', 'business-finance-legal', 4650, 12, 'Just now', 4508, 'today', 'pilot.com', TRUE),
  ('p-business-finance-legal-13', 'myTB.ai - Trial Balance, Perfected', 'https://mytb.ai', 'https://www.google.com/s2/favicons?domain=mytb.ai&sz=128', 'Automate balance reconciliation with audit-ready AI verification for CFOs and accountants.', 'business-finance-legal', 4300, 13, 'Just now', 8224, 'today', 'mytb.ai', TRUE),
  ('p-business-finance-legal-14', 'Ironclad — Digital contracting platform', 'https://ironcladapp.com', 'https://www.google.com/s2/favicons?domain=ironcladapp.com&sz=128', 'Contract lifecycle management software for legal, sales, and procurement workflows.', 'business-finance-legal', 4000, 14, 'Just now', 6466, 'today', 'ironcladapp.com', TRUE),
  ('p-business-finance-legal-15', 'DottedSign — E-Signature for modern legal teams', 'https://dottedsign.com', 'https://www.google.com/s2/favicons?domain=dottedsign.com&sz=128', 'Secure cloud electronic signature and legal contract workflow automation.', 'business-finance-legal', 3750, 15, 'Just now', 970, 'today', 'dottedsign.com', TRUE),
  ('p-business-finance-legal-16', 'Clio — Legal practice management software', 'https://clio.com', 'https://www.google.com/s2/favicons?domain=clio.com&sz=128', 'Cloud-based legal practice management, client intake, and automated billing.', 'business-finance-legal', 3500, 16, 'Just now', 3278, 'today', 'clio.com', TRUE),
  ('p-business-finance-legal-17', 'TaxBit — Enterprise digital asset tax & accounting', 'https://taxbit.com', 'https://www.google.com/s2/favicons?domain=taxbit.com&sz=128', 'Automate tax compliance and enterprise accounting for digital and fiat assets.', 'business-finance-legal', 3280, 17, 'Just now', 8647, 'today', 'taxbit.com', TRUE),
  ('p-business-finance-legal-18', 'QuickBooks — Accounting software for small business', 'https://quickbooks.intuit.com', 'https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=128', 'Track expenses, create custom invoices, and run financial balance reports.', 'business-finance-legal', 3050, 18, 'Just now', 2245, 'today', 'quickbooks.intuit.com', TRUE),
  ('p-business-finance-legal-19', 'Xero — Beautiful accounting software', 'https://xero.com', 'https://www.google.com/s2/favicons?domain=xero.com&sz=128', 'Small business accounting platform connecting banks, accountants, and invoices.', 'business-finance-legal', 2850, 19, 'Just now', 6679, 'today', 'xero.com', TRUE),
  ('p-business-finance-legal-20', 'FreshBooks — Cloud accounting software', 'https://freshbooks.com', 'https://www.google.com/s2/favicons?domain=freshbooks.com&sz=128', 'Invoicing, expense tracking, and time management software built for freelancers.', 'business-finance-legal', 2680, 20, 'Just now', 4683, 'today', 'freshbooks.com', TRUE),
  ('p-business-finance-legal-21', 'Robin AI — Contract copilot for lawyers', 'https://robinai.com', 'https://www.google.com/s2/favicons?domain=robinai.com&sz=128', 'Read, draft, and negotiate legal contracts with domain-specific legal AI.', 'business-finance-legal', 2500, 21, 'Just now', 8353, 'today', 'robinai.com', TRUE),
  ('p-business-finance-legal-22', 'Harvey — AI foundation for legal teams', 'https://harvey.ai', 'https://www.google.com/s2/favicons?domain=harvey.ai&sz=128', 'Enterprise generative AI platform fine-tuned for elite law firms and in-house counsel.', 'business-finance-legal', 2350, 22, 'Just now', 5093, 'today', 'harvey.ai', TRUE),
  ('p-business-finance-legal-23', 'Airwallex — Global payments and treasury', 'https://airwallex.com', 'https://www.google.com/s2/favicons?domain=airwallex.com&sz=128', 'Global financial infrastructure for cross-border banking and multi-currency accounts.', 'business-finance-legal', 2200, 23, 'Just now', 6761, 'today', 'airwallex.com', TRUE),
  ('p-business-finance-legal-24', 'Modern Treasury — Payment operations platform', 'https://moderntreasury.com', 'https://www.google.com/s2/favicons?domain=moderntreasury.com&sz=128', 'API platform to move money via ACH, FedNow, RTP, and wire directly through bank partners.', 'business-finance-legal', 2050, 24, 'Just now', 7732, 'today', 'moderntreasury.com', TRUE),
  ('p-business-finance-legal-25', 'Finmark — Financial planning for startups', 'https://finmark.com', 'https://www.google.com/s2/favicons?domain=finmark.com&sz=128', 'Financial modeling, burn runway calculation, and cash forecasting made intuitive.', 'business-finance-legal', 1900, 25, 'Just now', 2516, 'today', 'finmark.com', TRUE),
  ('p-business-finance-legal-26', 'Causal — Visual financial modeling', 'https://causal.app', 'https://www.google.com/s2/favicons?domain=causal.app&sz=128', 'Build interactive financial models, link live data sources, and share executive dashboards.', 'business-finance-legal', 1750, 26, 'Just now', 1193, 'today', 'causal.app', TRUE),
  ('p-business-finance-legal-27', 'Vanta — Automated compliance and audit readiness', 'https://vanta.com', 'https://www.google.com/s2/favicons?domain=vanta.com&sz=128', 'Continuous compliance monitoring for SOC 2, ISO 27001, HIPAA, and GDPR.', 'business-finance-legal', 1600, 27, 'Just now', 3991, 'today', 'vanta.com', TRUE),
  ('p-business-finance-legal-28', 'Bill.com — Intelligent business payments', 'https://bill.com', 'https://www.google.com/s2/favicons?domain=bill.com&sz=128', 'Automate accounts payable, accounts receivable, and international wire approvals.', 'business-finance-legal', 1450, 28, 'Just now', 8791, 'today', 'bill.com', TRUE),
  ('p-business-finance-legal-29', 'Tipalti — Global payables automation', 'https://tipalti.com', 'https://www.google.com/s2/favicons?domain=tipalti.com&sz=128', 'Automate high-volume mass payouts to international creators, freelancers, and suppliers.', 'business-finance-legal', 1300, 29, 'Just now', 6826, 'today', 'tipalti.com', TRUE),
  ('p-business-finance-legal-30', 'DocuSign — Global electronic signature leader', 'https://docusign.com', 'https://www.google.com/s2/favicons?domain=docusign.com&sz=128', 'Sign agreements electronically and streamline contract lifecycles with enterprise grade compliance.', 'business-finance-legal', 1150, 30, 'Just now', 8021, 'today', 'docusign.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- AI Agents & Infrastructure (ai-agents-infrastructure) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-2', 'ai-agents-infrastructure', 'AI Agents & Infrastructure', 'Bot', 30, 2, 161700, 17000, 'Just now', 'Autonomous AI agents, agent frameworks, LLM orchestrators and compute infra.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-ai-agents-infrastructure-1', 'Cursor — The AI Code Editor', 'https://cursor.com', 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128', 'Built to make developers extraordinarily fast, Cursor is the leading AI-powered code editor.', 'ai-agents-infrastructure', 17000, 1, 'Just now', 6632, 'today', 'cursor.com', TRUE),
  ('p-ai-agents-infrastructure-2', 'Lovable — Fullstack software engineer AI agent', 'https://lovable.dev', 'https://www.google.com/s2/favicons?domain=lovable.dev&sz=128', 'Turn ideas into full-stack web applications in minutes with generative AI agent workflows.', 'ai-agents-infrastructure', 14500, 2, 'Just now', 3312, 'today', 'lovable.dev', TRUE),
  ('p-ai-agents-infrastructure-3', 'Perplexity AI — Where knowledge begins', 'https://perplexity.ai', 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128', 'Next-generation conversational answer engine delivering cited facts and deep web research.', 'ai-agents-infrastructure', 12400, 3, 'Just now', 4630, 'today', 'perplexity.ai', TRUE),
  ('p-ai-agents-infrastructure-4', 'v0 by Vercel — Generative UI System', 'https://v0.dev', 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128', 'Generate copy-pasteable React and Tailwind UI components with interactive AI prompting.', 'ai-agents-infrastructure', 10800, 4, 'Just now', 3950, 'today', 'v0.dev', TRUE),
  ('p-ai-agents-infrastructure-5', 'LangChain — Context-aware reasoning framework', 'https://langchain.com', 'https://www.google.com/s2/favicons?domain=langchain.com&sz=128', 'Build context-aware reasoning applications powered by LLMs and agentic tool integrations.', 'ai-agents-infrastructure', 9500, 5, 'Just now', 4373, 'today', 'langchain.com', TRUE),
  ('p-ai-agents-infrastructure-6', 'LlamaIndex — Data framework for LLM applications', 'https://llamaindex.ai', 'https://www.google.com/s2/favicons?domain=llamaindex.ai&sz=128', 'Connect custom data sources to large language models for production RAG systems.', 'ai-agents-infrastructure', 8600, 6, 'Just now', 1782, 'today', 'llamaindex.ai', TRUE),
  ('p-ai-agents-infrastructure-7', 'Replicate — Run AI models with an API', 'https://replicate.com', 'https://www.google.com/s2/favicons?domain=replicate.com&sz=128', 'Run open-source machine learning models in the cloud with a few lines of code.', 'ai-agents-infrastructure', 7900, 7, 'Just now', 5915, 'today', 'replicate.com', TRUE),
  ('p-ai-agents-infrastructure-8', 'Modal — Cloud compute for AI developers', 'https://modal.com', 'https://www.google.com/s2/favicons?domain=modal.com&sz=128', 'Serverless compute engine for running AI models, batch jobs, and GPU workloads.', 'ai-agents-infrastructure', 7300, 8, 'Just now', 2604, 'today', 'modal.com', TRUE),
  ('p-ai-agents-infrastructure-9', 'Groq — Ultra-fast LPU inference engine', 'https://groq.com', 'https://www.google.com/s2/favicons?domain=groq.com&sz=128', 'Real-time AI inference processor delivering 500+ tokens per second on open models.', 'ai-agents-infrastructure', 6800, 9, 'Just now', 6600, 'today', 'groq.com', TRUE),
  ('p-ai-agents-infrastructure-10', 'Together AI — Cloud platform for generative AI', 'https://together.ai', 'https://www.google.com/s2/favicons?domain=together.ai&sz=128', 'Fastest cloud platform for training, fine-tuning, and running open-source AI models.', 'ai-agents-infrastructure', 6300, 10, 'Just now', 5558, 'today', 'together.ai', TRUE),
  ('p-ai-agents-infrastructure-11', 'Anthropic Claude — Safe frontier AI intelligence', 'https://anthropic.com', 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=128', 'Next-generation AI assistant built for reasoning, coding, and complex analysis.', 'ai-agents-infrastructure', 5900, 11, 'Just now', 2211, 'today', 'anthropic.com', TRUE),
  ('p-ai-agents-infrastructure-12', 'OpenAI ChatGPT & APIs', 'https://openai.com', 'https://www.google.com/s2/favicons?domain=openai.com&sz=128', 'Frontier foundational language models and multi-modal developer APIs.', 'ai-agents-infrastructure', 5500, 12, 'Just now', 2513, 'today', 'openai.com', TRUE),
  ('p-ai-agents-infrastructure-13', 'Mistral AI — Frontier open-weight AI models', 'https://mistral.ai', 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=128', 'High-performance open and commercial language models for European and global enterprise.', 'ai-agents-infrastructure', 5100, 13, 'Just now', 3504, 'today', 'mistral.ai', TRUE),
  ('p-ai-agents-infrastructure-14', 'Pinecone — Vector database for AI applications', 'https://pinecone.io', 'https://www.google.com/s2/favicons?domain=pinecone.io&sz=128', 'Vector database built for high-scale real-time search, recommendation, and RAG.', 'ai-agents-infrastructure', 4750, 14, 'Just now', 2949, 'today', 'pinecone.io', TRUE),
  ('p-ai-agents-infrastructure-15', 'Qdrant — Vector search engine & database', 'https://qdrant.tech', 'https://www.google.com/s2/favicons?domain=qdrant.tech&sz=128', 'High-performance vector database with extended filtering support for enterprise AI.', 'ai-agents-infrastructure', 4400, 15, 'Just now', 6352, 'today', 'qdrant.tech', TRUE),
  ('p-ai-agents-infrastructure-16', 'Weaviate — Open source AI vector database', 'https://weaviate.io', 'https://www.google.com/s2/favicons?domain=weaviate.io&sz=128', 'Store data objects and vector embeddings from your favorite ML models seamlessly.', 'ai-agents-infrastructure', 4100, 16, 'Just now', 1248, 'today', 'weaviate.io', TRUE),
  ('p-ai-agents-infrastructure-17', 'AutoGPT — Autonomous AI agent execution', 'https://agpt.co', 'https://www.google.com/s2/favicons?domain=agpt.co&sz=128', 'Create and deploy autonomous AI agents that break down complex multi-step goals.', 'ai-agents-infrastructure', 3800, 17, 'Just now', 2532, 'today', 'agpt.co', TRUE),
  ('p-ai-agents-infrastructure-18', 'CrewAI — Multi-agent orchestration framework', 'https://crewai.com', 'https://www.google.com/s2/favicons?domain=crewai.com&sz=128', 'Framework for orchestrating role-playing autonomous AI agents for collaborative tasks.', 'ai-agents-infrastructure', 3500, 18, 'Just now', 3788, 'today', 'crewai.com', TRUE),
  ('p-ai-agents-infrastructure-19', 'Bolt.new — In-browser AI development environment', 'https://bolt.new', 'https://www.google.com/s2/favicons?domain=bolt.new&sz=128', 'Prompt, build, and deploy fullstack web apps completely inside the browser sandbox.', 'ai-agents-infrastructure', 3250, 19, 'Just now', 2479, 'today', 'bolt.new', TRUE),
  ('p-ai-agents-infrastructure-20', 'RunPod — Serverless GPU cloud computing', 'https://runpod.io', 'https://www.google.com/s2/favicons?domain=runpod.io&sz=128', 'Rent affordable on-demand GPU instances for AI model training and production inference.', 'ai-agents-infrastructure', 3000, 20, 'Just now', 2353, 'today', 'runpod.io', TRUE),
  ('p-ai-agents-infrastructure-21', 'Chroma — Open-source AI embedding database', 'https://trychroma.com', 'https://www.google.com/s2/favicons?domain=trychroma.com&sz=128', 'The AI-native open-source embedding database for developer-friendly LLM apps.', 'ai-agents-infrastructure', 2750, 21, 'Just now', 6130, 'today', 'trychroma.com', TRUE),
  ('p-ai-agents-infrastructure-22', 'LangSmith — LLM observability platform', 'https://smith.langchain.com', 'https://www.google.com/s2/favicons?domain=smith.langchain.com&sz=128', 'Debug, test, evaluate, and monitor LLM pipelines with deep trace visibility.', 'ai-agents-infrastructure', 2500, 22, 'Just now', 4863, 'today', 'smith.langchain.com', TRUE),
  ('p-ai-agents-infrastructure-23', 'Helicone — LLM observability and caching', 'https://helicone.ai', 'https://www.google.com/s2/favicons?domain=helicone.ai&sz=128', 'One-line integration to monitor costs, latency, user sessions, and semantic caching.', 'ai-agents-infrastructure', 2250, 23, 'Just now', 8199, 'today', 'helicone.ai', TRUE),
  ('p-ai-agents-infrastructure-24', 'Ollama — Run LLMs locally', 'https://ollama.com', 'https://www.google.com/s2/favicons?domain=ollama.com&sz=128', 'Get up and running with Llama 3, Mistral, and Gemma models on macOS, Linux, and Windows.', 'ai-agents-infrastructure', 2000, 24, 'Just now', 7020, 'today', 'ollama.com', TRUE),
  ('p-ai-agents-infrastructure-25', 'Hugging Face — Machine learning hub', 'https://huggingface.co', 'https://www.google.com/s2/favicons?domain=huggingface.co&sz=128', 'The platform where the machine learning community collaborates on models and datasets.', 'ai-agents-infrastructure', 1800, 25, 'Just now', 1633, 'today', 'huggingface.co', TRUE),
  ('p-ai-agents-infrastructure-26', 'Fireworks AI — Fast generative AI inference', 'https://fireworks.ai', 'https://www.google.com/s2/favicons?domain=fireworks.ai&sz=128', 'Production-ready inference platform optimized for latency, custom LoRA, and JSON schemas.', 'ai-agents-infrastructure', 1600, 26, 'Just now', 1333, 'today', 'fireworks.ai', TRUE),
  ('p-ai-agents-infrastructure-27', 'DeepSeek — Open frontier reasoning models', 'https://deepseek.com', 'https://www.google.com/s2/favicons?domain=deepseek.com&sz=128', 'High-capability open architecture reasoning and coding models with competitive benchmarks.', 'ai-agents-infrastructure', 1400, 27, 'Just now', 3908, 'today', 'deepseek.com', TRUE),
  ('p-ai-agents-infrastructure-28', 'Cohere — Enterprise AI language platform', 'https://cohere.com', 'https://www.google.com/s2/favicons?domain=cohere.com&sz=128', 'Enterprise LLM solutions for semantic search, reranking, and multilingual understanding.', 'ai-agents-infrastructure', 1200, 28, 'Just now', 1598, 'today', 'cohere.com', TRUE),
  ('p-ai-agents-infrastructure-29', 'E2B — Cloud sandboxes for AI agents', 'https://e2b.dev', 'https://www.google.com/s2/favicons?domain=e2b.dev&sz=128', 'Secure cloud execution environments for AI agents to run code, browse, and perform tasks.', 'ai-agents-infrastructure', 1000, 29, 'Just now', 4908, 'today', 'e2b.dev', TRUE),
  ('p-ai-agents-infrastructure-30', 'Tavily — Search engine optimized for LLMs', 'https://tavily.com', 'https://www.google.com/s2/favicons?domain=tavily.com&sz=128', 'Real-time web search API built from the ground up for autonomous AI research agents.', 'ai-agents-infrastructure', 800, 30, 'Just now', 6953, 'today', 'tavily.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- SEO & AI Visibility (seo-ai-visibility) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-3', 'seo-ai-visibility', 'SEO & AI Visibility', 'Search', 30, 3, 115936, 13005, 'Just now', 'LLM search optimization, citation outreach, programmatic SEO & backlinks.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-seo-ai-visibility-1', 'Outrank - Grow Organic Traffic on Auto-Pilot', 'https://outrank.so', 'https://www.google.com/s2/favicons?domain=outrank.so&sz=128', 'Get traffic and outrank competitors with automated backlinks and SEO content.', 'seo-ai-visibility', 13005, 1, 'Just now', 8196, 'today', 'outrank.so', TRUE),
  ('p-seo-ai-visibility-2', 'CrowdReply – Citation Outreach for AI Visibility', 'https://crowdreply.io', 'https://www.google.com/s2/favicons?domain=crowdreply.io&sz=128', 'Get your brand cited across pages that ChatGPT, Perplexity, and Claude index.', 'seo-ai-visibility', 12711, 2, 'Just now', 6401, 'today', 'crowdreply.io', TRUE),
  ('p-seo-ai-visibility-3', 'ZeroRank | Track & Improve Your AI Search Visibility', 'https://zerorank.ai', 'https://www.google.com/s2/favicons?domain=zerorank.ai&sz=128', 'Monitor and increase brand citations across all major conversational AI engines.', 'seo-ai-visibility', 9800, 3, 'Just now', 6260, 'today', 'zerorank.ai', TRUE),
  ('p-seo-ai-visibility-4', 'Ahrefs — Complete SEO toolset for rank tracking', 'https://ahrefs.com', 'https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128', 'All-in-one SEO toolset for link building, keyword research, competitor analysis, and audits.', 'seo-ai-visibility', 8500, 4, 'Just now', 8748, 'today', 'ahrefs.com', TRUE),
  ('p-seo-ai-visibility-5', 'Semrush — Online visibility management platform', 'https://semrush.com', 'https://www.google.com/s2/favicons?domain=semrush.com&sz=128', 'SEO, content marketing, competitor research, PPC, and social media marketing in one platform.', 'seo-ai-visibility', 7600, 5, 'Just now', 8670, 'today', 'semrush.com', TRUE),
  ('p-seo-ai-visibility-6', 'Surfer SEO — Content intelligence platform', 'https://surferseo.com', 'https://www.google.com/s2/favicons?domain=surferseo.com&sz=128', 'Generate SEO-optimized articles with real-time NLP guideline scoring.', 'seo-ai-visibility', 6800, 6, 'Just now', 3915, 'today', 'surferseo.com', TRUE),
  ('p-seo-ai-visibility-7', 'Clearscope — SEO content optimization platform', 'https://clearscope.io', 'https://www.google.com/s2/favicons?domain=clearscope.io&sz=128', 'Drive organic search traffic with data-backed keyword suggestions and content grading.', 'seo-ai-visibility', 6100, 7, 'Just now', 2682, 'today', 'clearscope.io', TRUE),
  ('p-seo-ai-visibility-8', 'Writesonic — AI article writer & SEO platform', 'https://writesonic.com', 'https://www.google.com/s2/favicons?domain=writesonic.com&sz=128', 'AI writer for creating SEO-friendly content, blog posts, and ad copy.', 'seo-ai-visibility', 5500, 8, 'Just now', 3875, 'today', 'writesonic.com', TRUE),
  ('p-seo-ai-visibility-9', 'Screaming Frog — SEO Spider website crawler', 'https://screamingfrog.co.uk', 'https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=128', 'Industry-standard website crawler to audit on-page technical SEO issues.', 'seo-ai-visibility', 4900, 9, 'Just now', 1902, 'today', 'screamingfrog.co.uk', TRUE),
  ('p-seo-ai-visibility-10', 'Similarweb — Digital market intelligence', 'https://similarweb.com', 'https://www.google.com/s2/favicons?domain=similarweb.com&sz=128', 'Analyze competitor website traffic, user demographics, and acquisition channels.', 'seo-ai-visibility', 4400, 10, 'Just now', 6153, 'today', 'similarweb.com', TRUE),
  ('p-seo-ai-visibility-11', 'Moz Pro — SEO software and link explorer', 'https://moz.com', 'https://www.google.com/s2/favicons?domain=moz.com&sz=128', 'Track domain authority, perform site crawls, and discover backlink opportunities.', 'seo-ai-visibility', 4000, 11, 'Just now', 3885, 'today', 'moz.com', TRUE),
  ('p-seo-ai-visibility-12', 'SpyFu — Competitor keyword research tool', 'https://spyfu.com', 'https://www.google.com/s2/favicons?domain=spyfu.com&sz=128', 'Download competitor SEO and Google Ads keyword bidding histories with one search.', 'seo-ai-visibility', 3700, 12, 'Just now', 4546, 'today', 'spyfu.com', TRUE),
  ('p-seo-ai-visibility-13', 'Ubersuggest — Keyword discovery and SEO analyzer', 'https://neilpatel.com/ubersuggest', 'https://www.google.com/s2/favicons?domain=neilpatel.com/ubersuggest&sz=128', 'Generate long-tail keyword ideas, audit backlinks, and monitor search ranking changes.', 'seo-ai-visibility', 3400, 13, 'Just now', 6603, 'today', 'neilpatel.com/ubersuggest', TRUE),
  ('p-seo-ai-visibility-14', 'Mangools — Juicy SEO tools you will love', 'https://mangools.com', 'https://www.google.com/s2/favicons?domain=mangools.com&sz=128', 'Simple yet effective keyword research, SERP analysis, and rank tracking toolset.', 'seo-ai-visibility', 3100, 14, 'Just now', 1655, 'today', 'mangools.com', TRUE),
  ('p-seo-ai-visibility-15', 'Frase.io — AI content generation & optimization', 'https://frase.io', 'https://www.google.com/s2/favicons?domain=frase.io&sz=128', 'Research competitor SERPs and produce structured content briefs in minutes.', 'seo-ai-visibility', 2850, 15, 'Just now', 3937, 'today', 'frase.io', TRUE),
  ('p-seo-ai-visibility-16', 'RankIQ — AI SEO tool for bloggers', 'https://rankiq.com', 'https://www.google.com/s2/favicons?domain=rankiq.com&sz=128', 'Curated keyword libraries and AI optimizer built specifically for niche publishers.', 'seo-ai-visibility', 2600, 16, 'Just now', 6231, 'today', 'rankiq.com', TRUE),
  ('p-seo-ai-visibility-17', 'MarketMuse — AI content strategy platform', 'https://marketmuse.com', 'https://www.google.com/s2/favicons?domain=marketmuse.com&sz=128', 'Automate content auditing, topical authority mapping, and semantic gap analysis.', 'seo-ai-visibility', 2400, 17, 'Just now', 3943, 'today', 'marketmuse.com', TRUE),
  ('p-seo-ai-visibility-18', 'Letterdrop — Automate inbound SEO pipelines', 'https://letterdrop.com', 'https://www.google.com/s2/favicons?domain=letterdrop.com&sz=128', 'Turn audio recordings and sales calls into high-ranking SEO content clusters.', 'seo-ai-visibility', 2200, 18, 'Just now', 2245, 'today', 'letterdrop.com', TRUE),
  ('p-seo-ai-visibility-19', 'SE Ranking — All-in-one SEO management', 'https://seranking.com', 'https://www.google.com/s2/favicons?domain=seranking.com&sz=128', 'Keyword rank tracking, website audit, backlink monitor, and competitor research.', 'seo-ai-visibility', 2000, 19, 'Just now', 2614, 'today', 'seranking.com', TRUE),
  ('p-seo-ai-visibility-20', 'Hunter.io — Find email addresses in seconds', 'https://hunter.io', 'https://www.google.com/s2/favicons?domain=hunter.io&sz=128', 'Find professional email addresses of domain owners and link prospect contacts.', 'seo-ai-visibility', 1800, 20, 'Just now', 7128, 'today', 'hunter.io', TRUE),
  ('p-seo-ai-visibility-21', 'Yoast SEO — The #1 WordPress SEO plugin', 'https://yoast.com', 'https://www.google.com/s2/favicons?domain=yoast.com&sz=128', 'Optimize titles, meta tags, XML sitemaps, and readability for WordPress sites.', 'seo-ai-visibility', 1600, 21, 'Just now', 4019, 'today', 'yoast.com', TRUE),
  ('p-seo-ai-visibility-22', 'Rank Math — Swiss Army Knife of WordPress SEO', 'https://rankmath.com', 'https://www.google.com/s2/favicons?domain=rankmath.com&sz=128', 'Modern WordPress SEO plugin with built-in schema markup and rank tracking.', 'seo-ai-visibility', 1400, 22, 'Just now', 933, 'today', 'rankmath.com', TRUE),
  ('p-seo-ai-visibility-23', 'Byword.ai — Programmatic AI SEO at scale', 'https://byword.ai', 'https://www.google.com/s2/favicons?domain=byword.ai&sz=128', 'Generate thousands of topical, fact-checked SEO articles from simple keyword lists.', 'seo-ai-visibility', 1200, 23, 'Just now', 8015, 'today', 'byword.ai', TRUE),
  ('p-seo-ai-visibility-24', 'KoalaWriter — High-quality AI SEO writing', 'https://koala.sh', 'https://www.google.com/s2/favicons?domain=koala.sh&sz=128', 'AI writer powered by GPT-4 and real-time search data for affiliate and informational blogs.', 'seo-ai-visibility', 1000, 24, 'Just now', 3528, 'today', 'koala.sh', TRUE),
  ('p-seo-ai-visibility-25', 'Originality.ai — AI content & plagiarism checker', 'https://originality.ai', 'https://www.google.com/s2/favicons?domain=originality.ai&sz=128', 'Verify content authenticity and scan for AI generation before publishing.', 'seo-ai-visibility', 850, 25, 'Just now', 8607, 'today', 'originality.ai', TRUE),
  ('p-seo-ai-visibility-26', 'AirOps — AI workflows for programmatic SEO', 'https://airops.com', 'https://www.google.com/s2/favicons?domain=airops.com&sz=128', 'Build scalable AI data pipelines and automated page generation workflows.', 'seo-ai-visibility', 720, 26, 'Just now', 3097, 'today', 'airops.com', TRUE),
  ('p-seo-ai-visibility-27', 'Winston AI — AI detector and fact checker', 'https://gowinston.ai', 'https://www.google.com/s2/favicons?domain=gowinston.ai&sz=128', 'Accurate AI detector designed for educators, web publishers, and SEO agencies.', 'seo-ai-visibility', 600, 27, 'Just now', 1850, 'today', 'gowinston.ai', TRUE),
  ('p-seo-ai-visibility-28', 'Redocly — API documentation SEO & portal', 'https://redocly.com', 'https://www.google.com/s2/favicons?domain=redocly.com&sz=128', 'Build indexable, search-engine-friendly developer API documentation hubs.', 'seo-ai-visibility', 500, 28, 'Just now', 8529, 'today', 'redocly.com', TRUE),
  ('p-seo-ai-visibility-29', 'Mintlify — Beautiful docs that rank on Google', 'https://mintlify.com', 'https://www.google.com/s2/favicons?domain=mintlify.com&sz=128', 'Documentation platform optimized for reader engagement and developer discovery.', 'seo-ai-visibility', 400, 29, 'Just now', 1809, 'today', 'mintlify.com', TRUE),
  ('p-seo-ai-visibility-30', 'GitBook — Collaborative knowledge management', 'https://gitbook.com', 'https://www.google.com/s2/favicons?domain=gitbook.com&sz=128', 'Publish public technical documentation that captures organic search traffic.', 'seo-ai-visibility', 300, 30, 'Just now', 2198, 'today', 'gitbook.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Marketing & Advertising (marketing-advertising) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-4', 'marketing-advertising', 'Marketing & Advertising', 'Megaphone', 30, NULL, 123970, 16000, 'Just now', 'Ad tech, influencer marketplaces, referral loops and growth tools.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-marketing-advertising-1', 'beehiiv — The newsletter platform built for growth', 'https://beehiiv.com', 'https://www.google.com/s2/favicons?domain=beehiiv.com&sz=128', 'The modern newsletter platform built to monetize, scale, and acquire subscribers.', 'marketing-advertising', 16000, 1, 'Just now', 3559, 'today', 'beehiiv.com', TRUE),
  ('p-marketing-advertising-2', 'Loops — Modern email for SaaS startups', 'https://loops.so', 'https://www.google.com/s2/favicons?domain=loops.so&sz=128', 'The email platform built specifically for software companies and product-led growth.', 'marketing-advertising', 13200, 2, 'Just now', 2736, 'today', 'loops.so', TRUE),
  ('p-marketing-advertising-3', 'HubSpot — Inbound marketing and CRM platform', 'https://hubspot.com', 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=128', 'Complete marketing automation, lead nurturing, and CRM pipeline platform.', 'marketing-advertising', 11000, 3, 'Just now', 1622, 'today', 'hubspot.com', TRUE),
  ('p-marketing-advertising-4', 'Mailchimp — Marketing automation and email marketing', 'https://mailchimp.com', 'https://www.google.com/s2/favicons?domain=mailchimp.com&sz=128', 'Email marketing campaigns, transactional messaging, and customer journey builders.', 'marketing-advertising', 9400, 4, 'Just now', 4932, 'today', 'mailchimp.com', TRUE),
  ('p-marketing-advertising-5', 'Klaviyo — Intelligent marketing automation for ecommerce', 'https://klaviyo.com', 'https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128', 'Turn customer data into personalized SMS and email marketing campaigns.', 'marketing-advertising', 8100, 5, 'Just now', 7258, 'today', 'klaviyo.com', TRUE),
  ('p-marketing-advertising-6', 'Customer.io — Automated messaging platform', 'https://customer.io', 'https://www.google.com/s2/favicons?domain=customer.io&sz=128', 'Harness behavioral data to send relevant in-app, push, and email messages.', 'marketing-advertising', 7200, 6, 'Just now', 7687, 'today', 'customer.io', TRUE),
  ('p-marketing-advertising-7', 'Braze — Customer engagement platform', 'https://braze.com', 'https://www.google.com/s2/favicons?domain=braze.com&sz=128', 'Multi-channel customer engagement delivering real-time mobile and web experiences.', 'marketing-advertising', 6400, 7, 'Just now', 7329, 'today', 'braze.com', TRUE),
  ('p-marketing-advertising-8', 'ActiveCampaign — Marketing automation and sales CRM', 'https://activecampaign.com', 'https://www.google.com/s2/favicons?domain=activecampaign.com&sz=128', 'Automate sales funnels, lead scoring, and multi-channel customer journeys.', 'marketing-advertising', 5700, 8, 'Just now', 8263, 'today', 'activecampaign.com', TRUE),
  ('p-marketing-advertising-9', 'Brevo — All-in-one digital marketing', 'https://brevo.com', 'https://www.google.com/s2/favicons?domain=brevo.com&sz=128', 'Email campaigns, SMS marketing, WhatsApp campaigns, and chat widgets.', 'marketing-advertising', 5100, 9, 'Just now', 3735, 'today', 'brevo.com', TRUE),
  ('p-marketing-advertising-10', 'Attio — Modern CRM for next-gen companies', 'https://attio.com', 'https://www.google.com/s2/favicons?domain=attio.com&sz=128', 'Powerful, flexible CRM built on realtime workflows and custom data models.', 'marketing-advertising', 4600, 10, 'Just now', 1822, 'today', 'attio.com', TRUE),
  ('p-marketing-advertising-11', 'Folk — The all-in-one CRM for teams', 'https://folk.app', 'https://www.google.com/s2/favicons?domain=folk.app&sz=128', 'Lightweight, collaborative CRM to manage contacts, pipelines, and email sequences.', 'marketing-advertising', 4200, 11, 'Just now', 6850, 'today', 'folk.app', TRUE),
  ('p-marketing-advertising-12', 'Mixpanel — Product analytics for mobile and web', 'https://mixpanel.com', 'https://www.google.com/s2/favicons?domain=mixpanel.com&sz=128', 'Interactive behavioral analytics to measure user retention, conversion funnels, and activation.', 'marketing-advertising', 3800, 12, 'Just now', 5454, 'today', 'mixpanel.com', TRUE),
  ('p-marketing-advertising-13', 'Amplitude — Digital analytics platform', 'https://amplitude.com', 'https://www.google.com/s2/favicons?domain=amplitude.com&sz=128', 'Unified platform for tracking user engagement, retention cohorts, and feature adoption.', 'marketing-advertising', 3500, 13, 'Just now', 7056, 'today', 'amplitude.com', TRUE),
  ('p-marketing-advertising-14', 'June.so — Product analytics for B2B SaaS', 'https://june.so', 'https://www.google.com/s2/favicons?domain=june.so&sz=128', 'Auto-generated product metrics and company-level usage dashboards for founders.', 'marketing-advertising', 3200, 14, 'Just now', 7632, 'today', 'june.so', TRUE),
  ('p-marketing-advertising-15', 'Tapfiliate — Affiliate tracking software', 'https://tapfiliate.com', 'https://www.google.com/s2/favicons?domain=tapfiliate.com&sz=128', 'Create, track, and optimize your affiliate and referral marketing programs.', 'marketing-advertising', 2900, 15, 'Just now', 1969, 'today', 'tapfiliate.com', TRUE),
  ('p-marketing-advertising-16', 'Rewardful — Affiliate management for Stripe', 'https://rewardful.com', 'https://www.google.com/s2/favicons?domain=rewardful.com&sz=128', 'Launch an affiliate program for your SaaS business in minutes with instant Stripe sync.', 'marketing-advertising', 2600, 16, 'Just now', 2424, 'today', 'rewardful.com', TRUE),
  ('p-marketing-advertising-17', 'FirstPromoter — Affiliate marketing software for SaaS', 'https://firstpromoter.com', 'https://www.google.com/s2/favicons?domain=firstpromoter.com&sz=128', 'Track affiliate referral links, calculate commissions, and automate payout batches.', 'marketing-advertising', 2350, 17, 'Just now', 7408, 'today', 'firstpromoter.com', TRUE),
  ('p-marketing-advertising-18', 'Viral Loops — Referral marketing made easy', 'https://viral-loops.com', 'https://www.google.com/s2/favicons?domain=viral-loops.com&sz=128', 'Build viral referral campaigns, milestone giveaways, and pre-launch waitlists.', 'marketing-advertising', 2100, 18, 'Just now', 1491, 'today', 'viral-loops.com', TRUE),
  ('p-marketing-advertising-19', 'AdEspresso — Social ads management platform', 'https://adespresso.com', 'https://www.google.com/s2/favicons?domain=adespresso.com&sz=128', 'Create, analyze, and optimize Facebook and Instagram ad campaigns easily.', 'marketing-advertising', 1900, 19, 'Just now', 8189, 'today', 'adespresso.com', TRUE),
  ('p-marketing-advertising-20', 'Madgicx — Autonomous AI ad management', 'https://madgicx.com', 'https://www.google.com/s2/favicons?domain=madgicx.com&sz=128', 'AI-driven ad management and creative insights for Meta, Google, and TikTok ads.', 'marketing-advertising', 1700, 20, 'Just now', 8795, 'today', 'madgicx.com', TRUE),
  ('p-marketing-advertising-21', 'Triple Whale — Ecommerce operating system & attribution', 'https://triplewhale.com', 'https://www.google.com/s2/favicons?domain=triplewhale.com&sz=128', 'AI attribution, real-time blended ROAS tracking, and analytics for DTC brands.', 'marketing-advertising', 1500, 21, 'Just now', 4743, 'today', 'triplewhale.com', TRUE),
  ('p-marketing-advertising-22', 'Optimizely — Digital experience & A/B testing', 'https://optimizely.com', 'https://www.google.com/s2/favicons?domain=optimizely.com&sz=128', 'Enterprise experimentation platform for web testing, CMS, and feature management.', 'marketing-advertising', 1350, 22, 'Just now', 7637, 'today', 'optimizely.com', TRUE),
  ('p-marketing-advertising-23', 'VWO — Experience optimization and A/B testing', 'https://vwo.com', 'https://www.google.com/s2/favicons?domain=vwo.com&sz=128', 'Run conversion rate optimization experiments, heatmaps, and on-site surveys.', 'marketing-advertising', 1200, 23, 'Just now', 3993, 'today', 'vwo.com', TRUE),
  ('p-marketing-advertising-24', 'Unbounce — AI-powered landing page builder', 'https://unbounce.com', 'https://www.google.com/s2/favicons?domain=unbounce.com&sz=128', 'Create high-converting landing pages with AI copywriting and Smart Traffic routing.', 'marketing-advertising', 1050, 24, 'Just now', 8047, 'today', 'unbounce.com', TRUE),
  ('p-marketing-advertising-25', 'Leadpages — Lead generation landing page platform', 'https://leadpages.com', 'https://www.google.com/s2/favicons?domain=leadpages.com&sz=128', 'Build responsive landing pages, popups, and alert bars to turn clicks into customers.', 'marketing-advertising', 920, 25, 'Just now', 1905, 'today', 'leadpages.com', TRUE),
  ('p-marketing-advertising-26', 'Hotjar — Product experience insights & heatmaps', 'https://hotjar.com', 'https://www.google.com/s2/favicons?domain=hotjar.com&sz=128', 'Understand how visitors interact with your web app through heatmaps and recordings.', 'marketing-advertising', 800, 26, 'Just now', 1001, 'today', 'hotjar.com', TRUE),
  ('p-marketing-advertising-27', 'Clearbit — B2B data activation and enrichment', 'https://clearbit.com', 'https://www.google.com/s2/favicons?domain=clearbit.com&sz=128', 'Identify anonymous web traffic and enrich CRM leads with accurate firmographic data.', 'marketing-advertising', 700, 27, 'Just now', 7617, 'today', 'clearbit.com', TRUE),
  ('p-marketing-advertising-28', 'ConvertKit (Kit) — Creator marketing platform', 'https://kit.com', 'https://www.google.com/s2/favicons?domain=kit.com&sz=128', 'Grow your audience and monetize newsletter subscriptions with creator commerce tools.', 'marketing-advertising', 600, 28, 'Just now', 5655, 'today', 'kit.com', TRUE),
  ('p-marketing-advertising-29', 'Typeform — Interactive forms and quizzes', 'https://typeform.com', 'https://www.google.com/s2/favicons?domain=typeform.com&sz=128', 'Conversational forms, surveys, and quizzes that make data collection enjoyable.', 'marketing-advertising', 500, 29, 'Just now', 4826, 'today', 'typeform.com', TRUE),
  ('p-marketing-advertising-30', 'Tally — Free online form builder', 'https://tally.so', 'https://www.google.com/s2/favicons?domain=tally.so&sz=128', 'Create clean, modern forms without coding by simply typing like a Notion doc.', 'marketing-advertising', 400, 30, 'Just now', 8570, 'today', 'tally.so', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Crypto, Web3 & Investing (crypto-web3-investing) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-5', 'crypto-web3-investing', 'Crypto, Web3 & Investing', 'Coins', 30, NULL, 92136, 12716, 'Just now', 'DeFi protocols, neobanks, memecoins, trading bots, and portfolio trackers.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-crypto-web3-investing-1', 'Orynth - List your product and earn on Web3', 'https://orynth.xyz', 'https://www.google.com/s2/favicons?domain=orynth.xyz&sz=128', 'List your Web3 product, discover vetted alpha, and monetize high-intent clicks.', 'crypto-web3-investing', 12716, 1, 'Just now', 3492, 'today', 'orynth.xyz', TRUE),
  ('p-crypto-web3-investing-2', 'Fiber – Stablecoin Neobank for Global Teams', 'https://fiber.co', 'https://www.google.com/s2/favicons?domain=fiber.co&sz=128', 'Instant cross-border US dollar payouts powered by Solana and Ethereum stablecoins.', 'crypto-web3-investing', 10400, 2, 'Just now', 7223, 'today', 'fiber.co', TRUE),
  ('p-crypto-web3-investing-3', 'Uniswap — Decentralized crypto trading protocol', 'https://uniswap.org', 'https://www.google.com/s2/favicons?domain=uniswap.org&sz=128', 'Swap, earn, and build on the leading decentralized cryptocurrency exchange protocol.', 'crypto-web3-investing', 8900, 3, 'Just now', 7062, 'today', 'uniswap.org', TRUE),
  ('p-crypto-web3-investing-4', 'Aave — Open source liquidity protocol', 'https://aave.com', 'https://www.google.com/s2/favicons?domain=aave.com&sz=128', 'Earn interest, borrow assets, and build applications on decentralized non-custodial markets.', 'crypto-web3-investing', 7600, 4, 'Just now', 6147, 'today', 'aave.com', TRUE),
  ('p-crypto-web3-investing-5', 'Phantom — The crypto wallet for Solana and Ethereum', 'https://phantom.app', 'https://www.google.com/s2/favicons?domain=phantom.app&sz=128', 'Friendly multi-chain self-custody wallet for DeFi, NFTs, and tokens.', 'crypto-web3-investing', 6500, 5, 'Just now', 8544, 'today', 'phantom.app', TRUE),
  ('p-crypto-web3-investing-6', 'Coinbase Developer Platform — Web3 APIs and SDKs', 'https://coinbase.com/developer-platform', 'https://www.google.com/s2/favicons?domain=coinbase.com/developer-platform&sz=128', 'Onramp, smart wallet SDK, and MPC custody infrastructure for crypto builders.', 'crypto-web3-investing', 5600, 6, 'Just now', 3928, 'today', 'coinbase.com/developer-platform', TRUE),
  ('p-crypto-web3-investing-7', 'Etherscan — Ethereum blockchain explorer & analytics', 'https://etherscan.io', 'https://www.google.com/s2/favicons?domain=etherscan.io&sz=128', 'Inspect smart contracts, verify token transactions, and track gas prices in real-time.', 'crypto-web3-investing', 4800, 7, 'Just now', 3590, 'today', 'etherscan.io', TRUE),
  ('p-crypto-web3-investing-8', 'DEXScreener — Real-time DEX charts and transaction stream', 'https://dexscreener.com', 'https://www.google.com/s2/favicons?domain=dexscreener.com&sz=128', 'Track decentralized token pairs, volume surges, and liquidity pools across 80+ chains.', 'crypto-web3-investing', 4200, 8, 'Just now', 3514, 'today', 'dexscreener.com', TRUE),
  ('p-crypto-web3-investing-9', 'DefiLlama — Open and transparent DeFi TVL analytics', 'https://defillama.com', 'https://www.google.com/s2/favicons?domain=defillama.com&sz=128', 'Comprehensive multi-chain total value locked tracker, revenue metrics, and yield rankings.', 'crypto-web3-investing', 3700, 9, 'Just now', 7576, 'today', 'defillama.com', TRUE),
  ('p-crypto-web3-investing-10', 'Privy — Simple authentication for Web3 apps', 'https://privy.io', 'https://www.google.com/s2/favicons?domain=privy.io&sz=128', 'Onboard mainstream users into Web3 with embedded self-custodial wallets and social logins.', 'crypto-web3-investing', 3300, 10, 'Just now', 6090, 'today', 'privy.io', TRUE),
  ('p-crypto-web3-investing-11', 'Metamask — Self-custody crypto wallet and gateway', 'https://metamask.io', 'https://www.google.com/s2/favicons?domain=metamask.io&sz=128', 'Access blockchain dApps, swap tokens, and manage digital identities securely.', 'crypto-web3-investing', 2950, 11, 'Just now', 5454, 'today', 'metamask.io', TRUE),
  ('p-crypto-web3-investing-12', 'Jupiter — Key liquidity aggregator on Solana', 'https://jup.ag', 'https://www.google.com/s2/favicons?domain=jup.ag&sz=128', 'Execute trades with zero price impact routing across all Solana liquidity pools.', 'crypto-web3-investing', 2650, 12, 'Just now', 6962, 'today', 'jup.ag', TRUE),
  ('p-crypto-web3-investing-13', 'Raydium — On-chain order book AMM on Solana', 'https://raydium.io', 'https://www.google.com/s2/favicons?domain=raydium.io&sz=128', 'Next-generation automated market maker powering lightning-fast token swaps on Solana.', 'crypto-web3-investing', 2400, 13, 'Just now', 3985, 'today', 'raydium.io', TRUE),
  ('p-crypto-web3-investing-14', 'Rainbow — Delightful Ethereum & Layer 2 wallet', 'https://rainbow.me', 'https://www.google.com/s2/favicons?domain=rainbow.me&sz=128', 'Fun, simple, and secure mobile and browser wallet for exploring Web3 and collecting NFTs.', 'crypto-web3-investing', 2150, 14, 'Just now', 7549, 'today', 'rainbow.me', TRUE),
  ('p-crypto-web3-investing-15', 'Zerion — Smart Web3 portfolio tracker & wallet', 'https://zerion.io', 'https://www.google.com/s2/favicons?domain=zerion.io&sz=128', 'Track all your DeFi positions, NFTs, and historical transactions across 15+ chains.', 'crypto-web3-investing', 1900, 15, 'Just now', 7594, 'today', 'zerion.io', TRUE),
  ('p-crypto-web3-investing-16', 'Debank — The Web3 messenger & DeFi portfolio tracker', 'https://debank.com', 'https://www.google.com/s2/favicons?domain=debank.com&sz=128', 'Track wallet balances, follow whale wallets, and send web3 direct messages.', 'crypto-web3-investing', 1700, 16, 'Just now', 958, 'today', 'debank.com', TRUE),
  ('p-crypto-web3-investing-17', 'Alchemy — Web3 developer platform & node APIs', 'https://alchemy.com', 'https://www.google.com/s2/favicons?domain=alchemy.com&sz=128', 'Supercharged blockchain APIs, node infrastructure, and developer tooling for Ethereum & Solana.', 'crypto-web3-investing', 1500, 17, 'Just now', 7541, 'today', 'alchemy.com', TRUE),
  ('p-crypto-web3-investing-18', 'Infura — Blockchain infrastructure for developers', 'https://infura.io', 'https://www.google.com/s2/favicons?domain=infura.io&sz=128', 'Instant access over HTTPS and WebSockets to Ethereum, IPFS, and layer 2 networks.', 'crypto-web3-investing', 1350, 18, 'Just now', 2227, 'today', 'infura.io', TRUE),
  ('p-crypto-web3-investing-19', 'Thirdweb — Complete full-stack web3 development kit', 'https://thirdweb.com', 'https://www.google.com/s2/favicons?domain=thirdweb.com&sz=128', 'Smart contracts, account abstraction, fiat on-ramps, and auth SDKs for modern apps.', 'crypto-web3-investing', 1200, 19, 'Just now', 3012, 'today', 'thirdweb.com', TRUE),
  ('p-crypto-web3-investing-20', 'OpenSea — The world’s first and largest digital marketplace', 'https://opensea.io', 'https://www.google.com/s2/favicons?domain=opensea.io&sz=128', 'Discover, collect, and sell non-fungible tokens (NFTs) across Ethereum, Polygon, and Solana.', 'crypto-web3-investing', 1080, 20, 'Just now', 7694, 'today', 'opensea.io', TRUE),
  ('p-crypto-web3-investing-21', 'Magic Eden — Multi-chain NFT marketplace', 'https://magiceden.io', 'https://www.google.com/s2/favicons?domain=magiceden.io&sz=128', 'Trade gaming assets, digital art, and Ordinals across Solana, Bitcoin, and Ethereum.', 'crypto-web3-investing', 960, 21, 'Just now', 1375, 'today', 'magiceden.io', TRUE),
  ('p-crypto-web3-investing-22', 'Pyth Network — First-party financial oracle network', 'https://pyth.network', 'https://www.google.com/s2/favicons?domain=pyth.network&sz=128', 'Deliver low-latency price feeds from institutional traders directly to smart contracts.', 'crypto-web3-investing', 850, 22, 'Just now', 1438, 'today', 'pyth.network', TRUE),
  ('p-crypto-web3-investing-23', 'Chainlink — Decentralized oracle network', 'https://chain.link', 'https://www.google.com/s2/favicons?domain=chain.link&sz=128', 'Connect smart contracts to real-world data, off-chain computation, and cross-chain messaging.', 'crypto-web3-investing', 750, 23, 'Just now', 1729, 'today', 'chain.link', TRUE),
  ('p-crypto-web3-investing-24', 'Lido — Liquidity staking for Ethereum', 'https://lido.fi', 'https://www.google.com/s2/favicons?domain=lido.fi&sz=128', 'Stake ETH without locking assets to earn daily staking rewards while maintaining liquidity.', 'crypto-web3-investing', 650, 24, 'Just now', 1419, 'today', 'lido.fi', TRUE),
  ('p-crypto-web3-investing-25', 'Curve Finance — Deep on-chain liquidity for stablecoins', 'https://curve.fi', 'https://www.google.com/s2/favicons?domain=curve.fi&sz=128', 'Decentralized exchange liquidity pool designed for extremely efficient stablecoin trading.', 'crypto-web3-investing', 560, 25, 'Just now', 6868, 'today', 'curve.fi', TRUE),
  ('p-crypto-web3-investing-26', 'MakerDAO (Sky) — Decentralized stablecoin protocol', 'https://makerdao.com', 'https://www.google.com/s2/favicons?domain=makerdao.com&sz=128', 'Generate USDS/DAI against crypto collateral without intermediaries.', 'crypto-web3-investing', 480, 26, 'Just now', 4429, 'today', 'makerdao.com', TRUE),
  ('p-crypto-web3-investing-27', '1inch Network — Leading DeFi aggregator', 'https://1inch.io', 'https://www.google.com/s2/favicons?domain=1inch.io&sz=128', 'Split trades across multiple decentralized exchanges to find the best swap rates and gas fees.', 'crypto-web3-investing', 410, 27, 'Just now', 4682, 'today', '1inch.io', TRUE),
  ('p-crypto-web3-investing-28', 'GMX — Decentralized perpetual exchange', 'https://gmx.io', 'https://www.google.com/s2/favicons?domain=gmx.io&sz=128', 'Trade BTC, ETH, and other top cryptos with up to 50x leverage directly from your wallet.', 'crypto-web3-investing', 350, 28, 'Just now', 6029, 'today', 'gmx.io', TRUE),
  ('p-crypto-web3-investing-29', 'Hyperliquid — L1 decentralized perpetual exchange', 'https://hyperliquid.xyz', 'https://www.google.com/s2/favicons?domain=hyperliquid.xyz&sz=128', 'High-performance bespoke Layer 1 blockchain optimized for order-book derivatives.', 'crypto-web3-investing', 290, 29, 'Just now', 2076, 'today', 'hyperliquid.xyz', TRUE),
  ('p-crypto-web3-investing-30', 'CoinGecko — Cryptocurrency prices and market cap', 'https://coingecko.com', 'https://www.google.com/s2/favicons?domain=coingecko.com&sz=128', 'Independent cryptocurrency data aggregator tracking prices, trading volume, and social metrics.', 'crypto-web3-investing', 240, 30, 'Just now', 3057, 'today', 'coingecko.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Developer Tools (developer-tools) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-6', 'developer-tools', 'Developer Tools', 'Code', 30, NULL, 100800, 13560, 'Just now', 'APIs, SDKs, scrapers, terminal tools, IDE extensions and CI/CD pipelines.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-developer-tools-1', 'Supabase | The Open Source Firebase Alternative', 'https://supabase.com', 'https://www.google.com/s2/favicons?domain=supabase.com&sz=128', 'Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.', 'developer-tools', 13560, 1, 'Just now', 7291, 'today', 'supabase.com', TRUE),
  ('p-developer-tools-2', 'Resend — Email for developers', 'https://resend.com', 'https://www.google.com/s2/favicons?domain=resend.com&sz=128', 'The best API to reach humans instead of spam folders. Build, test, and deliver transactional emails.', 'developer-tools', 11200, 2, 'Just now', 7686, 'today', 'resend.com', TRUE),
  ('p-developer-tools-3', 'Postman — API platform for building and using APIs', 'https://postman.com', 'https://www.google.com/s2/favicons?domain=postman.com&sz=128', 'Design, test, document, and mock APIs collaboratively across global engineering teams.', 'developer-tools', 9600, 3, 'Just now', 3318, 'today', 'postman.com', TRUE),
  ('p-developer-tools-4', 'Vercel — Frontend cloud platform', 'https://vercel.com', 'https://www.google.com/s2/favicons?domain=vercel.com&sz=128', 'Develop, preview, and ship delightful user experiences with edge infrastructure.', 'developer-tools', 8400, 4, 'Just now', 2411, 'today', 'vercel.com', TRUE),
  ('p-developer-tools-5', 'Railway — Instant app deployment and databases', 'https://railway.app', 'https://www.google.com/s2/favicons?domain=railway.app&sz=128', 'Provision infrastructure, deploy web services, and manage scalable cloud databases effortlessly.', 'developer-tools', 7300, 5, 'Just now', 2301, 'today', 'railway.app', TRUE),
  ('p-developer-tools-6', 'Neon — Serverless Postgres database', 'https://neon.tech', 'https://www.google.com/s2/favicons?domain=neon.tech&sz=128', 'Serverless Postgres with autoscaling, bottomless storage, and instant branch-per-PR workflows.', 'developer-tools', 6400, 6, 'Just now', 2472, 'today', 'neon.tech', TRUE),
  ('p-developer-tools-7', 'Clerk — Complete user management and authentication', 'https://clerk.com', 'https://www.google.com/s2/favicons?domain=clerk.com&sz=128', 'Drop-in React authentication components, social logins, and multi-tenant organization support.', 'developer-tools', 5600, 7, 'Just now', 6816, 'today', 'clerk.com', TRUE),
  ('p-developer-tools-8', 'Inngest — Event-driven background jobs for TypeScript', 'https://inngest.com', 'https://www.google.com/s2/favicons?domain=inngest.com&sz=128', 'Write serverless background queues, scheduled cron jobs, and durable multi-step workflows.', 'developer-tools', 4900, 8, 'Just now', 7013, 'today', 'inngest.com', TRUE),
  ('p-developer-tools-9', 'Upstash — Serverless Redis, Kafka, and Vector', 'https://upstash.com', 'https://www.google.com/s2/favicons?domain=upstash.com&sz=128', 'Low-latency serverless data services with per-request pricing and edge REST APIs.', 'developer-tools', 4300, 9, 'Just now', 5657, 'today', 'upstash.com', TRUE),
  ('p-developer-tools-10', 'Axiom — Zero-config logging and observability', 'https://axiom.co', 'https://www.google.com/s2/favicons?domain=axiom.co&sz=128', 'Serverless log management and real-time query analytics designed for modern cloud stacks.', 'developer-tools', 3800, 10, 'Just now', 2419, 'today', 'axiom.co', TRUE),
  ('p-developer-tools-11', 'Sentry — Application performance monitoring & error tracking', 'https://sentry.io', 'https://www.google.com/s2/favicons?domain=sentry.io&sz=128', 'Real-time error tracking and performance insights across frontend, backend, and mobile apps.', 'developer-tools', 3400, 11, 'Just now', 7943, 'today', 'sentry.io', TRUE),
  ('p-developer-tools-12', 'Tailwind CSS — Rapidly build modern websites', 'https://tailwindcss.com', 'https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=128', 'A utility-first CSS framework packed with classes that can be composed to build any design.', 'developer-tools', 3000, 12, 'Just now', 2970, 'today', 'tailwindcss.com', TRUE),
  ('p-developer-tools-13', 'Linear — The issue tracker you will actually enjoy using', 'https://linear.app', 'https://www.google.com/s2/favicons?domain=linear.app&sz=128', 'Purpose-built tool for modern software teams to manage sprint cycles and roadmaps.', 'developer-tools', 2600, 13, 'Just now', 5057, 'today', 'linear.app', TRUE),
  ('p-developer-tools-14', 'Prisma — Next-generation Node.js and TypeScript ORM', 'https://prisma.io', 'https://www.google.com/s2/favicons?domain=prisma.io&sz=128', 'Type-safe database client, automated migrations, and visual data inspection studio.', 'developer-tools', 2200, 14, 'Just now', 2800, 'today', 'prisma.io', TRUE),
  ('p-developer-tools-15', 'PostHog — Product analytics suite', 'https://posthog.com', 'https://www.google.com/s2/favicons?domain=posthog.com&sz=128', 'All-in-one product analytics, session replay, feature flags, and A/B testing.', 'developer-tools', 1900, 15, 'Just now', 8734, 'today', 'posthog.com', TRUE),
  ('p-developer-tools-16', 'Drizzle ORM — Lightweight TypeScript ORM', 'https://orm.drizzle.team', 'https://www.google.com/s2/favicons?domain=orm.drizzle.team&sz=128', 'Blazing-fast, type-safe SQL query builder and ORM with zero dependencies.', 'developer-tools', 1700, 16, 'Just now', 8441, 'today', 'orm.drizzle.team', TRUE),
  ('p-developer-tools-17', 'Turso — SQLite for production at the edge', 'https://turso.tech', 'https://www.google.com/s2/favicons?domain=turso.tech&sz=128', 'Distributed database powered by libSQL designed for microsecond global queries.', 'developer-tools', 1500, 17, 'Just now', 6381, 'today', 'turso.tech', TRUE),
  ('p-developer-tools-18', 'Render — Unified cloud to build and run apps', 'https://render.com', 'https://www.google.com/s2/favicons?domain=render.com&sz=128', 'Fastest way to host web apps, static sites, Docker containers, and cron jobs.', 'developer-tools', 1350, 18, 'Just now', 5671, 'today', 'render.com', TRUE),
  ('p-developer-tools-19', 'Fly.io — Deploy app servers close to your users', 'https://fly.io', 'https://www.google.com/s2/favicons?domain=fly.io&sz=128', 'Run full-stack apps and databases in physical regions worldwide with microVMs.', 'developer-tools', 1200, 19, 'Just now', 8700, 'today', 'fly.io', TRUE),
  ('p-developer-tools-20', 'GitHub — Where the world builds software', 'https://github.com', 'https://www.google.com/s2/favicons?domain=github.com&sz=128', 'Complete developer platform to build, scale, and deliver software with GitHub Actions & Copilot.', 'developer-tools', 1080, 20, 'Just now', 5844, 'today', 'github.com', TRUE),
  ('p-developer-tools-21', 'GitLab — The DevSecOps platform', 'https://gitlab.com', 'https://www.google.com/s2/favicons?domain=gitlab.com&sz=128', 'Single application for the entire software development lifecycle from planning to CI/CD.', 'developer-tools', 960, 21, 'Just now', 3801, 'today', 'gitlab.com', TRUE),
  ('p-developer-tools-22', 'Docker — Accelerated container application development', 'https://docker.com', 'https://www.google.com/s2/favicons?domain=docker.com&sz=128', 'Containerize and run applications consistently across any development and cloud environment.', 'developer-tools', 860, 22, 'Just now', 1162, 'today', 'docker.com', TRUE),
  ('p-developer-tools-23', 'Turborepo — High-performance build system for JavaScript', 'https://turbo.build', 'https://www.google.com/s2/favicons?domain=turbo.build&sz=128', 'Scale monorepos effortlessly with remote caching and parallel task pipelines.', 'developer-tools', 760, 23, 'Just now', 4990, 'today', 'turbo.build', TRUE),
  ('p-developer-tools-24', 'Biome — Fast formatter and linter for JavaScript', 'https://biomejs.dev', 'https://www.google.com/s2/favicons?domain=biomejs.dev&sz=128', 'One toolchain for web projects to format and lint JavaScript, TypeScript, and JSON in milliseconds.', 'developer-tools', 670, 24, 'Just now', 2848, 'today', 'biomejs.dev', TRUE),
  ('p-developer-tools-25', 'Astro — The web framework for content-driven sites', 'https://astro.build', 'https://www.google.com/s2/favicons?domain=astro.build&sz=128', 'Deliver faster websites with zero JavaScript by default and Islands architecture.', 'developer-tools', 590, 25, 'Just now', 2948, 'today', 'astro.build', TRUE),
  ('p-developer-tools-26', 'Next.js by Vercel — The React Framework for the Web', 'https://nextjs.org', 'https://www.google.com/s2/favicons?domain=nextjs.org&sz=128', 'Server-side rendering, static site generation, and Edge functions for React.', 'developer-tools', 520, 26, 'Just now', 7522, 'today', 'nextjs.org', TRUE),
  ('p-developer-tools-27', 'Nuxt — The intuitive Vue Framework', 'https://nuxt.com', 'https://www.google.com/s2/favicons?domain=nuxt.com&sz=128', 'Performant full-stack Vue.js applications with automated routing and SSR.', 'developer-tools', 450, 27, 'Just now', 4350, 'today', 'nuxt.com', TRUE),
  ('p-developer-tools-28', 'SvelteKit — Rapid web development framework', 'https://svelte.dev', 'https://www.google.com/s2/favicons?domain=svelte.dev&sz=128', 'Cybernetically enhanced web apps with minimal boilerplate and compiling.', 'developer-tools', 390, 28, 'Just now', 1721, 'today', 'svelte.dev', TRUE),
  ('p-developer-tools-29', 'Bun — Fast all-in-one JavaScript runtime', 'https://bun.sh', 'https://www.google.com/s2/favicons?domain=bun.sh&sz=128', 'Develop, test, run, and bundle JavaScript & TypeScript projects at native speed.', 'developer-tools', 330, 29, 'Just now', 7311, 'today', 'bun.sh', TRUE),
  ('p-developer-tools-30', 'Trigger.dev — Background jobs framework for TypeScript', 'https://trigger.dev', 'https://www.google.com/s2/favicons?domain=trigger.dev&sz=128', 'Write long-running background jobs directly in your codebase with zero server timeouts.', 'developer-tools', 280, 30, 'Just now', 5061, 'today', 'trigger.dev', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Security, Privacy & Compliance (security-privacy-compliance) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-7', 'security-privacy-compliance', 'Security, Privacy & Compliance', 'Shield', 30, NULL, 74360, 10000, 'Just now', 'SOC2 automation, penetration testing, privacy agents and IAM.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-security-privacy-compliance-1', '1Password — Password manager and secret management', 'https://1password.com', 'https://www.google.com/s2/favicons?domain=1password.com&sz=128', 'Enterprise password security, SSH key management, and developer CLI secrets.', 'security-privacy-compliance', 10000, 1, 'Just now', 6274, 'today', '1password.com', TRUE),
  ('p-security-privacy-compliance-2', 'Snyk — Developer security platform', 'https://snyk.io', 'https://www.google.com/s2/favicons?domain=snyk.io&sz=128', 'Find and fix vulnerabilities in code, open source dependencies, containers, and IaC.', 'security-privacy-compliance', 8400, 2, 'Just now', 8307, 'today', 'snyk.io', TRUE),
  ('p-security-privacy-compliance-3', 'CrowdStrike Falcon — Cybersecurity endpoint protection', 'https://crowdstrike.com', 'https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128', 'Cloud-native endpoint protection, threat intelligence, and automated incident response.', 'security-privacy-compliance', 7100, 3, 'Just now', 7617, 'today', 'crowdstrike.com', TRUE),
  ('p-security-privacy-compliance-4', 'Cloudflare Zero Trust — Secure access service edge', 'https://cloudflare.com', 'https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128', 'Replace legacy VPNs with fast identity-based access to internal apps and SaaS tools.', 'security-privacy-compliance', 6100, 4, 'Just now', 8110, 'today', 'cloudflare.com', TRUE),
  ('p-security-privacy-compliance-5', 'Wiz — Cloud security and risk management', 'https://wiz.io', 'https://www.google.com/s2/favicons?domain=wiz.io&sz=128', 'Scan full-stack cloud environments without agents to discover critical attack paths.', 'security-privacy-compliance', 5300, 5, 'Just now', 5893, 'today', 'wiz.io', TRUE),
  ('p-security-privacy-compliance-6', 'Tails — Private operating system', 'https://tails.net', 'https://www.google.com/s2/favicons?domain=tails.net&sz=128', 'Portable operating system that protects against surveillance and censorship using Tor.', 'security-privacy-compliance', 4600, 6, 'Just now', 5476, 'today', 'tails.net', TRUE),
  ('p-security-privacy-compliance-7', 'Proton Mail — Secure private email based in Switzerland', 'https://proton.me', 'https://www.google.com/s2/favicons?domain=proton.me&sz=128', 'End-to-end encrypted email, calendar, drive, and VPN protecting your privacy.', 'security-privacy-compliance', 4000, 7, 'Just now', 8722, 'today', 'proton.me', TRUE),
  ('p-security-privacy-compliance-8', 'Bitwarden — Open source password manager', 'https://bitwarden.com', 'https://www.google.com/s2/favicons?domain=bitwarden.com&sz=128', 'Secure passwords and sensitive credentials with transparent open-source encryption.', 'security-privacy-compliance', 3500, 8, 'Just now', 1273, 'today', 'bitwarden.com', TRUE),
  ('p-security-privacy-compliance-9', 'HackerOne — Bug bounty and vulnerability disclosure', 'https://hackerone.com', 'https://www.google.com/s2/favicons?domain=hackerone.com&sz=128', 'Connect with elite ethical hackers to discover critical security vulnerabilities.', 'security-privacy-compliance', 3100, 9, 'Just now', 3200, 'today', 'hackerone.com', TRUE),
  ('p-security-privacy-compliance-10', 'GitGuardian — Automated secrets detection for developers', 'https://gitguardian.com', 'https://www.google.com/s2/favicons?domain=gitguardian.com&sz=128', 'Scan public and private code repositories in real-time for leaked API keys and credentials.', 'security-privacy-compliance', 2750, 10, 'Just now', 3304, 'today', 'gitguardian.com', TRUE),
  ('p-security-privacy-compliance-11', 'NordVPN — Fast and secure VPN service', 'https://nordvpn.com', 'https://www.google.com/s2/favicons?domain=nordvpn.com&sz=128', 'Encrypt internet connection, shield IP address, and protect web browsing on all devices.', 'security-privacy-compliance', 2450, 11, 'Just now', 1300, 'today', 'nordvpn.com', TRUE),
  ('p-security-privacy-compliance-12', 'Mullvad VPN — Privacy-first VPN without accounts', 'https://mullvad.net', 'https://www.google.com/s2/favicons?domain=mullvad.net&sz=128', 'Zero logging policy, wireguard tunnels, and anonymous cash/crypto payment options.', 'security-privacy-compliance', 2200, 12, 'Just now', 6648, 'today', 'mullvad.net', TRUE),
  ('p-security-privacy-compliance-13', 'Telesign — Identity verification and phone scoring', 'https://telesign.com', 'https://www.google.com/s2/favicons?domain=telesign.com&sz=128', 'Prevent fraud and bot account creation with global SMS OTP and risk scoring.', 'security-privacy-compliance', 1950, 13, 'Just now', 1302, 'today', 'telesign.com', TRUE),
  ('p-security-privacy-compliance-14', 'Auth0 by Okta — Universal identity platform', 'https://auth0.com', 'https://www.google.com/s2/favicons?domain=auth0.com&sz=128', 'Authentication and authorization platform for web, mobile, and legacy applications.', 'security-privacy-compliance', 1750, 14, 'Just now', 4470, 'today', 'auth0.com', TRUE),
  ('p-security-privacy-compliance-15', 'Okta — Enterprise identity and access management', 'https://okta.com', 'https://www.google.com/s2/favicons?domain=okta.com&sz=128', 'Single sign-on (SSO), multi-factor authentication, and workforce identity management.', 'security-privacy-compliance', 1550, 15, 'Just now', 2096, 'today', 'okta.com', TRUE),
  ('p-security-privacy-compliance-16', 'Tailscale — Zero config mesh VPN built on WireGuard', 'https://tailscale.com', 'https://www.google.com/s2/favicons?domain=tailscale.com&sz=128', 'Securely connect all your computers, servers, and cloud resources in minutes.', 'security-privacy-compliance', 1380, 16, 'Just now', 7474, 'today', 'tailscale.com', TRUE),
  ('p-security-privacy-compliance-17', 'Doppler — SecretOps and environment variable manager', 'https://doppler.com', 'https://www.google.com/s2/favicons?domain=doppler.com&sz=128', 'Centralize and sync API keys, secrets, and environment configs across all teams and clouds.', 'security-privacy-compliance', 1220, 17, 'Just now', 8020, 'today', 'doppler.com', TRUE),
  ('p-security-privacy-compliance-18', 'Infisical — Open source secret management platform', 'https://infisical.com', 'https://www.google.com/s2/favicons?domain=infisical.com&sz=128', 'End-to-end encrypted secret management with SDKs and Kubernetes operators.', 'security-privacy-compliance', 1080, 18, 'Just now', 2706, 'today', 'infisical.com', TRUE),
  ('p-security-privacy-compliance-19', 'Twingate — Modern zero trust network access', 'https://twingate.com', 'https://www.google.com/s2/favicons?domain=twingate.com&sz=128', 'Replace corporate VPNs with lightning-fast least-privilege resource access.', 'security-privacy-compliance', 950, 19, 'Just now', 2942, 'today', 'twingate.com', TRUE),
  ('p-security-privacy-compliance-20', 'Bugcrowd — Crowdsourced cybersecurity platform', 'https://bugcrowd.com', 'https://www.google.com/s2/favicons?domain=bugcrowd.com&sz=128', 'Connect with top security researchers for penetration testing and bug bounties.', 'security-privacy-compliance', 840, 20, 'Just now', 8047, 'today', 'bugcrowd.com', TRUE),
  ('p-security-privacy-compliance-21', 'KeePassXC — Cross-platform community password manager', 'https://keepassxc.org', 'https://www.google.com/s2/favicons?domain=keepassxc.org&sz=128', 'Free, offline, open-source password database encrypted with AES-256.', 'security-privacy-compliance', 740, 21, 'Just now', 2811, 'today', 'keepassxc.org', TRUE),
  ('p-security-privacy-compliance-22', 'SimpleLogin — Protect your email address with aliases', 'https://simplelogin.io', 'https://www.google.com/s2/favicons?domain=simplelogin.io&sz=128', 'Generate disposable email aliases to prevent inbox tracking and spam leaks.', 'security-privacy-compliance', 650, 22, 'Just now', 7409, 'today', 'simplelogin.io', TRUE),
  ('p-security-privacy-compliance-23', 'AnonAddy (addy.io) — Anonymous email forwarding', 'https://addy.io', 'https://www.google.com/s2/favicons?domain=addy.io&sz=128', 'Create custom domain email aliases to protect your true identity across web services.', 'security-privacy-compliance', 570, 23, 'Just now', 3709, 'today', 'addy.io', TRUE),
  ('p-security-privacy-compliance-24', 'Cryptomator — Client-side cloud storage encryption', 'https://cryptomator.org', 'https://www.google.com/s2/favicons?domain=cryptomator.org&sz=128', 'Encrypt files on Dropbox, Google Drive, or iCloud before uploading.', 'security-privacy-compliance', 490, 24, 'Just now', 3189, 'today', 'cryptomator.org', TRUE),
  ('p-security-privacy-compliance-25', 'Yubico — YubiKey hardware security keys', 'https://yubico.com', 'https://www.google.com/s2/favicons?domain=yubico.com&sz=128', 'Hardware two-factor authentication tokens protecting against phishing attacks.', 'security-privacy-compliance', 420, 25, 'Just now', 3862, 'today', 'yubico.com', TRUE),
  ('p-security-privacy-compliance-26', 'Have I Been Pwned — Data breach alert database', 'https://haveibeenpwned.com', 'https://www.google.com/s2/favicons?domain=haveibeenpwned.com&sz=128', 'Check if your email or passwords were exposed in commercial data compromises.', 'security-privacy-compliance', 360, 26, 'Just now', 1643, 'today', 'haveibeenpwned.com', TRUE),
  ('p-security-privacy-compliance-27', 'Pi-hole — Network-wide ad and tracker blocking', 'https://pi-hole.net', 'https://www.google.com/s2/favicons?domain=pi-hole.net&sz=128', 'Black-hole DNS server protecting home networks from ads and telemetry trackers.', 'security-privacy-compliance', 300, 27, 'Just now', 4531, 'today', 'pi-hole.net', TRUE),
  ('p-security-privacy-compliance-28', 'AdGuard — The ultimate ad blocker and privacy suite', 'https://adguard.com', 'https://www.google.com/s2/favicons?domain=adguard.com&sz=128', 'Block intrusive ads, banners, video popups, and tracking scripts system-wide.', 'security-privacy-compliance', 250, 28, 'Just now', 1990, 'today', 'adguard.com', TRUE),
  ('p-security-privacy-compliance-29', 'Brave Browser — Private, fast & secure web browser', 'https://brave.com', 'https://www.google.com/s2/favicons?domain=brave.com&sz=128', 'Built-in shields that block third-party trackers, fingerprints, and intrusive ads.', 'security-privacy-compliance', 200, 29, 'Just now', 5988, 'today', 'brave.com', TRUE),
  ('p-security-privacy-compliance-30', 'Tor Project — Defend yourself against tracking and surveillance', 'https://torproject.org', 'https://www.google.com/s2/favicons?domain=torproject.org&sz=128', 'Free and open-source software enabling anonymous communication over onion routing.', 'security-privacy-compliance', 160, 30, 'Just now', 2521, 'today', 'torproject.org', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Health, Fitness & Wellness (health-fitness-wellness) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-8', 'health-fitness-wellness', 'Health, Fitness & Wellness', 'HeartPulse', 30, NULL, 23622, 3500, 'Just now', 'Calorie loggers, workout trackers, peptide price index and mental health.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-health-fitness-wellness-1', 'Whoop — Human performance and recovery tracker', 'https://whoop.com', 'https://www.google.com/s2/favicons?domain=whoop.com&sz=128', 'Wearable band tracking physiological recovery, strain, sleep stages, and heart rate variability.', 'health-fitness-wellness', 3500, 1, 'Just now', 8888, 'today', 'whoop.com', TRUE),
  ('p-health-fitness-wellness-2', 'Oura Ring — Smart ring for sleep and wellness', 'https://ouraring.com', 'https://www.google.com/s2/favicons?domain=ouraring.com&sz=128', 'Discreet titanium ring providing accurate sleep scores, readiness, and temperature monitoring.', 'health-fitness-wellness', 2900, 2, 'Just now', 2218, 'today', 'ouraring.com', TRUE),
  ('p-health-fitness-wellness-3', 'Levels — Continuous glucose monitoring (CGM)', 'https://levels.com', 'https://www.google.com/s2/favicons?domain=levels.com&sz=128', 'Real-time metabolic health tracking using continuous bio-wearable glucose sensors.', 'health-fitness-wellness', 2400, 3, 'Just now', 3955, 'today', 'levels.com', TRUE),
  ('p-health-fitness-wellness-4', 'Cronometer — Accurate nutrition tracking app', 'https://cronometer.com', 'https://www.google.com/s2/favicons?domain=cronometer.com&sz=128', 'Detailed micronutrient analysis, fasting timers, and biometrics correlation.', 'health-fitness-wellness', 2000, 4, 'Just now', 7033, 'today', 'cronometer.com', TRUE),
  ('p-health-fitness-wellness-5', 'Noom — Psychology-based weight management', 'https://noom.com', 'https://www.google.com/s2/favicons?domain=noom.com&sz=128', 'Cognitive behavioral psychology program for lasting weight loss and habit change.', 'health-fitness-wellness', 1700, 5, 'Just now', 4631, 'today', 'noom.com', TRUE),
  ('p-health-fitness-wellness-6', 'Apple Fitness+ — Personalized workout studio', 'https://apple.com', 'https://www.google.com/s2/favicons?domain=apple.com&sz=128', 'Guided HIIT, yoga, strength, and meditation workouts paired with Apple Watch metrics.', 'health-fitness-wellness', 1450, 6, 'Just now', 1959, 'today', 'apple.com', TRUE),
  ('p-health-fitness-wellness-7', 'Garmin Connect — Multisport fitness ecosystem', 'https://garmin.com', 'https://www.google.com/s2/favicons?domain=garmin.com&sz=128', 'Analyze endurance training loads, VO2 max, training readiness, and recovery metrics.', 'health-fitness-wellness', 1250, 7, 'Just now', 5360, 'today', 'garmin.com', TRUE),
  ('p-health-fitness-wellness-8', 'Fitbit — Health and wellness tracking', 'https://fitbit.com', 'https://www.google.com/s2/favicons?domain=fitbit.com&sz=128', 'Track daily steps, active zone minutes, sleep stages, and heart rate trends.', 'health-fitness-wellness', 1080, 8, 'Just now', 4913, 'today', 'fitbit.com', TRUE),
  ('p-health-fitness-wellness-9', 'Peloton — Interactive fitness platform', 'https://onepeloton.com', 'https://www.google.com/s2/favicons?domain=onepeloton.com&sz=128', 'Live and on-demand fitness classes streamed to connected exercise equipment.', 'health-fitness-wellness', 930, 9, 'Just now', 1777, 'today', 'onepeloton.com', TRUE),
  ('p-health-fitness-wellness-10', 'Hevy — Social gym workout tracker', 'https://hevy.com', 'https://www.google.com/s2/favicons?domain=hevy.com&sz=128', 'Log weightlifting routines, follow friends, and track personal record strength charts.', 'health-fitness-wellness', 800, 10, 'Just now', 4482, 'today', 'hevy.com', TRUE),
  ('p-health-fitness-wellness-11', 'Strava — The social network for athletes', 'https://strava.com', 'https://www.google.com/s2/favicons?domain=strava.com&sz=128', 'Track running, cycling, and hiking routes with GPS telemetry and segment leaderboards.', 'health-fitness-wellness', 720, 11, 'Just now', 1565, 'today', 'strava.com', TRUE),
  ('p-health-fitness-wellness-12', 'MyFitnessPal — Calorie counter and food tracker', 'https://myfitnesspal.com', 'https://www.google.com/s2/favicons?domain=myfitnesspal.com&sz=128', 'Log meals from a database of 14M+ foods, scan barcodes, and track macro goals.', 'health-fitness-wellness', 640, 12, 'Just now', 4024, 'today', 'myfitnesspal.com', TRUE),
  ('p-health-fitness-wellness-13', 'Headspace — Meditation and mindfulness app', 'https://headspace.com', 'https://www.google.com/s2/favicons?domain=headspace.com&sz=128', 'Guided meditations, sleep casts, and breathing exercises to reduce stress.', 'health-fitness-wellness', 570, 13, 'Just now', 7675, 'today', 'headspace.com', TRUE),
  ('p-health-fitness-wellness-14', 'Calm — Sleep, meditation and relaxation', 'https://calm.com', 'https://www.google.com/s2/favicons?domain=calm.com&sz=128', 'Sleep stories, ambient soundscapes, and mindfulness sessions voiced by celebrities.', 'health-fitness-wellness', 510, 14, 'Just now', 6181, 'today', 'calm.com', TRUE),
  ('p-health-fitness-wellness-15', 'Strong Workout Tracker — Gym log and planner', 'https://strong.app', 'https://www.google.com/s2/favicons?domain=strong.app&sz=128', 'Minimalist workout tracker to log gym sessions, barbell lifts, and progressive overload.', 'health-fitness-wellness', 450, 15, 'Just now', 2691, 'today', 'strong.app', TRUE),
  ('p-health-fitness-wellness-16', 'Zwift — Gamified indoor cycling and running', 'https://zwift.com', 'https://www.google.com/s2/favicons?domain=zwift.com&sz=128', 'Gamified indoor training platform connecting smart bike trainers with online multiplayer.', 'health-fitness-wellness', 400, 16, 'Just now', 1768, 'today', 'zwift.com', TRUE),
  ('p-health-fitness-wellness-17', 'Nike Run Club — Running coach and GPS tracker', 'https://nike.com', 'https://www.google.com/s2/favicons?domain=nike.com&sz=128', 'Audio-guided runs, pacing telemetry, and training plans for beginner to marathoners.', 'health-fitness-wellness', 350, 17, 'Just now', 2294, 'today', 'nike.com', TRUE),
  ('p-health-fitness-wellness-18', 'MacroFactor — Science-based macro and diet coach', 'https://macrofactorapp.com', 'https://www.google.com/s2/favicons?domain=macrofactorapp.com&sz=128', 'Smart expenditure algorithm that adjusts calorie targets based on your actual metabolism.', 'health-fitness-wellness', 310, 18, 'Just now', 5119, 'today', 'macrofactorapp.com', TRUE),
  ('p-health-fitness-wellness-19', 'Zero — Fasting tracker and health coach', 'https://zerolongevity.com', 'https://www.google.com/s2/favicons?domain=zerolongevity.com&sz=128', 'Intermittent fasting timer and metabolic health insights to optimize autophagy.', 'health-fitness-wellness', 270, 19, 'Just now', 4567, 'today', 'zerolongevity.com', TRUE),
  ('p-health-fitness-wellness-20', 'Eight Sleep — Smart mattress with temperature regulation', 'https://eightsleep.com', 'https://www.google.com/s2/favicons?domain=eightsleep.com&sz=128', 'Dual-zone cooling and heating pod that adjusts dynamically to your sleep stages.', 'health-fitness-wellness', 235, 20, 'Just now', 1476, 'today', 'eightsleep.com', TRUE),
  ('p-health-fitness-wellness-21', 'Athlytic — Workout strain and recovery for Apple Watch', 'https://athlyticapp.com', 'https://www.google.com/s2/favicons?domain=athlyticapp.com&sz=128', 'Turn Apple Watch HRV and sleep data into Whoop-style recovery and exertion scores.', 'health-fitness-wellness', 205, 21, 'Just now', 8659, 'today', 'athlyticapp.com', TRUE),
  ('p-health-fitness-wellness-22', 'Endel — Personalized soundscapes for focus & sleep', 'https://endel.io', 'https://www.google.com/s2/favicons?domain=endel.io&sz=128', 'AI-generated psychoacoustic sound environments synced to circadian rhythms.', 'health-fitness-wellness', 180, 22, 'Just now', 5406, 'today', 'endel.io', TRUE),
  ('p-health-fitness-wellness-23', 'Waking Up by Sam Harris — Meditation & theory', 'https://wakingup.com', 'https://www.google.com/s2/favicons?domain=wakingup.com&sz=128', 'Mindfulness course exploring consciousness, stoicism, and non-dual meditation.', 'health-fitness-wellness', 155, 23, 'Just now', 5885, 'today', 'wakingup.com', TRUE),
  ('p-health-fitness-wellness-24', 'Gymshark Training — Free gym workout routines', 'https://gymshark.com', 'https://www.google.com/s2/favicons?domain=gymshark.com&sz=128', 'Customizable workout plans and exercise libraries designed by elite fitness athletes.', 'health-fitness-wellness', 135, 24, 'Just now', 4020, 'today', 'gymshark.com', TRUE),
  ('p-health-fitness-wellness-25', 'Freeletics — AI bodyweight fitness trainer', 'https://freeletics.com', 'https://www.google.com/s2/favicons?domain=freeletics.com&sz=128', 'Personalized HIIT bodyweight workouts that adapt to your fitness level anywhere.', 'health-fitness-wellness', 115, 25, 'Just now', 2420, 'today', 'freeletics.com', TRUE),
  ('p-health-fitness-wellness-26', 'Superset Health — AI health coach for Apple Watch', 'https://supersethealth.com', 'https://www.google.com/s2/favicons?domain=supersethealth.com&sz=128', 'Actionable health metrics, strain scores, and sleep performance recommendations.', 'health-fitness-wellness', 100, 26, 'Just now', 1374, 'today', 'supersethealth.com', TRUE),
  ('p-health-fitness-wellness-27', 'Pliability (ROMWOD) — Daily mobility and flexibility', 'https://pliability.com', 'https://www.google.com/s2/favicons?domain=pliability.com&sz=128', 'Targeted mobility routines to prevent injuries, improve flexibility, and recover faster.', 'health-fitness-wellness', 85, 27, 'Just now', 6352, 'today', 'pliability.com', TRUE),
  ('p-health-fitness-wellness-28', 'Sleep Cycle — Smart alarm clock and sleep tracker', 'https://sleepcycle.com', 'https://www.google.com/s2/favicons?domain=sleepcycle.com&sz=128', 'Wakes you up during light sleep phase using sound analysis of snoring and movements.', 'health-fitness-wellness', 72, 28, 'Just now', 3391, 'today', 'sleepcycle.com', TRUE),
  ('p-health-fitness-wellness-29', 'Rise Science — Energy tracker and sleep debt app', 'https://risescience.com', 'https://www.google.com/s2/favicons?domain=risescience.com&sz=128', 'Calculate your exact circadian energy dips and reduce sleep debt for peak focus.', 'health-fitness-wellness', 60, 29, 'Just now', 4683, 'today', 'risescience.com', TRUE),
  ('p-health-fitness-wellness-30', 'Lifesum — Diet planner, calorie counter & macros', 'https://lifesum.com', 'https://www.google.com/s2/favicons?domain=lifesum.com&sz=128', 'Personalized meal plans, keto trackers, and water reminders for healthy living.', 'health-fitness-wellness', 50, 30, 'Just now', 2863, 'today', 'lifesum.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Social Media & Creator Tools (social-media-creator-tools) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-9', 'social-media-creator-tools', 'Social Media & Creator Tools', 'Share2', 30, NULL, 21923, 3141, 'Just now', 'Link-in-bio, automated scheduling, creator monetization and cross-posting.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-social-media-creator-tools-1', 'Typefully — Write and publish better tweets and threads', 'https://typefully.com', 'https://www.google.com/s2/favicons?domain=typefully.com&sz=128', 'Distraction-free Twitter/X writing environment with scheduling and analytics.', 'social-media-creator-tools', 3141, 1, 'Just now', 8262, 'today', 'typefully.com', TRUE),
  ('p-social-media-creator-tools-2', 'Buffer — Social media management platform', 'https://buffer.com', 'https://www.google.com/s2/favicons?domain=buffer.com&sz=128', 'Plan, schedule, and publish content across Instagram, LinkedIn, TikTok, and Pinterest.', 'social-media-creator-tools', 2700, 2, 'Just now', 8857, 'today', 'buffer.com', TRUE),
  ('p-social-media-creator-tools-3', 'Hypefury — Twitter automation and growth engine', 'https://hypefury.com', 'https://www.google.com/s2/favicons?domain=hypefury.com&sz=128', 'Automate tweet auto-retweets, evergreen post rotation, and newsletter lead generation.', 'social-media-creator-tools', 2300, 3, 'Just now', 6206, 'today', 'hypefury.com', TRUE),
  ('p-social-media-creator-tools-4', 'Stan Store — Creator ecommerce and link-in-bio', 'https://stan.store', 'https://www.google.com/s2/favicons?domain=stan.store&sz=128', 'Monetize your audience with 1-tap digital downloads, courses, and coaching calls.', 'social-media-creator-tools', 1950, 4, 'Just now', 6515, 'today', 'stan.store', TRUE),
  ('p-social-media-creator-tools-5', 'Linktree — The original link in bio tool', 'https://linktr.ee', 'https://www.google.com/s2/favicons?domain=linktr.ee&sz=128', 'Connect your audience to everything you create, sell, and curate in one link.', 'social-media-creator-tools', 1650, 5, 'Just now', 6967, 'today', 'linktr.ee', TRUE),
  ('p-social-media-creator-tools-6', 'Opus Clip — AI video repurposing platform', 'https://opus.pro', 'https://www.google.com/s2/favicons?domain=opus.pro&sz=128', 'Turn long-form YouTube videos and podcasts into viral shorts with auto-captions and virality scores.', 'social-media-creator-tools', 1400, 6, 'Just now', 5040, 'today', 'opus.pro', TRUE),
  ('p-social-media-creator-tools-7', 'Later — Social media marketing platform', 'https://later.com', 'https://www.google.com/s2/favicons?domain=later.com&sz=128', 'Visual content calendar, auto-publishing, and hashtag analytics for visual creators.', 'social-media-creator-tools', 1200, 7, 'Just now', 4457, 'today', 'later.com', TRUE),
  ('p-social-media-creator-tools-8', 'Publer — Social media scheduling superhero', 'https://publer.io', 'https://www.google.com/s2/favicons?domain=publer.io&sz=128', 'Collaborate with teams, design posts in Canva, and schedule across all major networks.', 'social-media-creator-tools', 1020, 8, 'Just now', 5263, 'today', 'publer.io', TRUE),
  ('p-social-media-creator-tools-9', 'Tweet Hunter — Build and monetize your Twitter audience', 'https://tweethunter.io', 'https://www.google.com/s2/favicons?domain=tweethunter.io&sz=128', 'AI-powered tweet ideation, CRM lead search, and auto-DM engagement funnels.', 'social-media-creator-tools', 870, 9, 'Just now', 7769, 'today', 'tweethunter.io', TRUE),
  ('p-social-media-creator-tools-10', 'Beacons — Creator business platform', 'https://beacons.ai', 'https://www.google.com/s2/favicons?domain=beacons.ai&sz=128', 'Custom link-in-bio, media kit generator, invoice builder, and email marketing for creators.', 'social-media-creator-tools', 740, 10, 'Just now', 1915, 'today', 'beacons.ai', TRUE),
  ('p-social-media-creator-tools-11', 'Hootsuite — Social media marketing & management dashboard', 'https://hootsuite.com', 'https://www.google.com/s2/favicons?domain=hootsuite.com&sz=128', 'Manage multiple social networks, measure performance, and monitor brand mentions.', 'social-media-creator-tools', 650, 11, 'Just now', 7126, 'today', 'hootsuite.com', TRUE),
  ('p-social-media-creator-tools-12', 'Sprout Social — Social media management and intelligence', 'https://sproutsocial.com', 'https://www.google.com/s2/favicons?domain=sproutsocial.com&sz=128', 'Enterprise social listening, social customer service, and deep publishing analytics.', 'social-media-creator-tools', 580, 12, 'Just now', 8878, 'today', 'sproutsocial.com', TRUE),
  ('p-social-media-creator-tools-13', 'CapCut — All-in-one video editor for TikTok & Reels', 'https://capcut.com', 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128', 'Easy-to-use video editing tools, trending filters, keyframe animation, and auto-captions.', 'social-media-creator-tools', 510, 13, 'Just now', 7304, 'today', 'capcut.com', TRUE),
  ('p-social-media-creator-tools-14', 'Substack — Start a paid newsletter and community', 'https://substack.com', 'https://www.google.com/s2/favicons?domain=substack.com&sz=128', 'Publish newsletters and podcasts, retain full subscriber ownership, and charge subscriptions.', 'social-media-creator-tools', 450, 14, 'Just now', 6446, 'today', 'substack.com', TRUE),
  ('p-social-media-creator-tools-15', 'Gumroad — Sell digital products directly to your audience', 'https://gumroad.com', 'https://www.google.com/s2/favicons?domain=gumroad.com&sz=128', 'E-commerce platform for creators to sell software, ebooks, courses, and design assets.', 'social-media-creator-tools', 400, 15, 'Just now', 8756, 'today', 'gumroad.com', TRUE),
  ('p-social-media-creator-tools-16', 'Patreon — Membership platform for creators', 'https://patreon.com', 'https://www.google.com/s2/favicons?domain=patreon.com&sz=128', 'Build recurring monthly membership communities with exclusive tiers, posts, and rewards.', 'social-media-creator-tools', 350, 16, 'Just now', 5989, 'today', 'patreon.com', TRUE),
  ('p-social-media-creator-tools-17', 'Ko-fi — Friendly way to accept donations and memberships', 'https://ko-fi.com', 'https://www.google.com/s2/favicons?domain=ko-fi.com&sz=128', 'Receive tips, sell shop items, and offer monthly memberships with 0% platform fees.', 'social-media-creator-tools', 310, 17, 'Just now', 2864, 'today', 'ko-fi.com', TRUE),
  ('p-social-media-creator-tools-18', 'Buy Me a Coffee — Simple support for creators', 'https://buymeacoffee.com', 'https://www.google.com/s2/favicons?domain=buymeacoffee.com&sz=128', 'Fast, friendly way for supporters to buy you a coffee and fund your creative projects.', 'social-media-creator-tools', 270, 18, 'Just now', 6190, 'today', 'buymeacoffee.com', TRUE),
  ('p-social-media-creator-tools-19', 'Kajabi — All-in-one online course and coaching platform', 'https://kajabi.com', 'https://www.google.com/s2/favicons?domain=kajabi.com&sz=128', 'Build online courses, membership portals, coaching programs, and marketing funnels.', 'social-media-creator-tools', 235, 19, 'Just now', 6344, 'today', 'kajabi.com', TRUE),
  ('p-social-media-creator-tools-20', 'Teachable — Create and sell online courses and coaching', 'https://teachable.com', 'https://www.google.com/s2/favicons?domain=teachable.com&sz=128', 'Turn your knowledge into a profitable online education business with customizable checkouts.', 'social-media-creator-tools', 205, 20, 'Just now', 3300, 'today', 'teachable.com', TRUE),
  ('p-social-media-creator-tools-21', 'Skool — Community platform for course creators', 'https://skool.com', 'https://www.google.com/s2/favicons?domain=skool.com&sz=128', 'Gamified online community platform with leaderboards, classroom courses, and calendar events.', 'social-media-creator-tools', 180, 21, 'Just now', 8386, 'today', 'skool.com', TRUE),
  ('p-social-media-creator-tools-22', 'Circle.so — All-in-one community platform for creators', 'https://circle.so', 'https://www.google.com/s2/favicons?domain=circle.so&sz=128', 'Host discussions, live streams, group chats, events, and courses under your own brand.', 'social-media-creator-tools', 155, 22, 'Just now', 3486, 'today', 'circle.so', TRUE),
  ('p-social-media-creator-tools-23', 'Mighty Networks — Community, courses & memberships', 'https://mightynetworks.com', 'https://www.google.com/s2/favicons?domain=mightynetworks.com&sz=128', 'Bring your community, events, and online courses together on web and native mobile apps.', 'social-media-creator-tools', 135, 23, 'Just now', 2364, 'today', 'mightynetworks.com', TRUE),
  ('p-social-media-creator-tools-24', 'FeedHive — AI-powered social media scheduling platform', 'https://feedhive.com', 'https://www.google.com/s2/favicons?domain=feedhive.com&sz=128', 'Visual post planner, AI conditional post recycler, and performance prediction engine.', 'social-media-creator-tools', 115, 24, 'Just now', 5082, 'today', 'feedhive.com', TRUE),
  ('p-social-media-creator-tools-25', 'Brand24 — Social media monitoring and reputation tracker', 'https://brand24.com', 'https://www.google.com/s2/favicons?domain=brand24.com&sz=128', 'Track brand mentions across podcasts, forums, social media, and news websites in real-time.', 'social-media-creator-tools', 100, 25, 'Just now', 3878, 'today', 'brand24.com', TRUE),
  ('p-social-media-creator-tools-26', 'Loomly — Social media calendar and brand success platform', 'https://loomly.com', 'https://www.google.com/s2/favicons?domain=loomly.com&sz=128', 'Streamline team post approvals, content scheduling, and automated sponsor campaigns.', 'social-media-creator-tools', 85, 26, 'Just now', 5040, 'today', 'loomly.com', TRUE),
  ('p-social-media-creator-tools-27', 'Metricool — Complete social media analytics & planning', 'https://metricool.com', 'https://www.google.com/s2/favicons?domain=metricool.com&sz=128', 'Analyze social networks, track Google Business profiles, and schedule multi-channel posts.', 'social-media-creator-tools', 72, 27, 'Just now', 1572, 'today', 'metricool.com', TRUE),
  ('p-social-media-creator-tools-28', 'Taplio — AI-powered LinkedIn growth and lead engine', 'https://taplio.com', 'https://www.google.com/s2/favicons?domain=taplio.com&sz=128', 'Generate high-performing LinkedIn posts, schedule content, and engage with industry leads.', 'social-media-creator-tools', 60, 28, 'Just now', 6569, 'today', 'taplio.com', TRUE),
  ('p-social-media-creator-tools-29', 'AuthoredUp — LinkedIn content creation and formatting tool', 'https://authoredup.com', 'https://www.google.com/s2/favicons?domain=authoredup.com&sz=128', 'Preview LinkedIn post formatting, bold/italicize text, and review detailed post metrics.', 'social-media-creator-tools', 50, 29, 'Just now', 8237, 'today', 'authoredup.com', TRUE),
  ('p-social-media-creator-tools-30', 'Postfity — Social media scheduler for agencies', 'https://postfity.com', 'https://www.google.com/s2/favicons?domain=postfity.com&sz=128', 'Schedule posts, images, and videos across LinkedIn, Twitter, Facebook, and Instagram.', 'social-media-creator-tools', 40, 30, 'Just now', 5305, 'today', 'postfity.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Design & Creative (design-creative) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-10', 'design-creative', 'Design & Creative', 'Palette', 30, NULL, 80000, 10270, 'Just now', 'UI tools, prototyping suites, 3D engines, icon libraries and motion graphics.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-design-creative-1', 'Figma — Collaborative interface design tool', 'https://figma.com', 'https://www.google.com/s2/favicons?domain=figma.com&sz=128', 'Connect entire product design teams in real-time browser canvases with Auto Layout.', 'design-creative', 10270, 1, 'Just now', 8859, 'today', 'figma.com', TRUE),
  ('p-design-creative-2', 'Canva — Visual design suite for everyone', 'https://canva.com', 'https://www.google.com/s2/favicons?domain=canva.com&sz=128', 'Create social graphics, presentations, posters, and videos with drag-and-drop templates.', 'design-creative', 9100, 2, 'Just now', 2819, 'today', 'canva.com', TRUE),
  ('p-design-creative-3', 'Spline — 3D design tool in the browser', 'https://spline.design', 'https://www.google.com/s2/favicons?domain=spline.design&sz=128', 'Design, animate, and embed real-time interactive 3D web scenes with zero code.', 'design-creative', 8000, 3, 'Just now', 1752, 'today', 'spline.design', TRUE),
  ('p-design-creative-4', 'Framer — Zero-code web design to production publishing', 'https://framer.com', 'https://www.google.com/s2/favicons?domain=framer.com&sz=128', 'Design interactive web pages with layout freehand tools and publish to fast edge CDNs.', 'design-creative', 7000, 4, 'Just now', 5434, 'today', 'framer.com', TRUE),
  ('p-design-creative-5', 'Webflow — Visual website development platform', 'https://webflow.com', 'https://www.google.com/s2/favicons?domain=webflow.com&sz=128', 'Build responsive production websites with visual CSS control, CMS, and ecommerce.', 'design-creative', 6100, 5, 'Just now', 2901, 'today', 'webflow.com', TRUE),
  ('p-design-creative-6', 'Rive — Real-time interactive vector animations', 'https://rive.app', 'https://www.google.com/s2/favicons?domain=rive.app&sz=128', 'Build state machines and lightweight interactive animations for apps and games.', 'design-creative', 5300, 6, 'Just now', 1311, 'today', 'rive.app', TRUE),
  ('p-design-creative-7', 'Sketch — Digital design and vector prototyping', 'https://sketch.com', 'https://www.google.com/s2/favicons?domain=sketch.com&sz=128', 'Native macOS interface design tool featuring powerful symbol libraries and plugins.', 'design-creative', 4600, 7, 'Just now', 3997, 'today', 'sketch.com', TRUE),
  ('p-design-creative-8', 'LottieLab — Create and animate Lottie animations', 'https://lottielab.com', 'https://www.google.com/s2/favicons?domain=lottielab.com&sz=128', 'Fast, modern web-based Lottie vector animation editor for product designers.', 'design-creative', 4000, 8, 'Just now', 4861, 'today', 'lottielab.com', TRUE),
  ('p-design-creative-9', 'Penpot — Open-source design and prototyping tool', 'https://penpot.app', 'https://www.google.com/s2/favicons?domain=penpot.app&sz=128', 'Web-based open source interface tool natively using SVG and web standards.', 'design-creative', 3450, 9, 'Just now', 913, 'today', 'penpot.app', TRUE),
  ('p-design-creative-10', 'Iconjar — Organize and search thousands of design icons', 'https://geticonjar.com', 'https://www.google.com/s2/favicons?domain=geticonjar.com&sz=128', 'Native macOS icon organizer with drag-and-drop export into Figma and Sketch.', 'design-creative', 2950, 10, 'Just now', 1346, 'today', 'geticonjar.com', TRUE),
  ('p-design-creative-11', 'Adobe Creative Cloud — Industry standard creative apps', 'https://adobe.com', 'https://www.google.com/s2/favicons?domain=adobe.com&sz=128', 'Photoshop, Illustrator, Premiere Pro, and After Effects for world-class visual creative workflows.', 'design-creative', 2600, 11, 'Just now', 7590, 'today', 'adobe.com', TRUE),
  ('p-design-creative-12', 'Blender — Free open-source 3D creation suite', 'https://blender.org', 'https://www.google.com/s2/favicons?domain=blender.org&sz=128', 'Modeling, rigging, animation, simulation, rendering, compositing and motion tracking.', 'design-creative', 2300, 12, 'Just now', 6924, 'today', 'blender.org', TRUE),
  ('p-design-creative-13', 'Procreate — Creative illustration app for iPad', 'https://procreate.com', 'https://www.google.com/s2/favicons?domain=procreate.com&sz=128', 'Intuitive digital illustration and painting studio with ultra-responsive Apple Pencil engines.', 'design-creative', 2000, 13, 'Just now', 5356, 'today', 'procreate.com', TRUE),
  ('p-design-creative-14', 'Affinity Designer — Professional vector graphics software', 'https://affinity.serif.com', 'https://www.google.com/s2/favicons?domain=affinity.serif.com&sz=128', 'Smooth, fast vector graphics software for concept art, logos, and UI mockups.', 'design-creative', 1750, 14, 'Just now', 7296, 'today', 'affinity.serif.com', TRUE),
  ('p-design-creative-15', 'Dribbble — Discover the world’s top designers & creative pros', 'https://dribbble.com', 'https://www.google.com/s2/favicons?domain=dribbble.com&sz=128', 'Design portfolio showcase, hiring board, and creative inspiration community.', 'design-creative', 1550, 15, 'Just now', 6079, 'today', 'dribbble.com', TRUE),
  ('p-design-creative-16', 'Behance — Showcase and discover creative work', 'https://behance.net', 'https://www.google.com/s2/favicons?domain=behance.net&sz=128', 'Adobe creative network to broadcast portfolios, photography, and UI design case studies.', 'design-creative', 1350, 16, 'Just now', 6905, 'today', 'behance.net', TRUE),
  ('p-design-creative-17', 'Unsplash — Beautiful free images and pictures', 'https://unsplash.com', 'https://www.google.com/s2/favicons?domain=unsplash.com&sz=128', 'Over 3M+ free high-resolution photos curated by a global photographer community.', 'design-creative', 1180, 17, 'Just now', 8102, 'today', 'unsplash.com', TRUE),
  ('p-design-creative-18', 'Freepik — Graphic resources for creative projects', 'https://freepik.com', 'https://www.google.com/s2/favicons?domain=freepik.com&sz=128', 'Vectors, stock photos, PSD templates, and mockups for commercial design workflows.', 'design-creative', 1020, 18, 'Just now', 5770, 'today', 'freepik.com', TRUE),
  ('p-design-creative-19', 'Flaticon — Largest database of free vector icons', 'https://flaticon.com', 'https://www.google.com/s2/favicons?domain=flaticon.com&sz=128', 'Download millions of vector icons and animated stickers in SVG, EPS, and PNG formats.', 'design-creative', 890, 19, 'Just now', 6064, 'today', 'flaticon.com', TRUE),
  ('p-design-creative-20', 'Fontshare — Quality font service by Indian Type Foundry', 'https://fontshare.com', 'https://www.google.com/s2/favicons?domain=fontshare.com&sz=128', 'Free, professional-grade typography collection for commercial and personal projects.', 'design-creative', 780, 20, 'Just now', 8547, 'today', 'fontshare.com', TRUE),
  ('p-design-creative-21', 'Google Fonts — Library of open source fonts', 'https://fonts.google.com', 'https://www.google.com/s2/favicons?domain=fonts.google.com&sz=128', 'Over 1,500 open source font families ready to embed in web and mobile applications.', 'design-creative', 680, 21, 'Just now', 8230, 'today', 'fonts.google.com', TRUE),
  ('p-design-creative-22', 'Coolors — Super fast color palettes generator', 'https://coolors.co', 'https://www.google.com/s2/favicons?domain=coolors.co&sz=128', 'Generate harmonic color schemes, check contrast accessibility, and export CSS variables.', 'design-creative', 590, 22, 'Just now', 6475, 'today', 'coolors.co', TRUE),
  ('p-design-creative-23', 'Lordicon — Animated icons library for designers', 'https://lordicon.com', 'https://www.google.com/s2/favicons?domain=lordicon.com&sz=128', 'Thousands of animated interactive Lottie and JSON icons for digital products.', 'design-creative', 510, 23, 'Just now', 3968, 'today', 'lordicon.com', TRUE),
  ('p-design-creative-24', 'Mobbin — Discover real-world iOS and Android UI patterns', 'https://mobbin.com', 'https://www.google.com/s2/favicons?domain=mobbin.com&sz=128', 'The world’s largest mobile and web design pattern reference library.', 'design-creative', 440, 24, 'Just now', 4631, 'today', 'mobbin.com', TRUE),
  ('p-design-creative-25', 'Pagecollective — Landing page design inspiration', 'https://pagecollective.com', 'https://www.google.com/s2/favicons?domain=pagecollective.com&sz=128', 'Curated gallery of the best SaaS and startup landing pages with section breakdowns.', 'design-creative', 380, 25, 'Just now', 2010, 'today', 'pagecollective.com', TRUE),
  ('p-design-creative-26', 'Relume — AI website builder & Figma component library', 'https://relume.io', 'https://www.google.com/s2/favicons?domain=relume.io&sz=128', 'Generate responsive wireframes, sitemaps, and copy directly into Figma with 1,000+ UI components.', 'design-creative', 330, 26, 'Just now', 4382, 'today', 'relume.io', TRUE),
  ('p-design-creative-27', 'Shadcn UI — Beautifully designed accessible components', 'https://ui.shadcn.com', 'https://www.google.com/s2/favicons?domain=ui.shadcn.com&sz=128', 'Re-usable Tailwind and Radix UI components you can copy and paste into your apps.', 'design-creative', 280, 27, 'Just now', 2263, 'today', 'ui.shadcn.com', TRUE),
  ('p-design-creative-28', 'Aceternity UI — Modern animated Tailwind components', 'https://ui.aceternity.com', 'https://www.google.com/s2/favicons?domain=ui.aceternity.com&sz=128', 'Trending Framer Motion animated cards, hero sections, and navbar components.', 'design-creative', 240, 28, 'Just now', 1669, 'today', 'ui.aceternity.com', TRUE),
  ('p-design-creative-29', 'Magic UI — UI library for design engineers', 'https://magicui.design', 'https://www.google.com/s2/favicons?domain=magicui.design&sz=128', '50+ animated interactive components built with Tailwind CSS, React, and Framer Motion.', 'design-creative', 200, 29, 'Just now', 4475, 'today', 'magicui.design', TRUE),
  ('p-design-creative-30', 'Heroicons — Beautiful hand-crafted SVG icons by Tailwind', 'https://heroicons.com', 'https://www.google.com/s2/favicons?domain=heroicons.com&sz=128', 'A set of 288 free MIT-licensed high-quality SVG icons for modern UI development.', 'design-creative', 160, 30, 'Just now', 1404, 'today', 'heroicons.com', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;


-- =========================================================
-- Productivity & Personal Tools (productivity-personal-tools) — 30 Real Products
-- =========================================================
INSERT INTO public.categories (id, slug, name, icon, claim_count, hot_rank, total_volume, top_bid, updated_at, description)
VALUES ('cat-11', 'productivity-personal-tools', 'Productivity & Personal Tools', 'CheckSquare', 30, NULL, 45550, 5590, 'Just now', 'Notes, task managers, launchers, time trackers and operating systems.')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  claim_count = EXCLUDED.claim_count,
  hot_rank = EXCLUDED.hot_rank,
  total_volume = EXCLUDED.total_volume,
  top_bid = EXCLUDED.top_bid,
  updated_at = EXCLUDED.updated_at,
  description = EXCLUDED.description;

INSERT INTO public.products (id, title, url, favicon_url, description, category_slug, current_bid, rank, claimed_at, clicks, time_ago, domain, verified)
VALUES
  ('p-productivity-personal-tools-1', 'Notion — Connected workspace for notes and docs', 'https://notion.so', 'https://www.google.com/s2/favicons?domain=notion.so&sz=128', 'All-in-one workspace for wikis, task boards, docs, and embedded AI collaboration.', 'productivity-personal-tools', 5590, 1, 'Just now', 6002, 'today', 'notion.so', TRUE),
  ('p-productivity-personal-tools-2', 'Obsidian — Sharpen your thinking with markdown notes', 'https://obsidian.md', 'https://www.google.com/s2/favicons?domain=obsidian.md&sz=128', 'Private, local-first knowledge graph that lives on your device forever.', 'productivity-personal-tools', 4900, 2, 'Just now', 7548, 'today', 'obsidian.md', TRUE),
  ('p-productivity-personal-tools-3', 'Raycast — Supercharged desktop launcher for Mac', 'https://raycast.com', 'https://www.google.com/s2/favicons?domain=raycast.com&sz=128', 'Blazing-fast extensible productivity launcher with script commands and window management.', 'productivity-personal-tools', 4300, 3, 'Just now', 6142, 'today', 'raycast.com', TRUE),
  ('p-productivity-personal-tools-4', 'Cron (Notion Calendar) — Next-generation calendar', 'https://notion.so/product/calendar', 'https://www.google.com/s2/favicons?domain=notion.so/product/calendar&sz=128', 'Fast, modern calendar app with integrated timezone overlays and scheduling links.', 'productivity-personal-tools', 3800, 4, 'Just now', 2879, 'today', 'notion.so/product/calendar', TRUE),
  ('p-productivity-personal-tools-5', 'Superhuman — The fastest email experience ever made', 'https://superhuman.com', 'https://www.google.com/s2/favicons?domain=superhuman.com&sz=128', 'Blazing fast keyboard shortcuts, split inboxes, and AI draft generation.', 'productivity-personal-tools', 3350, 5, 'Just now', 1267, 'today', 'superhuman.com', TRUE),
  ('p-productivity-personal-tools-6', 'Things 3 — Award-winning personal task manager', 'https://culturedcode.com', 'https://www.google.com/s2/favicons?domain=culturedcode.com&sz=128', 'Elegant to-do list and task planner designed exclusively for Apple ecosystems.', 'productivity-personal-tools', 2950, 6, 'Just now', 4367, 'today', 'culturedcode.com', TRUE),
  ('p-productivity-personal-tools-7', 'Todoist — Organize your work and personal life', 'https://todoist.com', 'https://www.google.com/s2/favicons?domain=todoist.com&sz=128', 'Natural language task entry, recurring due dates, and project priority boards.', 'productivity-personal-tools', 2600, 7, 'Just now', 4233, 'today', 'todoist.com', TRUE),
  ('p-productivity-personal-tools-8', 'Linear — Purpose-built issue tracker for modern teams', 'https://linear.app', 'https://www.google.com/s2/favicons?domain=linear.app&sz=128', 'Fast, keyboard-first product management and roadmapping tool for software companies.', 'productivity-personal-tools', 2300, 8, 'Just now', 2322, 'today', 'linear.app', TRUE),
  ('p-productivity-personal-tools-9', 'AmpleNote — Note taking with task matrix calendar', 'https://amplenote.com', 'https://www.google.com/s2/favicons?domain=amplenote.com&sz=128', 'Idea capture, Eisenhower priority matrix, and calendar time-blocking in one app.', 'productivity-personal-tools', 2000, 9, 'Just now', 2587, 'today', 'amplenote.com', TRUE),
  ('p-productivity-personal-tools-10', 'Arc Browser by The Browser Company', 'https://arc.net', 'https://www.google.com/s2/favicons?domain=arc.net&sz=128', 'A cleaner, quieter internet browser with Spaces, Split View, and integrated Notes.', 'productivity-personal-tools', 1750, 10, 'Just now', 4982, 'today', 'arc.net', TRUE),
  ('p-productivity-personal-tools-11', 'Craft Docs — Visual documents and notes', 'https://craft.do', 'https://www.google.com/s2/favicons?domain=craft.do&sz=128', 'Structured, visually stunning documents with nested sub-pages and instant export.', 'productivity-personal-tools', 1550, 11, 'Just now', 1754, 'today', 'craft.do', TRUE),
  ('p-productivity-personal-tools-12', 'Bear — Beautiful markdown notes for Apple devices', 'https://bear.app', 'https://www.google.com/s2/favicons?domain=bear.app&sz=128', 'Distraction-free markdown writing environment with nested tags and elegant typography.', 'productivity-personal-tools', 1380, 12, 'Just now', 3193, 'today', 'bear.app', TRUE),
  ('p-productivity-personal-tools-13', 'Logseq — Privacy-first open-source knowledge base', 'https://logseq.com', 'https://www.google.com/s2/favicons?domain=logseq.com&sz=128', 'Outliner-based local-first notebook with bidirectional linking and flashcards.', 'productivity-personal-tools', 1220, 13, 'Just now', 6229, 'today', 'logseq.com', TRUE),
  ('p-productivity-personal-tools-14', 'Toggl Track — Time tracking and profitability', 'https://toggl.com', 'https://www.google.com/s2/favicons?domain=toggl.com&sz=128', 'Track billable hours, project profitability, and client budgets with one click.', 'productivity-personal-tools', 1080, 14, 'Just now', 4502, 'today', 'toggl.com', TRUE),
  ('p-productivity-personal-tools-15', 'Rize — Automatic time tracker & focus coach', 'https://rize.io', 'https://www.google.com/s2/favicons?domain=rize.io&sz=128', 'AI productivity tracker that measures focus time, prevents burnout, and optimizes breaks.', 'productivity-personal-tools', 950, 15, 'Just now', 2464, 'today', 'rize.io', TRUE),
  ('p-productivity-personal-tools-16', 'Granola — AI notepad for meeting participants', 'https://granola.so', 'https://www.google.com/s2/favicons?domain=granola.so&sz=128', 'Combines your own typed notes with audio transcription to produce perfect meeting minutes.', 'productivity-personal-tools', 840, 16, 'Just now', 6494, 'today', 'granola.so', TRUE),
  ('p-productivity-personal-tools-17', 'Coda — The all-in-one collaborative doc', 'https://coda.io', 'https://www.google.com/s2/favicons?domain=coda.io&sz=128', 'Evolves documents into interactive apps with live tables, buttons, and integrations.', 'productivity-personal-tools', 740, 17, 'Just now', 3551, 'today', 'coda.io', TRUE),
  ('p-productivity-personal-tools-18', 'Shortwave — Intelligent email client powered by AI', 'https://shortwave.com', 'https://www.google.com/s2/favicons?domain=shortwave.com&sz=128', 'Transform messy Gmail inboxes into organized todo items with AI summaries.', 'productivity-personal-tools', 650, 18, 'Just now', 4686, 'today', 'shortwave.com', TRUE),
  ('p-productivity-personal-tools-19', 'Sunsama — Daily planner for calm and focused work', 'https://sunsama.com', 'https://www.google.com/s2/favicons?domain=sunsama.com&sz=128', 'Pull tasks from Trello, Jira, and Asana into a realistic daily calendar schedule.', 'productivity-personal-tools', 570, 19, 'Just now', 7024, 'today', 'sunsama.com', TRUE),
  ('p-productivity-personal-tools-20', 'Akiflow — Ultimate time blocking and task consolidation', 'https://akiflow.com', 'https://www.google.com/s2/favicons?domain=akiflow.com&sz=128', 'Universal inbox capturing tasks from Slack, Gmail, and ClickUp into daily timeline slots.', 'productivity-personal-tools', 500, 20, 'Just now', 7468, 'today', 'akiflow.com', TRUE),
  ('p-productivity-personal-tools-21', '1Password — Trusted password management', 'https://1password.com', 'https://www.google.com/s2/favicons?domain=1password.com&sz=128', 'Secure digital vault for credentials, credit cards, and passkeys across all devices.', 'productivity-personal-tools', 440, 21, 'Just now', 6846, 'today', '1password.com', TRUE),
  ('p-productivity-personal-tools-22', 'CleanMyMac X — All-in-one package to clean Mac', 'https://cleanmymac.com', 'https://www.google.com/s2/favicons?domain=cleanmymac.com&sz=128', 'Optimize macOS system performance, clear caches, and uninstall apps cleanly.', 'productivity-personal-tools', 390, 22, 'Just now', 5906, 'today', 'cleanmymac.com', TRUE),
  ('p-productivity-personal-tools-23', 'Alfred — Productivity app for macOS', 'https://alfredapp.com', 'https://www.google.com/s2/favicons?domain=alfredapp.com&sz=128', 'Boost efficiency with custom hotkeys, clipboard history, and deep workflow automations.', 'productivity-personal-tools', 340, 23, 'Just now', 3423, 'today', 'alfredapp.com', TRUE),
  ('p-productivity-personal-tools-24', 'Paste — Clipboard manager for Mac, iPhone and iPad', 'https://pasteapp.io', 'https://www.google.com/s2/favicons?domain=pasteapp.io&sz=128', 'Never lose copied links, code snippets, or text with endless visual clipboard history.', 'productivity-personal-tools', 300, 24, 'Just now', 4658, 'today', 'pasteapp.io', TRUE),
  ('p-productivity-personal-tools-25', 'Magnet — Window manager for macOS', 'https://magnet.crowdcafe.com', 'https://www.google.com/s2/favicons?domain=magnet.crowdcafe.com&sz=128', 'Snap windows into halves, quarters, and thirds with simple drag-and-drop or shortcuts.', 'productivity-personal-tools', 260, 25, 'Just now', 2685, 'today', 'magnet.crowdcafe.com', TRUE),
  ('p-productivity-personal-tools-26', 'Krisp — AI voice noise cancellation', 'https://krisp.ai', 'https://www.google.com/s2/favicons?domain=krisp.ai&sz=128', 'Eliminate background echoes and pet barks from Zoom and Google Meet calls in real time.', 'productivity-personal-tools', 220, 26, 'Just now', 3070, 'today', 'krisp.ai', TRUE),
  ('p-productivity-personal-tools-27', 'Otter.ai — AI meeting note taker & transcription', 'https://otter.ai', 'https://www.google.com/s2/favicons?domain=otter.ai&sz=128', 'Generate searchable, synchronized transcripts and action items from live conversations.', 'productivity-personal-tools', 190, 27, 'Just now', 4448, 'today', 'otter.ai', TRUE),
  ('p-productivity-personal-tools-28', 'TickTick — To-do list with Pomodoro timer & calendar', 'https://ticktick.com', 'https://www.google.com/s2/favicons?domain=ticktick.com&sz=128', 'Multi-platform task manager with built-in habit tracker and Eisenhower matrix.', 'productivity-personal-tools', 160, 28, 'Just now', 6079, 'today', 'ticktick.com', TRUE),
  ('p-productivity-personal-tools-29', 'Forest — Stay focused and plant real trees', 'https://forestapp.cc', 'https://www.google.com/s2/favicons?domain=forestapp.cc&sz=128', 'Gamified focus timer where your focused time grows a virtual and real forest.', 'productivity-personal-tools', 130, 29, 'Just now', 4863, 'today', 'forestapp.cc', TRUE),
  ('p-productivity-personal-tools-30', 'Session — Pomodoro timer and focus tracker', 'https://stayfocused.me', 'https://www.google.com/s2/favicons?domain=stayfocused.me&sz=128', 'Block distracting websites, review daily focus analytics, and practice mindful work.', 'productivity-personal-tools', 100, 30, 'Just now', 3960, 'today', 'stayfocused.me', TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  url = EXCLUDED.url,
  favicon_url = EXCLUDED.favicon_url,
  description = EXCLUDED.description,
  category_slug = EXCLUDED.category_slug,
  current_bid = EXCLUDED.current_bid,
  rank = EXCLUDED.rank,
  claimed_at = EXCLUDED.claimed_at,
  clicks = EXCLUDED.clicks,
  time_ago = EXCLUDED.time_ago,
  domain = EXCLUDED.domain,
  verified = EXCLUDED.verified;
