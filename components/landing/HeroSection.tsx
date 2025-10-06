"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "@/lib/GSAPAnimations";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import {
  BarChart3,
  Bot,
  Cloud,
  Code,
  Link,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef(null);

  useGSAP(() => {
    const headingElement = heroRef?.current?.querySelector("h1");
    if (headingElement) {
      SplitText.create(headingElement, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            duration: 0.6,
            y: 10,
            opacity: 0.5,
            filter: "blur(6px)",
            autoAlpha: 0,
            stagger: 0.06,
          });
        },
      });
    }

    if (heroRef?.current && caseStudiesRef?.current) {
      gsap.effects.fadeUpOnScroll(caseStudiesRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="item-center flex flex-col flex-nowrap p-5">
      <div
        ref={heroRef}
        className="hero space-y-4 pt-[116px] pb-[48px] md:pt-[128px] md:pb-[128px] md:text-center lg:pt-[140px] lg:pb-[96px]"
      >
        <SectionHeading
          badge="Digital Solutions & Automation"
          heading="Transform Your Business with AI Smart Solutions"
          description="We help businesses automate operations, build intelligent chatbots, and implement AI-powered solutions that streamline daily workflows and drive growth through data-driven insights."
          icon={Sparkles}
          size="lg"
          align="center"
          as="h1"
          className="heading"
          headingClassName="md:mx-auto md:w-2/3 leading-tight"
          showDescriptionToScreenReaders={true}
        />

        <div
          aria-label="Call to action buttons"
          className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-center"
        >
          <Button
            aria-describedby="consultation-cta-description"
            type="button"
            className="cursor-pointer"
            onClick={() => {
              window.open("https://cal.com/aryan11/30min?overlayCalendar=true", "_blank", "noopener,noreferrer");
            }}
          >
            Get Free Consultation
          </Button>
          <Button
            aria-describedby="services-cta-description"
            type="button"
            className="cursor-pointer"
            variant={"outline"}
            onClick={() => {
              const processSection = document.querySelector('[id="process-heading"]');
              if (processSection) {
                processSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            View Our Services
          </Button>
        </div>

        <div
          className="relative"
          role="region"
          aria-label="Our core capabilities"
        >
          <h2 className="!sr-only">AI Solutions &amp; Automation</h2>
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>

          {/* Right fade gradient */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>

          <Marquee pauseOnHover className="mt-14">
            {[
              { name: "AI Chatbots", icon: Bot, color: "text-blue-600" },
              {
                name: "Process Automation",
                icon: Zap,
                color: "text-yellow-600",
              },
              {
                name: "Data Analytics",
                icon: BarChart3,
                color: "text-green-600",
              },
              { name: "Custom Software", icon: Code, color: "text-purple-600" },
              {
                name: "Workflow Optimization",
                icon: Workflow,
                color: "text-orange-600",
              },
              {
                name: "Business Intelligence",
                icon: TrendingUp,
                color: "text-red-600",
              },
              { name: "API Integration", icon: Link, color: "text-indigo-600" },
              { name: "Cloud Solutions", icon: Cloud, color: "text-cyan-600" },
            ].map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div
                  key={`${capability.name}-${index}`}
                  className="group mx-1 flex-shrink-0 cursor-pointer md:mx-4"
                >
                  <div className="relative flex h-16 items-center justify-center p-4 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 ${capability.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {capability.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Marquee>
        </div>

        <Carousel
          ref={caseStudiesRef}
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          aria-label="services"
          aria-labelledby="featured-services-heading"
          id="services-section"
          className="relative mt-14 w-full"
        >
          <h2 id="featured-services-heading" className="!sr-only">
            Featured Services
          </h2>
          <div className="pointer-events-none absolute top-0 left-0 z-5 h-full w-12 bg-gradient-to-r from-gray-50/80 via-gray-50/20 to-transparent md:w-36"></div>

          <div className="pointer-events-none absolute top-0 right-0 z-5 h-full w-12 bg-gradient-to-l from-gray-50/90 via-gray-50/20 to-transparent md:w-36"></div>

          <CarouselContent>
            {[
              {
                title: "AI-Powered Chatbots",
                description: "Intelligent customer support automation",
                icon: "/ai_chatbot.png",
                color: "text-blue-600",
                features: [
                  "24/7 Support",
                  "Natural Language Processing",
                  "Multi-channel Integration",
                ],
              },
              {
                title: "Process Automation",
                description: "Streamline your daily operations",
                icon: "/process_automation.png",
                color: "text-yellow-600",
                features: [
                  "Workflow Optimization",
                  "Task Automation",
                  "Error Reduction",
                ],
              },
              {
                title: "Data Analytics Solutions",
                description: "Transform data into actionable insights",
                icon: "/data_analytics.png",
                color: "text-green-600",
                features: [
                  "Real-time Dashboards",
                  "Predictive Analytics",
                  "Custom Reports",
                ],
              },
              {
                title: "Custom Software Development",
                description: "Tailored solutions for your business",
                icon: "/customer_service.png",
                color: "text-purple-600",
                features: [
                  "Scalable Architecture",
                  "API Integration",
                  "Cloud Deployment",
                ],
              },
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <CarouselItem
                  key={`${service.title}-carousel-${index}`}
                  className="md:basis-1/2 lg:basis-1/4"
                  data-carousel-item
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of 4: ${service.title}`}
                >
                  <div
                    key={`service-${index}`}
                    className="w-full max-w-sm space-y-3 text-left"
                  >
                    <div className="bg-tag-bg flex aspect-square items-center justify-center rounded-md p-4">
                    <Image
                          src={service.icon}
                          alt={service.title}
                          height={100}
                          width={100}
                          className="h-full w-fit"
                        />
                    </div>
                    <div className="space-y-1">
                      <p className="text-heading text-md leading-snug">
                        {service.title}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous service"
            className="left-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50"
          />
          <CarouselNext
            aria-label="Next service"
            className="right-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
