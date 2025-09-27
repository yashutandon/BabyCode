import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import heroBanner from "@/assets/heroWeb.webp";

interface StatsCardProps {
  value: string;
  label: string;
  delayClass?: string;
}

const StatsCard = ({ value, label, delayClass = "" }: StatsCardProps) => (
  <div className={`text-center transform transition-all duration-700 ${delayClass}`}>
    <div className="text-2xl lg:text-3xl font-bold text-[var(--primary)] hover:scale-110 transition-transform duration-300">
      {value}
    </div>
    <div className="text-sm text-[var(--muted-foreground)]">{label}</div>
  </div>
);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[var(--background)]">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="space-y-8">

            {/* Badge */}
            <div className={`transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"} delay-100`}>
              <div className="flex items-center space-x-2 text-[var(--primary)] font-medium hover:scale-105 transition-transform duration-300 cursor-pointer group">
                <Star className="h-5 w-5 text-[var(--primary)] fill-current group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:text-[var(--primary)]/80 transition-colors duration-300">
                  Trusted by 10,000+ Students
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-[var(--foreground)]">
                <span className={`block transform transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} delay-200`}>
                  Master IELTS with{" "}
                </span>
                <span className={`block bg-gradient-hero bg-clip-text text-primary transform transition-all duration-700 hover:scale-105 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} delay-400`}>
                  Expert Guidance
                </span>
              </h1>

              <p className={`text-lg text-[var(--muted-foreground)] max-w-lg transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} delay-600`}>
                Achieve your target band score with our comprehensive IELTS preparation program.
                Get personalized coaching, AI-powered practice tests, and proven strategies.
              </p>
            </div>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} delay-800`}>
              <Button size="lg" variant="outline" className="border-[var(--primary)] text-[var(--primary)] dark:text-primary dark:hover:text-white hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg group">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-[var(--primary)] text-[var(--primary)] dark:text-primary dark:hover:text-white hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <StatsCard value="98%" label="Success Rate" delayClass="delay-0" />
              <StatsCard value="8.5" label="Avg Band Score" delayClass="delay-200" />
              <StatsCard value="30+" label="Expert Trainers" delayClass="delay-400" />
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className={`relative rounded-2xl overflow-hidden shadow-strong transform transition-all duration-1000 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} delay-400`}>
              <img src={heroBanner} alt="IELTS students in modern classroom" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className={`floating-card ${isVisible ? "show" : ""}`}>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-6 w-6 text-[var(--primary)] fill-current group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="space-x-8">
                  <div className="font-semibold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                    Live AI Feedback
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">Real-time scoring</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
