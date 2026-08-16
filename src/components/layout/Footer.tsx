import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo.png";
import { footerNavigation, site } from "../../data/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt={`${site.name} crest`}
              width={44}
              height={44}
              loading="lazy"
              className="size-11 w-auto"
            />
            <span className="font-heading text-lg font-semibold text-navy-foreground">
              Sirat-e-Mustaqeem
            </span>
          </div>
          <p className="mt-4 text-sm text-navy-foreground/75">
            A co-educational institution serving students from Play Group to Matriculation since{" "}
            {site.established}, with a focus on academic depth and character.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">{site.tagline}</p>
        </div>

        {footerNavigation.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-navy-foreground smooth-transition hover:text-gold hover:drop-shadow-[0_0_8px_oklch(0.79_0.12_82_/_0.4)]">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-navy-foreground/75 smooth-transition hover:text-gold hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-navy-foreground/15">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-navy-foreground/75 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            <li className="flex items-start gap-2 smooth-transition hover:text-gold hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 text-gold" />
              {site.address}
            </li>
            <li className="flex items-center gap-2 smooth-transition hover:text-gold">
              <Phone aria-hidden="true" className="size-4 text-gold" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2 smooth-transition hover:text-gold">
              <Mail aria-hidden="true" className="size-4 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:drop-shadow-[0_0_6px_oklch(0.79_0.12_82_/_0.3)]">
                {site.email}
              </a>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
