"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { BarChart3, Bot, Zap } from "lucide-react";
import { useRef } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CapabilityCardProps {
  capability: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    features: string[];
    image: string;
  };
  index: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current && gsap.effects?.fadeUpOnScroll) {
      gsap.effects.fadeUpOnScroll(contentRef.current, {
        start: "top 90%",
        duration: 0.8,
        markers: false,
      });

      gsap.effects.fadeUpOnScroll(imageRef.current, {
        start: "top 90%",
        duration: 0.8,
        delay: 0.2,
        markers: false,
      });
    }
  }, [index]);

  return (
    <section
      ref={cardRef}
      className="grid grid-cols-1 gap-8 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-4 lg:grid-cols-12 lg:gap-12"
      aria-labelledby={`capability-${index}-title`}
      role="article"
    >
      <div ref={contentRef} className="col-span-1 space-y-6 lg:col-span-5">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-gray-50 ${capability.color}`}>
              <capability.icon className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-3">
            <h3
              id={`capability-${index}-title`}
              className="text-h4 text-heading pr-4 text-2xl leading-tight font-semibold lg:text-3xl"
            >
              {capability.title}
            </h3>
            <p className="text-label text-sm leading-relaxed">
              {capability.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="sr-only">Key Features</h4>
            <ul
              className="list-disc space-y-3 pl-4"
              role="list"
              aria-label="Capability features and benefits"
            >
              {capability.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-label text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          aria-describedby={`capability-${index}-description`}
          type="button"
        >
          Learn More
          <span className="sr-only"> about {capability.title}</span>
        </Button>

        <p id={`capability-${index}-description`} className="sr-only">
          Learn more about {capability.title} and how it can benefit your business
        </p>
      </div>

      <div
        ref={imageRef}
        className="col-span-1 aspect-[4/3] lg:col-span-7"
        role="region"
        aria-label={`${capability.title} visual representation`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src={capability.image}
            alt={`${capability.title} visual representation`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

const CaseStudies: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the main heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false, // Set to false for production
          },
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="mx-auto max-w-7xl px-5 py-16 md:py-24"
        aria-labelledby="capabilities-heading"
        role="region"
      >
        {/* Header */}
        <SectionHeading
          ref={headingRef}
          badge="Digital Solutions That Drive Growth"
          heading="How We Can Help Your Business"
          description="Discover our comprehensive range of digital solutions designed to automate your operations, enhance customer experience, and drive measurable business growth through intelligent technology."
          size="md"
          align="center"
          as="h2"
          id="capabilities-heading"
          className="mb-8 md:mb-14"
        />

        {/* Capabilities */}
        <div className="space-y-8 md:space-y-24" role="main" aria-label="Digital capabilities collection">
          {[
            {
              title: "AI-Powered Chatbots & Virtual Assistants",
              description: "Transform your customer support with intelligent chatbots that understand context, provide instant responses, and learn from every interaction.",
              icon: Bot,
              color: "text-blue-600",
              features: [
                "24/7 automated customer support",
                "Natural language processing and understanding",
                "Multi-channel integration (website, social media, messaging apps)",
                "Seamless handoff to human agents when needed",
                "Analytics and performance tracking"
              ],
              image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
            },
            {
              title: "Process Automation & Workflow Optimization",
              description: "Streamline your daily operations with smart automation that eliminates repetitive tasks, reduces errors, and increases productivity.",
              icon: Zap,
              color: "text-yellow-600",
              features: [
                "Automated data entry and processing",
                "Workflow optimization and task scheduling",
                "Integration with existing business tools",
                "Error reduction and quality assurance",
                "Real-time monitoring and reporting"
              ],
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
            },
            {
              title: "Data Analytics & Business Intelligence",
              description: "Turn your data into actionable insights with powerful analytics dashboards and predictive models that drive informed decision-making.",
              icon: BarChart3,
              color: "text-green-600",
              features: [
                "Real-time data visualization and dashboards",
                "Predictive analytics and forecasting",
                "Custom reporting and KPI tracking",
                "Data integration from multiple sources",
                "Automated insights and recommendations"
              ],
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
            }
          ].map((capability, index) => (
            <div key={`${capability.title}-${index}`}>
              <CapabilityCard capability={capability} index={index} />
            </div>
          ))}
        </div>

        {/* Skip link for keyboard users */}
        <a
          href="#main-navigation"
          className="sr-only z-50 rounded-md bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to main navigation
        </a>
      </section>
    </>
  );
};

export default CaseStudies;
