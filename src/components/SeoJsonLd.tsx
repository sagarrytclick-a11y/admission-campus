import { SITE_IDENTITY } from "@/site-identity";

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_IDENTITY.name,
    description: SITE_IDENTITY.description,
    url: SITE_URL,
    logo: `${SITE_URL}${SITE_IDENTITY.assets.logo.main}`,
    email: SITE_IDENTITY.contact.email.support,
    telephone: SITE_IDENTITY.contact.phone.raw,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_IDENTITY.contact.address.office,
      addressLocality: SITE_IDENTITY.contact.address.city,
      addressCountry: SITE_IDENTITY.contact.address.country,
    },
    sameAs: Object.values(SITE_IDENTITY.contact.socials).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_IDENTITY.name,
    url: SITE_URL,
    description: SITE_IDENTITY.meta.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/colleges?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function CollegeJsonLd({
  name,
  description,
  url,
  image,
  city,
  country,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  city?: string;
  country?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name,
    description: description.slice(0, 300),
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    ...(image
      ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : {}),
    ...(city || country
      ? {
          address: {
            "@type": "PostalAddress",
            ...(city ? { addressLocality: city } : {}),
            ...(country ? { addressCountry: country } : {}),
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description.slice(0, 300),
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    ...(image
      ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
      : {}),
    ...(datePublished
      ? { datePublished: new Date(datePublished).toISOString() }
      : {}),
    ...(dateModified
      ? { dateModified: new Date(dateModified).toISOString() }
      : {}),
    author: {
      "@type": "Organization",
      name: SITE_IDENTITY.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_IDENTITY.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_IDENTITY.assets.logo.main}`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

/** Collection / listing page ItemList for college catalogues */
export function ItemListJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: description.slice(0, 300),
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 50).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
