import React from "react";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

const SectionTitle = ({
  title,
  path,
}: {
  title: string;
  path: string;
}) => {
  const parts = path.split("|").map((p) => p.trim());

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-10">
      <div className="section-container">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          {title}
        </h1>
        <div className="flex items-center gap-1.5 text-blue-200 text-sm">
          {parts.map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <FiChevronRight className="text-blue-300 text-xs" />}
              {i === 0 ? (
                <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
                  <FiHome className="text-xs" /> {part}
                </Link>
              ) : (
                <span className={i === parts.length - 1 ? "text-white font-medium" : "hover:text-white"}>
                  {part}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
