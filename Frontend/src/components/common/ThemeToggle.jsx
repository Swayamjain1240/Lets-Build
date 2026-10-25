
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="
        relative inline-flex h-10 w-[76px] shrink-0
        items-center rounded-full border border-border
        bg-surface-soft p-1
        transition-colors duration-300
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-400 focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
    >
      <span
        className={`
          absolute left-1 top-1 flex h-8 w-8
          items-center justify-center rounded-full
          bg-brand-500 text-white shadow-md
          transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-0" : "translate-x-9"}
        `}
      >
        <Sun
          size={17}
          className={`
            absolute transition-all duration-300
            ${isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"}
          `}
        />

        <Moon
          size={17}
          className={`
            absolute transition-all duration-300
            ${isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"}
          `}
        />
      </span>
    </button>
  );
}
