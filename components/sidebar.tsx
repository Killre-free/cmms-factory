"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  permission?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "📊", permission: "view_dashboard" },
  { label: "Machines", href: "/dashboard/machines", icon: "⚙️", permission: "view_machines" },
  { label: "Work Orders", href: "/dashboard/work-orders", icon: "📋", permission: "view_work_orders" },
  { label: "PM", href: "/dashboard/preventive-maintenance", icon: "🔧", permission: "view_work_orders" },
  { label: "Spare Parts", href: "/dashboard/spare-parts", icon: "📦", permission: "view_work_orders" },
  { label: "Reports", href: "/dashboard/reports", icon: "📈", permission: "view_reports" },
  { label: "Users", href: "/dashboard/users", icon: "👥", permission: "manage_users" },
  { label: "Audit Log", href: "/dashboard/audit-logs", icon: "📝", permission: "view_audit_logs" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">⚙️ CMMS</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const hasPermission = !item.permission || session?.user?.permissions?.includes(item.permission);

          if (!hasPermission) return null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
