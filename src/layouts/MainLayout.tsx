import type { ReactNode } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ScrollProgressRing } from "../components/effects/ScrollProgressRing";
import { NoorSwitch } from "@/components/NoorSwitch";
import { SiratChatbot } from "../components/chat/SiratChatbot";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-navy-foreground"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollProgressRing bottomOffset={88} />
      <NoorSwitch />
      <SiratChatbot />
    </div>
  );
}
