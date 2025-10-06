"use client";

import { SectionHeading } from "@/components/custom/SectionHeading";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { BarChart3 } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (formRef.current) {
      gsap.effects.staggerFadeUpOnScroll(formRef.current, {
        start: "top 85%",
        duration: 0.5,
        yOffset: 40,
        ease: "sine.out",
        once: true,
        stagger: 0.15,
        // Animate each direct child of the form (label/input groups, checkbox row, submit button)
        childSelector: "form > *",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Removed unused animation functions and state management

  return (
    <>
      <section
        ref={sectionRef}
        className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        aria-labelledby="contact-heading"
        role="region"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Header */}
        <SectionHeading
          ref={headingRef}
          badge="Contact Us"
          heading="Ready to Transform Your Business?"
          description="Get in touch with Digital Analytics to discuss your digital transformation needs and discover how we can help automate your operations."
          size="md"
          align="center"
          as="h2"
          id="contact-heading"
          className="mb-6 sm:mb-8 md:mb-14"
          showDescriptionToScreenReaders={true}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-1">
            <div ref={formRef} className="space-y-4 sm:space-y-6">
              <h3 id="contact-form-title" className="sr-only">
                Contact us form
              </h3>
              <p id="contact-form-description" className="sr-only">
                Use this form to contact Digital Analytics. All fields are required.
              </p>
              <form
                className="space-y-4 sm:space-y-6"
                aria-labelledby="contact-form-title"
                aria-describedby="contact-form-description"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
                    name="name"
                    autoComplete="name"
                    required
                    aria-required="true"
                    itemProp="name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="focus:border-primary focus:ring-primary w-full border-gray-200 h-10 sm:h-11"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-required="true"
                    itemProp="email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-text-heading text-sm font-medium sm:text-base"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    rows={4}
                    className="focus:border-primary focus:ring-primary min-h-32 sm:min-h-40 w-full resize-none border-gray-200"
                    name="message"
                    required
                    aria-required="true"
                    itemProp="description"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    className="mt-1"
                    required
                    aria-required="true"
                    aria-describedby="terms-description"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 w-full py-3 sm:py-4 font-medium text-white text-sm sm:text-base"
                  aria-label="Submit contact form"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Company Info */}
          <div className="relative rounded-2xl lg:col-span-2">
            <div className="bg-primary absolute inset-0 h-full w-full rounded-2xl"></div>
            <div
              style={{
                backgroundImage: `url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdHAyMzgtYmFja2dyb3VuZC0wMy1rcHFvcjMwMS5qcGc.jpg)`,
              }}
              className="bg-background relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-cover opacity-85 sm:h-80 lg:h-full"
            >
              <InteractiveGridPattern
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                )}
              />
            </div>
            <div className="absolute bottom-0 w-full">
              <div ref={contentRef} className="relative p-4 sm:p-6 lg:p-8">
                <div className="absolute inset-0 w-full rounded-b-2xl bg-gradient-to-t from-gray-500/40 to-transparent"></div>

                {/* Company Info Section */}
                <div
                  ref={testimonialRef}
                  className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:mt-6 sm:p-4"
                  role="complementary"
                  aria-label="Company information"
                >
                  <div className="items- mb-3 flex flex-col sm:mb-4">
                    <div className="mb-3 flex items-center sm:mb-4">
                      <div className="p-2 rounded-lg bg-white/10 mr-3">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Digital Analytics</h3>
                    </div>
                    <blockquote className="text-sm leading-tight font-medium text-gray-200 italic sm:text-base lg:text-lg">
                      "We specialize in transforming businesses through intelligent automation, AI-powered solutions, and data-driven insights that drive real results."
                    </blockquote>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs font-medium text-white sm:text-sm">
                        Ready to get started?
                      </p>
                      <p className="text-xs text-gray-300">
                        Let's discuss your digital transformation goals
                      </p>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
