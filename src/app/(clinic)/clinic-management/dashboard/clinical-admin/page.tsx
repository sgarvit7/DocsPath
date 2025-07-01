"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  Search,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickStatsCard from "@/components/dashboard/QuickStatsBar";
import CalendarComponent from "@/components/dashboard/Calendar";
import Image from "next/image";

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  date: string;
  mode: string;
  condition: string;
  status: "Reschedule" | "Cancel" | "Upcoming";
  consultation: string;
  avatar: string;
}

interface LabReport {
  day: string;
  reports: number;
}

interface StatsCard {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  icon?: React.ReactNode;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const statsCards: StatsCard[] = [
    {
      title: "Today you have:",
      value: 6,
      subtitle: "Patient in Lobby",
      color: "#086861",
    },
    {
      title: "Appointments for the day:",
      value: 12,
      subtitle: "appointment Today",
      color: "#22C55E",
    },
  ];
  // Sample data
  const labReports: LabReport[] = [
    { day: "M", reports: 24 },
    { day: "T", reports: 8 },
    { day: "W", reports: 5 },
    { day: "T", reports: 10 },
    { day: "F", reports: 23 },
    { day: "S", reports: 6 },
    { day: "S", reports: 19 },
  ];

  const bedFreeData = [
    { day: 1, value: 160 },
    { day: 2, value: 180 },
    { day: 3, value: 200 },
    { day: 4, value: 240 },
    { day: 5, value: 200 },
    { day: 6, value: 179 },
    { day: 7, value: 179 },
  ];

