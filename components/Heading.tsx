import React from "react";

const Heading = ({ title }: { title: string }) => {
  return (
    <div className="text-center mb-2">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default Heading;
