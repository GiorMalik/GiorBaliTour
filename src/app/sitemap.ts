import type { MetadataRoute } from "next";
import { SEO_DATA } from "@/lib/seo-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_DATA.site.baseUrl;
  const today = new Date().toISOString().split("T")[0];

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#cars`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const vehiclePages: MetadataRoute.Sitemap = SEO_DATA.vehicles.map(
    (vehicle) => ({
      url: `${baseUrl}/cars/${vehicle.id}`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const locationPages: MetadataRoute.Sitemap = SEO_DATA.serviceAreas.map(
    (area) => ({
      url: `${baseUrl}/locations/${area.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...mainPages, ...vehiclePages, ...locationPages];
}
