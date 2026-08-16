import { useTheme } from "@/context/ThemeContext";
import { Moon, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";

export function NoorSwitch() {
  const { theme, cycleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);

  const getThemeInfo = () => {
    switch (theme) {
      case "blush":
        return {
          label: "Sidr Aurora",
          icon: <Leaf className="size-5" />,
          nextTheme: "Ishq-e-Noor Pulse",
          buttonClass: "noor-btn-aurora",
          dotClass: "noor-dot-aurora",
          textClass: "noor-text-aurora",
        };
      case "meadow":
        return {
          label: "Ishq-e-Noor Pulse",
          icon: <Sparkles className="size-5" />,
          nextTheme: "Default",
          buttonClass: "noor-btn-pulse",
          dotClass: "noor-dot-pulse",
          textClass: "noor-text-pulse",
        };
      default:
        return {
          label: "Default",
          icon: <Moon className="size-5" />,
          nextTheme: "Sidr Aurora",
          buttonClass:
            "bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-300 border-yellow-500 hover:from-yellow-300 hover:via-amber-200 hover:to-yellow-200 hover:border-yellow-400 shadow-amber-500/30 hover:shadow-amber-500/50",
          dotClass: "bg-amber-700",
          textClass: "text-amber-900",
        };
    }
  };

  const themeInfo = getThemeInfo();
  const isAccentTheme = theme === "blush" || theme === "meadow";

  const handleClick = () => {
    // Trigger soft light shimmer when entering any theme
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 400);
    cycleTheme();
  };

  return (
    <div className="fixed left-6 bottom-6 z-[100]">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group relative inline-flex items-center gap-2 rounded-full backdrop-blur-md border px-5 py-3 shadow-lg transition-all duration-500 ease-out active:scale-95 ${themeInfo.buttonClass} ${
          isShimmering ? "soft-shimmer" : ""
        }`}
        title={`Switch to ${themeInfo.nextTheme} theme`}
        aria-label="Toggle theme"
      >
        {/* Animated background glow */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-400/20 to-yellow-500/0 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />

        {/* Micro-lightning / electric spark accents (subtle, decorative only) */}
        {isAccentTheme && (
          <span className="noor-sparks" aria-hidden="true">
            <span className="noor-spark noor-spark-1" />
            <span className="noor-spark noor-spark-2" />
            <span className="noor-spark noor-spark-3" />
          </span>
        )}

        {/* Content */}
        <div className={`relative flex items-center gap-2 ${themeInfo.textClass}`}>
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            {themeInfo.icon}
          </div>
          <span className="text-sm font-bold tracking-wide hidden sm:inline">
            Theme
          </span>
        </div>

        {/* Active indicator dot */}
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse ${themeInfo.dotClass}`} />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-full ml-3 bottom-0 px-3 py-2 bg-gray-900/95 backdrop-blur text-white text-xs rounded-lg whitespace-nowrap pointer-events-none animate-in fade-in duration-200">
          Switch to <span className="font-semibold">{themeInfo.nextTheme}</span>
          <div className="absolute right-full bottom-2 border-4 border-transparent border-r-gray-900/95" />
        </div>
      )}
    </div>
  );
}
