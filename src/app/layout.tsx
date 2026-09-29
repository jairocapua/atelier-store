import type { Metadata } from "next";
import { Albert_Sans, Bodoni_Moda } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// UI face: a geometric sans with a real 100–900 weight range, used for all
// functional text. globals.css maps it to --font-sans.
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

// Display face: reserved for editorial moments (type-display). The optical-size
// axis sharpens its hairlines automatically at large sizes.
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Atelier",
    template: "%s | Atelier",
  },
  description:
    "Ready-to-wear, leather goods and shoes from Atelier, made in small runs and repaired for life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${bodoniModa.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
