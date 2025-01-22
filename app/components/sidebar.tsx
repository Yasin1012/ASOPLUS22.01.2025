"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Calendar,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/app/contexts/auth-context";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-white box-border  h-screen">
      <div className="p-4 box-border border-b-2 border-[#001529]/20">
        <div className="flex items-center gap-2 ">
          <div className="w-8 h-8 bg-[#001529] rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-poppins font-bold text-2xl text-[#151D48]">
            ASOPLUS
          </span>
        </div>
      </div>
      <nav className="p-4 space-y-5 border-r-2 border-[#001529]/20 h-screen">
        <NavItem
          href="/dashboard/home"
          icon={LayoutDashboard}
          active={pathname === "/dashboard/home"}
        >
          Dashboard
        </NavItem>
        <NavItem
          href="/dashboard/companies"
          icon={Building2}
          active={pathname === "/dashboard/companies"}
        >
          Unternehmen
        </NavItem>
        <NavItem
          href="/dashboard/tasks"
          icon={ClipboardList}
          active={pathname === "/dashboard/tasks"}
        >
          Aufgaben
        </NavItem>
        <NavItem
          href="/dashboard/calendar"
          icon={Calendar}
          active={pathname === "/dashboard/calendar"}
        >
          Kalender
        </NavItem>
        <NavItem
          href="/dashboard/risk"
          icon={Shield}
          active={pathname === "/dashboard/risk"}
        >
          Gefahrenblatt
        </NavItem>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-poppins text-gray-600 hover:bg-gray-200 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
  active,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-poppins transition-all duration-200 ${
        active ? "bg-gray-600 text-white" : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={20} />
      {children}
    </Link>
  );
}
