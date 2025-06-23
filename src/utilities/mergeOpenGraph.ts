import { siteConfig } from "@/modules/config"
import type { Metadata } from "next"

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: siteConfig.description,
  images: [
    {
      url: siteConfig.ogImage
    }
  ],
  siteName: siteConfig.name,
  title: siteConfig.name
}

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images
  }
}
