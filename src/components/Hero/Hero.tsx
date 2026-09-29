"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may need user gesture on some strict browser configurations
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Video Banner */}
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          src="/video/gemini_generated_video_73472afa.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        <div className={styles.videoOverlay} />
        <div className={styles.vignetteOverlay} />
      </div>

      {/* Main Content Hero Flow */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.kickerBadge}>
            <span className={styles.livePulse} />
            <span className={styles.kickerText}>
              YOGA &bull; BREATHWORK &bull; RETREATS
            </span>
          </div>

          <h1 className={styles.mainHeading}>
            Detox the mind,
            <br />
            in motion
          </h1>

          <p className={styles.description}>
            A calm space to slow down, unclutter your thoughts and come back to
            yourself — one breath at a time. A yoga &amp; wellness studio on VIP
            Road, Surat.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#contact" className={styles.primaryBtn}>
              Book a Class
            </Link>
            <Link href="/schedule" className={styles.secondaryBtn}>
              See Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Video Interactive Controls Floating in Corner */}
      <div className={styles.videoControls} aria-label="Video controls">
        <button
          type="button"
          onClick={togglePlay}
          className={styles.controlBtn}
          aria-label={
            isPlaying ? "Pause background video" : "Play background video"
          }
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className={styles.controlBtn}
          aria-label={
            isMuted ? "Unmute background video" : "Mute background video"
          }
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {/* Ambient bottom blend edge */}
      <div className={styles.bottomBlendEdge} aria-hidden="true" />
    </section>
  );
}
