"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface processType {
  title: string;
  tagline: string;
  description: string;
  bg_image: string;
  deliverables: {
    item: string;
  }[];
}

const ProcessCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const process: processType[] = [
    {
      title: "Analysis & Assessment",
      tagline: "Understanding Your Digital Needs",
      description:
        "We start by analyzing your current business processes, identifying pain points, and understanding your digital transformation goals. Through comprehensive data analysis and stakeholder interviews, we map out your existing workflows and pinpoint opportunities for automation and optimization. This foundation ensures our solutions are perfectly tailored to your specific business requirements.",
      deliverables: [
        { item: "Comprehensive business process audit" },
        { item: "Digital readiness assessment" },
        { item: "Customized transformation roadmap" },
      ],
      bg_image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755799085/ssimage_bxr8i6.png",
    },
    {
      title: "Solution Design & Planning",
      tagline: "Crafting Your Digital Strategy",
      description:
        "Based on our analysis, we design comprehensive digital solutions that address your specific challenges. We create detailed technical specifications, user experience designs, and implementation timelines. Our team ensures every solution integrates seamlessly with your existing systems while providing room for future growth and scalability.",
      deliverables: [
        { item: "Detailed solution architecture" },
        { item: "User experience wireframes" },
        { item: "Implementation timeline and milestones" },
      ],
      bg_image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png",
    },
    {
      title: "Development & Integration",
      tagline: "Building Your Digital Future",
      description:
        "Our expert developers bring your digital solutions to life using cutting-edge technologies. We build robust, scalable systems that automate your processes, enhance customer experience, and provide valuable insights. Every solution is thoroughly tested and optimized for performance, security, and reliability before deployment.",
      deliverables: [
        { item: "Fully functional digital solutions" },
        { item: "Seamless system integrations" },
        { item: "Comprehensive testing and quality assurance" },
      ],
      bg_image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804376/fasimage_skodum.png",
    },
    {
      title: "Deployment & Optimization",
      tagline: "Launching and Evolving Your Solutions",
      description:
        "We handle the complete deployment of your digital solutions with minimal disruption to your business operations. Our team provides comprehensive training, ongoing support, and continuous optimization to ensure maximum ROI. We monitor performance, gather feedback, and make improvements to keep your solutions running at peak efficiency.",
      deliverables: [
        { item: "Smooth deployment and go-live support" },
        { item: "Staff training and documentation" },
        { item: "Ongoing monitoring and optimization" },
      ],
      bg_image: "https://res.cloudinary.com/dieth2xb3/image/upload/v1755804235/aaaimage_zbypst.png"
    },
  ];

  useGSAP(() => {
    const slides = slidesRef.current;
    if (!slides.length || !headingRef.current || !sectionRef.current) return;

    const headerPin = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 5%",
      endTrigger: slidesRef.current[slidesRef.current.length - 2],
      end: "center top",
      pin: headingRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    slides.slice(0, 3).forEach((slide) => {
      if (!slide) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: "top 25%",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      // Responsive animation values
      const getAnimationValues = () => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        if (isMobile) {
          return {
            scale: 0.8,
            z: -50,
            rotationX: 8,
            opacity: 0,
          };
        } else if (isTablet) {
          return {
            scale: 0.7,
            z: -75,
            rotationX: 12,
            opacity: 0,
          };
        } else {
          return {
            scale: 0.6,
            z: -100,
            rotationX: 15,
            opacity: 0,
          };
        }
      };

      tl.to(slide, {
        ...getAnimationValues(),
        duration: 0.7,
        ease: "power2.inOut",
      });
    });

    // Add responsive behavior
    const updatePinning = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      if (isMobile) {
        // Disable header pinning on mobile for better UX
        headerPin.disable();
      } else if (isTablet) {
        // Reduce pinning intensity on tablet
        headerPin.enable();
      } else {
        // Full pinning on desktop
        headerPin.enable();
      }
    };

    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    // Initial call
    updatePinning();

    // Update on window resize
    window.addEventListener("resize", updatePinning);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", updatePinning);
    };
  }, []);

  const addSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      slidesRef.current[index] = el;
    }
  };

  return (
    <div ref={sectionRef} className="relative space-y-4 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        ref={headingRef}
        badge="Our Proven Process"
        heading="How We Transform Your Business"
        description="Our systematic approach ensures your digital transformation journey is smooth, efficient, and delivers measurable results that drive your business forward."
        size="md"
        align="center"
        as="h2"
        id="process-heading"
        className="mb-6 md:mb-14"
      />

      <div ref={containerRef} className="relative">
        {process.map((slide, index) => (
          <div
            key={`slide-main-${index}`}
            ref={(el) => addSlideRef(el, index)}
            className="relative mb-6 flex h-fit w-full items-center justify-center sm:mb-8 md:mb-10"
          >
            <div
              className={`relative h-fit w-full rounded-lg bg-cover p-4 sm:p-6 md:p-8 lg:p-10`}
              style={{ backgroundImage: `url(${slide.bg_image})` }}
            >
              <div className="w-full space-y-3 rounded-md bg-white/20 p-4 backdrop-blur-lg sm:space-y-4 sm:p-6 md:max-w-7/12">
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="heading text-h4 text-heading font-semibold">{slide.title}</h3>
                  <p className="text-xs font-normal tracking-wide text-[#323c4d] sm:text-sm">
                    <span> 💡</span> {slide.tagline}
                  </p>
                </div>

                <p className="text-p text-sm leading-snug text-black/60 sm:text-base lg:max-w-4/5">
                  {slide.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3 md:mt-8">
                  {slide.deliverables.map((dl, ix) => (
                    <li
                      key={`deliverable-${dl.item}-${ix}`}
                      className="text-heading bg-tag-bg/20 rounded-4xl px-3 py-1 text-xs tracking-wide backdrop-blur-lg sm:px-4"
                    >
                      {dl.item}
                    </li>
                  ))}
                  <li className="text-heading bg-tag-bg/20 rounded-4xl px-3 py-1 text-xs tracking-wide backdrop-blur-lg sm:px-4">
                    ROI analysis
                  </li>
                  <li className="text-heading bg-tag-bg/20 rounded-4xl px-3 py-1 text-xs tracking-wide backdrop-blur-lg sm:px-4">
                    {" "}
                    performance metrics
                  </li>
                </ul>
              </div>
              <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-6 md:right-12 md:bottom-8 lg:right-16 lg:bottom-10">
                <div className={`relative`}>
                  <span
                    className={`text-6xl font-extrabold text-transparent sm:text-7xl md:text-8xl lg:text-9xl`}
                    style={{
                      WebkitTextStroke: "2px rgb(225,225,225,0.9",
                      textShadow: "0 1px 2px rgba(225, 225, 225, 0.05)",
                      color: "rgb(0,0,0,0.09)",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessCards;
