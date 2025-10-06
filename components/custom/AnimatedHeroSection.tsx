"use client";

import { Badge } from "@/components/ui/badge";
import "@/lib/GSAPAnimations";
import { formatDate } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Calendar, Clock } from "lucide-react";
import { Suspense, useRef } from "react";
import { BackButton } from "./BackButton";

interface AnimatedHeroSectionProps {
  post: {
    metadata: {
      title: string;
      summary?: string;
      publishedAt: string;
      image?: string;
      tag?: string[];
    };
  };
}

export function AnimatedHeroSection({ post }: any) {
  const heroRef = useRef<HTMLElement>(null);
  const backButtonRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate the hero section
    gsap.effects.fadeUpOnScroll(heroRef.current, {
      start: "top 90%",
      duration: 1.2,
      markers: false,
    });

    // Animate back button
    if (backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }

    // Animate metadata
    if (metadataRef.current) {
      gsap.fromTo(
        metadataRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    }

    // Animate tags
    if (tagsRef.current) {
      gsap.fromTo(
        tagsRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.0,
          ease: "power2.out",
        }
      );
    }

    // Animate social buttons
    if (socialRef.current) {
      gsap.fromTo(
        socialRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.2,
          ease: "power2.out",
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      {post.metadata.image && (
        <div className="absolute inset-0">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="h-full w-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col justify-center px-4 py-20 lg:py-32">
        {/* Back Navigation */}
        <div ref={backButtonRef} className="mb-8">
          <BackButton />
        </div>

        <div className="mx-auto max-w-4xl space-y-2 text-center">
          <div
            ref={metadataRef}
            className="mb-4 flex items-center justify-center gap-6 text-sm text-white/80"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <Suspense fallback={<span>Loading...</span>}>
                <span>{formatDate(post.metadata.publishedAt)}</span>
              </Suspense>
            </div>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl leading-tight font-bold drop-shadow-lg text-white md:text-5xl"
          >
            {post.metadata.title}
          </h1>

          {/* Subtitle */}
          {post.metadata.summary && (
            <p
              ref={subtitleRef}
              className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed drop-shadow-md text-white/90"
            >
              {post.metadata.summary}
            </p>
          )}

          {post.metadata.tag && Array.isArray(post.metadata.tag) && (
            <div ref={tagsRef} className="flex justify-center gap-2">
              {post.metadata.tag.map((tag: any, index: any) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="py-1.5 border-white/30 bg-white/20 px-4 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Social Share Buttons */}
          {/* <div ref={socialRef}>
            <SocialShareButtons title={post.metadata.title} />
          </div> */}
        </div>
      </div>
    </section>
  );
}
