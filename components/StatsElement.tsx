import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { IconType } from "react-icons";

interface StatsElementProps {
  title?: string;
  value?: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: IconType;
  iconBg?: string;
  iconColor?: string;
}

const StatsElement: React.FC<StatsElementProps> = ({
  title = "New Products",
  value = "2,230",
  change = "+12.5% since last month",
  trend = "up",
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}) => {
  return (
    <div className="card-premium p-5 flex items-start gap-4 w-full">
      {Icon && (
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`text-lg ${iconColor}`} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-extrabold text-slate-900">{value}</p>
        <div
          className={`flex items-center gap-1 text-xs font-semibold mt-1 ${trend === "up"
              ? "text-green-600"
              : trend === "down"
                ? "text-red-500"
                : "text-slate-500"
            }`}
        >
          {trend === "up" ? (
            <FiTrendingUp className="text-xs" />
          ) : trend === "down" ? (
            <FiTrendingDown className="text-xs" />
          ) : null}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsElement;
