import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Faculty = () => {
  const { t } = useLanguage();

  const teachers = [
    {
      id: "tabrez",
      nameKey: "faculty.member.tabrez",
      titleKey: "faculty.principal.title",
      qualKey: "faculty.principal.qual",
      img: "/princpal new.webp",
      ring: "border-amber-300",
      stripe: "from-amber-500 to-yellow-600",
      glow: "from-amber-100 to-yellow-100",
      imgPos: "object-[50%_20%]",
    },
    {
      id: "jabir",
      nameKey: "faculty.member.jabir",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.jabir.qual",
      img: "/Hafiz Qari Jabir Hasan.webp",
      ring: "border-cyan-300",
      stripe: "from-cyan-500 to-sky-600",
      glow: "from-cyan-100 to-sky-100",
      imgPos: "object-[50%_18%]",
    },
    {
      id: "usman",
      nameKey: "faculty.member.usman",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.usman.qual",
      img: "/Hafiz Qari Imran Khan.webp",
      ring: "border-rose-300",
      stripe: "from-rose-500 to-pink-600",
      glow: "from-rose-100 to-pink-100",
      imgPos: "object-[50%_18%]",
    },
    {
      id: "abdullah",
      nameKey: "faculty.member.abdullah",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.abdullah.qual",
      img: "/Hafiz Abdullah Khan.webp",
      ring: "border-teal-300",
      stripe: "from-teal-500 to-emerald-600",
      glow: "from-teal-100 to-emerald-100",
      imgPos: "object-[50%_22%]",
    },
    {
      id: "jamshed",
      nameKey: "faculty.member.jamshed",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.jamshed.qual",
      img: "/Master Jamshed Khan.webp",
      ring: "border-cyan-300",
      stripe: "from-cyan-500 to-sky-600",
      glow: "from-cyan-100 to-sky-100",
      imgPos: "object-[50%_18%]",
    },
    {
      id: "nizam",
      nameKey: "faculty.member.nizam",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.nizamuddin.qual",
      img: "/Master Md. Nizamuddin.webp",
      ring: "border-amber-300",
      stripe: "from-amber-500 to-yellow-600",
      glow: "from-amber-100 to-yellow-100",
      imgPos: "object-[50%_20%]",
    },
    {
      id: "pawan",
      nameKey: "faculty.member.pawan",
      titleKey: "faculty.teacher.title",
      qualKey: "faculty.pawan.qual",
      img: "/Master Parvej Ahmad.webp",
      ring: "border-rose-300",
      stripe: "from-rose-500 to-pink-600",
      glow: "from-rose-100 to-pink-100",
      imgPos: "object-[50%_18%]",
    },
  ];

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-auto sm:h-[80vh] min-h-0 flex items-start sm:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/faculty.webp" alt="Faculty" className="w-full h-full object-cover transition-transform duration-[8s] ease-out" />
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
        <div className="relative z-10 container mx-auto px-4 text-center py-12 sm:py-14 md:py-16 lg:py-20 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            {t("faculty.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-1 w-12 bg-amber-400 rounded-full" />
            <div className="h-1 w-4 bg-amber-400/50 rounded-full" />
            <div className="h-1 w-2 bg-amber-400/25 rounded-full" />
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {t("hero.faculty.desc")}
          </p>
          <div className="flex flex-row flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-2xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("hero.apply")}</Link>
            </Button>
            <Button asChild size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 rounded-full px-8 hover:scale-105 transition-all duration-200">
              <Link to="/courses">{t("nav.courses")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 block leading-none translate-y-px" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── FACULTY GRID ── */}
      <section className="py-6 sm:py-8 lg:py-12 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="section-headline section-headline-teal font-heading text-2xl sm:text-3xl md:text-4xl font-bold">{t("faculty.title")}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-7 max-w-6xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.nameKey}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-teal-100/70 hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[21rem]">
                <div className={`h-1.5 bg-gradient-to-r ${teacher.stripe}`} />
                <div className="p-4 sm:p-5 lg:p-6 text-center">
                  <div className={`w-[12.5rem] sm:w-[13.5rem] lg:w-[14.5rem] aspect-[4/5] mx-auto p-1 rounded-2xl bg-gradient-to-br ${teacher.glow} mb-3`}>
                    <div className={`w-full h-full rounded-xl overflow-hidden border-2 ${teacher.ring} shadow-lg`}>
                      <img src={teacher.img} alt={t(teacher.nameKey)} className={`w-full h-full object-cover ${teacher.imgPos} transition-transform duration-500 group-hover:scale-110`} loading="lazy" />
                    </div>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">{t(teacher.nameKey)}</h3>
                  <p className="text-teal-600 text-sm font-semibold mt-1">{t(teacher.titleKey)}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t(teacher.qualKey)}</p>
                  <Link
                    to={`/faculty/${teacher.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-100 px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    View Profile <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;
