import type { Metadata } from "next";
import AboutHero from "@/features/client/about/AboutHero";
import StudioIntro from "@/features/client/about/StudioIntro";
import styles from "@/features/client/about/AboutUs.module.scss";

export const metadata: Metadata = {
  title: "About Us — Mind Detoxx | Surat",
  description:
    "A room in Surat where the week gets put down. Mind Detoxx opened on VIP Road with release first, effort second.",
};

export default function AboutUsPage() {
  return (
    <main className={styles.pageWrapper}>
      <AboutHero />
      <StudioIntro />
    </main>
  );
}
