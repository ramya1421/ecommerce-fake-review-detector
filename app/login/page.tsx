"use client";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiGrid,
  FiLoader,
} from "react-icons/fi";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") router.replace("/");
  }, [sessionStatus, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;

    if (!isValidEmailAddressFormat(email)) {
      setError("Please enter a valid email address");
      toast.error("Invalid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      toast.error("Password too short");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } else {
      setError("");
      toast.success("Welcome back!");
      router.replace("/");
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
      {/* Left — branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>
        <Link href="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiGrid className="text-white text-sm" />
          </div>
          <span className="font-extrabold text-white text-xl">TrustShop</span>
        </Link>
        <div className="relative">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <FiShield className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
            AI-Powered<br />Review Verification
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
            Sign in to access your account and shop with confidence knowing every
            review has been verified by our AI detection system.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Reviews Analyzed", value: "10K+" },
              { label: "Fake Detected", value: "847" },
              { label: "Trust Score", value: "98%" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-[10px] text-blue-200 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-blue-200/60 text-xs">
          © {new Date().getFullYear()} TrustShop. All rights reserved.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiGrid className="text-white text-sm" />
            </div>
            <span className="font-extrabold text-slate-800 text-xl">TrustShop</span>
          </Link>

          <div className="card-premium p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome back</h1>
              <p className="text-slate-500 text-sm mt-1">Sign in to continue shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="input-premium pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Min. 8 characters"
                    className="input-premium pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox w-4 h-4" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 btn-primary-custom disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <FiLoader className="animate-spin-ring text-sm" />
                ) : (
                  <>Sign In <FiArrowRight className="text-sm" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
