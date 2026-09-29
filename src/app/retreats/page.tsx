import React from "react";
import type { Metadata } from "next";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RetreatsClient from "@/app/retreats/RetreatsClient";

export const metadata: Metadata = {
  title: "Retreats, Events & Workshops — Mind Detoxx | Surat",
  description:
    "A few times a year we take the practice somewhere else. Festivals, studio collaborations, floating sound baths, aqua yoga, and immersive wellness retreats by Mind Detoxx Surat.",
};

export default function RetreatsPage() {
  return (
    <>
      {/* Dynamic 3D WebGL particle background & cosmic glow */}
      <Background />

      {/* Main navigation */}
      <Navbar />

      {/* Main retreats content */}
      <main>
        <RetreatsClient />
      </main>

      {/* Global footer */}
      <Footer />
    </>
  );
}
