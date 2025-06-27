"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  FileText,
  Settings,
  Shield,
  BarChart3,
  CreditCard,
  LogOut,
  Stethoscope,
  Bell,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { LayoutContext } from "../../../../../contexts/AdminLayoutContext";
import Image from "next/image";
import upgradeImage from "@/app/assets/upgrade.png"

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  link: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: BarChart3,
    label: "Dashboard",
    link: "/clinic-management/dashboard/admin",
  },
  {
    icon: Users,
    label: "Doctor Management",
    link: "/clinic-management/dashboard/admin/doctor-management",
  },
  {
    icon: Activity,
    label: "Patient Management",
    link: "/clinic-management/dashboard/admin/patient-management",
  },
  {
    icon: FileText,
    label: "Discharge Summary",
    link: "/clinic-management/dashboard/admin/discharge-summary",
  },
  {
    icon: FileText,
    label: "Lab Reports",
    link: "/clinic-management/dashboard/admin/lab-reports",
  },
  {
    icon: CreditCard,
    label: "Billing & Payment",
    link: "/clinic-management/dashboard/admin/billing-payment",
  },
  {
    icon: BarChart3,
    label: "AI Analytic & Reports",
    link: "/clinic-management/dashboard/admin/analytic-reports",
  },
  {
    icon: Shield,
    label: "User Access Control",
    link: "/clinic-management/dashboard/admin/user-access-control",
  },
  {
    icon: Settings,
    label: "Settings",
    link: "/clinic-management/dashboard/admin/settings",
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminName, setAdminName] = useState<string>();
  const [adminAvatar, setAdminAvatar] = useState<string>();
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    try {
      // Replace 'auth' with your Firebase auth instance
      // await signOut(auth);
      console.log(
        "Logout clicked - implement with your Firebase auth instance"
      );
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <LayoutContext.Provider
      value={{ adminName, setAdminName, adminAvatar, setAdminAvatar }}
    >
      <div className="flex h-screen bg-gray-50 z-10">
        {/* Sidebar */}
        {pathName !==
          "/clinic-management/dashboard/doctor/profile-settings" && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-64 bg-gradient-to-b from-[#08685E] to-[#1D6C64] text-white flex flex-col "
          >
            <div className="p-6 z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <h1 className="text-xl font-bold">Admin</h1>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => router.push(item.link)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      item.link === pathName
                        ? "bg-teal-700"
                        : "hover:bg-teal-700"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-6">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full flex items-center gap-3 text-white hover:bg-teal-700"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </Button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 z-0 flex-col overflow-auto mt-14">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white border-b flex"
          >
            <div className="bg-[#086861] px-4 py-3 h-14 z-0 top-0 left-0 flex justify-end fixed w-screen z-10 ">
              <div className="flex items-center space-x-3">
                <button className="bg-white px-3 py-1 border-1 border-black rounded-full text-sm font-medium">
                  Free Plan
                </button>
                <button className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Image src={upgradeImage} alt="Upgrade" width={30} height={30} className="float-left mx-2 flex items-center justify-center"/>Upgrade
                </button>
                <div className="w-8 h-8 text-white rounded-full flex items-center justify-center">
                  <Bell />
                </div>
                <div className="w-6 h-6 text-white border-2 p-1 border-white rounded-full flex items-center justify-center">
                  <Play />
                </div>
                <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">M</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
