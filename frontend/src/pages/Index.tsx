import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, Heart, ChevronLeft, ChevronRight,
  Users, Award, Clock, Star, ArrowRight
} from "lucide-react";
import Layout from "@/components/Layout";
import { CourseAPI, AnnouncementAPI } from "@/lib/api";

const slides = [
  { id: 1, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).webp", badgeKey: "hero.slide1.badge", titleKey: "hero.welcome",      subtitleKey: "hero.subtitle",       descKey: "hero.slide1.desc" },
  { id: 2, img: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.webp",     badgeKey: "hero.slide2.badge", titleKey: "courses.title",     subtitleKey: "courses.subtitle",    descKey: "hero.slide2.desc" },
  { id: 3, img: "/WhatsApp Image 2026-04-13 at 10.32.41 AM.webp",     badgeKey: "hero.slide3.badge", titleKey: "donation.subtitle", subtitleKey: "donation.message",    descKey: "hero.slide3.desc" },
];

const stats = [
  { icon: Users,  end: 500, suffix: "+", labelKey: "about.achievements.students",  color: "from-teal-500 to-teal-700" },
  { icon: Award,  end: 200, suffix: "+", labelKey: "about.achievements.graduates", color: "from-emerald-500 to-emerald-700" },
  { icon: Clock,  end: 20,  suffix: "+", labelKey: "about.achievements.years",     color: "from-yellow-600 to-yellow-700" },
  { icon: Star,   end: 14,  suffix: "",  labelKey: "about.achievements.scholars",  color: "from-cyan-500 to-cyan-700" },
];

function useCountUp(end: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

const StatCard = ({ icon: Icon, end, suffix, labelKey, color, active, delay }: {
  icon: React.ElementType; end: number; suffix: string;
  labelKey: string; color: string; active: boolean; delay: number;
}) => {
  const { t } = useLanguage();
  const count = useCountUp(end, 1800, active);
  return (
    <div className="group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}>
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>
      <div className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 tabular-nums">{count}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 leading-snug">{t(labelKey)}</div>
    </div>
  );
};

const Index = () => {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [courses, setCourses] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [aboutCurrent, setAboutCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const aboutSlides = [
    {
      id: 1,
      img: "/schoollogo.webp",
      alt: "Darul Uloom Junaidia Ajmalia Logo",
      imgClass: "w-[78%] h-[78%] object-contain",
      bgClass: "bg-gradient-to-br from-teal-50 to-teal-100",
    },
    {
      id: 2,
      img: "/building.webp",
      alt: "Darul Uloom Junaidia Ajmalia Building",
      imgClass: "w-full h-full object-cover",
      bgClass: "bg-teal-100",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const nextAbout = useCallback(() => {
    setAboutCurrent((prevIdx) => (prevIdx + 1) % aboutSlides.length);
  }, [aboutSlides.length]);
  const prevAbout = useCallback(() => {
    setAboutCurrent((prevIdx) => (prevIdx - 1 + aboutSlides.length) % aboutSlides.length);
  }, [aboutSlides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const timer = setInterval(nextAbout, 4500);
    return () => clearInterval(timer);
  }, [nextAbout]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, newsRes] = await Promise.all([
          CourseAPI.getAll(),
          AnnouncementAPI.getPublic()
        ]);
        setCourses(coursesRes.data?.data || []);
        setNews(newsRes.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const courseStyles = [
    { icon: BookOpen, color: "from-teal-500 to-teal-700" },
    { icon: BookOpen, color: "from-teal-500 to-teal-700" },
    { icon: GraduationCap, color: "from-teal-500 to-teal-700" },
  ];

  // Maps a course's category (stored in DB) to its i18n key prefix.
  // Falls back to null so the component can render the raw API string.
  const getCourseI18nKey = (category: string): string | null => {
    const map: Record<string, string> = {
      hifz: "hifz",
      "hifz-ul-quran": "hifz",
      hafiz: "hifz",
      nazra: "nazra",
      "nazra quran": "nazra",
      naazra: "nazra",
      alim: "alim",
      "class 1-8": "alim",
      "class 1 to 8": "alim",
      school: "alim",
      academic: "alim",
    };
    return map[category?.toLowerCase()?.trim()] ?? null;
  };

  const getTranslatedCourse = (course: any) => {
    // Prefer DB-stored translations when language is hi or ur
    if (lang === "hi" && course.nameHi) {
      return { name: course.nameHi, description: course.descriptionHi || course.description };
    }
    if (lang === "ur" && course.nameUr) {
      return { name: course.nameUr, description: course.descriptionUr || course.description };
    }
    // Fall back to static i18n key mapping
    const key = getCourseI18nKey(course.category);
    if (!key) return { name: course.name, description: course.description };
    return {
      name: t(`course.${key}.name`),
      description: t(`course.${key}.desc`),
    };
  };

  const getTranslatedUnit = (unit: string) => {
    const unitMap: Record<string, string> = {
      Days: t("course.unit.days"),
      Weeks: t("course.unit.weeks"),
      Months: t("course.unit.months"),
      Years: t("course.unit.years"),
    };
    return unitMap[unit] ?? unit;
  };

  const getTranslatedLevel = (level: string) => {
    const levelMap: Record<string, string> = {
      Beginners: t("course.level.beginners"),
      Intermediate: t("course.level.intermediate"),
      Advanced: t("course.level.advanced"),
      "All Ages": t("course.level.allages"),
    };
    return levelMap[level] ?? level;
  };

  const getTranslatedNews = (item: any) => {
    if (lang === "hi" && item.titleHi) {
      return { title: item.titleHi, description: item.descriptionHi || item.description };
    }
    if (lang === "ur" && item.titleUr) {
      return { title: item.titleUr, description: item.descriptionUr || item.description };
    }
    return { title: item.title, description: item.description };
  };

  const newsColors = [
    "from-teal-500 to-emerald-600",
    "from-emerald-500 to-emerald-700",
    "from-yellow-500 to-yellow-700",
  ];

  const teachers = [
    {
      nameKey: "faculty.member.manager",
      titleKey: "faculty.manager.title",
      qualKey: "faculty.manager.qual",
      img: "/manager.webp",
      ring: "border-teal-300",
      stripe: "from-teal-500 to-emerald-600",
      glow: "from-teal-100 to-emerald-100",
      imgPos: "object-[50%_22%]",
    },
    {
      nameKey: "faculty.member.tabrez",
      titleKey: "faculty.principal.title",
      qualKey: "faculty.principal.qual",
      img: "/princpal new.webp",
      ring: "border-amber-300",
      stripe: "from-amber-500 to-yellow-600",
      glow: "from-amber-100 to-yellow-100",
      imgPos: "object-[50%_20%]",
    },
  ];

  const slide = slides[current];

  return (
    <Layout>
      {/* ── SLIDER HERO ── */}
      <section className="relative w-full h-[72vh] sm:h-[75vh] lg:h-[85vh] min-h-[520px] sm:min-h-[480px] overflow-x-hidden overflow-y-hidden">
        {slides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt={`slide-${s.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-emerald-900/82 to-green-950/88" />
          </div>
        ))}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-600/15 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 w-full overflow-hidden">
          <span key={`badge-${current}`}
            className="inline-block bg-yellow-500/95 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3.5 sm:px-4 py-1.5 sm:py-1.5 rounded-full mb-4 sm:mb-4 lg:mb-6 animate-fade-in shadow-lg shadow-yellow-900/40">
            {t(slide.badgeKey)}
          </span>
          <h1 key={`title-${current}`}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 max-w-4xl leading-tight animate-fade-up drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            {t(slide.titleKey)}
          </h1>
          <p key={`sub-${current}`}
            className="text-white text-[15px] sm:text-base md:text-lg max-w-2xl mb-2 sm:mb-3 animate-fade-up px-2 leading-relaxed"
            style={{ animationDelay: "0.15s" }}>
            {t(slide.subtitleKey)}
          </p>
          <p key={`desc-${current}`}
            className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-5 sm:mb-6 lg:mb-8 animate-fade-up px-2 leading-relaxed"
            style={{ animationDelay: "0.25s" }}>
            {t(slide.descKey)}
          </p>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-xl shadow-yellow-900/40 transition-all duration-200 hover:scale-105 w-auto">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-transparent border-2 border-white/70 text-white hover:bg-white/15 font-semibold text-sm sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 w-auto">
              <Link to="/donation">{t("hero.donate")}</Link>
            </Button>
          </div>
        </div>
        <button onClick={prev}
          className="absolute left-1 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
        </button>
        <button onClick={next}
          className="absolute right-1 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
        </button>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-yellow-500" : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display:"block", marginBottom:"-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-8 sm:py-10 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-14 items-center">
            <div className="relative max-w-xs sm:max-w-sm mx-auto w-full">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl shadow-teal-900/20">
                {aboutSlides.map((item, index) => (
                  <div key={item.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === aboutCurrent ? "opacity-100" : "opacity-0"}`}>
                    <div className={`w-full h-full flex items-center justify-center ${item.bgClass}`}>
                      <img src={item.img} alt={item.alt} className={item.imgClass} />
                    </div>
                  </div>
                ))}

                <button
                  onClick={prevAbout}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-teal-900/25 hover:bg-teal-900/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextAbout}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-teal-900/25 hover:bg-teal-900/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {aboutSlides.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setAboutCurrent(index)}
                      className={`h-2 rounded-full transition-all ${index === aboutCurrent ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/90"}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-yellow-600 text-white rounded-xl px-4 py-2 shadow-lg">
                <div className="font-heading text-xl font-bold">2004</div>
                <div className="text-xs opacity-90">Est. 1 March</div>
              </div>
            </div>
            <div>
              <h2 className="section-headline section-headline-teal font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
                {t("about.preview.title")}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {t("about.preview.text")}
              </p>
              <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full px-7 group shadow-lg hover:scale-105 transition-all duration-200">
                <Link to="/about" className="flex items-center gap-2">
                  {t("about.preview.readmore")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="py-8 sm:py-10 bg-teal-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-headline section-headline-teal font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{t("courses.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">{t("courses.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {courses.slice(0, 3).map((c, i) => {
              const style = courseStyles[i % courseStyles.length];
              const translated = getTranslatedCourse(c);
              return (
              <Link to="/courses" key={c._id || i}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100/60 flex flex-col h-full">
                {c.image && c.image.url && (
                  <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img src={c.image.url} alt={translated.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5 sm:p-7 flex flex-col flex-1">
                  {(!c.image || !c.image.url) && (
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-4 shadow-md`}>
                      <style.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  )}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">{translated.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">{translated.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      {c.duration?.value} {getTranslatedUnit(c.duration?.unit)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                <div className={`h-2 bg-gradient-to-r ${style.color}`} />
              </Link>
            )})}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Button asChild className="bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-50 rounded-full px-8">
              <Link to="/courses">{t("courses.title")} →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-headline section-headline-emerald font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              {t("home.news.heading")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {t("home.news.subheading")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {news.slice(0, 6).map((item, i) => {
              const color = newsColors[i % newsColors.length];
              const tn = getTranslatedNews(item);
              return (
                <div key={item._id || i} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className={`h-1.5 bg-gradient-to-r ${color}`} />
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">📢 {t("home.news.notice")}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-foreground mb-1">{tn.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 flex-1">{tn.description}</p>
                    {tn.description?.length > 120 && (
                      <button
                        onClick={() => setSelectedNews(item)}
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
          <div className="text-center mt-8 sm:mt-10">
            <Link to="/announcements" className="inline-flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-600 transition-colors border-2 border-teal-600 hover:bg-teal-50 rounded-full px-8 py-2.5 text-sm">
              {t("home.news.viewall")} →
            </Link>
          </div>

          {/* News detail modal */}
          {selectedNews && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">📢 {t("home.news.notice")}</span>
                  <span className="text-xs text-muted-foreground">
                    {selectedNews.createdAt ? new Date(selectedNews.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">{getTranslatedNews(selectedNews).title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{getTranslatedNews(selectedNews).description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOUNDER'S MESSAGE ── */}
      <section className="py-6 sm:py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="section-headline section-headline-amber font-heading text-2xl sm:text-3xl md:text-4xl font-bold">{t("about.founder.title")}</h2>
          </div>

          <div className="relative bg-gradient-to-br from-teal-900 to-emerald-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="flex items-center justify-center p-5 sm:p-8 md:border-r border-white/10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/30 to-teal-400/20 blur-xl scale-110" />
                  <div className="relative w-32 h-40 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img src="/founder.webp" alt="Founder" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg text-center whitespace-nowrap">
                    Sajjada Nashin
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 p-5 sm:p-10 flex flex-col justify-center">
                <div className="text-amber-400/30 font-heading text-6xl sm:text-8xl leading-none mb-1 sm:mb-2 select-none">"</div>
                <p className="font-heading text-base sm:text-xl md:text-2xl text-white/90 italic leading-relaxed mb-4 sm:mb-6 -mt-3 sm:-mt-6">
                  {t("about.founder.text").replace(/^"|".*$/g, '').replace(/ — .*$/, '')}
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-px flex-1 bg-white/20" />
                  <div className="text-right">
                    <p className="font-heading text-amber-300 font-bold text-sm sm:text-base">Hazrat Syed Akmal Ahmad Ajmali</p>
                    <p className="text-white/60 text-xs mt-0.5">Rahmatullah Alaih · Sajjada Nashin</p>
                    <p className="text-white/50 text-xs">Dargah Shah Ajmal, Allahabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTY SPOTLIGHT ── */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-background to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-headline section-headline-teal font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{t("faculty.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">{t("home.leadership.subheading")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
            {teachers.map((tc) => (
              <div key={tc.nameKey}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-teal-100/70 text-center w-full max-w-[21rem]">
                <div className={`h-1.5 bg-gradient-to-r ${tc.stripe}`} />
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className={`w-[12.5rem] sm:w-[13.5rem] lg:w-[14.5rem] aspect-[4/5] mx-auto p-1 rounded-2xl bg-gradient-to-br ${tc.glow} mb-3`}>
                    <div className={`w-full h-full rounded-xl overflow-hidden border-2 ${tc.ring} shadow-lg`}>
                      <img src={tc.img} alt={t(tc.nameKey)} className={`w-full h-full object-cover ${tc.imgPos} transition-transform duration-500 group-hover:scale-110`} loading="lazy" />
                    </div>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-foreground">{t(tc.nameKey)}</h3>
                  <p className="text-teal-600 text-sm sm:text-base font-semibold mt-1">{t(tc.titleKey)}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t(tc.qualKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faculty" className="text-teal-700 font-semibold hover:text-teal-600 transition-colors">
              {t("home.leadership.viewFaculty")} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DONATION CTA ── */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-0 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="w-full bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-5 sm:p-7 lg:p-10 xl:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }} />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left lg:max-w-2xl">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Heart className="w-4 h-4 text-amber-300" />
                <span className="text-amber-200 text-xs font-bold uppercase tracking-widest">{t("donation.cta.badge")}</span>
              </div>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                  {t("donation.subtitle")}
                </h2>
                <p className="text-white/75 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {t("donation.text")}
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center lg:justify-end items-center shrink-0 flex-wrap">
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/donation">{t("donation.button")}</Link>
                </Button>
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/contact">{t("nav.contact")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
