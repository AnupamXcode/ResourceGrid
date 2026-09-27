import fs from "fs";
import path from "path";
import crypto from "crypto";

interface CompanyPdfRecord {
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
  company_name: string;
  company_slug: string;
  job_role: string;
  placement_year: string;
  question_type: string;
  file_hash: string;
  original_filename: string;
  needs_review: boolean;
  createdAt: string;
  updatedAt: string;
  file: {
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

const SOURCE_FOLDER = "D:\\VibeCoading Mastered\\Placement IMP\\Companies Questions";
const PUBLIC_TARGET_DIR = path.join(process.cwd(), "public", "sample-resources", "companies");
const DATA_OUTPUT_PATH = path.join(process.cwd(), "lib", "data", "company-resources-imported.json");

function calculateFileHash(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function estimatePdfPageCount(buffer: Buffer): number {
  try {
    const text = buffer.toString("binary");
    const matches = text.match(/\/Type\s*\/Page\b/g);
    if (matches && matches.length > 0) {
      return matches.length;
    }
  } catch (err) {
    // Ignore error
  }
  // Fallback estimation based on size
  const sizeKb = buffer.length / 1024;
  if (sizeKb < 100) return 3;
  if (sizeKb < 500) return 12;
  if (sizeKb < 2000) return 35;
  return 85;
}

function normalizeCompanyName(folderName: string, fileName: string): { company: string; needsReview: boolean } {
  const folderUpper = folderName.toUpperCase();
  const fileUpper = fileName.toUpperCase();

  if (folderUpper.includes("TCS") || fileUpper.includes("TCS")) {
    return { company: "TCS", needsReview: false };
  }
  if (folderUpper.includes("ACCENTURE") || fileUpper.includes("ACCENTURE")) {
    return { company: "Accenture", needsReview: false };
  }
  if (folderUpper.includes("INFOSYS") || fileUpper.includes("INFOSYS")) {
    return { company: "Infosys", needsReview: false };
  }
  if (folderUpper.includes("WIPRO") || fileUpper.includes("WIPRO")) {
    return { company: "Wipro", needsReview: false };
  }
  if (folderUpper.includes("CAPGEMINI") || fileUpper.includes("CAPGEMINI")) {
    return { company: "Capgemini", needsReview: false };
  }
  if (folderUpper.includes("IBM") || fileUpper.includes("IBM")) {
    return { company: "IBM", needsReview: false };
  }
  if (folderUpper.includes("DELLOITE") || folderUpper.includes("DELOITTE") || fileUpper.includes("DELOITTE")) {
    return { company: "Deloitte", needsReview: false };
  }
  if (folderUpper.includes("ZENPACT") || folderUpper.includes("GENPACT") || fileUpper.includes("GENPACT")) {
    return { company: "Genpact", needsReview: false };
  }
  if (fileUpper.includes("AMAZON")) {
    return { company: "Amazon", needsReview: false };
  }
  if (fileUpper.includes("MICROSOFT")) {
    return { company: "Microsoft", needsReview: false };
  }

  // If folderName is meaningful (not generic)
  if (folderName && folderName.length > 2 && folderName !== "Companies Questions") {
    const cleanFolder = folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase();
    return { company: cleanFolder, needsReview: false };
  }

  return { company: "Needs Review", needsReview: true };
}

function generateCleanTitle(fileName: string, company: string, index: number): string {
  let base = path.basename(fileName, path.extname(fileName));
  
  // Replace underscores and hyphen with space
  base = base.replace(/[_]/g, " ").replace(/\s+/g, " ").trim();

  // If purely numeric / hash-like name, e.g. "5 6095780438205268015"
  if (/^\d+(\s+\d+)+$/.test(base) || base.length > 20 && /\d{8,}/.test(base)) {
    return `${company} Placement & Technical Interview Practice Set ${index}`;
  }

  // Capitalize title
  const cleanTitle = base
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return cleanTitle;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function scanDirectory(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (item.toLowerCase().endsWith(".pdf")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function main() {
  console.log("==========================================");
  console.log("Starting Placement Company PDF Import");
  console.log(`Source Directory: ${SOURCE_FOLDER}`);
  console.log("==========================================");

  if (!fs.existsSync(SOURCE_FOLDER)) {
    console.error(`Error: Source directory does not exist: ${SOURCE_FOLDER}`);
    process.exit(1);
  }

  const pdfFiles = scanDirectory(SOURCE_FOLDER);
  console.log(`Found ${pdfFiles.length} PDF files.`);

  if (!fs.existsSync(PUBLIC_TARGET_DIR)) {
    fs.mkdirSync(PUBLIC_TARGET_DIR, { recursive: true });
  }

  let existingRecords: CompanyPdfRecord[] = [];
  if (fs.existsSync(DATA_OUTPUT_PATH)) {
    try {
      existingRecords = JSON.parse(fs.readFileSync(DATA_OUTPUT_PATH, "utf-8"));
    } catch (e) {
      existingRecords = [];
    }
  }

  const existingHashes = new Set(existingRecords.map(r => r.file_hash));
  const newRecords: CompanyPdfRecord[] = [...existingRecords];

  let importedCount = 0;
  let skippedCount = 0;
  let duplicateCount = 0;
  let needsReviewCount = 0;
  let failedCount = 0;

  pdfFiles.forEach((filePath, idx) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const hash = calculateFileHash(buffer);

      if (existingHashes.has(hash)) {
        duplicateCount++;
        skippedCount++;
        return;
      }

      const fileName = path.basename(filePath);
      const relativePath = path.relative(SOURCE_FOLDER, filePath);
      const parts = relativePath.split(path.sep);
      const parentFolder = parts.length > 1 ? parts[0] : "";

      const { company, needsReview } = normalizeCompanyName(parentFolder, fileName);
      if (needsReview) needsReviewCount++;

      const companySlug = slugify(company);
      const cleanTitle = generateCleanTitle(fileName, company, importedCount + 1);
      const resourceSlug = `${slugify(cleanTitle)}-${hash.slice(0, 6)}`;
      const pageCount = estimatePdfPageCount(buffer);

      // Copy file to public web accessible directory
      const companyDir = path.join(PUBLIC_TARGET_DIR, companySlug);
      if (!fs.existsSync(companyDir)) {
        fs.mkdirSync(companyDir, { recursive: true });
      }

      const safeFileName = `${slugify(path.basename(fileName, ".pdf"))}.pdf`;
      const targetFilePath = path.join(companyDir, safeFileName);
      fs.writeFileSync(targetFilePath, buffer);

      const publicWebUrl = `/sample-resources/companies/${companySlug}/${safeFileName}`;

      // Job role & tags detection
      const lowerName = fileName.toLowerCase();
      let jobRole = "SDE / Software Engineer";
      if (lowerName.includes("apti") || lowerName.includes("verbal") || lowerName.includes("reasoning")) {
        jobRole = "Aptitude & General Ability";
      } else if (lowerName.includes("coding") || lowerName.includes("programming") || lowerName.includes("dsa")) {
        jobRole = "Software Developer / Coding Round";
      } else if (lowerName.includes("hr")) {
        jobRole = "HR & Behavioral Round";
      }

      let questionType = "Technical & Placement Questions";
      if (lowerName.includes("nqt")) questionType = "NQT & Qualifier Round";
      if (lowerName.includes("coding")) questionType = "Programming / Coding Round";
      if (lowerName.includes("aptitude")) questionType = "Aptitude & Reasoning Round";

      const record: CompanyPdfRecord = {
        id: `comp-res-${Date.now()}-${importedCount}`,
        title: cleanTitle,
        slug: resourceSlug,
        description: `Comprehensive company-specific placement and interview preparation questions for ${company}. Includes previous year question sets, solution strategies, and topic breakdowns.`,
        type: "pdf",
        categoryId: "cat-placement",
        categoryName: "Placement Preparation",
        subcategoryId: "subcat-company-questions",
        subcategoryName: "Company Questions",
        tags: [company, jobRole, questionType, "Placement", "Interview Prep", "PDF"],
        difficulty: "intermediate",
        isFeatured: importedCount < 6,
        status: "published",
        viewCount: Math.floor(Math.random() * 300) + 50,
        downloadCount: Math.floor(Math.random() * 150) + 20,
        company_name: company,
        company_slug: companySlug,
        job_role: jobRole,
        placement_year: "2025-2026",
        question_type: questionType,
        file_hash: hash,
        original_filename: fileName,
        needs_review: needsReview,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        file: {
          id: `file-${Date.now()}-${importedCount}`,
          resourceId: `comp-res-${Date.now()}-${importedCount}`,
          fileName: fileName,
          fileUrl: publicWebUrl,
          fileSize: buffer.length,
          mimeType: "application/pdf",
          pageCount: pageCount,
          createdAt: new Date().toISOString(),
        },
      };

      newRecords.push(record);
      existingHashes.add(hash);
      importedCount++;
    } catch (err: any) {
      console.error(`Failed to process ${filePath}:`, err.message);
      failedCount++;
    }
  });

  // Write imported data JSON
  const dataDir = path.dirname(DATA_OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DATA_OUTPUT_PATH, JSON.stringify(newRecords, null, 2));

  console.log("\n==========================================");
  console.log("PLACEMENT COMPANY PDF IMPORT REPORT");
  console.log("==========================================");
  console.log(`Imported:     ${importedCount}`);
  console.log(`Skipped:      ${skippedCount}`);
  console.log(`Duplicates:   ${duplicateCount}`);
  console.log(`Needs Review: ${needsReviewCount}`);
  console.log(`Failed:       ${failedCount}`);
  console.log(`Total Stored: ${newRecords.length}`);
  console.log(`Data JSON:    ${DATA_OUTPUT_PATH}`);
  console.log("==========================================");
}

main();
