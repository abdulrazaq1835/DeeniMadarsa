import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { AnnouncementAPI } from "@/lib/api";
import { translateTitleDesc } from "@/lib/translate";
import { Loader2 } from "lucide-react";

type AnnouncementItem = {
  _id: string;
  title: string;
  titleHi: string;
  titleUr: string;
  description: string;
  descriptionHi: string;
  descriptionUr: string;
  isActive: boolean;
};

const emptyAnnouncement: AnnouncementItem = {
  _id: "", title: "", titleHi: "", titleUr: "",
  description: "", descriptionHi: "", descriptionUr: "",
  isActive: true,
};

const TranslateBtn = ({
  label, loading, onClick,
}: { label: string; loading: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 disabled:opacity-50 transition"
  >
    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "✦"}
    {label}
  </button>
);

const AdminNews = () => {
  const [news, setNews] = useState<AnnouncementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AnnouncementItem>(emptyAnnouncement);
  const [translating, setTranslating] = useState<"hi" | "ur" | null>(null);

  const load = async () => {
    try {
      const res = await AnnouncementAPI.getAdmin();
      setNews(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const pubRes = await AnnouncementAPI.getPublic();
          setNews(Array.isArray(pubRes.data?.data) ? pubRes.data.data : []);
        } catch (pubErr) { console.error(pubErr); }
        return;
      }
      console.error(err);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleTranslate = async (lang: "hi" | "ur") => {
    if (!form.title && !form.description) return;
    setTranslating(lang);
    try {
      const result = await translateTitleDesc({ title: form.title, description: form.description }, lang);
      if (lang === "hi") {
        setForm((f) => ({ ...f, titleHi: result.title, descriptionHi: result.description }));
      } else {
        setForm((f) => ({ ...f, titleUr: result.title, descriptionUr: result.description }));
      }
    } finally {
      setTranslating(null);
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!form._id;
    const payload = {
      title: form.title, titleHi: form.titleHi, titleUr: form.titleUr,
      description: form.description, descriptionHi: form.descriptionHi, descriptionUr: form.descriptionUr,
      isActive: form.isActive,
    };
    try {
      if (isEdit) {
        await AnnouncementAPI.update(form._id, payload);
      } else {
        await AnnouncementAPI.create(payload);
      }
      setOpen(false);
      setForm(emptyAnnouncement);
      await load();
    } catch (err) { console.error(err); }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await AnnouncementAPI.delete(id);
      await load();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout title="Announcements">
      <div className="mb-4 flex justify-start">
        <button onClick={() => { setForm(emptyAnnouncement); setOpen(true); }}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
          + Add Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {news.map((item) => (
          <div key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-teal-900 leading-tight">{item.title}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${item.isActive ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mb-2 text-sm text-slate-600 line-clamp-2">{item.description}</p>
            {/* Translation status */}
            <div className="flex gap-1.5 mb-3">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.titleHi ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-400"}`}>
                HI {item.titleHi ? "✓" : "—"}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.titleUr ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                UR {item.titleUr ? "✓" : "—"}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setForm({ ...emptyAnnouncement, ...item }); setOpen(true); }}
                className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-400">Edit</button>
              <button onClick={() => onDelete(item._id)}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-teal-900">{form._id ? "Edit Announcement" : "Add Announcement"}</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg border px-2 py-1 text-sm">Close</button>
            </div>

            <form onSubmit={onSave} className="grid grid-cols-1 gap-3">
              {/* ── ENGLISH ── */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">English (Required)</p>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title (EN)</label>
                <input className="w-full rounded-lg border p-2" placeholder="Announcement title" maxLength={200}
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (EN)</label>
                <textarea className="w-full rounded-lg border p-2" rows={4} placeholder="Announcement details..."
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>

              {/* ── AUTO TRANSLATE ── */}
              <div className="flex flex-wrap gap-2 items-center rounded-xl bg-teal-50 border border-teal-100 px-3 py-2.5">
                <span className="text-xs font-semibold text-teal-700 mr-1">Auto-Translate from English:</span>
                <TranslateBtn label="→ हिन्दी (Hindi)" loading={translating === "hi"} onClick={() => handleTranslate("hi")} />
                <TranslateBtn label="→ اردو (Urdu)" loading={translating === "ur"} onClick={() => handleTranslate("ur")} />
                <span className="text-[10px] text-teal-500 ml-auto">Powered by MyMemory</span>
              </div>

              {/* ── HINDI ── */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">हिन्दी — Hindi</p>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title (HI)</label>
                <input className="w-full rounded-lg border p-2" placeholder="हिन्दी में शीर्षक"
                  value={form.titleHi} onChange={(e) => setForm({ ...form, titleHi: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (HI)</label>
                <textarea className="w-full rounded-lg border p-2" rows={3} placeholder="हिन्दी में विवरण..."
                  value={form.descriptionHi} onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })} />
              </div>

              {/* ── URDU ── */}
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">اردو — Urdu</p>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title (UR)</label>
                <input className="w-full rounded-lg border p-2 text-right" dir="rtl" placeholder="اردو میں عنوان"
                  value={form.titleUr} onChange={(e) => setForm({ ...form, titleUr: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (UR)</label>
                <textarea className="w-full rounded-lg border p-2 text-right" dir="rtl" rows={3} placeholder="اردو میں تفصیل..."
                  value={form.descriptionUr} onChange={(e) => setForm({ ...form, descriptionUr: e.target.value })} />
              </div>

              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active Announcement
              </label>
              <div className="flex justify-end">
                <button type="submit" className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNews;
