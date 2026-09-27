import fs from "fs";
import path from "path";
import crypto from "crypto";

interface ResourceRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced" | "all_levels";
  isFeatured: boolean;
  status: "published" | "draft";
  viewCount: number;
  downloadCount: number;
  company_name?: string;
  company_slug?: string;
  job_role?: string;
  placement_year?: string;
  file_hash: string;
  original_filename: string;
  needs_review: boolean;
  createdAt: string;
  updatedAt: string;
  file?: {
    id: string;
    resourceId: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    pageCount: number;
    createdAt: string;
  };
}

const ROOT_SOURCE_FOLDER = "D:\\VibeCoading Mastered\\Placement IMP";
const PUBLIC_TARGET_DIR = path.join(process.cwd(), "public", "sample-resources", "imported");
const DATA_OUTPUT_PATH = path.join(process.cwd(), "lib", "data", "all-resources-imported.json");

function calculateFileHash(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function estimatePageCount(buffer: Buffer, ext: string): number {
  if (ext !== ".pdf") return 1;
  try {
    const text = buffer.toString("binary");
    const matches = text.match(/\/Type\s*\/Page\b/g);
    if (matches && matches.length > 0) return matches.length;
  } catch (err) {}
  const sizeKb = buffer.length / 1024;
  if (sizeKb < 100) return 4;
  if (sizeKb < 500) return 15;
  if (sizeKb < 2000) return 40;
  return 90;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function scanAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAllFiles(fullPath, fileList);
    } else {
      const ext = path.extname(item).toLowerCase();
      if ([".pdf", ".docx", ".doc", ".txt", ".md", ".xlsx"].includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function mapSourceFolderToCategory(relativePath: string, fileName: string): {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  companyName?: string;
  companySlug?: string;
  tags: string[];
} {
  const parts = relativePath.split(path.sep);
  const rootDir = parts[0] || "";

  let categoryId = "cat-resources";
  let categoryName = "Resources";
  let subcategoryId = "sub-general";
  let subcategoryName = "General Material";
  let companyName: string | undefined = undefined;
  let companySlug: string | undefined = undefined;
  const tags: string[] = ["Resource"];

  if (rootDir.includes("Companies Questions")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "subcat-company-questions";
    subcategoryName = "Company Preparation";
    tags.push("Company Questions", "Placement");

    const folderName = parts.length > 1 ? parts[1] : "";
    if (folderName && folderName !== "Companies Questions") {
      companyName = folderName;
      companySlug = slugify(folderName);
      tags.push(folderName);
    }
  } else if (rootDir.includes("Companies Recruitment")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "subcat-rbu-recruitment";
    subcategoryName = "RBU Recruitment";
    tags.push("Recruitment", "RBU Drive", "Hiring Process");
  } else if (rootDir.includes("LeetCode Question")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "subcat-coding-prep";
    subcategoryName = "Coding Preparation";
    tags.push("LeetCode", "DSA", "Problem Solving");
  } else if (rootDir.includes("Materials + Question")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "subcat-materials";
    subcategoryName = "Placement Materials";
    tags.push("Placement Materials", "Notes", "Questions");
  } else if (rootDir.includes("SkillUp")) {
    categoryId = "cat-skillup";
    categoryName = "Skill Up";
    subcategoryId = "subcat-skill-building";
    subcategoryName = "Skill Building";
    tags.push("Skill Up", "Tech Mastery", "Tutorial");
  }

  return { categoryId, categoryName, subcategoryId, subcategoryName, companyName, companySlug, tags };
}

function main() {
  console.log("==========================================");
  console.log("MASTER PLACEMENT & RESOURCE IMPORT SCRIPT");
  console.log(`Source Folder: ${ROOT_SOURCE_FOLDER}`);
  console.log("==========================================");

  if (!fs.existsSync(ROOT_SOURCE_FOLDER)) {
    console.error(`Directory not found: ${ROOT_SOURCE_FOLDER}`);
    process.exit(1);
  }

  const allFiles = scanAllFiles(ROOT_SOURCE_FOLDER);
  console.log(`Found ${allFiles.length} files for import inspection.`);

  if (!fs.existsSync(PUBLIC_TARGET_DIR)) {
    fs.mkdirSync(PUBLIC_TARGET_DIR, { recursive: true });
  }

  const records: ResourceRecord[] = [];
  const hashes = new Set<string>();

  let imported = 0;
  let skipped = 0;
  let duplicates = 0;
  let needsReview = 0;

  allFiles.forEach((filePath, idx) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const hash = calculateFileHash(buffer);

      if (hashes.has(hash)) {
        duplicates++;
        skipped++;
        return;
      }

      const fileName = path.basename(filePath);
      const ext = path.extname(fileName).toLowerCase();
      const relativePath = path.relative(ROOT_SOURCE_FOLDER, filePath);

      const mapping = mapSourceFolderToCategory(relativePath, fileName);
      const cleanTitle = fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const slug = `${slugify(cleanTitle)}-${hash.slice(0, 6)}`;
      const pageCount = estimatePageCount(buffer, ext);

      // Save file copy to public path
      const safeName = `${slugify(path.basename(fileName, ext))}${ext}`;
      const targetPath = path.join(PUBLIC_TARGET_DIR, safeName);
      fs.writeFileSync(targetPath, buffer);

      const publicWebUrl = `/sample-resources/imported/${safeName}`;

      const rec: ResourceRecord = {
        id: `res-master-${Date.now()}-${idx}`,
        title: cleanTitle,
        slug,
        description: `Imported resource "${cleanTitle}". Curated placement and learning document.`,
        type: ext === ".pdf" ? "pdf" : "document",
        categoryId: mapping.categoryId,
        categoryName: mapping.categoryName,
        subcategoryId: mapping.subcategoryId,
        subcategoryName: mapping.subcategoryName,
        tags: mapping.tags,
        difficulty: "intermediate",
        isFeatured: idx < 10,
        status: "published",
        viewCount: Math.floor(Math.random() * 200) + 10,
        downloadCount: Math.floor(Math.random() * 90) + 5,
        company_name: mapping.companyName,
        company_slug: mapping.companySlug,
        file_hash: hash,
        original_filename: fileName,
        needs_review: !mapping.companyName && relativePath.includes("Companies"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        file: {
          id: `file-master-${Date.now()}-${idx}`,
          resourceId: `res-master-${Date.now()}-${idx}`,
          fileName: fileName,
          fileUrl: publicWebUrl,
          fileSize: buffer.length,
          mimeType: ext === ".pdf" ? "application/pdf" : "application/octet-stream",
          pageCount,
          createdAt: new Date().toISOString(),
        },
      };

      if (rec.needs_review) needsReview++;
      records.push(rec);
      hashes.add(hash);
      imported++;
    } catch (e: any) {
      console.error(`Error importing ${filePath}:`, e.message);
    }
  });

  fs.writeFileSync(DATA_OUTPUT_PATH, JSON.stringify(records, null, 2));

  console.log("\n==========================================");
  console.log("MASTER RESOURCE IMPORT REPORT");
  console.log("==========================================");
  console.log(`Imported:     ${imported}`);
  console.log(`Duplicates:   ${duplicates}`);
  console.log(`Needs Review: ${needsReview}`);
  console.log(`Output File:  ${DATA_OUTPUT_PATH}`);
  console.log("==========================================");
}

main();
