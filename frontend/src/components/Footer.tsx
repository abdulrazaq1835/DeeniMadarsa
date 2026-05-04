import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 mt-2 sm:mt-3 md:mt-4 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      <div className="container mx-auto px-4 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Left: Brand + Follow Us */}
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <img
                src="/schoollogo.webp"
                alt="Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full bg-white/10 p-1 shrink-0"
              />
              <h3 className="font-heading text-base sm:text-lg font-bold text-white leading-tight">
                Darul Uloom Junaidia Ajmalia
              </h3>
            </div>
            <p className="text-teal-200 text-sm mb-4 sm:mb-5 leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>
            <h3 className="font-heading text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.followus")}</h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {[
                { name: "Instagram", icon: <Instagram className="w-4 h-4" />, href: "#" },
                { name: "YouTube",   icon: <Youtube   className="w-4 h-4" />, href: "https://youtube.com/@andaleebegulshanerisalat?si=4K_OiZrgUVUpQLdz" },
              ].map((p) => (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}
                  className="p-2.5 bg-teal-700/50 border border-teal-600/50 rounded-xl text-teal-200 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  {p.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Quick Links — block centered, links left-aligned */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading text-lg font-bold mb-4 text-white border-b border-teal-700/50 pb-2 w-full text-center">
              {t("footer.quicklinks")}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm text-teal-200">
              {[
                { to: "/about",    label: t("nav.about") },
                { to: "/courses",  label: t("nav.courses") },
                { to: "/faculty",  label: t("nav.faculty") },
                { to: "/donation", label: t("nav.donation") },
                { to: "/contact",  label: t("nav.contact") },
              ].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Contact + Map */}
          <div>
            <h3 className="font-heading text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.contactmap")}</h3>
            <div className="space-y-3 text-sm text-teal-100">
              <a href="tel:+919876543210" className="flex items-center gap-3 w-fit hover:text-white transition-colors group">
                <span className="p-2 bg-teal-700/60 rounded-lg text-teal-300 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                {t("footer.phone")}
              </a>
              <a href="mailto:darululoomjunaidiaajmalia@gmail.com" className="flex items-center gap-3 w-fit hover:text-white transition-colors group">
                <span className="p-2 bg-teal-700/60 rounded-lg text-teal-300 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="break-all">{t("footer.email")}</span>
              </a>
              <div className="rounded-xl overflow-hidden border border-teal-700/60 bg-teal-900/30 w-full max-w-sm">
                <iframe
                  title="Darul Uloom Location Map"
                  src="https://maps.google.com/maps?q=Ghazipur%20Uttar%20Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-36"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-teal-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-300">
          <p className="text-center sm:text-left">{t("footer.copyright")}</p>
          <a
            href="https://athenura.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Designed & Developed By <span className="underline underline-offset-4 decoration-yellow-300/80">Athenura</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
