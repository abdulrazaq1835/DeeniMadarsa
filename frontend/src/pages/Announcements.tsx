import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { AnnouncementAPI } from "@/lib/api";
import { X } from "lucide-react";

const newsColors = [
  "from-teal-500 to-emerald-600",
  "from-emerald-500 to-emerald-700",
  "from-yellow-500 to-yellow-700",
  "from-cyan-500 to-cyan-700",
  "from-amber-500 to-amber-700",
  "from-teal-400 to-teal-600",
];

const Announcements = () => {
  const { t, lang } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    AnnouncementAPI.getPublic()
      .then((res) => setNews(res.data?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-auto sm:h-[55vh] min-h-0 flex items-start sm:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).webp"
            alt="Announcements"
            className="w-full h-full object-cover scale-110 transition-transform duration-[8s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-emerald-900/82 to-green-950/88" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-12 sm:py-14 md:py-16 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            {t("home.news.heading")}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-yellow-400 rounded-full" />
            <div className="h-1 w-4 bg-yellow-400/50 rounded-full" />
            <div className="h-1 w-2 bg-yellow-400/25 rounded-full" />
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {t("home.news.subheading")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 block leading-none translate-y-px" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-8 sm:py-12 bg-white -mt-px">
        <div className="container mx-auto px-4 max-w-5xl">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 animate-pulse overflow-hidden">
                  <div className="h-1.5 bg-slate-200" />
                  <div className="p-5">
                    <div className="h-3 w-1/3 rounded bg-slate-200 mb-3" />
                    <div className="h-4 w-3/4 rounded bg-slate-200 mb-2" />
                    <div className="h-3 w-full rounded bg-slate-100 mb-1" />
                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">{t("home.news.notice")} — No announcements yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {news.map((item, i) => {
                const color = newsColors[i % newsColors.length];
                return (
                  <div
                    key={item._id || i}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${color}`} />
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                          📢 {t("home.news.notice")}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground mb-2">
                    {lang === "hi" && item.titleHi ? item.titleHi : lang === "ur" && item.titleUr ? item.titleUr : item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-4 flex-1">
                    {lang === "hi" && item.descriptionHi ? item.descriptionHi : lang === "ur" && item.descriptionUr ? item.descriptionUr : item.description}
                  </p>
                      {item.description?.length > 120 && (
                        <button
                          onClick={() => setSelected(item)}
                          className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors self-start"
                        >
                          {t("home.news.readmore")} →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">📢 {t("home.news.notice")}</span>
              <span className="text-xs text-muted-foreground">
                {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : ""}
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">
              {lang === "hi" && selected.titleHi ? selected.titleHi : lang === "ur" && selected.titleUr ? selected.titleUr : selected.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {lang === "hi" && selected.descriptionHi ? selected.descriptionHi : lang === "ur" && selected.descriptionUr ? selected.descriptionUr : selected.description}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Announcements;
