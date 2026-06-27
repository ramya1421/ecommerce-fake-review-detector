"use client";
import { AdminOrders, DashboardSidebar } from "@/components";
import React from "react";

const DashboardOrdersPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <AdminOrders />
      </div>
    </div>
  );
};

export default DashboardOrdersPage;
