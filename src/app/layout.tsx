import { getBaseUrl } from "@/lib/url-utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Waitlist LP Template",
    default: "Waitlist LP Template",
  },
  metadataBase: new URL(await getBaseUrl()),
  description: "Waitlist LP Template",
  keywords: [],
  openGraph: {
    title: "Waitlist LP Template",
    description: "Waitlist LP Template",
    type: "website",
    locale: "ja_JP",
    images: ["/opengraph-image.png", "/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waitlist LP Template",
    description: "Waitlist LP Template",
    images: ["/opengraph-image.png", "/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}
