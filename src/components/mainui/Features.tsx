import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Mic, FileText, Brain, Target } from "lucide-react";

const features = [
  { icon: Mic, title: "Speaking Practice", description: "Interactive speaking sessions with AI feedback and real IELTS scenarios.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: FileText, title: "Mock Tests", description: "Full-length practice tests that simulate the real IELTS exam experience.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Brain, title: "AI Band Score", description: "Instant AI-powered assessment with detailed feedback and improvement tips.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Target, title: "Personalized Learning", description: "Customized study plans based on your strengths and areas for improvement.", color: "text-primary", bgColor: "bg-primary/10" }
];

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTitleVisible(true);
        setTimeout(() => setSubtitleVisible(true), 200);
        features.forEach((_, index) => {
          setTimeout(() => setVisibleCards(prev => [...prev, index]), 400 + index * 150);
        });
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted relative overflow-hidden"
    >
      {/* Background circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 bg-circle-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/3 bg-circle-pulse" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className={`text-3xl lg:text-5xl font-bold text-foreground title-animate ${titleVisible ? "show" : ""}`}>
            Why Choose IELTS Excellence?
            <div
              className={`h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-2 transition-all duration-1000 ${
                titleVisible ? "w-32" : "w-0"
              }`}
            />
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto subtitle-animate ${
              subtitleVisible ? "show" : ""
            }`}
          >
            Our comprehensive platform combines expert instruction with cutting-edge technology to help you achieve your
            target IELTS band score.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`card-animate card-delay-${index} ${
                  visibleCards.includes(index) ? "show" : ""
                }`}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-border shadow-md bg-background hover:bg-muted cursor-pointer overflow-hidden relative">
                  {/* Hover animated bg & decorative dots */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700" />

                  <CardHeader className="text-center space-y-4 relative z-10">
                    <div className="relative mx-auto w-20 h-20">
                      <div
                        className={`w-full h-full rounded-2xl ${feature.bgColor} group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center`}
                      >
                        <Icon
                          className={`h-9 w-9 ${feature.color} transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}
                        />
                      </div>
                      <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500" />
                    </div>
                    <CardTitle className="text-xl text-foreground relative">
                      <span className="group-hover:text-primary transition-colors duration-300">{feature.title}</span>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="mt-16 flex justify-center space-x-4">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-primary/30 transform transition-all duration-500 ${
                visibleCards.includes(index) ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
