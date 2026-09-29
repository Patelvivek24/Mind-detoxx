import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import MantraTicker from "@/components/MantraTicker/MantraTicker";
import AboutPhilosophy from "@/components/AboutPhilosophy/AboutPhilosophy";
import Activities from "@/components/Activities/Activities";
import Pricing from "@/components/Pricing/Pricing";
import WeekendRent from "@/components/WeekendRent/WeekendRent";
import CallToAction from "@/components/CallToAction/CallToAction";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      {/* Main navigation */}
      <Navbar />

      {/* Homepage sections */}
      <main>
        <Hero />
        <MantraTicker />
        <AboutPhilosophy />
        <Activities />
        <Pricing />
        <WeekendRent />
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
