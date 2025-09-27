import { useState, useEffect, useRef } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; 
import logo from "@/assets/new-header-logo.svg";

const Footer = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => setVisibleSections(prev => [...prev, index]), index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const socialIcons = [
    { Icon: FaFacebook, hover: "hover:text-blue-600 hover:bg-blue-100" },
    { Icon: FaInstagram, hover: "hover:text-pink-500 hover:bg-pink-100" },
    { Icon: FaTwitter, hover: "hover:text-blue-400 hover:bg-blue-100" },
    { Icon: FaLinkedin, hover: "hover:text-blue-700 hover:bg-blue-100" },
  ];

  const quickLinks = ["Courses", "Features", "Pricing", "About Us", "Blog"];
  const supportLinks = ["Help Center", "FAQ", "Contact Us", "Privacy Policy", "Terms of Service"];

  const AnimatedSection = ({ children, index }: { children: React.ReactNode, index: number }) => (
    <div className={`footer-section-animate footer-delay-${index} ${visibleSections.includes(index) ? 'show' : ''}`}>
      {children}
    </div>
  );

  const AnimatedLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
      <a href={href} className="footer-link text-muted-foreground hover:text-primary transition-colors duration-300">
        {children}
      </a>
    </li>
  );

  const ContactItem = ({ Icon, children }: { Icon:any, children: React.ReactNode }) => (
    <div className="flex items-center space-x-3 group cursor-pointer transform transition-all duration-300 hover:translate-x-2 hover:scale-105 p-2 -ml-2 rounded-lg hover:bg-primary/5">
      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{children}</span>
    </div>
  );

  return (
    <footer ref={footerRef} className="bg-background relative overflow-hidden">
      
      {/* Background circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 footer-bg-circle" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/3 footer-bg-circle" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <AnimatedSection index={0}>
            <div className="flex items-center space-x-3">
              <img src={logo} alt="IELTS Excellence" className="h-12 w-12" />
              <span className="text-xl font-bold text-neutral-950 dark:text-white">IELTS Excellence</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner for IELTS success. Expert coaching, AI-powered practice, and proven results.
            </p>
            <div className="flex space-x-2">
              {socialIcons.map(({ Icon, hover }, idx) => (
                <div key={idx} className={`footer-social p-2 text-muted-foreground cursor-pointer rounded-lg ${hover}`}>
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection index={1}>
            <h3 className="text-lg font-semibold  text-neutral-950 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <AnimatedLink key={link} href={`#${link.toLowerCase().replace(" ", "")}`}>{link}</AnimatedLink>
              ))}
            </ul>
          </AnimatedSection>

          {/* Support Links */}
          <AnimatedSection index={2}>
            <h3 className="text-lg font-semibold  text-neutral-950 dark:text-white">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map(link => (
                <AnimatedLink key={link} href={`#${link.toLowerCase().replace(/ /g,"")}`}>{link}</AnimatedLink>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection index={3}>
            <h3 className="text-lg font-semibold  text-neutral-950 dark:text-white">Contact Info</h3>
            <div className="space-y-4">
              <ContactItem Icon={FiMail}>info@ieltsexcellence.com</ContactItem>
              <ContactItem Icon={FiPhone}>+1 (555) 123-4567</ContactItem>
              <ContactItem Icon={FiMapPin}>
                <span>123 Learning Street<br />Education City, EC 12345</span>
              </ContactItem>
            </div>
          </AnimatedSection>

        </div>

        {/* Bottom line */}
        <div className="border-t border-border mt-16 pt-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} IELTS Excellence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
