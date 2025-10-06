"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { BarChart3, DollarSign, Smile, TrendingUp, Wrench, Zap } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface BenefitCardProps {
  benefit: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
  };
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, index }) => {
  return (
    <article
      key={`${benefit.title}-benefit-${index}`}
      className="testimonial-card-bg flex h-full w-full flex-col space-y-3 rounded-2xl text-left sm:space-y-4"
      aria-labelledby={`benefit-${index}-title`}
      role="article"
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-t-md">
        <img
          src={benefit.image}
          className="aspect-video h-full w-full object-cover"
          alt={`${benefit.title} visual representation`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative flex flex-1 flex-col space-y-3 px-3 pb-3 sm:space-y-4 sm:px-4 sm:pb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gray-50 ${benefit.color}`}>
            <benefit.icon className="h-5 w-5" />
          </div>
          <h3
            id={`benefit-${index}-title`}
            className="text-heading text-sm font-bold tracking-wide sm:text-base md:text-lg"
          >
            {benefit.title}
          </h3>
        </div>
        <p className="text-heading/90 text-sm leading-tight tracking-wide sm:text-base">
          {benefit.description}
        </p>
      </div>
    </article>
  );
};

function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  // Removed testimonials filter as we're now showing benefits instead

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    // Cards fade-up (staggered, on scroll)
    if (gridRef.current && gsap.effects?.fadeUpOnScroll) {
      const cards = gridRef.current.querySelectorAll("article");
      cards.forEach((card, index) => {
        gsap.effects.fadeUpOnScroll(card as Element, {
          start: "top 92%",
          duration: 0.7,
          delay: Math.min(index * 0.04, 0.3),
          markers: false,
        });
      });
    }

    if (statsRef.current && gsap.effects?.fadeUpOnScroll) {
      const items = statsRef.current.querySelectorAll('[data-stat-item="true"]');
      items.forEach((el) => {
        gsap.effects.fadeUpOnScroll(el as Element, {
          start: "top 95%",
          duration: 0.6,
          // delay: index * 0.08,
          markers: false,
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        aria-labelledby="benefits-heading"
        role="region"
      >
        {/* Header */}
        <SectionHeading
          ref={headingRef}
          badge="Why Choose Digital Analytics"
          heading="The Benefits of Working With Us"
          description="Discover how our digital solutions can transform your business operations and drive measurable results."
          size="md"
          align="center"
          as="h2"
          id="benefits-heading"
          className="mb-6 sm:mb-8 md:mb-14"
          showDescriptionToScreenReaders={true}
        />

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 xl:gap-10"
          ref={gridRef}
          role="list"
          aria-label="Business benefits"
        >
          {[
            {
              title: "Increased Efficiency",
              description: "Automate repetitive tasks and streamline workflows to boost productivity by up to 300%",
              icon: Zap,
              color: "text-yellow-600",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
            },
            {
              title: "Cost Reduction",
              description: "Reduce operational costs by eliminating manual processes and optimizing resource allocation",
              icon: DollarSign,
              color: "text-green-600",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
            },
            {
              title: "Better Customer Experience",
              description: "Provide 24/7 support with intelligent chatbots and personalized interactions",
              icon: Smile,
              color: "text-blue-600",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
            },
            {
              title: "Data-Driven Insights",
              description: "Make informed decisions with real-time analytics and predictive intelligence",
              icon: BarChart3,
              color: "text-purple-600",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
            },
            {
              title: "Scalable Solutions",
              description: "Grow your business with flexible, cloud-based solutions that adapt to your needs",
              icon: TrendingUp,
              color: "text-red-600",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
            },
            {
              title: "24/7 Support",
              description: "Get round-the-clock technical support and maintenance for all your digital solutions",
              icon: Wrench,
              color: "text-orange-600",
              image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center"
            }
          ].map((benefit, index) => (
            <div role="listitem" key={`${benefit.title}-${index}`}>
              <BenefitCard benefit={benefit} index={index} />
            </div>
          ))}
        </div>

        <section
          className="mt-10 sm:mt-12 md:mt-14 lg:mt-16"
          aria-labelledby="stats-heading"
          role="region"
          ref={statsRef}
        >
          <h3 id="stats-heading" className="sr-only">
            Impact metrics
          </h3>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col divide-y divide-gray-200 sm:divide-y-0 sm:flex-row sm:divide-x">
              <div
                className="flex flex-1 flex-col items-start px-4 py-4 sm:items-center sm:px-6 sm:py-6 md:py-0"
                data-stat-item="true"
              >
                <div className="text-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
                  300%
                </div>
                <p className="text-label mt-1 text-sm sm:mt-2 sm:text-base">
                  Average efficiency improvement
                </p>
              </div>

              <div
                className="flex flex-1 flex-col items-start px-4 py-4 sm:items-center sm:px-6 sm:py-6 md:py-0"
                data-stat-item="true"
              >
                <div className="text-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
                  24/7
                </div>
                <p className="text-label mt-1 text-sm sm:mt-2 sm:text-base">
                  Automated support availability
                </p>
              </div>

              <div
                className="flex flex-1 flex-col items-start px-4 py-4 sm:items-center sm:px-6 sm:py-6 md:py-0"
                data-stat-item="true"
              >
                <div className="text-heading text-3xl font-semibold sm:text-4xl md:text-5xl">
                  50%
                </div>
                <p className="text-label mt-1 text-sm sm:mt-2 sm:text-base">
                  Average cost reduction achieved
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Testimonial;
