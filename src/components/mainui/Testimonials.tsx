import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  score: string;
  country: string;
  text: string;
  image: string;
}

interface AnimatedTestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Taniya Dhamija",
    score: "8.5",
    country: "Canada",
    text: "IELTS Excellence transformed my preparation completely. The AI feedback helped me improve my speaking from 6.5 to 8.5 in just 2 months!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Yashu Tandon",
    score: "8.0",
    country: "UAE",
    text: "The mock tests were incredibly realistic. I felt completely prepared on exam day and achieved my target score of 8.0 overall.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Manvi",
    score: "7.5",
    country: "India",
    text: "The personalized study plan was perfect for my busy schedule. I improved my writing skills significantly and got the score I needed for university.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
];

const Testimonials = () => {
  const [titleVisible, setTitleVisible] = useState<boolean>(false);
  const [subtitleVisible, setSubtitleVisible] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setTitleVisible(true), 200);
          setTimeout(() => setSubtitleVisible(true), 500);
          testimonials.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, 800 + index * 250);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const AnimatedTestimonialCard = ({ testimonial, isVisible }: AnimatedTestimonialCardProps) => (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 
                       border border-border shadow-md bg-background hover:bg-muted cursor-pointer 
                       overflow-hidden relative h-full">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating quote decoration */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-primary/5 rounded-full 
                       opacity-0 group-hover:opacity-100 group-hover:scale-110 
                       transition-all duration-500" />

        <CardContent className="p-6 space-y-6 relative z-10 h-full flex flex-col">
          {/* Header with quote and stars */}
          <div className="flex items-center justify-between">
            <Quote className="h-10 w-10 text-primary/30 group-hover:text-primary/50 
                            group-hover:scale-110 group-hover:rotate-12 
                            transition-all duration-500" />
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 text-yellow-400 fill-current transform 
                             group-hover:scale-110 transition-all duration-300 
                             [transition-delay:${i * 50}ms]`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial text */}
          <div className="flex-grow">
            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground 
                         transition-colors duration-300 relative">
              <span className="relative">
                &ldquo;{testimonial.text}&rdquo;
                <span className="absolute inset-0 bg-primary/5 opacity-0 
                               group-hover:opacity-100 transition-opacity duration-700 
                               rounded blur-sm" />
              </span>
            </p>
          </div>

          {/* User info section */}
          <div className="flex items-center justify-between pt-4 border-t border-border 
                         group-hover:border-primary/20 transition-colors duration-300">
            <div className="flex items-center space-x-3 group/user cursor-pointer">
              <div className="relative">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent 
                           group-hover/user:ring-primary/30 group-hover:scale-110 
                           transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 
                               rounded-full border-2 border-background opacity-0 
                               group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="transform group-hover/user:translate-x-1 transition-transform duration-300">
                <div className="font-semibold text-foreground group-hover:text-primary 
                               transition-colors duration-300">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground 
                               transition-colors duration-300">
                  {testimonial.country}
                </div>
              </div>
            </div>

            {/* Score badge */}
            <div className="text-center group/score cursor-pointer">
              <div className="relative">
                <div className="text-2xl font-bold text-primary group-hover/score:scale-125 
                               group-hover:text-primary/80 transition-all duration-300">
                  {testimonial.score}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-foreground 
                               transition-colors duration-300">
                  Overall
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-0 
                               group-hover/score:opacity-100 blur-lg transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                       from-transparent via-primary/50 to-transparent opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Animated header */}
        <div className="text-center space-y-6 mb-16">
          <h2
            className={`text-3xl lg:text-5xl font-bold text-foreground transform transition-all duration-700 ${
              titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="relative">
              Success Stories
              <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 
                             bg-gradient-to-r from-primary to-primary/50 transition-all duration-1000 ${
                               titleVisible ? "w-40" : "w-0"
                             }`}
              />
              <div
                className={`absolute -top-4 -right-4 w-2 h-2 bg-primary rounded-full 
                             animate-ping transition-all duration-500 ${
                               titleVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                             }`}
              />
            </span>
          </h2>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transform transition-all duration-700 ${
              subtitleVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Join thousands of students who have achieved their dream IELTS scores with our proven methodology.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedTestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isVisible={visibleCards.includes(index)}
            />
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-16 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-1 rounded-full bg-primary/40 transform transition-all duration-500 ${
                visibleCards.includes(index) ? "scale-100 opacity-100" : "scale-0 opacity-0"
              } [transition-delay:${1200 + index * 150}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
