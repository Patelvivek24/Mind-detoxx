import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/client/globals.css";
import Background from "@/components/client/layout/Background/Background";
import Navbar from "@/components/client/layout/Navbar/Navbar";
import Footer from "@/components/client/layout/Footer/Footer";
import { NAVIGATION } from "@/data/client/navigation";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mind Detoxx — Detox the mind, Elevate the soul",
  description:
    "A calm space to slow down, unclutter your thoughts and come back to yourself — one breath at a time. A yoga & wellness studio on VIP Road, Surat.",
};

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Persistent 3D Interactive Galaxy & Mind Background */}
        <Background />
        <Navbar navigation={NAVIGATION} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
