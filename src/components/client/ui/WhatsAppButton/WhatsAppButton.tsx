"use client";

import React from "react";
import { openWhatsApp } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  number: string;
  message: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Small client island that opens a prefilled WhatsApp chat, so the surrounding
 * section can stay a Server Component.
 */
export default function WhatsAppButton({
  number,
  message,
  className,
  style,
  children,
}: WhatsAppButtonProps) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        openWhatsApp(number, message);
      }}
    >
      {children}
    </button>
  );
}
