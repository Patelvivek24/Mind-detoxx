import React from "react";
import type { Metadata } from "next";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import StudioRentalClient from "./StudioRentalClient";

export const metadata: Metadata = {
  title: "Studio on Rent — Weekend Practice Space | Mind Detoxx Surat",
  description:
    "Our room. Your practice. Weekends. The Mind Detoxx studio on VIP Road, Surat is vacant on Saturdays and Sundays for yoga teachers, workshops, sound healing practitioners, and photo shoots.",
};

export default function StudioOnRentPage() {
  return (
    <>
      {/* 3D dynamic particle background & cosmic glow */}
      <Background />

      {/* Global navbar */}
      <Navbar />

      {/* Main Studio on Rent page content */}
      <main>
        <StudioRentalClient />
      </main>

      {/* Global footer */}
      <Footer />
    </>
  );
}
