"use client";

import React from "react";
import {
  Calendar,
  Search,
  Check,
  Edit,
  X,
} from "lucide-react";
import appointmentImage from "@/app/assets/appointment.png";
import Image from "next/image";
import CalendarComponent from "@/components/dashboard/Calendar"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Types
interface Patient {
  id: string;
  name: string;
  date: string;
  condition: string;
  mode: "OPD" | "Teleconsultation";
  avatar: string;
  avatarColor: string;
}

interface PatientOverviewData {
  month: string;
  male: number;
  female: number;
}

const Dashboard: React.FC = () => {
  // const [currentDate, setCurrentDate] = useState(new Date(2018, 10, 1)); // November 2018

  // Sample data for patient overview chart
  const patientOverviewData: PatientOverviewData[] = [
    { month: "Jan", male: 45, female: 55 },
    { month: "Feb", male: 52, female: 48 },
    { month: "Mar", male: 48, female: 52 },
    { month: "Apr", male: 61, female: 49 },
    { month: "May", male: 55, female: 45 },
    { month: "Jun", male: 67, female: 48 },
    { month: "Jul", male: 69, female: 52 },
    { month: "Aug", male: 78, female: 53 },
    { month: "Sep", male: 88, female: 48 },
    { month: "Oct", male: 77, female: 45 },
    { month: "Nov", male: 83, female: 52 },
    { month: "Dec", male: 92, female: 58 },
  ];

  const scheduledAppointments: Patient[] = [
    {
      id: "#0000",
      name: "Ankit Wind",
      date: "10-Apr-2022 | 3:00pm",
      condition: "Fever",
      mode: "OPD",
      avatar: "AW",
      avatarColor: "bg-green-500",
    },
    {
      id: "#0000",
      name: "ByeWind",
      date: "8-Apr-2022 | 3:00pm",
      condition: "Cold",
      mode: "Teleconsultation",
      avatar: "BW",
      avatarColor: "bg-purple-500",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      date: "10-Apr-2022 | 3:00pm",
      condition: "Diabetese",
      mode: "OPD",
      avatar: "AW",
      avatarColor: "bg-green-500",
    },
    {
      id: "#0000",
      name: "Anna Mayin",
      date: "8-Apr-2022 | 3:00pm",
      condition: "Coughing",
      mode: "OPD",
      avatar: "AM",
      avatarColor: "bg-orange-500",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      date: "10-Apr-2022 | 3:00pm",
      condition: "Pain",
      mode: "Teleconsultation",
      avatar: "AW",
      avatarColor: "bg-green-500",
    },
  ];

  
  // Circular progress component
  const CircularProgress: React.FC<{
    percentage: number;
    size: number;
    strokeWidth: number;
    color: string;
    children: React.ReactNode;
  }> = ({ percentage, size, strokeWidth, color, children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 w-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <Image
                src={appointmentImage}
                alt="Appointment Image"
                width={64}
                height={64}
              />
            </div>
            <h1 className="text-2xl font-semibold text-teal-700">
              Upcoming Appointments
            </h1>
          </div>

          {/* Patient Overview Chart */}
          <div className="bg-white rounded-2xl w-full p-4 shadow-md">
            <h2 className="text-center font-semibold text-lg">
              Patient Overview
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">Today</p>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={patientOverviewData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#086861" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#086861" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9EE7B8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9EE7B8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-gray-700">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="male"
                  stroke="#086861"
                  fill="url(#colorMale)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="female"
                  stroke="#9EE7B8"
                  fill="url(#colorFemale)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6 ml-4 ">
          

          {/* Today Stats */}
          <div className="space-y-4 w-full">
            <div className="flex gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="text-xs text-gray-500 mb-2">
                  Today you have:
                </div>
                <CircularProgress
                  percentage={75}
                  size={80}
                  strokeWidth={6}
                  color="#0d9488"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">6</div>
                    <div className="text-xs text-gray-500">
                      Patient in Lobby
                    </div>
                  </div>
                </CircularProgress>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="text-xs text-gray-500 mb-2">
                  Appointments for the day:
                </div>
                <CircularProgress
                  percentage={80}
                  size={80}
                  strokeWidth={6}
                  color="#10b981"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">12</div>
                    <div className="text-xs text-gray-500">
                      appointment Today
                    </div>
                  </div>
                </CircularProgress>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4 w-full">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Month</p>
                  <p className="text-lg font-semibold text-gray-800">
                    231 Last Month
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Appointments{" "}
                    <span className="text-green-500 font-medium">+23%</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                  <div className="text-white text-sm font-bold">Rx</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Month</p>
                  <p className="text-lg font-semibold text-gray-800">
                    11 to be Issued /Month
                  </p>
                  <p className="text-sm text-gray-500">Pending Prescriptions</p>
                </div>
              </div>
            </div>
          </div>

          

          
        </div>
        <div className="lg:col-span-2">
          <CalendarComponent />
          </div>
          
      </div>

      {/* Scheduled Appointments Table */}
          <div className="rounded-xl shadow-sm">
            <div className="p-6 border-b flex justify-between items-start">
              <h3 className="text-lg font-medium">Scheduled Appointments</h3>
              <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-2 w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="text-left p-4 font-medium">PID</th>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Condition</th>
                    <th className="text-left p-4 font-medium">Mode</th>
                    <th className="text-left p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledAppointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4 text-sm font-medium">
                        {appointment.id}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${appointment.avatarColor} flex items-center justify-center text-white text-xs font-medium`}
                          >
                            {appointment.avatar}
                          </div>
                          <span className="text-sm font-medium">
                            {appointment.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{appointment.date}</td>
                      <td className="p-4 text-sm">{appointment.condition}</td>
                      <td className="p-4 text-sm">{appointment.mode}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded flex items-center justify-center">
                            <Edit className="w-4 h-4 text-orange-600" />
                          </button>
                          <button className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center">
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
};

export default Dashboard;
