"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Hero.module.scss";
import { HERO_DATA, type HeroContent } from "@/data/hero";

interface HeroProps {
  readonly data?: HeroContent;
}

export default function Hero({ data = HERO_DATA }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Handle autoplay and user motion preferences
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Attempt autoplay; browser autoplay policy rejection is caught cleanly
    video.play().catch(() => {
      // Playback was prevented (e.g. low-power mode or strict autoplay policy)
    });
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  return (
    <section id="home" className={styles.heroSection} aria-label="Hero Section">
      {/* Background Video Banner */}
      <div className={styles.videoContainer} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          poster={data.video.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
        >
          <source src={data.video.src} type={data.video.type || "video/mp4"} />
          {data.video.fallbackMessage}
        </video>
        <div className={styles.videoOverlay} />
        <div className={styles.vignetteOverlay} />
      </div>

      {/* Main Content Hero Flow */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          {/* Kicker badge */}
          {data.kicker.items.length > 0 && (
            <div className={styles.kickerBadge}>
              {data.kicker.pulse && (
                <span className={styles.livePulse} aria-hidden="true" />
              )}
              <span className={styles.kickerText}>
                {data.kicker.items.join(` ${data.kicker.separator || "•"} `)}
              </span>
            </div>
          )}

          {/* Accessible main heading */}
          <h1 className={styles.mainHeading}>
            <span>{data.heading.line1}</span>
            <br />
            <span className={styles.headingAccent}>{data.heading.line2}</span>
          </h1>

          {/* Descriptive text */}
          <p className={styles.description}>{data.description}</p>

          {/* Action Callouts */}
          {data.ctas.length > 0 && (
            <div className={styles.ctaGroup}>
              {data.ctas.map((cta) => {
                const isPrimary = cta.variant === "primary";
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={
                      isPrimary ? styles.primaryBtn : styles.secondaryBtn
                    }
                    aria-label={cta.ariaLabel || cta.label}
                  >
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Video Interactive Controls Floating in Corner */}
      <div
        className={styles.videoControls}
        role="toolbar"
        aria-label="Background video playback controls"
      >
        <button
          type="button"
          onClick={togglePlay}
          className={styles.controlBtn}
          aria-label={
            isPlaying
              ? data.controlsLabels.pause
              : data.controlsLabels.play
          }
          aria-pressed={isPlaying}
          title={
            isPlaying
              ? data.controlsLabels.pause
              : data.controlsLabels.play
          }
        >
          {isPlaying ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className={styles.controlBtn}
          aria-label={
            isMuted
              ? data.controlsLabels.unmute
              : data.controlsLabels.mute
          }
          aria-pressed={!isMuted}
          title={
            isMuted
              ? data.controlsLabels.unmute
              : data.controlsLabels.mute
          }
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
              aria-hidden="true"
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
              aria-hidden="true"
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
