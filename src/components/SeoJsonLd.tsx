import { SITE_IDENTITY } from "@/site-identity";

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
