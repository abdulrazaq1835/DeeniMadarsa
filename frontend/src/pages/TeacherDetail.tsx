import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { ArrowLeft, BookOpen, Clock, GraduationCap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Full teacher data with specialization details
const teacherProfiles = [
  {
    id: "manager",
    nameKey: "faculty.member.manager",
    titleKey: "faculty.manager.title",
    qualKey: "faculty.manager.qual",
    img: "/manager.webp",
    ring: "border-teal-300",
    stripe: "from-teal-500 to-emerald-600",
    glow: "from-teal-100 to-emerald-100",
    imgPos: "object-[50%_22%]",
    education: [
      { degree: "B.A. (Islamic Studies)", institution: "Aligarh Muslim University", year: "2001" },
      { degree: "Diploma in Office Management", institution: "UP Board of Technical Education", year: "2003" },
    ],
    experience: "20+ years",
    joinedYear: "2004",
    subjects: ["Office Administration", "Institutional Management", "Community Relations"],
    specialization: "Institutional administration, student welfare coordination, and community outreach. Oversees day-to-day operations of the Madarsa and ensures smooth functioning of all departments.",
    achievements: ["Founded the Madarsa's administrative framework in 2004", "Managed enrollment growth from 30 to 500+ students", "Established community partnership programs"],
    languages: ["Urdu", "Hindi", "Arabic (basic)"],
  },
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
    education: [
      { degree: "Hifz-ul-Quran (Hafiz)", institution: "Darul Uloom Deoband", year: "1998" },
      { degree: "Fazil (Alim Course)", institution: "Darul Uloom Deoband", year: "2003" },
      { degree: "Tajweed & Qira'at Specialization", institution: "Jamia Islamia, Allahabad", year: "2005" },
    ],
    experience: "18+ years",
    joinedYear: "2006",
    subjects: ["Quran Hifz", "Tajweed", "Deeniyat", "Islamic Studies"],
    specialization: "Expert in Quran memorization methodology and Tajweed rules. Leads the Hifz program and provides advanced Quranic education. Known for his patient teaching style and ability to guide students of all ages.",
    achievements: ["Guided 200+ students to complete Hifz-ul-Quran", "Developed the structured Hifz curriculum used at the Madarsa", "Recipient of community recognition award for Islamic education (2018)"],
    languages: ["Arabic", "Urdu", "Hindi"],
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
    education: [
      { degree: "Hifz-ul-Quran (Hafiz)", institution: "Jamia Islamia, Varanasi", year: "2005" },
      { degree: "Qari Course (Qira'at)", institution: "Darul Uloom Deoband", year: "2008" },
    ],
    experience: "14+ years",
    joinedYear: "2010",
    subjects: ["Urdu Language", "Qira'at", "Nazra Quran", "Basic Arabic"],
    specialization: "Specializes in Urdu language instruction and Quranic recitation (Qira'at). Focuses on correct pronunciation and fluency in Quran reading for beginner and intermediate students.",
    achievements: ["Trained 150+ students in Nazra Quran", "Developed Urdu reading workbooks for Classes 1–4", "Organized annual Quran recitation competitions"],
    languages: ["Urdu", "Arabic", "Hindi"],
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
    education: [
      { degree: "Hifz-ul-Quran (Hafiz)", institution: "Madrasa Islamia, Ghazipur", year: "2007" },
      { degree: "Qari Certification", institution: "Jamia Qasimul Uloom, Allahabad", year: "2010" },
    ],
    experience: "12+ years",
    joinedYear: "2012",
    subjects: ["Urdu", "Qira'at", "Islamic Etiquette", "Quran Recitation"],
    specialization: "Focuses on Urdu grammar and Quranic recitation with proper Tajweed. Works closely with younger students to build a strong foundation in Islamic studies and Urdu literacy.",
    achievements: ["Introduced interactive Urdu learning methods", "Mentored 100+ students in Qira'at", "Contributed to the Madarsa's annual Quran competition program"],
    languages: ["Urdu", "Arabic", "Hindi"],
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
    education: [
      { degree: "Hifz-ul-Quran (Hafiz)", institution: "Darul Uloom Waqf, Deoband", year: "2009" },
      { degree: "Arabic Language & Literature (Alim)", institution: "Darul Uloom Waqf, Deoband", year: "2014" },
    ],
    experience: "9+ years",
    joinedYear: "2015",
    subjects: ["Arabic Language", "Arabic Grammar (Nahw & Sarf)", "Islamic Literature", "Quran Translation"],
    specialization: "Expert in classical Arabic language and grammar. Teaches Arabic from beginner to advanced level, with a focus on understanding the Quran and Hadith in their original language.",
    achievements: ["Introduced Arabic language classes for Classes 6–8", "Authored Arabic grammar worksheets used across the Madarsa", "Helped students achieve proficiency in Quranic Arabic"],
    languages: ["Arabic", "Urdu", "Hindi"],
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
    education: [
      { degree: "B.Sc. (Mathematics)", institution: "Veer Bahadur Singh Purvanchal University, Jaunpur", year: "2008" },
      { degree: "B.Ed.", institution: "UP Basic Education Board", year: "2010" },
    ],
    experience: "13+ years",
    joinedYear: "2011",
    subjects: ["Mathematics (Classes 1–8)", "Hindi Language", "General Science"],
    specialization: "Specializes in making mathematics accessible and engaging for young learners. Uses visual and activity-based teaching methods to build strong numeracy skills. Also teaches Hindi language and grammar.",
    achievements: ["Improved class average math scores by 40% over 3 years", "Developed math activity kits for primary classes", "Mentored students who went on to score top marks in board exams"],
    languages: ["Hindi", "Urdu", "English (basic)"],
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
    education: [
      { degree: "B.Sc. (Mathematics & Physics)", institution: "Allahabad University", year: "2006" },
      { degree: "B.Ed.", institution: "UP Basic Education Board", year: "2008" },
    ],
    experience: "15+ years",
    joinedYear: "2009",
    subjects: ["Mathematics (Classes 5–8)", "General Knowledge", "Science"],
    specialization: "Experienced in teaching upper-primary mathematics and general knowledge. Uses real-world examples and problem-solving techniques to develop critical thinking in students.",
    achievements: ["Coached students for district-level math olympiad", "Created a GK quiz program that runs every Friday", "Recognized as 'Best Teacher' by parent community in 2021"],
    languages: ["Hindi", "Urdu", "English"],
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
    education: [
      { degree: "B.A. (English Literature)", institution: "Banaras Hindu University", year: "2010" },
      { degree: "B.Ed.", institution: "UP Basic Education Board", year: "2012" },
      { degree: "M.A. (English)", institution: "IGNOU", year: "2016" },
    ],
    experience: "11+ years",
    joinedYear: "2013",
    subjects: ["English Language (Classes 1–8)", "Social Science", "Environmental Studies"],
    specialization: "Passionate English language educator with a focus on communication skills, reading comprehension, and writing. Also teaches Social Science with an emphasis on local history and civic awareness.",
    achievements: ["Launched the Madarsa's first English speaking club", "Helped students achieve basic English fluency for secondary school readiness", "Developed Social Science project-based learning modules"],
    languages: ["English", "Hindi", "Urdu"],
  },
];

const TeacherDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const teacher = teacherProfiles.find((p) => p.id === id);

  if (!teacher) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <p className="text-2xl font-bold text-foreground">Teacher not found</p>
          <Link to="/faculty" className="text-teal-700 underline">← Back to Faculty</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-14 bg-gradient-to-br from-teal-900 to-emerald-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <Link to="/faculty" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("faculty.title")}
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Photo */}
            <div className={`shrink-0 w-36 h-44 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 ${teacher.ring} shadow-2xl bg-gradient-to-br ${teacher.glow} p-1`}>
              <img
                src={teacher.img}
                alt={t(teacher.nameKey)}
                className={`w-full h-full object-cover rounded-xl ${teacher.imgPos}`}
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <div className={`inline-block h-1 w-12 rounded-full bg-gradient-to-r ${teacher.stripe} mb-3`} />
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                {t(teacher.nameKey)}
              </h1>
              <p className="text-amber-300 font-semibold text-base sm:text-lg mb-1">{t(teacher.titleKey)}</p>
              <p className="text-white/60 text-sm mb-4">{t(teacher.qualKey)}</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  {teacher.experience} experience
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 text-xs text-white/80">
                  <Users className="w-3.5 h-3.5 text-teal-300" />
                  Joined {teacher.joinedYear}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none translate-y-px">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 40L720 10L1440 40V40H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

            {/* Specialization */}
            <div className="md:col-span-2 bg-teal-50/60 rounded-2xl border border-teal-100 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-teal-600" />
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Specialization</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{teacher.specialization}</p>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-2xl border border-teal-100/60 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Subjects Taught</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((s) => (
                  <span key={s} className="text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl border border-teal-100/60 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-amber-500" />
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.languages.map((l) => (
                  <span key={l} className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-teal-100/60 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Education</h2>
              </div>
              <div className="space-y-3">
                {teacher.education.map((edu, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-teal-600 font-medium">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl border border-teal-100/60 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-500" />
                <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">Key Achievements</h2>
              </div>
              <div className="space-y-2.5">
                {teacher.achievements.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 text-amber-500 shrink-0">✦</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Back button */}
          <div className="mt-8 text-center">
            <Button asChild className="bg-teal-700 hover:bg-teal-600 text-white rounded-full px-8">
              <Link to="/faculty" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Faculty
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeacherDetail;
