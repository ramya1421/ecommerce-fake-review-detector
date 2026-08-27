"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiGrid,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") router.replace("/");
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use getElementById for reliable field access — form index is fragile
    // when there are buttons and checkboxes mixed in
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmpassword") as HTMLInputElement).value;

    if (!isValidEmail(email)) { setError("Invalid email address"); toast.error("Invalid email"); return; }
    if (!password || password.length < 8) { setError("Password must be at least 8 characters"); toast.error("Password too short"); return; }
    if (confirmPassword !== password) { setError("Passwords do not match"); toast.error("Passwords don't match"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 400) {
        const data = await res.json();
        toast.error(data.message ?? "This email is already registered");
        setError(data.message ?? "Email already in use");
      } else if (res.status === 201) {
        setError("");
        toast.success("Account created! Please sign in.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin-ring text-blue-600 text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>
        <Link href="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><FiGrid className="text-white text-sm" /></div>
          <span className="font-extrabold text-white text-xl">TrustShop</span>
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">Join thousands of<br />smart shoppers</h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm mb-8">
            Create your free account and start shopping with AI-powered fake review detection on every product.
          </p>
          {[
            "AI analysis on every review",
            "Authenticity scores and confidence ratings",
            "Real-time fake review flagging",
            "Verified purchase badges",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-blue-100 mb-2.5">
              <FiCheckCircle className="text-teal-300 flex-shrink-0" /> {f}
            </div>
          ))}
        </div>
        <p className="relative text-blue-200/60 text-xs">© {new Date().getFullYear()} TrustShop. All rights reserved.</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><FiGrid className="text-white text-sm" /></div>
            <span className="font-extrabold text-slate-800 text-xl">TrustShop</span>
          </Link>

          <div className="card-premium p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-slate-900">Create your account</h1>
              <p className="text-slate-500 text-sm mt-1">Free forever. No credit card required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">First Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input id="name" type="text" required placeholder="John" className="input-premium pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="lastname">Last Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input id="lastname" type="text" required placeholder="Doe" className="input-premium pl-10" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input id="email" type="email" autoComplete="email" required placeholder="you@example.com" className="input-premium pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required placeholder="Min. 8 characters" className="input-premium pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle password">
                    {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="confirmpassword">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input id="confirmpassword" type={showConfirm ? "text" : "password"} required placeholder="Repeat your password" className="input-premium pl-10 pr-10" />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle confirm">
                    {showConfirm ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="checkbox w-4 h-4 mt-0.5" />
                <span className="text-sm text-slate-600">I accept the <a href="#" className="text-blue-600 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 font-medium">Privacy Policy</a></span>
              </label>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
              )}

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 btn-primary-custom disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                {loading ? <FiLoader className="animate-spin-ring text-sm" /> : <><FiShield className="text-sm" /> Create Account <FiArrowRight className="text-sm" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
