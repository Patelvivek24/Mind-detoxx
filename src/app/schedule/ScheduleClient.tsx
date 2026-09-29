"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Schedule.module.scss";

interface ScheduleRow {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

const scheduleData: ScheduleRow[] = [
  {
    time: "6:00 – 7:00 AM",
    mon: "Yoga",
    tue: "Yoga",
    wed: "Yoga",
    thu: "Yoga",
    fri: "Yoga",
    sat: "Meditation",
  },
  {
    time: "8:00 – 9:00 AM",
    mon: "Weight loss yoga",
    tue: "Aerial yoga",
    wed: "Weight loss yoga",
    thu: "Aerial yoga",
    fri: "Weight loss yoga",
    sat: "Garbh sanskar",
  },
  {
    time: "12:00 – 1:00 PM",
    mon: "Sound healing",
    tue: "Sound healing",
    wed: "Sound healing",
    thu: "Sound healing",
    fri: "Sound healing",
    sat: "Tarot (by appt.)",
  },
  {
    time: "8:00 – 9:00 PM",
    mon: "Zumba",
    tue: "Belly dance",
    wed: "Air bungee",
    thu: "Zumba",
    fri: "Belly dance",
    sat: "Open practice",
  },
];

const weekdayHighlights = [
  {
    day: "MONDAY",
    title: "Yoga",
    description: "Strengthen the body, calm the mind.",
  },
  {
    day: "TUESDAY",
    title: "Sound healing",
    description: "Relax, release, restore.",
  },
  {
    day: "WEDNESDAY",
    title: "Aerial yoga",
    description: "Build strength, find balance.",
  },
  {
    day: "THURSDAY",
    title: "Sound healing",
    description: "Deep relaxation, inner harmony.",
  },
  {
    day: "FRIDAY",
    title: "Yoga",
    description: "Stretch, energise, feel the change.",
  },
];

const packagePlans = [
  {
    tier: "DROP-IN",
    price: "[YOUR PRICE]",
    description: "One session, any activity. Mat and props included.",
    isFeatured: false,
  },
  {
    tier: "MONTHLY",
    price: "₹3,500",
    description: "Per person, per month. Every session in your batch time, all four weeks.",
    isFeatured: true,
  },
  {
    tier: "GROUP OF FIVE",
    price: "₹3,000",
    description: "Per person, per month, when five of you join the same batch together.",
    isFeatured: false,
  },
  {
    tier: "QUARTERLY",
    price: "[YOUR PRICE]",
    description: "Three months, any batch time, one free guest pass a month.",
    isFeatured: false,
  },
];

const activityOptions = [
  "Yoga",
  "Weight loss yoga",
  "Aerial yoga",
  "Sound healing",
  "Air bungee",
  "Zumba",
  "Belly dance",
  "Meditation",
  "Garbh sanskar",
  "Tarot (by appt.)",
  "Open practice",
];

const batchOptions = [
  "6:00 – 7:00 AM",
  "8:00 – 9:00 AM",
  "12:00 – 1:00 PM",
  "8:00 – 9:00 PM",
];

export default function ScheduleClient() {
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(activityOptions[0]);
  const [selectedBatch, setSelectedBatch] = useState(batchOptions[0]);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = fullName.trim() || "Guest";
    const phone = whatsappNumber.trim() || "Not specified";

    const text = encodeURIComponent(
      `Hello Mind Detoxx Team! I would like to book my first class.\n\n• Name: ${name}\n• WhatsApp: ${phone}\n• Activity: ${selectedActivity}\n• Preferred Batch: ${selectedBatch}\n\nPlease confirm availability.`
    );

    const whatsappUrl = `https://wa.me/919979061803?text=${text}`;

    setStatusMessage("Opening WhatsApp to confirm your slot...");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setStatusMessage("Slot request sent! We will connect with you on WhatsApp shortly.");
    }, 1500);
  };

  return (
    <div className={styles.schedulePage}>
      {/* ───────── Hero Section (Shape 0 · Torus) ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>SCHEDULE &amp; MEMBERSHIP</span>

              <h1 className={styles.heroHeading}>
                One weekly rhythm. Four batch times.
                <br />
                Pick yours.
              </h1>

              <p className={styles.heroDescription}>
                The same schedule runs every week of the month. So it&apos;s easier
                to find a routine that fits you. Choose the slot that fits your week
                rather than having five different times.
              </p>
            </div>

            {/* Glowing cosmic ring portal from hero graphic */}
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.ringGlowBackdrop} />
              <Image
                src="/images/hero-chakra.jpg"
                alt="Mind Detoxx Cosmic Aura"
                width={520}
                height={520}
                className={styles.chakraImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Section 1: This week at the studio ───────── */}
      <section className={styles.timetableSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>This week at the studio</h2>

          <div className={styles.tableCard}>
            <div className={styles.tableResponsiveWrapper}>
              <table className={styles.timetable}>
                <thead>
                  <tr>
                    <th className={styles.colTime}>TIME</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, index) => (
                    <tr key={index}>
                      <td className={styles.timeCell}>{row.time}</td>
                      <td>{row.mon}</td>
                      <td>{row.tue}</td>
                      <td>{row.wed}</td>
                      <td>{row.thu}</td>
                      <td>{row.fri}</td>
                      <td>{row.sat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.tableNote}>
              Sunday is kept free for retreats, workshops and studio bookings
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Section 2: Your week, every week ───────── */}
      <section className={styles.weeklyRhythmSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Your week, every week</h2>
          <p className={styles.sectionIntro}>
            A healthier mind, a stronger body, a happier you. Monday to Friday,
            the same five sessions repeat through the month, so your body knows
            what is coming and can actually adapt to it.
          </p>

          <div className={styles.daysGrid}>
            {weekdayHighlights.map((item) => (
              <div key={item.day} className={styles.dayCard}>
                <span className={styles.dayBadge}>{item.day}</span>
                <h3 className={styles.dayTitle}>{item.title}</h3>
                <p className={styles.dayDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Section 3: Packages ───────── */}
      <section className={styles.packagesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Packages</h2>

          <div className={styles.packagesGrid}>
            {packagePlans.map((pkg) => (
              <div
                key={pkg.tier}
                className={`${styles.packageCard} ${
                  pkg.isFeatured ? styles.packageFeatured : ""
                }`}
              >
                <span className={styles.packageTier}>{pkg.tier}</span>
                <div className={styles.packagePrice}>{pkg.price}</div>
                <p className={styles.packageDescription}>{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Section 4: Book your first class ───────── */}
      <section className={styles.bookingSection} id="book">
        <div className={styles.container}>
          <div className={styles.bookingBox}>
            <div className={styles.bookingHeader}>
              <h2 className={styles.bookingTitle}>Book your first class</h2>
              <p className={styles.bookingSubtitle}>
                We confirm on WhatsApp within a few hours. No payment until you arrive.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <div className={styles.fieldsGrid}>
                {/* YOUR NAME */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="fullName" className={styles.label}>
                    YOUR NAME
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={styles.input}
                  />
                </div>

                {/* WHATSAPP NUMBER */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="whatsappNumber" className={styles.label}>
                    WHATSAPP NUMBER
                  </label>
                  <input
                    id="whatsappNumber"
                    type="tel"
                    required
                    placeholder="+91"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className={styles.input}
                  />
                </div>

                {/* ACTIVITY */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="activity" className={styles.label}>
                    ACTIVITY
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="activity"
                      value={selectedActivity}
                      onChange={(e) => setSelectedActivity(e.target.value)}
                      className={styles.select}
                    >
                      {activityOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* BATCH TIME */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="batchTime" className={styles.label}>
                    BATCH TIME
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="batchTime"
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className={styles.select}
                    >
                      {batchOptions.map((batch) => (
                        <option key={batch} value={batch}>
                          {batch}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  Request this slot
                </button>

                <div className={styles.directContactText}>
                  <span>or message us directly on </span>
                  <a
                    href="https://wa.me/919979061803"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directPhoneLink}
                  >
                    +91 99790 61803
                  </a>
                </div>
              </div>

              {statusMessage && (
                <div className={styles.statusToast} role="status">
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
