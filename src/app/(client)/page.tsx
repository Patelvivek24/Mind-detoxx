import Hero from "@/features/client/home/Hero/Hero";
import MantraTicker from "@/features/client/home/MantraTicker/MantraTicker";
import AboutPhilosophy from "@/features/client/home/AboutPhilosophy/AboutPhilosophy";
import HomeActivities from "@/features/client/home/HomeActivities/HomeActivities";
import HomePricing from "@/features/client/home/HomePricing/HomePricing";
import WeekendRent from "@/features/client/home/WeekendRent/WeekendRent";
import CallToAction from "@/features/client/home/CallToAction/CallToAction";

export default function Home() {
  return (
    <main>
      <Hero />
      <MantraTicker />
      <AboutPhilosophy />
      <HomeActivities />
      <HomePricing />
      <WeekendRent />
      <CallToAction />
    </main>
  );
}
