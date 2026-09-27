export type Role = "admin" | "editor" | "user";

export type ResourceType =
  | "pdf"
  | "document"
  | "text"
  | "notes"
  | "question_bank"
  | "roadmap"
  | "cheat_sheet"
  | "tutorial"
  | "video"
  | "external_link"
  | "code"
  | "project"
  | "interview_questions"
  | "placement_material"
  | "other";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "all_levels";

export type ContentStatus = "draft" | "published" | "archived";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface ResourceFile {
  id: string;
  resourceId: string;
  fileName: string;
  fileUrl: string;
  storagePath?: string;
  fileSize: number; // in bytes
  mimeType: string;
  pageCount?: number;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string; // Rich text / markdown / HTML / raw text
  type: ResourceType;
  categoryId: string;
  categoryName?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  tags: string[];
  difficulty: DifficultyLevel;
  authorSource?: string;
  thumbnailUrl?: string;
  isFeatured: boolean;
  status: ContentStatus;
  viewCount: number;
  downloadCount: number;
  file?: ResourceFile;
  externalUrl?: string;
  metadata?: {
    pageCount?: number;
    fileSizeFormatted?: string;
    estimatedReadTime?: string;
    prerequisites?: string[];
    technologies?: string[];
    codeLanguage?: string;
    downloadUrl?: string;
  };
  company_name?: string;
  company_slug?: string;
  job_role?: string;
  experience_level?: string;
  placement_year?: string | number;
  question_type?: string;
  file_hash?: string;
  needs_review?: boolean;
  original_filename?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  resourceCount: number;
  jobRoles: string[];
  topics: string[];
  years: (string | number)[];
}

export interface QuestionItem {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  categoryId: string;
  categoryName?: string;
  topic: string;
  difficulty: DifficultyLevel;
  tags: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  relatedQuestionIds?: string[];
  source?: string;
  viewCount: number;
  createdAt: string;
}

export interface RoadmapStep {
  id: string;
  stageNumber: number;
  title: string;
  description: string;
  topics: string[];
  prerequisites?: string[];
  recommendedResourceIds?: string[];
  resourceLinks?: { title: string; url: string }[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  icon?: string;
  difficulty: DifficultyLevel;
  estimatedDuration: string;
  steps: RoadmapStep[];
  isFeatured: boolean;
  status: ContentStatus;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  target?: string;
  sortOrder: number;
  isVisible: boolean;
}

export interface PageSectionConfig {
  id: string;
  pageName: string;
  sectionKey: string;
  title: string;
  subheading?: string;
  content?: Record<string, any>;
  isEnabled: boolean;
  sortOrder: number;
}

export interface SiteSettings {
  siteName: string;
  logoUrl?: string;
  faviconUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaUrl: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaUrl: string;
  contactEmail: string;
  contactPhone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  discordUrl?: string;
  footerText: string;
  maintenanceMode: boolean;
  seoDefaults: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetEntity: string;
  targetId?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface FilterState {
  searchQuery: string;
  categoryId: string;
  subcategoryId: string;
  resourceType: string;
  tag: string;
  difficulty: string;
  isFeaturedOnly: boolean;
  sortBy: "latest" | "popular" | "title" | "size";
}
