"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  // LineChart,
  // Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Calendar,
  Users,
  // Activity,
  FileText,
  BarChart3,
  Eye,
  Phone,
  MessageCircle,
  Clock,
  UserCheck,
  // CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLayout } from "@/contexts/AdminLayoutContext";
import Image from "next/image";
import CalendarComponent from "@/components/dashboard/Calendar";
import QuickStatsCard from "@/components/dashboard/QuickStatsBar";

// Types for better type safety
interface ChartDataPoint {
  month?: string;
  day?: number;
  value: number;
}

interface StatsData {
  today: number;
  change: number;
  trend: "up" | "down";
}

interface ActiveDoctorsData {
  available: number;
  total: number;
  change: number;
  trend: "up" | "down";
}

interface RevenueData {
  amount: number;
  period: string;
  change: number;
  trend: "up" | "down";
}

interface QuickStatItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PatientDetail {
  pid: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  specialty: string;
  avatar: string;
  action: string;
}

// Dummy data structure for easy customization
const dashboardData = {
  admin: {
    name: "Admin",
    avatar: "/api/placeholder/80/80",
  },
  paymentIncome: {
    amount: 890.93,
    trend: "up" as const,
    chartData: [
      { month: "Jan", value: 200 },
      { month: "Feb", value: 150 },
      { month: "Mar", value: 180 },
      { month: "Apr", value: 220 },
      { month: "May", value: 350 },
      { month: "Jun", value: 320 },
      { month: "Jul", value: 400 },
      { month: "Aug", value: 380 },
      { month: "Sep", value: 180 },
      { month: "Oct", value: 160 },
      { month: "Nov", value: 140 },
      { month: "Dec", value: 120 },
    ] as ChartDataPoint[],
  },
  stats: {
    totalAppointments: {
      today: 235,
      change: 23,
      trend: "up" as const,
    } as StatsData,
    activeDoctors: {
      available: 23,
      total: 130,
      change: 23,
      trend: "up" as const,
    } as ActiveDoctorsData,
    revenue: {
      amount: 23000,
      period: "Month",
      change: 23,
      trend: "up" as const,
    } as RevenueData,
  },
  inputPatients: {
    value: "1.6k",
    change: 23,
    trend: "up" as const,
    chartData: [
      { day: 1, value: 50 },
      { day: 2, value: 80 },
      { day: 3, value: 60 },
      { day: 4, value: 90 },
      { day: 5, value: 120 },
      { day: 6, value: 100 },
      { day: 7, value: 140 },
    ] as ChartDataPoint[],
  },
  bedFree: {
    value: 179,
    change: 8.5,
    trend: "up" as const,
    chartData: [
      { day: 1, value: 160 },
      { day: 2, value: 170 },
      { day: 3, value: 165 },
      { day: 4, value: 175 },
      { day: 5, value: 180 },
      { day: 6, value: 179 },
      { day: 7, value: 179 },
    ] as ChartDataPoint[],
  },
  quickStats: {
    freeInMoment: {
      title: "Free in the moment",
      value: "9 Doctors",
      icon: UserCheck,
    } as QuickStatItem,
    labReports: {
      title: "Lab Reports",
      value: "13 Done",
      icon: FileText,
    } as QuickStatItem,
    patientWaiting: {
      title: "Patient Waiting",
      value: "10 in Lobby",
      icon: Clock,
    } as QuickStatItem,
  },
  currentTime: {
    time: "12:54",
    period: "PM",
    location: "Mumbai",
  },
  calendar: {
    currentMonth: "November 2018",
    selectedDate: 8,
    dates: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  patientDetails: [
    {
      pid: "9999999",
      name: "Ankit Wind",
      age: 45,
      gender: "Male",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "Dentist",
      avatar: "/api/placeholder/32/32",
      action: "Reschedule",
    },
    {
      pid: "#0000",
      name: "ByeWind",
      age: 33,
      gender: "Female",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      avatar: "/api/placeholder/32/32",
      action: "Confirm",
    },
    {
      pid: "#0000",
      name: "Ankit Wind",
      age: 21,
      gender: "Male",
      date: "29-Apr-2022",
      time: "13:00pm",
      type: "Teleconsultation",
      doctor: "Dr. Zoe",
      specialty: "Pediatrician",
      avatar: "/api/placeholder/32/32",
      action: "Cancel",
    },
    {
      pid: "#0000",
      name: "Anna Mayin",
      age: 18,
      gender: "Male",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "ENT",
      avatar: "/api/placeholder/32/32",
      action: "Reschedule",
    },
  ] as PatientDetail[],
};

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setAdminName, setAdminAvatar } = useLayout();
  const chartData = [
    { month: "Jan", amount: 150, percentage: 50 },
    { month: "Feb", amount: 200, percentage: 66.67 },
    { month: "Feb", amount: 200, percentage: 66.67 },
    { month: "Mar", amount: 180, percentage: 60 },
    { month: "Apr", amount: 220, percentage: 73.33 },
    { month: "May", amount: 300, percentage: 100 },
    { month: "Jun", amount: 350, percentage: 116.67 },
    { month: "Jul", amount: 200, percentage: 66.67 },
    { month: "Aug", amount: 380, percentage: 126.67 },
    { month: "Sep", amount: 200, percentage: 66.67 },
    { month: "Oct", amount: 250, percentage: 83.33 },
    { month: "Nov", amount: 180, percentage: 60 },
    { month: "Dec", amount: 160, percentage: 53.33 },
  ];

  

