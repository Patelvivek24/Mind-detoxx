import type { Metadata } from "next";
import ActivitiesContent from "@/features/client/activities/ActivitiesContent";

export const metadata: Metadata = {
  title: "Twelve Practices — Mind Detoxx | Surat",
  description:
    "Pick the one that matches what you are carrying. Twelve practices across movement, stillness, healing, and guidance at Mind Detoxx Surat.",
};

export default function ActivitiesPage() {
  return (
    <main>
      <ActivitiesContent />
    </main>
  );
}
