import { MetadataRoute } from "next";
import { INITIAL_RESOURCES } from "@/lib/store/hub-store";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vibecoding-resource-hub.vercel.app";

  const staticRoutes = [
    "",
    "/resources",
    "/placement",
    "/vibe-coding",
    "/learning",
    "/questions",
    "/interview",
    "/roadmaps",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const resourceRoutes = INITIAL_RESOURCES.map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: resource.updatedAt || new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...resourceRoutes];
}
