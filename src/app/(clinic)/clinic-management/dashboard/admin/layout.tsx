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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { LayoutContext } from "../../../../../contexts/AdminLayoutContext";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  link: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: BarChart3, label: "Dashboard", link: "/clinic-management/dashboard/admin" },
  { icon: Users, label: "Doctor Management", link: "/clinic-management/dashboard/admin/doctor-management" },
  { icon: Activity, label: "Patient Management", link: "/clinic-management/dashboard/admin/patient-management" },
  { icon: FileText, label: "Discharge Summary", link: "/clinic-management/dashboard/admin/discharge-summary" },
  { icon: FileText, label: "Lab Reports", link: "/clinic-management/dashboard/admin/lab-reports" },
  { icon: CreditCard, label: "Billing & Payment", link: "/clinic-management/dashboard/admin/billing-payment" },
  { icon: BarChart3, label: "AI Analytic & Reports", link: "/clinic-management/dashboard/admin/analytic-reports" },
  { icon: Shield, label: "User Access Control", link: "/clinic-management/dashboard/admin/user-access-control" },
  { icon: Settings, label: "Settings", link: "/clinic-management/dashboard/admin/settings" },
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
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-teal-600 text-white flex flex-col"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-teal-600" />
              </div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
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
                    (item.link === pathName) ? "bg-teal-700" : "hover:bg-teal-700"
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 border-b flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={adminAvatar}
                alt="Admin"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, {adminName}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Free Plan
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Upgrade
              </Button>
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