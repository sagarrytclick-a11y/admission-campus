import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SITE_IDENTITY } from "@/site-identity";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/SeoJsonLd";
import "./globals.css";
import { FormModalProvider } from "@/context/FormModalContext";
import { FormModal } from "@/components/FormModal";
import { QueryProvider } from "@/providers/QueryProvider";
import { PopupProvider } from "@/context/PopupContext";
import { LayoutBody } from "@/components/LayoutBody";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = `https://${SITE_IDENTITY.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_IDENTITY.meta.title,
    template: `%s | ${SITE_IDENTITY.name}`,
  },
  description: SITE_IDENTITY.meta.description,
  keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
  applicationName: SITE_IDENTITY.name,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_IDENTITY.name,
    images: [
      {
        url: SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main,
        width: 1200,
        height: 630,
        alt: SITE_IDENTITY.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_IDENTITY.brand.primaryColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className} font-sans`}>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="font-sans antialiased bg-[#F4F7FC] text-[#0F172A]">
        <QueryProvider>
          <FormModalProvider>
            <PopupProvider>
              <LayoutBody>{children}</LayoutBody>
              <FormModal />
            </PopupProvider>
          </FormModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
