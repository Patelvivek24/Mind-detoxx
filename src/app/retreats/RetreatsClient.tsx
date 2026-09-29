"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Retreats.module.scss";

interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  highlight: string;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "event-1",
    name: "Desert Sound & Silence Retreat",
    date: "Saturday, 24 October 2026",
    venue: "White Desert Camp",
    city: "Rann of Kutch",
    description:
      "An overnight immersion under open desert starlight featuring continuous singing bowl soundscapes, salt plain walking meditations, and sunrise pranayama.",
    highlight: "Includes eco-stay, Sattvic meals, and all bowls equipment",
  },
  {
    id: "event-2",
    name: "Monsoon Forest Breathwork Journey",
    date: "Fri 13 – Sun 15 November 2026",
    venue: "Eco Nature Sanctuary",
    city: "Saputara Hills",
    description:
      "Three restorative days of somatic breathwork, cold stream dipping, forest bathing and deep resonance surrounded by misty Western Ghat peaks.",
    highlight: "Capped at 14 mats for intimate personal guidance",
  },
  {
    id: "event-3",
    name: "Himalayan Sound Healing Immersion",
    date: "Thu 10 – Sun 13 December 2026",
    venue: "Ganga Riverside Ashram",
    city: "Rishikesh",
    description:
      "Sacred riverbank sunrise meditations, Tibetan singing bowl resonance training, Kundalini kriyas and extended silent contemplation.",
    highlight: "Advance registration required · Certificate of completion provided",
  },
  {
    id: "event-4",
    name: "Sunset Coastal Flow & Cacao Ceremony",
    date: "Sat 16 – Sun 17 January 2027",
    venue: "Oceanfront Pavilions",
    city: "Diu Coast",
    description:
      "Vinyasa waves synchronized with the tide, heart-opening ceremonial cacao, sunset gong immersion, and barefoot grounding on the shoreline.",
    highlight: "All levels welcome · Sound baths included",
  },
];

interface StudioPhoto {
  id: number;
  src: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
}

const studioPhotos: StudioPhoto[] = [
  {
    id: 1,
    src: "/images/sound-healing.jpg",
    alt: "Sound healing bowls at Mind Detoxx",
    tag: "[PHOTO]",
    title: "Sound Healing & Singing Bowls",
    caption: "Acoustic resonance to ease physical tension and settle the mind.",
  },
  {
    id: 2,
    src: "/images/meditation.jpg",
    alt: "Mindfulness and meditation practice",
    tag: "[PHOTO]",
    title: "Meditation & Mindfulness",
    caption: "Gentle breathwork and guided stillness for inner focus.",
  },
  {
    id: 3,
    src: "/images/aerial-yoga.jpg",
    alt: "Aerial yoga silks",
    tag: "[PHOTO]",
    title: "Aerial Yoga Silks",
    caption: "Weightless spinal decompression and fluid posture alignment.",
  },
  {
    id: 4,
    src: "/images/yoga.jpg",
    alt: "Traditional Ashtanga & Vinyasa yoga",
    tag: "[PHOTO]",
    title: "Traditional Asana Practice",
    caption: "Steady physical sequences rooted in classical breath control.",
  },
  {
    id: 5,
    src: "/images/weight-loss-yoga.jpg",
    alt: "Dynamic power flow",
    tag: "[PHOTO]",
    title: "Dynamic Power Flow",
    caption: "Core activation, stamina building, and metabolic vitality.",
  },
  {
    id: 6,
    src: "/images/zumba-belly-dance.jpg",
    alt: "Rhythmic movement and belly dance",
    tag: "[PHOTO]",
    title: "Rhythmic Movement & Dance",
    caption: "Expressive cardio release and joyful bodily rhythm.",
  },
  {
    id: 7,
    src: "/images/hero-chakra.jpg",
    alt: "Chakra alignment session",
    tag: "[PHOTO]",
    title: "Chakra Alignment",
    caption: "Harmonizing energetic centers through tonal vibration.",
  },
  {
    id: 8,
    src: "/images/aqua-pilates.jpg",
    alt: "Aqua pilates floating mats",
    tag: "[PHOTO]",
    title: "Aqua Floating Mat Practice",
    caption: "Core stability, water balance, and floating sound bath.",
  },
];

