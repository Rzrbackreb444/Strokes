import { useEffect } from "react";

const SITE_URL = "https://strokelyfe.org";
const SITE_NAME = "Stroke Lyfe";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero.jpeg`;

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, schemas: object[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Stroke Lyfe Inc.",
  "alternateName": "Stroke Lyfe",
  "url": SITE_URL,
  "logo": `${SITE_URL}/assets/logo-dark.png`,
  "description": "501(c)(3) nonprofit enriching the lives of stroke survivors through motivation and furthering research in recovery advances.",
  "foundingDate": "2023",
  "nonprofitStatus": "Nonprofit501c3",
  "taxID": "99-1313589",
  "founder": { "@type": "Person", "name": "Nick Kremers", "description": "Stroke survivor and founder of Stroke Lyfe" },
  "contactPoint": { "@type": "ContactPoint", "email": "info@strokelyfe.org", "contactType": "general" },
  "sameAs": ["https://strokelyfe.org"],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/stories?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  noindex?: boolean;
  extraSchemas?: object[];
}

export default function SEO({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  publishedAt,
  modifiedAt,
  author,
  noindex = false,
  extraSchemas = [],
}: SEOProps) {
  const pageTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    document.title = pageTitle;

    upsertMeta('meta[name="description"]', "content", description);
    upsertMeta('meta[name="robots"]', "content", noindex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");

    upsertLink("canonical", canonicalUrl);

    upsertMeta('meta[property="og:title"]', "content", pageTitle);
    upsertMeta('meta[property="og:description"]', "content", description);
    upsertMeta('meta[property="og:url"]', "content", canonicalUrl);
    upsertMeta('meta[property="og:type"]', "content", type);
    upsertMeta('meta[property="og:image"]', "content", ogImage);
    upsertMeta('meta[property="og:site_name"]', "content", SITE_NAME);

    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", pageTitle);
    upsertMeta('meta[name="twitter:description"]', "content", description);
    upsertMeta('meta[name="twitter:image"]', "content", ogImage);

    const schemas: object[] = [ORG_SCHEMA, WEBSITE_SCHEMA, ...extraSchemas];

    if (type === "article" && publishedAt) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "datePublished": publishedAt,
        "dateModified": modifiedAt ?? publishedAt,
        "author": { "@type": "Person", "name": author ?? "Nick Kremers" },
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/assets/logo-dark.png` },
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
      });
    }

    upsertJsonLd("ld-json-page", schemas);
  }, [pageTitle, description, canonicalUrl, type, ogImage, publishedAt, modifiedAt, author, noindex, extraSchemas]);

  return null;
}
