import { useState, type FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Send, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const Donation = () => {
  const { t } = useLanguage();
  const [donationForm, setDonationForm] = useState({ name: "", email: "", phone: "", address: "", donationType: "", whyDonate: "", otherReason: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handlePopupClose = () => setShowPopup(false);

  const donationTypes = [
    { key: "donation.type.zakat",       value: "Zakat" },
    { key: "donation.type.sadaqah",     value: "Sadaqah" },
    { key: "donation.type.sponsorship", value: "Student Sponsorship" },
    { key: "donation.type.education",   value: "Education Support" },
    { key: "donation.type.food",        value: "Food Support" },
    { key: "donation.type.building",    value: "Building Fund" },
    { key: "donation.type.general",     value: "General Donation" },
  ];

  const whyDonateReasons = [
    "donation.why.1", "donation.why.2", "donation.why.3", "donation.why.4",
  ];

  const handleDonationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!donationForm.name || !donationForm.phone) return;

    const whyDisplay = donationForm.whyDonate === "other"
      ? donationForm.otherReason
      : donationForm.whyDonate ? t(donationForm.whyDonate) : "";

    const lines = [
      "*Darul Uloom Junaidia Ajmalia*",
      "*New Donation Request*",
      "",
      "*Name:* " + donationForm.name,
      "*Phone:* " + donationForm.phone,
      donationForm.email        ? "*Email:* " + donationForm.email        : "",
      donationForm.address      ? "*Address:* " + donationForm.address    : "",
      whyDisplay                ? "*Reason:* " + whyDisplay               : "",
      donationForm.donationType ? "*Donation Type:* " + donationForm.donationType : "",
      "",
      "*JazakAllah Khair for your support!*",
    ].filter(Boolean).join("\n");

    const url = "https://wa.me/+916394569711?text=" + encodeURIComponent(lines);
    setWhatsappUrl(url);
    setShowPopup(true);
    setDonationForm({ name: "", email: "", phone: "", address: "", donationType: "", whyDonate: "", otherReason: "" });
  };

  return (
    <Layout>

      {/* HERO */}
      <section className="relative h-auto sm:h-[80vh] min-h-0 flex items-start sm:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/WhatsApp Image 2026-04-13 at 10.32.41 AM.webp" alt="Donation" className="w-full h-full object-cover scale-110 transition-transform duration-[8s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/90 via-emerald-900/82 to-green-950/88" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-600/15 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-12 sm:py-14 md:py-16 lg:py-20 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            {t("donation.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-1 w-12 bg-amber-400 rounded-full" />
            <div className="h-1 w-4 bg-amber-400/50 rounded-full" />
            <div className="h-1 w-2 bg-amber-400/25 rounded-full" />
          </div>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {t("hero.donation.desc")}
          </p>
          <div className="flex flex-row flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-full px-8 shadow-2xl shadow-amber-900/40 hover:scale-105 transition-all duration-200">
              <a href="https://wa.me/919835051934?text=I want to donate to Darul Uloom Junaidia Ajmalia" target="_blank" rel="noopener noreferrer">
                {t("donation.button")}
              </a>
            </Button>
            <Button asChild size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 rounded-full px-8 hover:scale-105 transition-all duration-200">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 block leading-none translate-y-px" style={{ marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="py-6 sm:py-8 lg:py-10 bg-white -mt-px">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="section-headline section-headline-amber font-heading text-2xl sm:text-3xl md:text-4xl font-bold">{t("donation.subtitle")}</h2>
          </div>

          <div className="bg-amber-50/60 rounded-3xl border border-amber-100 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleDonationSubmit} className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Input
                placeholder={t("donation.form.name")}
                value={donationForm.name}
                onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                required
                className="rounded-2xl border-amber-200 focus:ring-amber-500"
              />
              <Input
                type="tel"
                placeholder={t("donation.form.phone")}
                value={donationForm.phone}
                onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                required
                className="rounded-2xl border-amber-200 focus:ring-amber-500"
              />
              <Input
                type="email"
                placeholder={t("donation.form.email")}
                value={donationForm.email}
                onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                className="rounded-2xl border-amber-200 focus:ring-amber-500"
              />
              <Input
                placeholder={t("donation.form.address")}
                value={donationForm.address}
                onChange={(e) => setDonationForm({ ...donationForm, address: e.target.value })}
                className="rounded-2xl border-amber-200 focus:ring-amber-500"
              />

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-2">{t("donation.form.whydonate.label")}</label>
                <Select
                  value={donationForm.whyDonate}
                  onValueChange={(value) => setDonationForm({ ...donationForm, whyDonate: value, otherReason: "" })}
                >
                  <SelectTrigger className="rounded-2xl border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder={t("donation.form.whydonate.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {whyDonateReasons.map((key, index) => (
                      <SelectItem key={index} value={key}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                          <span className="text-sm">{t(key)}</span>
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="other">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                        <span className="text-sm">{t("donation.type.other")}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {donationForm.whyDonate === "other" && (
                <div className="sm:col-span-2">
                  <Textarea
                    placeholder={t("donation.form.other.placeholder")}
                    value={donationForm.otherReason}
                    onChange={(e) => setDonationForm({ ...donationForm, otherReason: e.target.value })}
                    rows={3}
                    className="rounded-2xl border-amber-200 focus:ring-amber-500 resize-none"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-amber-700 mb-2">{t("donation.form.type.label")}</label>
                <Select
                  value={donationForm.donationType}
                  onValueChange={(value) => setDonationForm({ ...donationForm, donationType: value })}
                >
                  <SelectTrigger className="rounded-2xl border-amber-200 focus:ring-amber-500">
                    <SelectValue placeholder={t("donation.form.type.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {donationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {t(type.key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="sm:col-span-2 w-full bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 py-3"
              >
                <Send className="w-4 h-4" /> {t("donation.form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <button onClick={handlePopupClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-amber-600" />
            </button>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-200">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{t("donation.popup.title")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {t("donation.popup.msg1")}
            </p>
            <p className="text-amber-700 font-semibold text-sm mb-6">
              {t("donation.popup.msg2")}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePopupClose}
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl py-3 shadow-lg shadow-green-200 hover:scale-[1.02] transition-all duration-200 mb-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t("donation.popup.btn")}
            </a>
            <button onClick={handlePopupClose} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("donation.popup.close")}
            </button>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default Donation;
