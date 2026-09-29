import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScheduleClient from "./ScheduleClient";

export const metadata: Metadata = {
  title: "Schedule & Membership — Mind Detoxx | Surat",
  description:
    "One weekly rhythm. Four batch times. Pick yours. View our complete weekly schedule, weekday rhythm, membership packages, and book your first class at Mind Detoxx Surat.",
};

export default function SchedulePage() {
  return (
    <>
      {/* Main navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <ScheduleClient />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
