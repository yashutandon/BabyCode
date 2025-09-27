import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import logo from "@/assets/new-header-logo.svg";
import { ModeToggle } from "../theme-toggle";

interface NavLinkProps {
  link: string;
  index: number;
  isMobile?: boolean;
  activeLink: string;
  setActiveLink: (link: string) => void;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  link,
  index,
  isMobile = false,
  activeLink,
  setActiveLink,
  onClick,
}) => {
  const delayClasses = [
    "delay-75",
    "delay-100",
    "delay-150",
    "delay-200",
    "delay-250",
    "delay-300",
    "delay-350",
  ];
  const delayClass = delayClasses[index % delayClasses.length];

  return (
    <a
      href={`#${link}`}
      onClick={() => {
        setActiveLink(link);
        onClick?.();
      }}
      className={`
        relative group transition-all duration-300 
        ${isMobile ? "block px-3 py-3 rounded-lg" : "px-3 py-2"}
        ${
          activeLink === link
            ? "text-[var(--primary)] font-semibold"
            : "text-[var(--foreground)] hover:text-[var(--primary)]"
        }
        ${isMobile ? "hover:bg-[var(--primary)]/10 hover:scale-102" : "hover:scale-110"}
        transform transition-all duration-300 ${isMobile ? delayClass : ""}
      `}
    >
      <span className="relative z-10">
        {link.charAt(0).toUpperCase() + link.slice(1)}
      </span>

      {/* Desktop underline animation */}
      {!isMobile && (
        <span
          className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full
                     ${activeLink === link ? "w-full" : ""}`}
        />
      )}

      {/* Mobile background glow */}
      {isMobile && (
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      )}
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = ["home", "courses", "features", "testimonials", "contact"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 
                 ${
                   isScrolled
                     ? "bg-[var(--background)]/98 backdrop-blur-md border-b shadow-lg"
                     : "bg-[var(--background)]/95 backdrop-blur-sm border-b shadow-[var(--border)]"
                 }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={logo}
                alt="IELTS Excellence"
                className="h-25 w-25 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <div
                key={link}
                className="transform transition-all duration-500"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <NavLink
                  link={link}
                  index={index}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                />
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="transform hover:scale-110 transition-transform duration-300 dark:text-primary border-primary">
              <ModeToggle />
            </div>

            <Button
              variant="default"
              className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 hover:shadow-xl hover:shadow-[var(--primary)]/25
                       transform hover:scale-105 hover:-translate-y-0.5 
                       transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--primary)] 
                       hover:bg-[var(--primary)]/10 rounded-lg transform hover:scale-110 transition-all duration-300 group"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`h-6 w-6 absolute inset-0 transform transition-all duration-300 
                          ${
                            isMenuOpen
                              ? "rotate-90 opacity-0 scale-0"
                              : "rotate-0 opacity-100 scale-100"
                          }`}
              />
              <X
                className={`h-6 w-6 absolute inset-0 transform transition-all duration-300 
                          ${
                            isMenuOpen
                              ? "rotate-0 opacity-100 scale-100"
                              : "-rotate-90 opacity-0 scale-0"
                          }`}
              />
            </div>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
                     ${
                       isMenuOpen
                         ? "max-h-[600px] opacity-100"
                         : "max-h-0 opacity-0"
                     }`}
        >
          <div className="border-t bg-[var(--background)]/98 backdrop-blur-md">
            <div className="px-2 pt-4 pb-6 space-y-3">
              {navLinks.map((link, index) => (
                <div
                  key={link}
                  className={`transform transition-all duration-500 ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <NavLink
                    link={link}
                    index={index}
                    isMobile
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
              ))}

              {/* Mobile Theme Toggle */}
              <div
                className={`px-3 py-2 transform transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-4 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
              >
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors duration-300 group cursor-pointer">
                  <ModeToggle />
                  <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                    Toggle Theme
                  </span>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div
                className={`px-3 py-2 transform transition-all duration-700 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-4 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}
              >
                <Button
                  variant="default"
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:shadow-lg hover:shadow-[var(--primary)]/25
                           transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-[var(--accent)]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/50 to-[var(--primary)] opacity-20">
        <div
          className={`h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 transition-all duration-1000 ${
            isScrolled ? "w-full" : "w-0"
          }`}
        />
      </div>

      {/* Decorative Top Border */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent 
                   transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
      />
    </nav>
  );
};

export default Navbar;
