"use client";
import { DashboardProductTable, DashboardSidebar } from "@/components";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <DashboardProductTable />
      </div>
    </div>
  );
};

export default DashboardProducts;
