import type { Metadata } from "next";
import StudioRentalContent from "@/features/client/studio-rental/StudioRentalContent";

export const metadata: Metadata = {
  title: "Studio on Rent — Weekend Practice Space | Mind Detoxx Surat",
  description:
    "Our room. Your practice. Weekends. The Mind Detoxx studio on VIP Road, Surat is vacant on Saturdays and Sundays for yoga teachers, workshops, sound healing practitioners, and photo shoots.",
};

export default function StudioOnRentPage() {
  return (
    <main>
      <StudioRentalContent />
    </main>
  );
}
