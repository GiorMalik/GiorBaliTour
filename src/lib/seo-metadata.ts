import type { Metadata } from "next";
import { SEO_DATA } from "./seo-data";

export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SEO_DATA.site.baseUrl),
    title: {
      default: "Gior Bali Tour - Premium Car Rental with Driver",
      template: "%s | Gior Bali Tour",
    },
    description: SEO_DATA.site.description,
    keywords: [
      "Bali car rental",
      "car rental with driver",
      "Bali transportation",
      "sewa mobil Bali",
      "rental mobil Bali",
      ...SEO_DATA.keywords.english.main,
    ],
    authors: [{ name: "Gior Bali Tour Team" }],
    creator: "Gior Bali Tour",
    publisher: "Gior Bali Tour",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SEO_DATA.site.baseUrl,
      siteName: SEO_DATA.site.name,
      title: "Gior Bali Tour - Premium Car Rental with Driver",
      description: SEO_DATA.site.description,
      images: [
        {
          url: `${SEO_DATA.site.baseUrl}/images/hero/barong-statue.jpg`,
          width: 1200,
          height: 630,
          alt: "Gior Bali Tour",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gior Bali Tour - Premium Car Rental with Driver",
      description: SEO_DATA.site.description,
      images: [`${SEO_DATA.site.baseUrl}/images/hero/barong-statue.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getStructuredDataOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO_DATA.site.name,
    description: SEO_DATA.site.description,
    url: SEO_DATA.site.baseUrl,
    telephone: SEO_DATA.site.phone,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    areaServed: SEO_DATA.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    service: {
      "@type": "Service",
      name: "Car Rental with Driver",
      description: "Premium car rental services with professional drivers",
    },
  };
}

export const structuredData = {
  organization: getStructuredDataOrganization(),
};
