"use client";

import React from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import styles from "./LightboxModal.module.scss";
import type { StudioPhoto } from "@/data/retreats";

interface LightboxModalProps {
  show: boolean;
  onHide: () => void;
  photo: StudioPhoto | null;
  onBookSession?: (title: string) => void;
}

export default function LightboxModal({
  show,
  onHide,
  photo,
  onBookSession,
}: LightboxModalProps) {
  if (!photo) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className={styles.modalRoot}
      contentClassName={styles.modalContent}
      aria-labelledby="lightbox-photo-title"
    >
      <div className={styles.modalInner}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onHide}
          aria-label="Close photo preview"
        >
          ✕
        </button>

        <div className={styles.imageContainer}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={900}
            height={560}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.metaInfo}>
            <h3 id="lightbox-photo-title" className={styles.photoTitle}>
              {photo.title}
            </h3>
            <p className={styles.photoCaption}>{photo.caption}</p>
          </div>

          {onBookSession && (
            <button
              type="button"
              className={styles.bookBtn}
              onClick={() => onBookSession(photo.title)}
            >
              <span>Book Practice</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
