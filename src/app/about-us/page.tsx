import React from "react";
import type { Metadata } from "next";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./AboutUs.module.scss";

export const metadata: Metadata = {
  title: "About Us — Mind Detoxx | Surat",
  description:
    "A room in Surat where the week gets put down. Mind Detoxx opened on VIP Road with release first, effort second.",
};

export default function AboutUsPage() {
  return (
    <>
      {/* Dynamic 3D WebGL particle background & aurora glow */}
      <Background />

      {/* Main navigation */}
      <Navbar />

      <main className={styles.pageWrapper}>
        {/* ───────── Section 1: Hero Philosophy (Shape 0 · Torus) ───────── */}
        <section className={styles.heroSection} data-shape="0">
          <div className={styles.container}>
            <span className={styles.eyebrow}>ABOUT MIND DETOXX</span>

            <h1 className={styles.headline}>
              A room in Surat where the week gets
              <br />
              put down.
            </h1>

            <p className={styles.introParagraph}>
              Mind DetoxX opened in [YEAR] on VIP Road with one singing bowl and a
              handful of mats. It now runs twelve practices across four batch times a
              day, and the idea behind it has not moved: release first, effort second.
            </p>

            <div className={styles.pillarGrid}>
              <div className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Release before effort</h3>
                <p className={styles.pillarText}>
                  Sound and breath settle the nervous system before anyone is asked
                  to hold a posture. It is why beginners last here.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Small batches</h3>
                <p className={styles.pillarText}>
                  Capped at [N] mats so the teacher can correct you by name rather
                  than shout over a room.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Nobody keeps up</h3>
                <p className={styles.pillarText}>
                  Every sequence is taught in three levels at once. You work at
                  yours, not at the pace of the next mat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Section 2: Who teaches you (Shape 1 · Galaxy) ───────── */}
        <section className={styles.teachersSection} data-shape="1">
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Who teaches you</h2>
            <p className={styles.sectionSubtitle}>
              Swap these for real photographs and bios — a face and a certification do
              more for bookings than any other block on the site.
            </p>

            <div className={styles.teachersGrid}>
              {/* Teacher 1: Founder */}
              <div className={styles.teacherCard}>
                <div className={styles.photoBox}>
                  <span className={styles.photoLabel}>[PHOTO — FOUNDER]</span>
                </div>
                <div className={styles.teacherInfo}>
                  <h4 className={styles.teacherName}>[FOUNDER NAME]</h4>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>FOUNDER</span>
                    <span className={styles.badge}>SOUND HEALING</span>
                  </div>
                  <p className={styles.teacherBio}>[Training and years of practice.]</p>
                </div>
              </div>

              {/* Teacher 2: Yoga Coach */}
              <div className={styles.teacherCard}>
                <div className={styles.photoBox}>
                  <span className={styles.photoLabel}>[PHOTO — YOGA COACH]</span>
                </div>
                <div className={styles.teacherInfo}>
                  <h4 className={styles.teacherName}>[COACH NAME]</h4>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>YOGA</span>
                    <span className={styles.badge}>WEIGHT LOSS</span>
                  </div>
                  <p className={styles.teacherBio}>[Training and years of practice.]</p>
                </div>
              </div>

              {/* Teacher 3: Aerial Coach */}
              <div className={styles.teacherCard}>
                <div className={styles.photoBox}>
                  <span className={styles.photoLabel}>[PHOTO — AERIAL COACH]</span>
                </div>
                <div className={styles.teacherInfo}>
                  <h4 className={styles.teacherName}>[COACH NAME]</h4>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>AERIAL YOGA</span>
                    <span className={styles.badge}>BUNGEE</span>
                  </div>
                  <p className={styles.teacherBio}>[Training and years of practice.]</p>
                </div>
              </div>

              {/* Teacher 4: Dance Coach */}
              <div className={styles.teacherCard}>
                <div className={styles.photoBox}>
                  <span className={styles.photoLabel}>[PHOTO — DANCE COACH]</span>
                </div>
                <div className={styles.teacherInfo}>
                  <h4 className={styles.teacherName}>[COACH NAME]</h4>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>ZUMBA</span>
                    <span className={styles.badge}>BELLY DANCE</span>
                  </div>
                  <p className={styles.teacherBio}>[Training and years of practice.]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Section 3: The studio (Shape 2 · Wave) ───────── */}
        <section className={styles.studioSection} data-shape="2">
          <div className={styles.container}>
            <div className={styles.studioGrid}>
              <div className={styles.studioPhotoBox}>
                <span className={styles.photoLabel}>
                  [PHOTO — THE MAIN STUDIO ROOM]
                </span>
              </div>

              <div className={styles.studioContent}>
                <h2 className={styles.studioHeading}>The studio</h2>
                <p className={styles.studioDescription}>
                  [SQ FT] on the second floor of the International Business Center,
                  with daylight on two sides and rigging points for the silks.
                  Mats, bolsters, blocks and bowls are all here — bring nothing.
                </p>

                <div className={styles.studioAddress}>
                  <p>207, 2nd Floor, International Business Center</p>
                  <p>VIP Road, Surat — 395007</p>
                </div>

                <a
                  href="https://maps.google.com/?q=International+Business+Center+VIP+Road+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
