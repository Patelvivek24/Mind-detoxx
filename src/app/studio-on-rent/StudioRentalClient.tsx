"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./StudioRental.module.scss";

interface RateOption {
  id: string;
  tag: string;
  price: string;
  period: string;
  description: string;
  durationValue: string;
}

const rateOptions: RateOption[] = [
  {
    id: "hourly",
    tag: "WEEKEND HOURLY",
    price: "₹1,500",
    period: "PER HOUR",
    description: "Saturday and Sunday, minimum 2 hours per booking.",
    durationValue: "2 Hours (Minimum)",
  },
  {
    id: "half-day",
    tag: "HALF DAY / 4 HOURS",
    price: "₹5,500",
    period: "4 CONSECUTIVE HOURS",
    description: "Outside our regular batch times, subject to the studio calendar.",
    durationValue: "Half Day (4 Hours)",
  },
  {
    id: "full-day",
    tag: "FULL DAY / 8+ HOURS",
    price: "₹9,500",
    period: "FULL DAY ACCESS",
    description: "For immersive workshops, teacher trainings and shoots that need the room all day.",
    durationValue: "Full Day (8+ Hours)",
  },
];

export default function StudioRentalClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    duration: "2 Hours (Minimum)",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSelectRate = (durationVal: string) => {
    setFormData((prev) => ({ ...prev, duration: durationVal }));
    const element = document.getElementById("check-date");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hi Mind Detoxx Surat, I would like to check studio rental availability for weekends:\n\n• Name: ${
      formData.fullName || "Not specified"
    }\n• WhatsApp: ${formData.phone || "Not specified"}\n• Date: ${
      formData.date || "Not specified"
    }\n• Hours Needed: ${formData.duration}\n• What's it for: ${
      formData.purpose || "Studio Practice / Workshop"
    }\n\nPlease let me know if this slot is available and share terms.`;

    const encodedText = encodeURIComponent(text);
    // WhatsApp URL to Mind Detoxx Surat (+91 99790 61803 or +91 99792 61002)
    window.open(`https://wa.me/919979061803?text=${encodedText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ───────────────────────── SECTION 1: HERO ───────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className={styles.eyebrow}>STUDIO ON RENT</span>
              <h1 className={styles.headline}>
                Our room. Your practice. <span className={styles.goldText}>Weekends.</span>
              </h1>
              <p className={styles.introParagraph}>
                The studio is vacant on Saturdays and Sundays for yoga teachers, workshop leaders, sound healing practitioners, and creative movements to gather, host, or practice together.
              </p>

              <div className={styles.pricingActionBlock}>
                <div className={styles.priceCallout}>
                  <span className={styles.priceAmount}>₹1,500</span>
                  <span className={styles.priceUnit}>/ PER HOUR · SATURDAY &amp; SUNDAY</span>
                </div>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => {
                    const el = document.getElementById("check-date");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request date &amp; time
                </button>
              </div>
            </div>

            {/* Glowing Cosmic Aura Art */}
            <div className={styles.heroRight}>
              <div className={styles.cosmicPortal}>
                <div className={styles.portalRingOuter}></div>
                <div className={styles.portalRingMiddle}></div>
                <div className={styles.portalCenterGlow}></div>
                <div className={styles.portalSparkles}></div>
              </div>
            </div>
          </div>

          {/* 3 Photo Cards */}
          <div className={styles.photoGrid}>
            <div className={styles.photoCard}>
              <div className={styles.photoContainer}>
                <Image
                  src="/images/studio-main-room.jpg"
                  alt="Studio Main Room, Wide View"
                  fill
                  className={styles.photoImg}
                  priority
                />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoTag}>PHOTO — MAIN ROOM, WIDE</span>
                </div>
              </div>
            </div>

            <div className={styles.photoCard}>
              <div className={styles.photoContainer}>
                <Image
                  src="/images/studio-light-windows.jpg"
                  alt="Studio Daylight and Windows"
                  fill
                  className={styles.photoImg}
                  priority
                />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoTag}>PHOTO — LIGHT / WINDOWS</span>
                </div>
              </div>
            </div>

            <div className={styles.photoCard}>
              <div className={styles.photoContainer}>
                <Image
                  src="/images/studio-props-storage.jpg"
                  alt="Studio Props and Equipment Storage"
                  fill
                  className={styles.photoImg}
                  priority
                />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoTag}>PHOTO — PROPS / STORAGE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── SECTION 2: THE SPACE ───────────────────────── */}
      <section className={styles.theSpaceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The space</h2>

          {/* 4 Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>25 – 30</span>
              <span className={styles.statLabel}>[MAX CAPACITY]</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>1,200</span>
              <span className={styles.statLabel}>[SQ FT TOTAL AREA]</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>2nd floor</span>
              <span className={styles.statLabel}>ELEVATOR ACCESS</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>Sat &amp; Sun</span>
              <span className={styles.statLabel}>[HOURS AVAILABLE] (6 AM – 9 PM)</span>
            </div>
          </div>

          {/* Two Large Detail Cards Side-by-Side */}
          <div className={styles.detailsGrid}>
            {/* Left Card: What comes with the room */}
            <div className={styles.detailCard}>
              <h3 className={styles.cardHeading}>What comes with the room</h3>
              <ul className={styles.featureList}>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>Yoga mats, bolsters and blocks</span>
                </li>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>Bluetooth sound system</span>
                </li>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>Air conditioning and drinking water</span>
                </li>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>Changing area and restroom</span>
                </li>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>
                    <strong>Premium wooden flooring</strong> — ideal &amp; comfortable for barefoot practice
                  </span>
                </li>
                <li>
                  <span className={styles.bulletDot}></span>
                  <span>Dimmable warm fixtures &amp; ample natural sunlight</span>
                </li>
              </ul>
            </div>

            {/* Right Card: Who books it */}
            <div className={styles.detailCard}>
              <h3 className={styles.cardHeading}>Who books it</h3>
              <div className={styles.audienceList}>
                <div className={styles.audienceItem}>
                  <h4>Independent teachers</h4>
                  <p>Run your own classes and workshops without a long term agreement.</p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Weekend and one-day events</h4>
                  <p>Sound healing, meditation, art &amp; therapy, flower mandalas.</p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Corporate wellness sessions</h4>
                  <p>Bring a team for an afternoon. We can supply the teacher too.</p>
                </div>
                <div className={styles.audienceItem}>
                  <h4>Photo and video shoots</h4>
                  <p>Daylight on two sides, neutral walls, no fixed signage in room.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── SECTION 3: RATES ───────────────────────── */}
      <section className={styles.ratesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Rates</h2>

          <div className={styles.ratesGrid}>
            {rateOptions.map((rate) => (
              <div
                key={rate.id}
                className={`${styles.rateCard} ${
                  formData.duration === rate.durationValue ? styles.selectedRate : ""
                }`}
                onClick={() => handleSelectRate(rate.durationValue)}
              >
                <span className={styles.rateTag}>{rate.tag}</span>
                <div className={styles.ratePriceRow}>
                  <span className={styles.ratePrice}>{rate.price}</span>
                  <span className={styles.ratePeriod}>/ {rate.period}</span>
                </div>
                <p className={styles.rateDesc}>{rate.description}</p>
                <button
                  type="button"
                  className={styles.rateSelectBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectRate(rate.durationValue);
                  }}
                >
                  {formData.duration === rate.durationValue ? "Selected" : "Select this slot"}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.finePrintNotes}>
            <p>• A 50% advance confirms the slot. Cancellations more than 48 hours ahead are refunded in full.</p>
            <p>• Please leave the room as you found it — mats stacked, windows shut.</p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── SECTION 4: CHECK A DATE ───────────────────────── */}
      <section id="check-date" className={styles.bookingSection}>
        <div className={styles.container}>
          <div className={styles.bookingBox}>
            <div className={styles.bookingHeader}>
              <h2 className={styles.bookingTitle}>Check a date</h2>
              <p className={styles.bookingSubtitle}>
                Tell us the day and time you&apos;d like. We reply on WhatsApp with availability and terms.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">Your name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">WhatsApp number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 ..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="duration">Hours needed</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                    >
                      <option value="2 Hours (Minimum)">2 Hours (Minimum)</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="Half Day (4 Hours)">Half Day (4 Hours)</option>
                      <option value="Full Day (8+ Hours)">Full Day (8+ Hours)</option>
                      <option value="Custom Duration">Custom Duration</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="purpose">What&apos;s it for?</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={4}
                  placeholder="A yoga workshop, sound bath, photo shoot, corporate session..."
                  value={formData.purpose}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className={styles.submitRow}>
                <button type="submit" className={styles.submitBtn}>
                  Send to WhatsApp
                </button>
                <span className={styles.orCallText}>
                  or call{" "}
                  <a href="tel:+919979261002" className={styles.phoneLink}>
                    +91 99792 61002
                  </a>
                  {" / "}
                  <a href="tel:+919979061803" className={styles.phoneLink}>
                    +91 99790 61803
                  </a>
                </span>
              </div>

              {submitted && (
                <div className={styles.successMessage}>
                  ✓ Request created! Opening WhatsApp to chat with our studio team directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
