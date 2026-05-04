import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { CourseAPI } from "@/lib/api";
import { translateFields } from "@/lib/translate";
import { Loader2 } from "lucide-react";

type Course = {
  _id?: string;
  id?: string;
  name: string;
  nameHi: string;
  nameUr: string;
  category: string;
  level: string;
  description: string;
  descriptionHi: string;
  descriptionUr: string;
  totalStudents: number;
  duration: { value: number; unit: string };
  fees: { amount: number; isFree: boolean };
  image: { url: string; public_id: string };
  isActive: boolean;
  order: number;
};

const levelOptions = ["Beginners", "Intermediate", "Advanced", "All Ages"];

const emptyCourse: Course = {
  name: "", nameHi: "", nameUr: "",
  category: "",
  level: "Beginners",
  description: "", descriptionHi: "", descriptionUr: "",
  totalStudents: 0,
  duration: { value: 1, unit: "Years" },
  fees: { amount: 0, isFree: true },
  image: { url: "", public_id: "" },
  isActive: true,
  order: 0,
};

// Reusable translation button
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

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Course>(emptyCourse);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState<"hi" | "ur" | null>(null);

  const onImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setForm((prev) => ({ ...prev, image: { url: result, public_id: file.name } }));
    };
    reader.readAsDataURL(file);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await CourseAPI.getAllAdmin();
      setCourses(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleTranslate = async (lang: "hi" | "ur") => {
    if (!form.name && !form.description) return;
    setTranslating(lang);
    try {
      const result = await translateFields({ name: form.name, description: form.description }, lang);
      if (lang === "hi") {
        setForm((f) => ({ ...f, nameHi: result.name, descriptionHi: result.description }));
      } else {
        setForm((f) => ({ ...f, nameUr: result.name, descriptionUr: result.description }));
      }
    } finally {
      setTranslating(null);
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("nameHi", form.nameHi);
    formData.append("nameUr", form.nameUr);
    formData.append("category", form.category);
    formData.append("level", form.level);
    formData.append("description", form.description);
    formData.append("descriptionHi", form.descriptionHi);
    formData.append("descriptionUr", form.descriptionUr);
    formData.append("totalStudents", String(form.totalStudents));
    formData.append("duration[value]", String(form.duration.value));
    formData.append("duration[unit]", form.duration.unit);
    formData.append("fees[amount]", String(form.fees.amount));
    formData.append("fees[isFree]", String(form.fees.isFree));
    formData.append("isActive", String(form.isActive));
    formData.append("order", String(form.order));
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const courseId = form._id || form.id;
      if (courseId) {
        await CourseAPI.update(courseId, formData);
      } else {
        await CourseAPI.create(formData);
      }
      setOpen(false);
      setForm(emptyCourse);
      setSelectedFile(null);
      await load();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await CourseAPI.delete(id);
      await load();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openAdd = () => { setForm(emptyCourse); setSelectedFile(null); setOpen(true); };
  const openEdit = (item: Course) => { setForm(item); setSelectedFile(null); setOpen(true); };

  return (
    <AdminLayout title="Courses">
      <div className="mb-3 flex justify-start sm:mb-4">
        <button onClick={openAdd} className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
          + Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse">
                <div className="h-28 w-full bg-slate-200" />
                <div className="p-3">
                  <div className="h-4 w-2/3 rounded bg-slate-200 mb-2" />
                  <div className="h-3 w-full rounded bg-slate-100 mb-1" />
                  <div className="h-3 w-4/5 rounded bg-slate-100 mb-2" />
                  <div className="flex gap-2 mt-2">
                    <div className="h-6 w-12 rounded-lg bg-slate-200" />
                    <div className="h-6 w-14 rounded-lg bg-slate-200" />
                  </div>
                </div>
              </div>
            ))
          : courses.map((item) => (
            <div key={item._id || item.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {item.image?.url && (
                <img src={item.image.url} alt={item.name} className="h-28 w-full object-cover" />
              )}
              <div className="p-2.5 sm:p-3">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-teal-900 leading-tight">{item.name}</h3>
                  <span className="shrink-0 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">{item.category}</span>
                </div>
                <p className="mb-1 text-xs text-slate-500 line-clamp-2">{item.description}</p>
                {/* Translation status badges */}
                <div className="flex gap-1.5 mb-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.nameHi ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-400"}`}>
                    HI {item.nameHi ? "✓" : "—"}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.nameUr ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                    UR {item.nameUr ? "✓" : "—"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400 mb-2">
                  <span>{item.duration?.value} {item.duration?.unit}</span>
                  <span>{item.totalStudents} students</span>
                  <span>{item.fees?.isFree ? "Free" : `Rs ${item.fees?.amount ?? 0}`}</span>
                  <span className={item.isActive ? "text-teal-600" : "text-slate-400"}>{item.isActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-400">Edit</button>
                  <button onClick={() => onDelete(item._id || item.id as string)} className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-500">Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-teal-900">{form._id || form.id ? "Edit Course" : "Add Course"}</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg border px-2 py-1 text-sm">Close</button>
            </div>

            <form onSubmit={onSave} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* ── ENGLISH (required) ── */}
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">English (Required)</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Name (EN)</label>
                <input className="w-full rounded-lg border p-2" placeholder="Ex: Hifz ul Quran" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <input className="w-full rounded-lg border p-2" placeholder="Ex: Hifz" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (EN)</label>
                <textarea className="w-full rounded-lg border p-2" rows={3} placeholder="Course details in English..."
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>

              {/* ── AUTO TRANSLATE BUTTONS ── */}
              <div className="sm:col-span-2 flex flex-wrap gap-2 items-center rounded-xl bg-teal-50 border border-teal-100 px-3 py-2.5">
                <span className="text-xs font-semibold text-teal-700 mr-1">Auto-Translate from English:</span>
                <TranslateBtn label="→ हिन्दी (Hindi)" loading={translating === "hi"} onClick={() => handleTranslate("hi")} />
                <TranslateBtn label="→ اردو (Urdu)" loading={translating === "ur"} onClick={() => handleTranslate("ur")} />
                <span className="text-[10px] text-teal-500 ml-auto">Powered by MyMemory</span>
              </div>

              {/* ── HINDI ── */}
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">हिन्दी — Hindi</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Name (HI)</label>
                <input className="w-full rounded-lg border p-2" placeholder="हिन्दी में नाम" value={form.nameHi}
                  onChange={(e) => setForm({ ...form, nameHi: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (HI)</label>
                <textarea className="w-full rounded-lg border p-2" rows={3} placeholder="हिन्दी में विवरण..."
                  value={form.descriptionHi} onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })} />
              </div>

              {/* ── URDU ── */}
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">اردو — Urdu</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Name (UR)</label>
                <input className="w-full rounded-lg border p-2 text-right" dir="rtl" placeholder="اردو میں نام" value={form.nameUr}
                  onChange={(e) => setForm({ ...form, nameUr: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description (UR)</label>
                <textarea className="w-full rounded-lg border p-2 text-right" dir="rtl" rows={3} placeholder="اردو میں تفصیل..."
                  value={form.descriptionUr} onChange={(e) => setForm({ ...form, descriptionUr: e.target.value })} />
              </div>

              {/* ── OTHER FIELDS ── */}
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Other Details</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Level</label>
                <select className="w-full rounded-lg border p-2" value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })} required>
                  {levelOptions.map((level) => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Total Students</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="Ex: 50" value={form.totalStudents}
                  onChange={(e) => setForm({ ...form, totalStudents: Number(e.target.value) })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Duration Value</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="Ex: 3" value={form.duration.value}
                  onChange={(e) => setForm({ ...form, duration: { ...form.duration, value: Number(e.target.value) } })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Duration Unit</label>
                <input className="w-full rounded-lg border p-2" placeholder="Years / Months" value={form.duration.unit}
                  onChange={(e) => setForm({ ...form, duration: { ...form.duration, unit: e.target.value } })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Fees Amount</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="0 for free" value={form.fees.amount}
                  onChange={(e) => setForm({ ...form, fees: { ...form.fees, amount: Number(e.target.value) } })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Display Order</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="0, 1, 2..." value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Image Upload</label>
                <input className="w-full rounded-lg border p-2" type="file" accept="image/*" onChange={onImageFileChange} />
              </div>
              {form.image.url && (
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Image Preview</label>
                  <img src={form.image.url} alt="Course Preview" className="h-40 w-full rounded-lg border object-cover" />
                </div>
              )}
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.fees.isFree}
                  onChange={(e) => setForm({ ...form, fees: { ...form.fees, isFree: e.target.checked } })} />
                Free Course
              </label>
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active Course
              </label>
              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourses;
