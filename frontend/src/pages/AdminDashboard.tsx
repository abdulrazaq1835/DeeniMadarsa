import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { CourseAPI, AnnouncementAPI } from "@/lib/api";

type CountData = {
  courses: number;
  news: number;
};

type CourseItem = {
  id: string;
  name: string;
  category: string;
  level: string;
  duration?: { value?: number; unit?: string };
};

type NewsItem = {
  _id: string;
  title: string;
  description: string;
  isActive?: boolean;
};

// Skeleton row for loading state
const SkeletonRow = () => (
  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 animate-pulse">
    <div className="h-3.5 w-3/4 rounded bg-slate-200 mb-1.5" />
    <div className="h-2.5 w-1/2 rounded bg-slate-200 mb-1" />
    <div className="h-2.5 w-1/3 rounded bg-slate-200" />
  </div>
);

const AdminDashboard = () => {
  const minVisibleRows = 3;
  const [counts, setCounts] = useState<CountData>({ courses: 0, news: 0 });
  const [recentCourses, setRecentCourses] = useState<CourseItem[]>([]);
  const [activeNews, setActiveNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [cRes, nRes] = await Promise.all([
          CourseAPI.getAllAdmin(),
          AnnouncementAPI.getAdmin().catch(async (err) => {
            if (err.response?.status === 401) {
              return AnnouncementAPI.getPublic();
            }
            throw err;
          }),
        ]);
        
        const courses: CourseItem[] = Array.isArray(cRes.data?.data) ? cRes.data.data : [];
        const news: NewsItem[] = Array.isArray(nRes.data?.data) ? nRes.data.data : [];

        setCounts({
          courses: courses.length,
          news: news.length,
        });

        setRecentCourses(courses.slice(0, 5));
        setActiveNews(news.filter((item) => item.isActive !== false).slice(0, 5));
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        <div className="rounded-xl border border-teal-100 bg-teal-50 p-3 sm:p-4">
          <p className="text-sm text-teal-700">Courses</p>
          {loading ? (
            <div className="h-8 w-12 rounded bg-teal-200 animate-pulse mt-1" />
          ) : (
            <p className="text-2xl font-bold text-teal-900 sm:text-3xl">{counts.courses}</p>
          )}
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 sm:p-4">
          <p className="text-sm text-amber-700">Announcements</p>
          {loading ? (
            <div className="h-8 w-12 rounded bg-amber-200 animate-pulse mt-1" />
          ) : (
            <p className="text-2xl font-bold text-amber-900 sm:text-3xl">{counts.news}</p>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 items-start gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-900 sm:text-base">Recently Added Courses</h3>
            <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">Latest</span>
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: minVisibleRows }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : recentCourses.length === 0 ? (
            <p className="text-sm text-slate-500">No course added yet.</p>
          ) : (
            <div className="space-y-2">
              {recentCourses.map((course) => (
                <Link key={course.id} to="/admin/courses" className="block rounded-lg border border-slate-100 bg-slate-50 p-2.5 transition hover:border-teal-200 hover:bg-teal-50">
                  <p className="text-sm font-semibold text-slate-800">{course.name}</p>
                  <p className="text-xs text-slate-500">{course.category} • {course.level}</p>
                  <p className="text-xs text-slate-500">
                    Duration: {course.duration?.value ?? "-"} {course.duration?.unit ?? ""}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-teal-700">Open Courses page</p>
                </Link>
              ))}
              {Array.from({ length: Math.max(0, minVisibleRows - recentCourses.length) }).map((_, index) => (
                <article key={`course-placeholder-${index}`} className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-2.5">
                  <p className="text-sm font-semibold text-slate-400">No more courses</p>
                  <p className="text-xs text-slate-400">Add a new course to show here.</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-900 sm:text-base">Active Announcements</h3>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Active</span>
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: minVisibleRows }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : activeNews.length === 0 ? (
            <p className="text-sm text-slate-500">No active announcement found.</p>
          ) : (
            <div className="space-y-2">
              {activeNews.map((news) => (
                <Link key={news._id} to="/admin/news" className="block rounded-lg border border-slate-100 bg-slate-50 p-2.5 transition hover:border-amber-200 hover:bg-amber-50">
                  <p className="text-sm font-semibold text-slate-800">{news.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{news.description}</p>
                  <p className="mt-1 text-[11px] font-semibold text-amber-700">Open Announcements page</p>
                </Link>
              ))}
              {Array.from({ length: Math.max(0, minVisibleRows - activeNews.length) }).map((_, index) => (
                <article key={`news-placeholder-${index}`} className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-2.5">
                  <p className="text-sm font-semibold text-slate-400">No more announcements</p>
                  <p className="text-xs text-slate-400">Add a new announcement to show here.</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
