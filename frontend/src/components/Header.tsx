import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.about", path: "/about" },
    { key: "nav.courses", path: "/courses" },
    { key: "nav.faculty", path: "/faculty" },
    { key: "nav.donation", path: "/donation" },
    { key: "nav.contact", path: "/contact" },
  ];

  const languages = [
    { code: "en" as const, label: "English" },
    { code: "ur" as const, label: "اردو" },
    { code: "hi" as const, label: "हिन्दी" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 sm:h-[4.25rem]">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-3 font-heading text-xs sm:text-lg font-bold text-primary-foreground tracking-wide leading-tight min-w-0">
          <img src="/schoollogo.webp" alt="Logo" className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0" />
          <span className="truncate">Darul Uloom Junaidia Ajmalia</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-4 border-l border-primary-foreground/20 pl-4">
            <Globe className="w-4 h-4 text-primary-foreground/70" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
                  lang === l.code
                    ? "bg-accent text-accent-foreground font-bold"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground p-2 shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-primary-foreground/10 mt-2">
              <Globe className="w-4 h-4 text-primary-foreground/70 shrink-0" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileOpen(false); }}
                  className={`px-3 py-2 text-sm rounded ${
                    lang === l.code
                      ? "bg-accent text-accent-foreground font-bold"
                      : "text-primary-foreground/70"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
