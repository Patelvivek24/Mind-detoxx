import type { Metadata } from "next";
import RetreatsContent from "@/features/client/retreats/RetreatsContent";

export const metadata: Metadata = {
  title: "Retreats, Events & Workshops — Mind Detoxx | Surat",
  description:
    "A few times a year we take the practice somewhere else. Festivals, studio collaborations, floating sound baths, aqua yoga, and immersive wellness retreats by Mind Detoxx Surat.",
};

export default function RetreatsPage() {
  return (
    <main>
      <RetreatsContent />
    </main>
  );
}