const getActionColor = (action: string) => {
    switch (action.toLowerCase().trim()) {
      case "confirm":
        return "text-[#4BAF75] border-[#A0E79F] border-1 rounded-full shadow-md bg-white";
      case "reschedule":
        return "text-[#EBA352] border-[#EBA352] border-1 rounded-full shadow-md bg-white";
      case "cancel":
        return "text-[#FF0000] border-[#FF0000] border-1 rounded-full shadow-md bg-white";
      default:
        return "text-[#4400FF] border-[#4400FF] border-1 rounded-full shadow-md bg-white";
    }
  };

  const chartHeight = "200px";
  useEffect(() => {
    setAdminName(dashboardData.admin.name);
    setAdminAvatar(dashboardData.admin.avatar);
  }, [dashboardData, setAdminName, setAdminAvatar]);
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - Payment Income Chart */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start w-full bg-gradient-to-r from-[#10CEC047] to-teal-50 my-10">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/payment.png"
                alt="Lock Icon"
                width={50}
                height={50}
                className="relative scale-200 ml-20"
              />
            </div>
            <div className="w-auto ">
              <h1 className="text-3xl p-2 ml-10 font-bold bg-gradient-to-r from-[#007065] to-[#28988D] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          {/* Revenue Chart */}
          <div className="flex flex-col gap-6 w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-6">
                <div className="text-3xl font-bold text-gray-900">$890.93</div>
                <div>
                  <div className="text-sm text-teal-700 font-medium mt-1">
                    Revenue
                  </div>
                  <div className="text-sm text-gray-500">Month</div>
                </div>
              </div>

              {/* Chart */}
              <div className="relative" style={{ height: chartHeight }}>
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>MAX</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>

                <div className="ml-12 h-full flex items-end justify-between gap-1">
                  {chartData.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className={`w-4/5 p-1 rounded-t ${
                          data.amount >= 300 ? "bg-[#086861]" : "bg-gray-200"
                        }`}
                        style={{
                          height: `${(data.percentage * 120) / 100}px`,
                          minHeight: "10px",
                        }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">
                        {data.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Revenue Chart ends */}

            {/* Line graph start */}
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="h-auto p-1">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            Input Patients
                          </p>
                          <p className="text-2xl font-bold">
                            {dashboardData.inputPatients.value}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-green-600 bg-green-50"
                        >
                          +{dashboardData.inputPatients.change}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={100}>
                        <AreaChart data={dashboardData.inputPatients.chartData}>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="h-auto p-1">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between p-0 m-0">
                        <div>
                          <p className="text-sm text-gray-600">Bed free</p>
                          <p className="text-2xl font-bold">
                            {dashboardData.bedFree.value}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-green-600 bg-green-50"
                        >
                          +{dashboardData.bedFree.change}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={100}>
                        <AreaChart data={dashboardData.bedFree.chartData}>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Line graph ends */}
          </div>

          {/* Blocks Section */}
          <div className="flex w-1/3">
            <div className="grid grid-cols-1 grid-rows-3 gap-6 w-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  className="border-1 border-[#005A51] text-[#005A51] w-2/3 h-auto"
                  style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
                >
                  <CardContent className="py-1 px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mt-2">
                          <span style={{ opacity: "0.5" }}>
                            {" "}
                            Total Appointment{" "}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-green-600 bg-green-50"
                          >
                            +{dashboardData.stats.totalAppointments.change}%
                          </Badge>
                        </p>

                        <p className="text-3xl font-bold py-2">
                          {dashboardData.stats.totalAppointments.today} Today
                        </p>
                      </div>
                      <Calendar className="w-1/5 h-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card
                  className="border-1 border-[#005A51] text-[#005A51] w-4/5"
                  style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
                >
                  <CardContent className="py-1 px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mt-2">
                          <span style={{ opacity: 0.5 }}>
                            All Active Doctors Today
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-green-600 bg-green-50 ml-2"
                          >
                            +{dashboardData.stats.activeDoctors.change}%
                          </Badge>
                        </p>

                        <p className="text-3xl font-bold py-2">
                          {dashboardData.stats.activeDoctors.available}/
                          {dashboardData.stats.activeDoctors.total} Available
                        </p>
                      </div>

                      <Users className="w-1/5 h-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card
                  className="border-1 border-[#005A51] text-[#005A51] w-4/5"
                  style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
                >
                  <CardContent className="py-1 px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mt-2">
                          <span style={{ opacity: 0.5 }}>Revenue Summary</span>
                          <Badge
                            variant="secondary"
                            className="text-green-600 bg-green-50 ml-2"
                          >
                            +{dashboardData.stats.revenue.change}%
                          </Badge>
                        </p>

                        <p className="text-3xl font-bold py-2">
                          ₹{dashboardData.stats.revenue.amount.toLocaleString()}{" "}
                          {dashboardData.stats.revenue.period}
                        </p>
                      </div>

                      <BarChart3 className="w-1/5 h-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Calendar Component */}
          <div className="flex flex-col items-end w-1/5">
            <div className="bg-white shadow-sm mb-6 -mt-30">
              <CalendarComponent />
            </div>

            {/* Quick Stats */}
            <div className="space-y-1 w-4/5 h-1/3 lg:w-full">
              {Object.entries(dashboardData.quickStats).map(
                ([key, stat], index) => (
                  <QuickStatsCard
                    key={key}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    index={index}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Patient Details Table */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Details Table</CardTitle>
              <Input
                placeholder="Search by..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b rounded-lg bg-[#086861] text-white">
                    <th className="text-left p-3 font-medium">PID</th>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Age/Gender</th>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Doctor</th>
                    <th className="text-left p-3 font-medium">Specialty</th>
                    <th className="text-left p-3 font-medium">Prescriptions</th>
                    <th className="text-left p-3 font-medium">Contact</th>
                    <th className="text-left p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.patientDetails.map((patient, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{patient.pid}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={patient.avatar}
                            alt={patient.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          {patient.name}
                        </div>
                      </td>
                      <td className="p-3">
                        {patient.age}/{patient.gender}
                      </td>
                      <td className="p-3">
                        {patient.date}|{patient.time}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            patient.type === "OPD" ? "default" : "secondary"
                          }
                        >
                          {patient.type}
                        </Badge>
                      </td>
                      <td className="p-3">{patient.doctor}</td>
                      <td className="p-3">{patient.specialty}</td>
                      <td className="p-3">
                        <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Phone className="w-4 h-4 text-gray-500 cursor-pointer" />
                          <MessageCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </div>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          className={`${getActionColor(patient.action)} hover:bg-white`}
                        >
                          {patient.action}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
