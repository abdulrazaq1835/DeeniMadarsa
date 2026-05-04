import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Award, BookOpen, GraduationCap, Users, Target, Eye,
  ArrowRight, CheckCircle2, Landmark, Heart
} from "lucide-react";

// Count-up hook — animates from 0 to `end` when `active` becomes true
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

// Single animated stat card
const StatCard = ({
  icon: Icon, end, suffix, labelKey, color, active,
}: {
  icon: React.ElementType; end: number; suffix: string;
  labelKey: string; color: string; active: boolean;
}) => {
  const { t } = useLanguage();
  const count = useCountUp(end, 1800, active);
  return (
    <div className="group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>
      <div className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1 leading-snug">{t(labelKey)}</div>
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users,         end: 500, suffix: "+", labelKey: "about.achievements.students",  color: "from-teal-500 to-teal-700" },
    { icon: GraduationCap, end: 200, suffix: "+", labelKey: "about.achievements.graduates", color: "from-emerald-500 to-emerald-700" },
    { icon: Award,         end: 25,  suffix: "+", labelKey: "about.achievements.years",     color: "from-amber-500 to-amber-700" },
    { icon: BookOpen,      end: 50,  suffix: "+", labelKey: "about.achievements.scholars",  color: "from-cyan-500 to-cyan-700" },
  ];


  const values = [
    { icon: CheckCircle2, titleKey: "value.knowledge.title", descKey: "value.knowledge.desc" },
    { icon: Heart,        titleKey: "value.teaching.title",  descKey: "value.teaching.desc" },
    { icon: Landmark,     titleKey: "value.service.title",   descKey: "value.service.desc" },
    { icon: Target,       titleKey: "value.excellence.title",descKey: "value.excellence.desc" },
  ];

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative h-auto sm:h-[80vh] min-h-0 flex items-start sm:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).webp" alt="About" className="w-full h-full object-cover scale-110 transition-transform duration-[8s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-emerald-900/82 to-green-950/88" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-600/15 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-14 md:py-16 lg:py-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
                {t("about.title")}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                <div className="h-1 w-12 bg-amber-400 rounded-full" />
                <div className="h-1 w-4 bg-amber-400/50 rounded-full" />
                <div className="h-1 w-2 bg-amber-400/25 rounded-full" />
              </div>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                {t("hero.about.desc")}
              </p>
              <div className="flex flex-row flex-wrap gap-3 justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Button asChild size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-2xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/contact">{t("hero.apply")}</Link>
                </Button>
                <Button asChild size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 rounded-full px-8 hover:scale-105 transition-all duration-200">
                  <Link to="/donation">{t("hero.donate")}</Link>
                </Button>
              </div>
            </div>

            {/* Building card on desktop */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-72 h-80">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 blur-xl scale-110" />
                <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/15 rotate-6 shadow-xl" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/25 -rotate-2 shadow-2xl">
                  <img src="/building.webp" alt="Building" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Est. 2004</span>
                    </div>
                    <p className="font-heading text-white text-sm font-bold">Darul Uloom Junaidia Ajmalia</p>
                    <p className="text-white/60 text-xs mt-0.5">Mehdur, Ghazipur, U.P.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 block leading-none translate-y-px" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-8 sm:py-10 bg-white -mt-px">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <StatCard key={i} icon={s.icon} end={s.end} suffix={s.suffix} labelKey={s.labelKey} color={s.color} active={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-background to-teal-50/40">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="rounded-3xl border border-teal-100/80 bg-white/90 shadow-sm px-5 sm:px-8 lg:px-10 py-6 sm:py-8 text-center">
            <h2 className="section-headline section-headline-teal font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5">{t("about.history.title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{t("about.history.text")}</p>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-100 via-amber-50/80 to-slate-100 border-y border-slate-200 overflow-hidden">
        <div className="w-full px-0">
          <div className="w-full border-y border-slate-200/80 bg-white/95 shadow-xl px-0 sm:px-2 py-8 sm:py-10">
            <div className="text-center mb-10 sm:mb-12 px-2 sm:px-4">
              <h2 className="section-headline section-headline-slate font-heading text-3xl sm:text-4xl md:text-5xl font-bold">{t("about.gallery.title")}</h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">{t("about.gallery.subtitle")}</p>
            </div>

            {/* Single auto-scroll row */}
            <div className="relative">
          <div className="flex gap-4 sm:gap-5 animate-[scroll-left_28s_linear_infinite] w-max px-2 sm:px-4">
            {[
              { src: "/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).webp", label: "Darul Uloom Campus" },
              { src: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.webp",     label: "Campus View" },
              { src: "/WhatsApp Image 2026-04-13 at 10.32.41 AM.webp",     label: "Students Assembly" },
              { src: "/building2.webp",                                      label: "Main Building" },
              // duplicate for seamless loop
              { src: "/WhatsApp Image 2026-04-13 at 10.32.40 AM (1).webp", label: "Darul Uloom Campus" },
              { src: "/WhatsApp Image 2026-04-13 at 10.32.40 AM.webp",     label: "Campus View" },
              { src: "/WhatsApp Image 2026-04-13 at 10.32.41 AM.webp",     label: "Students Assembly" },
              { src: "/building2.webp",                                      label: "Main Building" },
            ].map((img, i) => (
              <div key={i}
                className="group relative shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-teal-100"
                style={{ width: "clamp(260px, 35vw, 420px)", height: "clamp(180px, 24vw, 290px)" }}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 backdrop-blur-sm text-teal-800 text-xs font-bold px-3 py-1 rounded-full shadow">{img.label}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-background">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-4"><span className="w-2 h-2 rounded-full bg-teal-500" /><span className="text-teal-700 text-xs font-bold uppercase tracking-widest">{t("about.purpose")}</span></div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t("about.missionvision")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Mission */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-teal-700" />
              <div className="p-4 sm:p-5 lg:p-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 shadow-md">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-heading text-base sm:text-lg lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">{t("about.mission.title")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{t("about.mission.text")}</p>
              </div>
            </div>
            {/* Vision */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700" />
              <div className="p-4 sm:p-5 lg:p-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 shadow-md">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-heading text-base sm:text-lg lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">{t("about.vision.title")}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{t("about.vision.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-6 sm:py-8 lg:py-10 bg-teal-50/40">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="section-headline section-headline-amber font-heading text-2xl sm:text-3xl md:text-4xl font-bold">{t("about.corevalues")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {values.map((v, i) => (
              <div key={i}
                className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 text-center shadow-md hover:shadow-xl border border-teal-100/60 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-2xl bg-teal-600 sm:bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:bg-teal-600 transition-colors duration-300">
                  <v.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white sm:text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-heading text-sm sm:text-base font-bold text-foreground mb-1.5 sm:mb-2">{t(v.titleKey)}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-0 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="w-full bg-gradient-to-br from-teal-800 to-emerald-900 rounded-3xl p-5 sm:p-7 lg:p-10 xl:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: "30px 30px" }} />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left lg:max-w-2xl">
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                  {t("about.joincommunity")}
                </h2>
                <p className="text-white/75 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {t("about.jointext")}
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center lg:justify-end items-center shrink-0 flex-wrap">
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    {t("hero.apply")} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg"
                  className="w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
                  <Link to="/donation">{t("hero.donate")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default About;
