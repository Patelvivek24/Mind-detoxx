"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import LightboxModal from "@/components/client/ui/LightboxModal/LightboxModal";
import { STUDIO_GALLERY_PHOTOS, type StudioPhoto } from "@/data/client/retreats";
import { RETREATS_WHATSAPP } from "@/data/client/contact";
import { openWhatsApp } from "@/lib/whatsapp";
import { retreatEnquiry } from "./retreatEnquiry";
import styles from "./Retreats.module.scss";

interface GalleryPhotoProps {
  photo: StudioPhoto;
  onOpen: (photo: StudioPhoto) => void;
}

function GalleryPhoto({ photo, onOpen }: GalleryPhotoProps) {
  return (
    <div
      className={styles.photoCard}
      onClick={() => onOpen(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${photo.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(photo);
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
  );
}

/** Section 3: "From the studio" — 5 + 3 photo grid with a lightbox preview. */
export default function StudioGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<StudioPhoto | null>(null);

  return (
    <section className={styles.studioSection} data-shape="2">
      <Container className={styles.container}>
        <h2 className={styles.sectionHeading}>From the studio</h2>

        <div className={styles.galleryGrid}>
          {/* Top row: 5 items */}
          <div className={styles.galleryRowTop}>
            {STUDIO_GALLERY_PHOTOS.slice(0, 5).map((photo) => (
              <GalleryPhoto key={photo.id} photo={photo} onOpen={setSelectedPhoto} />
            ))}
          </div>

          {/* Bottom row: 3 items */}
          <div className={styles.galleryRowBottom}>
            {STUDIO_GALLERY_PHOTOS.slice(5, 8).map((photo) => (
              <GalleryPhoto key={photo.id} photo={photo} onOpen={setSelectedPhoto} />
            ))}
          </div>
        </div>
      </Container>

      <LightboxModal
        show={Boolean(selectedPhoto)}
        onHide={() => setSelectedPhoto(null)}
        photo={selectedPhoto}
        onBookSession={(title) =>
          openWhatsApp(RETREATS_WHATSAPP, retreatEnquiry(`Enquiring about session: ${title}`))
        }
      />
    </section>
  );
}
