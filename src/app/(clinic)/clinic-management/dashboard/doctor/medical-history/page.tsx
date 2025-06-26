// pages/index.tsx
"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import medicalHistory from "@/app/assets/medical-history.png";
import Image from "next/image";
import StatsCard from "@/components/dashboard/StatsCard";
import CalendarComponent from "@/components/dashboard/Calendar";
import filter from "@/app/assets/filter.png";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  lastVisit: string;
  avatar: string;
}

interface ChartData {
  year: string;
  teleconsultation: number;
  opd: number;
}

interface MonthlyData {
  day: number;
  reports: number;
}

interface StatsCard {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  icon?: React.ReactNode;
}

const MedicalDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const chartData: ChartData[] = [
    { year: "2017", teleconsultation: 20, opd: 25 },
    { year: "2018", teleconsultation: 35, opd: 40 },
    { year: "2019", teleconsultation: 50, opd: 55 },
    { year: "2020", teleconsultation: 70, opd: 65 },
    { year: "2021", teleconsultation: 85, opd: 70 },
    { year: "2022", teleconsultation: 90, opd: 75 },
  ];

  const monthlyReports: MonthlyData[] = [
    { day: 1, reports: 45 },
    { day: 2, reports: 52 },
    { day: 3, reports: 38 },
    { day: 4, reports: 61 },
    { day: 5, reports: 55 },
    { day: 6, reports: 67 },
    { day: 7, reports: 43 },
    { day: 8, reports: 58 },
    { day: 9, reports: 72 },
    { day: 10, reports: 65 },
    { day: 11, reports: 49 },
    { day: 12, reports: 78 },
    { day: 13, reports: 68 },
    { day: 14, reports: 82 },
  ];

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

  const patients: Patient[] = [
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 45,
      gender: "Male",
      lastVisit: "10-Apr-2022/13:00pm",
      avatar: "👨",
    },
    {
      id: "#0000",
      name: "ByeWind",
      age: 33,
      gender: "Female",
      lastVisit: "8-Apr-2022/13:00pm",
      avatar: "👩",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 21,
      gender: "Male",
      lastVisit: "10-Apr-2022/13:00pm",
      avatar: "👨",
    },
    {
      id: "#0000",
      name: "Anna Mayin",
      age: 18,
      gender: "Male",
      lastVisit: "8-Apr-2022/13:00pm",
      avatar: "👨",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 60,
      gender: "Female",
      lastVisit: "10-Apr-2022/13:00pm",
      avatar: "👩",
    },
  ];

  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendar = generateCalendar(2018, 10); // November 2018
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <Image
                src={medicalHistory}
                alt="Medical History"
                width={64}
                height={64}
              ></Image>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Medical History
            </h1>
          </div>
        </div>

        {/* Top Row - Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-4">Year</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line
                    type="monotone"
                    dataKey="teleconsultation"
                    stroke="#14B8A6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="opd"
                    stroke="#0891B2"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Teleconsultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
                <span className="text-sm text-gray-600">OPD</span>
              </div>
            </div>
          </div>

          {/* Monthly Reports */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6 p-6">
              <h3 className="text-2xl font-bold text-gray-800 p-2">
                Medical History
              </h3>
              <p className="text-gray-500 m-2">For a Month</p>
              <div className="text-6xl font-medium text-gray-800 my-2">
                1,4K
              </div>
              <p className="text-sm text-gray-500 mt-2">Reports in the month</p>
            </div>
            <div className="h-1/3 my-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReports} barCategoryGap={20}>
                  <Bar dataKey="reports" barSize={30} radius={[20, 20, 20, 20]}>
                    {monthlyReports.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#14B8A6" : "#3B82F6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calendar */}
          <div className="w-full flex flex-col gap-2">
            <div className="bg-white p-0 m-0 rounded-xl shadow-sm -mt-20">
              <CalendarComponent />
            </div>
            <div className="flex items-center justify-between gap-2">
              {/* Stats Cards */}
              {statsCards.map((card, index) => (
                <StatsCard key={index} data={card} maxValue={20} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Stats and Patient List */}
        <div className="w-full gap-6">
          {/* Search Bar */}
          <div className="mb-6 w-full flex justify-end items-end">
            <div className="w-full">
              <Image
                src={filter}
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
          {/* Patient Table */}
          <div className="rounded-[27px] border-1 border-[#086861]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-teal-600 text-white rounded-full text-sm font-medium">
              <div className="col-span-1">PID</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Age/Gender</div>
              <div className="col-span-2">Last visit</div>
              <div className="col-span-1">Lab Report</div>
              <div className="col-span-2">Prescription</div>
              <div className="col-span-2">Health Records</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredPatients.map((patient, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } ${index === filteredPatients.length - 1 ? "rounded-b-[27px]" : ""}`}
                >
                  <div className="col-span-1 text-sm text-gray-600">
                    {patient.id}
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">{patient.avatar}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {patient.name}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {patient.age}/{patient.gender}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {patient.lastVisit}
                  </div>
                  <div className="col-span-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
