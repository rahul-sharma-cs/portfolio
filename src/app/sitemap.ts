import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

// V1 only: /v2 canonicalises to /.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: process.env.NEXT_PUBLIC_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
