import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PageHeader } from "../components/common/PageHeader";
import { Reveal } from "../components/common/Reveal";
import { GoldenIslamicBackground } from "../components/effects/GoldenIslamicBackground";
import {
  galleryImages,
  galleryCategories,
  type GalleryCategory,
  type GalleryImage,
} from "../data/gallery";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "../utilities/cn";

const title = "Campus Gallery";
const description =
  "Visual glimpses of our classrooms, science labs, library shelves, Husn-e-Qirat assemblies, and calligraphy classes.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `${title} | Sirat-e-Mustaqeem Educational System` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Sirat-e-Mustaqeem Educational System` },
      { property: "og:description", content: description },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter images based on selected category
  const filteredImages = galleryImages.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory,
  );

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (filteredImages.length === 0) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    if (filteredImages.length === 0) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredImages.length));
  }, [filteredImages.length]);

  // Lightbox key listener and scroll locking
  useEffect(() => {
    if (lightboxIndex === null) return;

    // Body scroll lock
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus on the close button
    const closeBtn = modalRef.current?.querySelector(".lightbox-close") as HTMLElement;
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <MainLayout>
      <PageHeader eyebrow="Campus Life" title={title} description={description} />

      <section className="relative section-y overflow-hidden">
        <GoldenIslamicBackground variant="subtle" />
        <div className="container-page relative z-10">
          {/* Category Filter Tabs */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setLightboxIndex(null); // Reset lightbox on category filter change
                  }}
                  className={cn(
                    "h-10 px-5 text-sm font-semibold rounded-md border transition-all duration-300 cursor-pointer smooth-transition icon-hover",
                    selectedCategory === category
                      ? "bg-navy border-navy text-gold shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.3)] hover:shadow-[0_0_18px_oklch(0.79_0.12_82_/_0.4)]"
                      : "bg-card border-navy/20 text-navy hover:bg-secondary hover:border-gold/35 hover:shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.15)]",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Masonry Responsive Grid */}
          <Reveal delay={0.08}>
            {filteredImages.length > 0 ? (
              <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised hover:border-gold/35 cursor-pointer card-hover-gold"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative overflow-hidden image-hover-glow">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white bg-royal/80 p-2.5 rounded-full shadow-lg icon-hover">
                          <Maximize2 className="size-5" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-border bg-card">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-royal bg-secondary px-2 py-0.5 rounded-full mb-1.5 smooth-transition hover:bg-gold/20 hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
                        {image.category}
                      </span>
                      <h3 className="text-navy text-sm font-semibold font-heading leading-snug">
                        {image.caption}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface rounded-lg border border-dashed border-border">
                <p className="text-muted-foreground">
                  No campus photographs found in this category.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-navy/95 text-navy-foreground"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between p-4 bg-navy/60 backdrop-blur-sm border-b border-navy-foreground/10">
            <span className="text-sm font-semibold tracking-wider text-gold uppercase">
              {filteredImages[lightboxIndex].category} ({lightboxIndex + 1} /{" "}
              {filteredImages.length})
            </span>
            <button
              onClick={handleClose}
              className="lightbox-close p-2 text-navy-foreground/70 hover:text-white rounded-full hover:bg-navy-foreground/10 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-between relative px-4 py-8">
            {/* Left navigation button */}
            <button
              onClick={handlePrev}
              className="p-3 text-navy-foreground/70 hover:text-white rounded-full hover:bg-navy-foreground/10 transition-colors z-10 cursor-pointer hidden sm:block"
              aria-label="Previous Image"
            >
              <ChevronLeft className="size-8" />
            </button>

            {/* Main Image Container */}
            <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto h-full max-h-[70vh]">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-raised select-none"
              />
            </div>

            {/* Right navigation button */}
            <button
              onClick={handleNext}
              className="p-3 text-navy-foreground/70 hover:text-white rounded-full hover:bg-navy-foreground/10 transition-colors z-10 cursor-pointer hidden sm:block"
              aria-label="Next Image"
            >
              <ChevronRight className="size-8" />
            </button>
          </div>

          {/* Bottom Bar / Captions & Mobile controls */}
          <div className="bg-navy/80 backdrop-blur-sm border-t border-navy-foreground/10 p-6 text-center">
            <p className="max-w-3xl mx-auto text-base font-medium text-navy-foreground">
              {filteredImages[lightboxIndex].caption}
            </p>
            <p className="max-w-3xl mx-auto text-xs text-navy-foreground/60 mt-1">
              {filteredImages[lightboxIndex].alt}
            </p>

            {/* Mobile-only Navigation Controls */}
            <div className="flex items-center justify-center gap-8 mt-4 sm:hidden">
              <button
                onClick={handlePrev}
                className="p-2 text-navy-foreground/75 hover:text-white border border-navy-foreground/20 rounded-full"
                aria-label="Previous Image"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 text-navy-foreground/75 hover:text-white border border-navy-foreground/20 rounded-full"
                aria-label="Next Image"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
