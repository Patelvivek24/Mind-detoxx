import React from "react";
import type { Metadata } from "next";
import Background from "@/components/Background/Background";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Twelve Practices — Mind Detoxx | Surat",
  description:
    "Pick the one that matches what you are carrying. Twelve practices across movement, stillness, healing, and guidance at Mind Detoxx Surat.",
};

export default function ActivitiesPage() {
  return (
    <>
      {/* Dynamic 3D WebGL particle background & aurora glow */}
      <Background />

      {/* Main navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <ActivitiesClient />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
