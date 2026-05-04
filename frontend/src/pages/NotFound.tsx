import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/schoollogo.webp" alt="Logo" className="w-16 h-16 object-contain opacity-80" />
        </div>

        {/* 404 number */}
        <div className="font-heading text-[7rem] sm:text-[9rem] font-bold leading-none text-white/10 select-none mb-2">
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center -mt-8 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-amber-900/40 transition-all duration-200 hover:scale-105 text-sm"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs mb-3 uppercase tracking-widest">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: "/about", label: "About" },
              { to: "/courses", label: "Courses" },
              { to: "/faculty", label: "Faculty" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
