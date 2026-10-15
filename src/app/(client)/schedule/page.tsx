import type { Metadata } from "next";
import ScheduleContent from "@/features/client/schedule/ScheduleContent";

export const metadata: Metadata = {
  title: "Schedule & Membership — Mind Detoxx | Surat",
  description:
    "One weekly rhythm. Four batch times. Pick yours. View our complete weekly schedule, weekday rhythm, membership packages, and book your first class at Mind Detoxx Surat.",
};

export default function SchedulePage() {
  return (
    <main>
      <ScheduleContent />
    </main>
  );
}
