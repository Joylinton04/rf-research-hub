import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import {
  siteDescription,
  siteName,
  siteShortName,
  siteUrlObject,
} from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Every relative URL below — and every `alternates.canonical` on a page —
  // resolves against this. See lib/site.ts for where the origin comes from.
  metadataBase: siteUrlObject,
  title: {
    // Pages set a bare title ("Gallery") and the template adds the suffix, so
    // the site name is written once rather than in every page's metadata.
    default: siteName,
    template: `%s — ${siteShortName}`,
  },
  description: siteDescription,
  applicationName: siteShortName,
  // Named rather than listed as keywords: search engines ignore the keywords
  // meta, but authorship and publisher are read.
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  // No images here on purpose — link previews are a separate job. The text
  // tags still give crawlers and chat apps a title and summary to work with.
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
    locale: "en_GH",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Lets Google show full-length snippets and full-size image previews
      // instead of the conservative defaults it falls back to.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // The contact page links phone numbers itself, so iOS does not need to
  // guess at other digit strings and turn them into dial links.
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

