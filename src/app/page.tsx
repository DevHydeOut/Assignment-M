import Hero from "@/components/hero/hero";
import Header from "@/components/header/header";
import Stats from "@/components/stats/stats";
import Logo from "@/components/logos/logo";
import Slider from "@/components/slider/slider";
import TabSection from "@/components/tabSection/tabSection";
import Journey from "@/components/journey/journey";
import LineReveal from "@/components/lineRevel/lineReveal";
import Footer from "@/components/footer/footer";

export default function Home() {  
  return (
    <>
      <Header />
      <Hero />
      <LineReveal />
      <Logo />
      <Stats />
      <Slider />
      <Journey />
      <TabSection />
      <Footer />
    </>
  );
}
