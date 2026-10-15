import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import "@/styles/client/globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Page not found | Mind Detoxx",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "4rem", color: "var(--cyan)" }}>404</h1>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
              This page does not exist.
            </p>
            <Link href="/" style={{ color: "var(--green)" }}>
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
