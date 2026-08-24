import type { Metadata } from "next";
import MainShell from "./MainShell";
import { SITE_IDENTITY } from "@/site-identity";

export const metadata: Metadata = {
  title: {
    default: SITE_IDENTITY.meta.title,
    template: `%s | ${SITE_IDENTITY.name}`,
  },
  description: SITE_IDENTITY.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    url: "/",
    siteName: SITE_IDENTITY.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainShell>{children}</MainShell>;
}
