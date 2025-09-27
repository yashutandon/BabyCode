import Footer  from "../components/mainui/Footer";
import Features from "../components/mainui/Features";
import Hero from "../components/mainui/Hero";
import Navbar from "../components/mainui/Navbar";
import Testimonials from "../components/mainui/Testimonials";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;