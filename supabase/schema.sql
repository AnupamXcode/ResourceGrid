-- ====================================================================
-- PRODUCTION DATABASE SCHEMA & RLS POLICIES FOR RESOURCE HUB PLATFORM
-- Target Database: PostgreSQL / Supabase
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Enables fast fuzzy & full-text search

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUBCATEGORIES TABLE
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_category_subcategory_slug UNIQUE (category_id, slug)
);

-- 4. RESOURCES TABLE
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN (
    'pdf', 'document', 'text', 'notes', 'question_bank', 'roadmap', 
    'cheat_sheet', 'tutorial', 'video', 'external_link', 'code', 
    'project', 'interview_questions', 'placement_material', 'other'
  )),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT DEFAULT 'all_levels' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
  author_source TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  external_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESOURCE FILES TABLE (Attachment metadata for PDFs & documents)
CREATE TABLE IF NOT EXISTS resource_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_path TEXT,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  page_count INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QUESTION BANK TABLE
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  difficulty TEXT DEFAULT 'all_levels',
  tags TEXT[] DEFAULT '{}',
  code_snippet TEXT,
  code_language TEXT,
  source TEXT,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROADMAPS TABLE
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  icon TEXT,
  difficulty TEXT DEFAULT 'all_levels',
  estimated_duration TEXT,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PAGE SECTIONS TABLE (CMS Page Customization)
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subheading TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  is_enabled BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  CONSTRAINT unique_page_section UNIQUE (page_name, section_key)
);

-- 9. NAVIGATION ITEMS TABLE
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  target TEXT DEFAULT '_self',
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE
);

-- 10. FAQS TABLE
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE
);

-- 11. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  target_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_tags ON resources USING GIN(tags);

-- FULL-TEXT SEARCH INDEX (PostgreSQL FTS)
CREATE INDEX IF NOT EXISTS idx_resources_fts ON resources USING GIN(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(content, ''))
);

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public subcategories read" ON subcategories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public published resources read" ON resources FOR SELECT USING (status = 'published');
CREATE POLICY "Public resource files read" ON resource_files FOR SELECT USING (true);
CREATE POLICY "Public questions read" ON questions FOR SELECT USING (true);
CREATE POLICY "Public roadmaps read" ON roadmaps FOR SELECT USING (status = 'published');
CREATE POLICY "Public sections read" ON page_sections FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public navigation read" ON navigation_items FOR SELECT USING (is_visible = true);
CREATE POLICY "Public faqs read" ON faqs FOR SELECT USING (is_visible = true);
CREATE POLICY "Public site settings read" ON site_settings FOR SELECT USING (true);

-- ADMIN FULL ACCESS POLICIES (authenticated admin users)
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access resources" ON resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access resource_files" ON resource_files FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access questions" ON questions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access roadmaps" ON roadmaps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access page_sections" ON page_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access audit_logs" ON audit_logs FOR ALL USING (auth.role() = 'authenticated');

-- 15. STORAGE BUCKET CREATION (FOR SUPABASE DASHBOARD / SQL EDITOR)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resource-files', 'resource-files', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public download resource files" ON storage.objects FOR SELECT USING (bucket_id = 'resource-files');
CREATE POLICY "Admin upload resource files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resource-files' AND auth.role() = 'authenticated');
CREATE POLICY "Public view thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'thumbnails');
CREATE POLICY "Admin upload thumbnails" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
