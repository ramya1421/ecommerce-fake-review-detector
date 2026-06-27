import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-24">
      <div className="text-center animate-slide-up max-w-md">
        {/* 404 visual */}
        <div className="relative inline-block mb-8">
          <div className="text-[120px] font-extrabold text-slate-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card px-6 py-3">
              <p className="text-blue-600 font-bold text-lg">Page Not Found</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-3">
          Oops, this page doesn&apos;t exist
        </h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for may have been moved, deleted, or never
          existed. Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary-custom"
          >
            <FiHome className="text-sm" /> Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 btn-secondary-custom"
          >
            <FiArrowLeft className="text-sm" /> Browse Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
