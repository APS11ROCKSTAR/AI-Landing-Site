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
import { BarChart3, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      terms: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus('idle');
    setErrorMessage('');
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('All fields are required');
      return;
    }

    if (!formData.terms) {
      setSubmitStatus('error');
      setErrorMessage('Please accept the terms and conditions');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          terms: false
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                onSubmit={handleSubmit}
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
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                    aria-required="true"
                    itemProp="name"
                    disabled={isSubmitting}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-required="true"
                    itemProp="email"
                    disabled={isSubmitting}
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
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    itemProp="description"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    className="mt-1"
                    checked={formData.terms}
                    onCheckedChange={handleCheckboxChange}
                    required
                    aria-required="true"
                    aria-describedby="terms-description"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <p className="text-sm text-red-800">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 w-full py-3 sm:py-4 font-medium text-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit contact form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
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
