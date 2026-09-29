import Background from "@/components/Background/Background";
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
      {/* Dynamic 3D WebGL particle background & aurora glow */}
      <Background />

      {/* Main navigation */}
      <Navbar />

      {/* Homepage sections with data-shape mapping for 3D particle morphing */}
      <main>
        {/* Shape 0 · Torus */}
        <div data-shape="0">
          <Hero />
        </div>

        {/* Shape 1 · Galaxy */}
        <div data-shape="1">
          <MantraTicker />
          <AboutPhilosophy />
        </div>

        {/* Shape 2 · Wave */}
        <div data-shape="2">
          <Activities />
        </div>

        {/* Shape 3 · Brain */}
        <div data-shape="3">
          <Pricing />
          <WeekendRent />
          <CallToAction />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
