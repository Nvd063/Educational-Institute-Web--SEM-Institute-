import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, CornerDownLeft, Sparkles } from "lucide-react";
import { searchDataset, type SearchItem } from "../../data/search";
import { cn } from "../../utilities/cn";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  { label: "Admissions", url: "/admissions" },
  { label: "Syllabus", url: "/syllabus" },
  { label: "Results", url: "/results" },
  { label: "Contact", url: "/contact" },
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Reset search when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      // Autofocus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Search filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchDataset.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
      );
    });

    setResults(filtered);
    setActiveIndex((prev) => (filtered.length > 0 ? 0 : -1));
  }, [query]);

  // Navigate helper
  const handleNavigate = useCallback(
    (url: string) => {
      onClose();
      navigate({ to: url });
    },
    [navigate, onClose],
  );

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : -1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : -1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleNavigate(results[activeIndex].url);
        }
      } else if (e.key === "Tab") {
        // Simple focus trap
        if (!overlayRef.current) return;
        const focusableElements = overlayRef.current.querySelectorAll(
          'input, button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, results, onClose, handleNavigate]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const activeElement = resultsRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Site"
      className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/60 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_oklch(0.15_0.06_264_/_0.25)] transition-all animate-in fade-in zoom-in-95 duration-200 hover:shadow-[0_32px_80px_oklch(0.79_0.12_82_/_0.15)]">
        {/* Search Input Bar */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 bg-surface smooth-transition hover:bg-surface/80">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, results, admissions..."
            className="flex-1 bg-transparent text-navy text-sm font-medium placeholder:text-muted-foreground/80 outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="btn-lightening-glimpse p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-gold transition-all cursor-pointer duration-300"
              aria-label="Clear query"
            >
              <X className="size-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-gold hover:border-gold/35 cursor-pointer smooth-transition"
            aria-label="Close search overlay"
          >
            Esc
          </button>
        </div>

        {/* Results / Navigation Body */}
        <div className="max-h-[350px] overflow-y-auto p-4">
          {/* Quick Recommendations */}
          {!query && (
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3 smooth-transition hover:text-gold hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
                <Sparkles className="size-3.5 text-gold" /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <Link
                    key={item.label}
                    to={item.url}
                    onClick={onClose}
                    className="btn-lightening-glimpse golden-glow-hover inline-flex h-9 items-center justify-center rounded-md border border-navy/15 bg-card hover:bg-secondary hover:border-gold/40 text-navy font-semibold px-4 text-xs cursor-pointer transition-all smooth-transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && results.length > 0 && (
            <div ref={resultsRef} className="flex flex-col gap-1">
              {results.map((item, idx) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer select-none smooth-transition text-left",
                    activeIndex === idx
                      ? "bg-navy text-navy-foreground border-gold shadow-[0_0_16px_oklch(0.79_0.12_82_/_0.3)]"
                      : "bg-card border-transparent hover:bg-secondary hover:border-gold/35 hover:shadow-[0_0_12px_oklch(0.79_0.12_82_/_0.15)]",
                  )}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-semibold tracking-wide truncate">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 smooth-transition",
                          activeIndex === idx ? "bg-gold text-navy drop-shadow-[0_0_8px_oklch(0.79_0.12_82_/_0.4)]" : "bg-secondary text-royal hover:bg-gold/20",
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 text-xs truncate",
                        activeIndex === idx ? "text-navy-foreground/75" : "text-muted-foreground",
                      )}
                    >
                      {item.description}
                    </p>
                  </div>

                  {activeIndex === idx && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)] shrink-0">
                      Go <CornerDownLeft className="size-3" />
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Empty Search Result State */}
          {query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm font-semibold text-navy">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto">
                Check your spelling or search for general topics like &ldquo;admission&rdquo;,
                &ldquo;curriculum&rdquo;, or &ldquo;calendar&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
