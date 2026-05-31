import type { Metadata } from "next";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAISON FOURRURE | Luxury Fur Fashion House",
  description:
    "Discover the world's finest fur fashion. Maison Fourrure offers premium fur coats, stoles, accessories, and home decor. 18+ restricted entry.",
  keywords: [
    "luxury fur",
    "fur coats",
    "mink",
    "sable",
    "fox fur",
    "fashion",
    "boutique",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