export default function RetreatsClient() {
  const [selectedPhoto, setSelectedPhoto] = useState<StudioPhoto | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleToggleEvent = (id: string) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  const openWhatsApp = (topic: string) => {
    const text = encodeURIComponent(
      `Hello Mind Detoxx, I would like to enquire about: ${topic}`
    );
    window.open(`https://wa.me/919426581803?text=${text}`, "_blank");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ───────── Section 1: Hero & Featured Retreat ───────── */}
      <section className={styles.heroSection} data-shape="0">
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              RETREATS, EVENTS &amp; WORKSHOPS
            </span>

            <h1 className={styles.headline}>
              A few times a year we take the
              <br />
              practice somewhere else.
            </h1>

            <p className={styles.introParagraph}>
              Festivals, collaborations with studios in other cities, floating
              sound baths — first-come basis, an advance booking is always
              required. Check the details below.
            </p>
          </div>

          {/* Featured Event Card: Aqua Pilates & Aqua Yoga */}
          <article className={styles.featuredCard}>
            <div className={styles.featuredImageContainer}>
              <Image
                src="/images/aqua-pilates.jpg"
                alt="Aqua pilates and aqua yoga session on floating pool mats"
                width={1200}
                height={640}
                priority
                className={styles.featuredImage}
              />
              <div className={styles.imageOverlayGradient} />
            </div>

            <div className={styles.featuredCardBody}>
              <span className={styles.eventKicker}>
                NEXT UP: IN THE AM/PM POOL
              </span>

              <h2 className={styles.eventTitle}>Aqua pilates &amp; aqua yoga</h2>

              <p className={styles.eventDescription}>
                Embrace the flow: strengthen your core / float, balance,
                transform — on mats in the pool, with floating sound healing
                included at no extra cost.
              </p>

              {/* 3-Column Metadata */}
              <div className={styles.metaGrid}>
                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>WHEN</span>
                  <span className={styles.metaValue}>Saturday, 19 September</span>
                  <span className={styles.metaSub}>18:00 – 21:00 hrs</span>
                </div>

                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>WHERE</span>
                  <span className={styles.metaValue}>Club Babylon</span>
                  <span className={styles.metaSub}>Ahmedabad</span>
                </div>

                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>BOOKINGS</span>
                  <span className={styles.metaValue}>Advance only</span>
                  <a
                    href="tel:+919426581803"
                    className={`${styles.metaSub} ${styles.metaLink}`}
                  >
                    +91 94265 81803
                  </a>
                </div>
              </div>

              {/* Tag Badges */}
              <div className={styles.tagsRow}>
                <span className={styles.tagPill}>Floating sound healing</span>
                <span className={styles.tagPill}>All levels · 16+ years</span>
                <span className={styles.tagPill}>
                  First session: floating sound bath
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={styles.reserveButton}
                onClick={() =>
                  openWhatsApp(
                    "Reserving a mat for Aqua Pilates & Aqua Yoga at Club Babylon"
                  )
                }
              >
                <span>Reserve a mat</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </article>

          {/* Important Notice Banner */}
          <div className={styles.noticeBanner}>
            <div>
              <span className={styles.noticeHighlight}>IMPORTANT NOTE:</span>
              Advance reservation is mandatory to reserve your mat.
            </div>
            <p>
              If you are arriving from out of town, we can recommend hotels
              within walking distance of the venue.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Section 2: Coming up ───────── */}
      <section className={styles.comingUpSection} data-shape="1">
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Coming up</h2>

          <div className={styles.eventsTableWrapper}>
            {upcomingEvents.map((evt) => {
              const isExpanded = expandedEventId === evt.id;
              return (
                <React.Fragment key={evt.id}>
                  <div
                    className={styles.eventRow}
                    onClick={() => handleToggleEvent(evt.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleEvent(evt.id);
                      }
                    }}
                  >
                    <div className={styles.eventRowCol}>
                      <span className={styles.rowLabelWireframe}>[EVENT NAME]</span>
                      <span className={styles.eventRowName}>{evt.name}</span>
                    </div>

                    <div className={styles.eventRowCol}>
                      <span className={styles.rowLabelWireframe}>[DATE]</span>
                      <span className={styles.eventRowDate}>{evt.date}</span>
                    </div>

                    <div className={styles.eventRowCol}>
                      <span className={styles.rowLabelWireframe}>[VENUE, CITY]</span>
                      <span className={styles.eventRowVenue}>
                        {evt.venue}, {evt.city}
                      </span>
                    </div>

                    <div className={styles.eventRowAction}>
                      <span className={styles.infoBadge}>
                        <span>{isExpanded ? "CLOSE" : "[INFO]"}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={styles.eventDetailsExpanded}>
                      <p>{evt.description}</p>
                      <p>
                        <strong style={{ color: "#2fe3c6" }}>Notice: </strong>
                        {evt.highlight}
                      </p>
                      <div className={styles.detailsActionRow}>
                        <button
                          type="button"
                          className={styles.reserveButton}
                          style={{ padding: "8px 20px", fontSize: "12.5px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsApp(`Registering for ${evt.name}`);
                          }}
                        >
                          <span>Enquire on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── Section 3: From the studio ───────── */}
      <section className={styles.studioSection} data-shape="2">
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>From the studio</h2>

          <div className={styles.galleryGrid}>
            {/* Top row: 5 items */}
            <div className={styles.galleryRowTop}>
              {studioPhotos.slice(0, 5).map((photo) => (
                <div
                  key={photo.id}
                  className={styles.photoCard}
                  onClick={() => setSelectedPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className={styles.photoImg}
                  />
                  <div className={styles.photoWireframeOverlay}>
                    <span className={styles.photoWireframeTag}>{photo.tag}</span>
                  </div>
                  <div className={styles.photoHoverCaption}>
                    <span className={styles.captionTitle}>{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row: 3 items */}
            <div className={styles.galleryRowBottom}>
              {studioPhotos.slice(5, 8).map((photo) => (
                <div
                  key={photo.id}
                  className={styles.photoCard}
                  onClick={() => setSelectedPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className={styles.photoImg}
                  />
                  <div className={styles.photoWireframeOverlay}>
                    <span className={styles.photoWireframeTag}>{photo.tag}</span>
                  </div>
                  <div className={styles.photoHoverCaption}>
                    <span className={styles.captionTitle}>{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Section 4: Find us ───────── */}
      <section className={styles.findUsSection} data-shape="3">
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Find us</h2>

          <div className={styles.findUsGrid}>
            {/* Left Column: Contact details */}
            <div className={styles.findUsInfo}>
              <div className={styles.infoBlock}>
                <span className={styles.blockLabel}>STUDIO</span>
                <p className={styles.blockText}>
                  207, 2nd Floor, International Business Center
                  <br />
                  VIP Road, Surat — 395007
                </p>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.blockLabel}>SPEAK TO US</span>
                <a href="tel:+919426581803" className={styles.blockLink}>
                  +91 94265 81803
                </a>
                <a
                  href="mailto:info@minddetoxx.com"
                  className={styles.blockLink}
                >
                  info@minddetoxx.com
                </a>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.blockLabel}>FIRST VISIT?</span>
                <p className={styles.blockText}>
                  Arrive ten minutes early, wear light yoga clothing. Mats,
                  cushions and blankets are all here.
                </p>
              </div>

              <button
                type="button"
                className={styles.whatsappButton}
                onClick={() =>
                  openWhatsApp(
                    "Hello Mind Detoxx, I would like to visit the studio."
                  )
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.14 7.42C8.98 7.42 8.72 7.48 8.5 7.72C8.28 7.96 7.66 8.54 7.66 9.72C7.66 10.9 8.52 12.03 8.64 12.19C8.76 12.35 10.33 14.78 12.75 15.82C13.33 16.07 13.78 16.22 14.13 16.33C14.71 16.51 15.24 16.49 15.66 16.43C16.13 16.36 17.11 15.84 17.31 15.28C17.51 14.72 17.51 14.24 17.45 14.14C17.39 14.04 17.23 13.98 16.99 13.86C16.75 13.74 15.57 13.16 15.35 13.08C15.13 13 14.97 12.96 14.81 13.2C14.65 13.44 14.19 13.98 14.05 14.14C13.91 14.3 13.77 14.32 13.53 14.2C13.29 14.08 12.51 13.83 11.59 13.01C10.88 12.37 10.4 11.58 10.26 11.34C10.12 11.1 10.25 10.97 10.37 10.85C10.48 10.74 10.62 10.56 10.74 10.42C10.86 10.28 10.9 10.18 10.98 10.02C11.06 9.86 11.02 9.72 10.96 9.6C10.9 9.48 10.42 8.3 10.22 7.82C10.02 7.34 9.82 7.41 9.68 7.41C9.53 7.41 9.35 7.42 9.14 7.42Z" />
                </svg>
                <span>Message on WhatsApp</span>
              </button>
            </div>

            {/* Right Column: Interactive Map Box */}
            <div className={styles.mapFrameContainer}>
              <div className={styles.mapHeaderWireframe}>
                <span className={styles.mapTag}>
                  [INTERACTIVE MAP — VIP ROAD, SURAT]
                </span>
                <a
                  href="https://maps.google.com/?q=International+Business+Center+VIP+Road+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "11px",
                    color: "#2fe3c6",
                    textDecoration: "underline",
                  }}
                >
                  Open in Maps ↗
                </a>
              </div>

              <iframe
                title="Mind Detoxx Studio Location - VIP Road, Surat"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2338148960144!2d72.77583!3d21.1431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05275e5555555%3A0x8888888888888888!2sInternational%20Business%20Center%2C%20VIP%20Road%2C%20Vesu%2C%20Surat%2C%20Gujarat%20395007!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Photo Lightbox Modal ───────── */}
      {selectedPhoto && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={800}
              height={500}
              className={styles.modalImage}
            />
            <div className={styles.modalDetails}>
              <div>
                <h3 className={styles.modalTitle}>{selectedPhoto.title}</h3>
                <p className={styles.modalCaption}>{selectedPhoto.caption}</p>
              </div>
              <button
                type="button"
                className={styles.reserveButton}
                style={{ padding: "8px 18px", fontSize: "12px" }}
                onClick={() =>
                  openWhatsApp(
                    `Enquiring about session: ${selectedPhoto.title}`
                  )
                }
              >
                <span>Book Practice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