  const patients: Patient[] = [
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 45,
      gender: "Male",
      date: "10-Apr-2022 | 3:00pm",
      mode: "OPD",
      condition: "Fever",
      status: "Reschedule",
      consultation: "Join now",
      avatar: "AW",
    },
    {
      id: "#0000",
      name: "Byrdwind",
      age: 33,
      gender: "Female",
      date: "10-Apr-2022 | 3:00pm",
      mode: "Teleconsultation",
      condition: "Cold",
      status: "Cancel",
      consultation: "-",
      avatar: "BW",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 21,
      gender: "Male",
      date: "10-Apr-2022 | 3:00pm",
      mode: "OPD",
      condition: "Diabetes",
      status: "Upcoming",
      consultation: "-",
      avatar: "AW",
    },
    {
      id: "#0000",
      name: "Anna Mayin",
      age: 18,
      gender: "Male",
      date: "10-Apr-2022 | 3:00pm",
      mode: "OPD",
      condition: "Coughing",
      status: "Cancel",
      consultation: "-",
      avatar: "AM",
    },
  ];

  const filteredPatients = useMemo(() => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) return patients; // empty box ⇒ show everything
  
      return patients.filter((p) =>
        [
          p.id,
          p.name,
          p.age.toString(),
          p.gender,
          p.date,
          p.mode,
          p.condition,
          p.status,
          p.consultation,
        ].some((field) => field.toLowerCase().includes(q))
      );
    }, [patients, searchTerm]);

  const hourlyData = [
    { hour: "3:00", a: 30, b: 15, c: 10 },
    { hour: "4:00", a: 22, b: 18, c: 8 },
    { hour: "5:00", a: 25, b: 10, c: 15 },
    { hour: "6:00", a: 20, b: 14, c: 12 },
    { hour: "7:00", a: 12, b: 8, c: 10 },
    { hour: "8:00", a: 10, b: 5, c: 6 },
    { hour: "9:00", a: 9, b: 4, c: 5 },
    { hour: "10:00", a: 6, b: 2, c: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase().trim()) {
      case "reschedule":
        return "bg-white text-[#EBA352] border-[#EBA352] shadow-md";
      case "cancel":
        return "bg-white text-[#FF0000] border-[#FF0000] shadow-md";
      case "upcoming":
       return "bg-white text-[#92E3A9] border-[#92E3A9] shadow-md";
      default:
        return "bg-white text-[#EBA352] border-[#EBA352] shadow-md";
    }
  };


  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[name.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-teal-700">
            Welcome, Dr. Max
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-4">
            <div className=" grid grid-cols-2 gap-4">
              <div className="col-span-1">
                {/* Lab Reports Chart */}
                <div className="rounded-3xl shadow-md border border-[#0E6C5B] p-1 max-w-md mx-auto bg-white">
                  <div className="text-center mb-2 text-sm text-gray-500">
                    Week
                  </div>
                  <h2 className="text-center font-semibold text-[#0E6C5B] text-lg mb-4">
                    Lab Reports
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={labReports}>
                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="#0E6C5B66"
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#0E6C5B", fontSize: 16 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#0E6C5B", fontSize: 14 }}
                        label={{
                          value: "Reports",
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#0E6C5B", fontSize: 14 },
                        }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="reports"
                        fill="#005A51"
                        radius={[10, 10, 10, 10]}
                        barSize={10}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2 text-gray-700 font-medium text-sm">
                    Week days <br />{" "}
                    <span className="font-bold text-lg">Days</span>
                  </div>
                </div>
              </div>
              {/* Second Columns starts */}
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col justify-between items-start w-full">
                  {/* Today Stats */}
                  <div className="flex w-full items-center justify-between gap-6">
                    {/* Stats Cards */}
                    {statsCards.map((card, index) => (
                      <StatsCard key={index} data={card} maxValue={20} />
                    ))}
                  </div>
                  {/* Time and Lab Reports */}
                  <div className="my-4 w-full">
                    <QuickStatsCard
                      key={1}
                      title="Lab Reports review Today"
                      value="13 Done"
                      icon={FileText}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-5 md:grid-cols-3 gap-4">
              <div className="bg-white flex flex-col rounded-xl text-[#005A51] p-4 shadow-sm border border-[#005A51]">
                <div className="flex items-start justify-between">
                    <Calendar className="w-8 h-8" />
                    <p className="text-sm text-gray-600">Month</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      231 Last Month
                    </p>
                    <p className="text-sm opacity-50" >
                      Total Appointments{" "}
                      <span className="text-green-500">+23%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white flex flex-col rounded-xl text-[#005A51] py-4 px-2 shadow-sm border border-[#005A51]">
                <div className="flex items-start justify-between">
                    <FileText className="w-8 h-8" />
                    <p className="text-sm text-gray-600">Month</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      11 to be Issued /Month
                    </p>
                    <p className="text-sm opacity-50" >
                      Pending Prescriptions
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="h-auto p-1 mx-0 border-[#005A51]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between p-0 m-0">
                      <div className="text-[#005A51]">
                        <p className="text-sm">Bed free</p>
                        <p className="text-2xl font-bold">179</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[#005A51] bg-green-50"
                      >
                        +8.5%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={40}>
                      <AreaChart data={bedFreeData}>
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
        </div>

        {/* Third Column */}
        <div className="space-y-6 -mt-30">
          <div className="flex flex-col gap-4">
            {/* Calendar */}
            <CalendarComponent />

            {/* Hours Bar Chart */}
            <div className="rounded-3xl shadow-md border border-[#0E6C5B] p-4 w-full max-w-xs bg-white">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#0E6C5B]" />
                  <h2 className="font-semibold text-black text-base">
                    Hours Bar chart
                  </h2>
                </div>
                <span className="text-xs text-pink-500 font-semibold">
                  +86%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Busy hours in the day check...
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={hourlyData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey="a"
                    stackId="a"
                    fill="#005A51"
                    radius={[0, 0, 8, 8]}
                  />
                  <Bar dataKey="b" stackId="a" fill="#92E3A9" />
                  <Bar
                    dataKey="c"
                    stackId="a"
                    fill="#F2F2F2"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="my-6 w-full flex justify-end items-end">
        <div className="w-full">
          <Image
            src="/assets/filter.png"
            width={48}
            height={48}
            alt="filter"
            className="float-right p-2"
          ></Image>
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by..."
            className="w-1/4 pl-10 pr-4 py-3 border border-gray-200 float-right rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Details Table */}
      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between px-6 py-2 border-b bg-[#086861] rounded-lg text-white my-2">
          <h3 className="text-lg font-medium">Patient Details</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-lg cursor-pointer hover:bg-teal-700">
              See all
            </button>
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>

        <div className="overflow-x-auto border-[#086861] border-2 rounded-lg">
           <table className="w-full">
                      <thead className="bg-gray-50 text-[#005A51] font-bold text-md border-b-1 border-b-black">
                        <tr>
                          <th className="text-left p-3">PID</th>
                          <th className="text-left p-3">Name</th>
                          <th className="text-left p-3">Age/Gender</th>
                          <th className="text-left p-3">Date</th>
                          <th className="text-left p-3">Mode</th>
                          <th className="text-left p-3">Condition</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Consultation</th>
                          <th className="text-left p-3">Prescription</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.length ? (
                          filteredPatients.map((patient, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="p-3 text-sm">{patient.id}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-8 h-8 rounded-full ${getAvatarColor(
                                      patient.name
                                    )} flex items-center justify-center text-white text-xs font-medium`}
                                  >
                                    {patient.avatar}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {patient.name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-sm">
                                {patient.age}/{patient.gender}
                              </td>
                              <td className="p-3 text-sm">{patient.date}</td>
                              <td className="p-3 text-sm">{patient.mode}</td>
                              <td className="p-3 text-sm">{patient.condition}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                    patient.status
                                  )}`}
                                >
                                  {patient.status}
                                </span>
                              </td>
                              <td className="p-3 text-sm">
                                {patient.consultation === "Join now" ? (
                                  <button className="text-teal-600 hover:text-teal-700 text-sm">
                                    {patient.consultation}
                                  </button>
                                ) : (
                                  patient.consultation
                                )}
                              </td>
                              <td className="p-3">
                                <button className="text-teal-600 hover:text-teal-700">
                                  <FileText className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={9}
                              className="px-6 py-6 text-center text-gray-500"
                            >
                              No records match “{searchTerm}”.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
