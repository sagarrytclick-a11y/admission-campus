import type { Metadata } from "next";
import MainShell from "./MainShell";
import { SITE_IDENTITY } from "@/site-identity";

export const metadata: Metadata = {
  title: {
    default: SITE_IDENTITY.meta.title,
    template: `%s | ${SITE_IDENTITY.name}`,
  },
  description: SITE_IDENTITY.meta.description,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainShell>{children}</MainShell>;
}
