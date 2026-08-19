import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { site } from "../../data/site";
import { LinkButton } from "../common/Button";
import { SearchOverlay } from "./SearchOverlay";
import { cn } from "../../utilities/cn";

// Dropdown sections for Tarbiyah & Academics dropdown list
const tarbiyahDropdownItems = [
  { label: "Syllabus", hash: "#syllabus" },
  { label: "Schedule", hash: "#schedule" },
  { label: "Results", hash: "#results" },
  { label: "Students", hash: "#students" },
  { label: "Achievements", hash: "#achievements" },
  { label: "Mission & Vision", hash: "#mission-vision" },
  { label: "Policies", hash: "#policies" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTarbiyahOpen, setIsTarbiyahOpen] = useState(false);
  const [isMobileTarbiyahOpen, setIsMobileTarbiyahOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileTarbiyahOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden border-b border-border/70 bg-navy text-navy-foreground md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="tracking-[0.16em] uppercase">{site.tagline}</p>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-gold"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            {site.phone}
          </a>
        </div>
      </div>

      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src={logo}
            alt={`${site.name} crest`}
            width={48}
            height={48}
            className="size-11 w-auto"
          />
          <span className="leading-tight">
            <span className="block font-heading text-base font-semibold text-navy sm:text-lg">
              Sirat-e-Mustaqeem
            </span>
            <span className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              Educational System
            </span>
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            Home
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            About
          </Link>
          <Link
            to="/admissions"
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            Admissions
          </Link>

          {/* Hoverable / Clickable Dropdown for Tarbiyah & Academics */}
          <div
            className="relative"
            onMouseEnter={() => setIsTarbiyahOpen(true)}
            onMouseLeave={() => setIsTarbiyahOpen(false)}
          >
            <Link
              to="/syllabus"
              activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
              className="nav-link-hover flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
            >
              Tarbiyah & Academics
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", isTarbiyahOpen && "rotate-180")} />
            </Link>

            {/* Dropdown Items list */}
            {isTarbiyahOpen && (
              <div className="dropdown-enhanced absolute left-0 mt-0 w-48 rounded-md py-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {tarbiyahDropdownItems.map((item) => (
                  <Link
                    key={item.hash}
                    to="/syllabus"
                    hash={item.hash.replace("#", "")}
                    className="block px-4 py-2 text-xs font-semibold text-foreground/80 hover:bg-secondary hover:text-royal transition-all smooth-transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/results"
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            Evaluations
          </Link>
          <Link
            to="/gallery"
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-royal bg-secondary/80 font-semibold" }}
            className="nav-link-hover rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
            className="btn-lightening-glimpse inline-flex size-9 items-center justify-center rounded-md border border-navy/20 bg-card text-navy hover:bg-secondary hover:text-navy cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            <Search className="size-4.5" />
          </button>
          <LinkButton to="/admissions" size="sm" variant="gold">
            Apply for Admission
          </LinkButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
            className="btn-lightening-glimpse inline-flex size-10 items-center justify-center rounded-md border border-border text-navy cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-royal"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="btn-lightening-glimpse inline-flex size-10 items-center justify-center rounded-md border border-border text-navy"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="border-t border-border bg-card lg:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/admissions"
                onClick={closeMenu}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                Admissions
              </Link>
            </li>

            {/* Mobile Expandable Accordion for Tarbiyah & Academics */}
            <li>
              <button
                type="button"
                onClick={() => setIsMobileTarbiyahOpen(!isMobileTarbiyahOpen)}
                className="flex w-full items-center justify-between rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all hover:bg-secondary/60 text-left"
              >
                Tarbiyah & Academics
                <ChevronDown className={cn("size-4 transition-transform duration-200", isMobileTarbiyahOpen && "rotate-180")} />
              </button>

              {isMobileTarbiyahOpen && (
                <ul className="pl-4 border-l border-border/75 mt-1 space-y-1">
                  {tarbiyahDropdownItems.map((item) => (
                    <li key={item.hash}>
                      <Link
                        to="/syllabus"
                        hash={item.hash.replace("#", "")}
                        onClick={closeMenu}
                        className="block rounded px-2 py-2 text-xs font-semibold text-foreground/75 hover:bg-secondary hover:text-royal"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/results"
                onClick={closeMenu}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                Evaluations
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                onClick={closeMenu}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                activeProps={{ className: "text-royal bg-secondary/65 border-l-4 border-royal font-semibold pl-3" }}
                className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 transition-all focus:outline-none focus-visible:bg-secondary"
              >
                Contact
              </Link>
            </li>
            <li className="px-2 pt-3">
              <LinkButton to="/admissions" variant="gold" className="w-full">
                Apply for Admission
              </LinkButton>
            </li>
          </ul>
        </nav>
      ) : null}

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
