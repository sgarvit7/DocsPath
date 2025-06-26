"use client";

import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  FileText,
  Phone,
  Mail,
  User,
  TrendingUp,
  Menu,
  ListCollapse,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import patientRecord from "@/app/assets/patient-record.png";
import Image from "next/image";
import CalendarComponent from "@/components/dashboard/Calendar";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickStatsCard from "@/components/dashboard/QuickStatsBar";
import filter from "@/app/assets/filter.png"

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  condition: string;
  prescription: string;
  nextVisit: string;
  status: "Pending" | "Completed" | "Upcoming";
  avatar: string;
}

interface ChartData {
  category: string;
  age: number;
  genderM: number;
  genderF: number;
}

interface StatsCard {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  icon?: React.ReactNode;
}

const PatientRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const data = [
    {
      name: "Condition",
      "Gender M": 2.81,
      "Gender F": 3.58,
      Age: 4.38,
    },
    {
      name: "Condition",
      "Gender M": 2.81,
      "Gender F": 3.58,
      Age: 4.38,
    },
    {
      name: "Condition",
      "Gender M": 2.81,
      "Gender F": 3.58,
      Age: 4.38,
    },
  ];
  // Sample data
  const chartData: ChartData[] = [
    { category: "0-10", age: 25, genderM: 12, genderF: 13 },
    { category: "11-20", age: 35, genderM: 18, genderF: 17 },
    { category: "21-30", age: 45, genderM: 22, genderF: 23 },
    { category: "31-40", age: 38, genderM: 19, genderF: 19 },
    { category: "41-50", age: 42, genderM: 21, genderF: 21 },
    { category: "51-60", age: 35, genderM: 17, genderF: 18 },
    { category: "61+", age: 28, genderM: 14, genderF: 14 },
  ];

  const patients: Patient[] = [
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 45,
      gender: "Male",
      condition: "Fever",
      prescription: "RX-001",
      nextVisit: "10 Apr, 2025",
      status: "Pending",
      avatar: "👨‍💼",
    },
    {
      id: "#0000",
      name: "ByeWind",
      age: 33,
      gender: "Female",
      condition: "Cold",
      prescription: "RX-002",
      nextVisit: "10 Apr, 2025",
      status: "Completed",
      avatar: "👩‍💼",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 21,
      gender: "Male",
      condition: "Diabetes",
      prescription: "RX-003",
      nextVisit: "10 Apr, 2025",
      status: "Upcoming",
      avatar: "👨‍💼",
    },
    {
      id: "#0000",
      name: "Anna Mavin",
      age: 18,
      gender: "Male",
      condition: "Coughing",
      prescription: "RX-004",
      nextVisit: "10 Apr, 2025",
      status: "Upcoming",
      avatar: "👤",
    },
    {
      id: "#0000",
      name: "Ankit Wind",
      age: 60,
      gender: "Female",
      condition: "Pain",
      prescription: "RX-005",
      nextVisit: "10 Apr, 2025",
      status: "Upcoming",
      avatar: "👩‍💼",
    },
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

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
            Reschedule
          </button>
        );
      case "Completed":
        return (
          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
            Cancel
          </button>
        );
      case "Upcoming":
        return (
          <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            Upcoming
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
            <Image
              src={patientRecord}
              alt="Patient Records"
              width={64}
              height={64}
            ></Image>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Records</h1>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 my-6">
        {/* Start Chart Section */}
        <div className="w-2/6 max-w-4xl h-[300px] p-2 sm:p-4 border rounded-2xl border-[#0A8A7F]">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">
            Condition in Patients
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <YAxis
                label={{
                  value: "Units of measure Patients",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: "10px" },
                }}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Gender M" fill="#7FCAC3">
                <LabelList
                  dataKey="Gender M"
                  position="top"
                  style={{ fontSize: 10 }}
                />
              </Bar>
              <Bar dataKey="Gender F" fill="#7FD47C">
                <LabelList
                  dataKey="Gender F"
                  position="top"
                  style={{ fontSize: 10 }}
                />
              </Bar>
              <Bar dataKey="Age" fill="#005A51">
                <LabelList
                  dataKey="Age"
                  position="top"
                  style={{ fontSize: 10, fill: "#fff" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* End Chart Section */}

        {/* Start Card Section */}
        <div className="flex flex-col w-2/6 h-full items-center gap-6">
          <div className="flex items-center justify-between gap-6">
            {/* Stats Cards */}
            {statsCards.map((card, index) => (
              <StatsCard key={index} data={card} maxValue={20} />
            ))}
          </div>
          <div className="flex w-full gap-6">
            <Card
              className="border-1 border-[#005A51] text-[#005A51] w-full"
              style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
            >
              <CardContent className="py-1 px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mt-2">
                      <span style={{ opacity: 0.5 }}>
                        Pending Prescriptions
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-green-600 bg-green-50 ml-2"
                      >
                        +11%
                      </Badge>
                    </p>

                    <p className="text-3xl font-bold py-2">5 to be Issued</p>
                  </div>

                  <BarChart3 className="w-1/5 h-1/3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center flex-col h-full space-x-4 -mt-20">
          {/* Calendar Widget */}
          <CalendarComponent />
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

      {/* Search Bar */}
      <div className="mb-6 w-full flex justify-end items-end">
        <div className="w-full">
          <Image src={filter} width={48} height={48} alt="filter" className="float-right p-2"></Image>
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  PID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Age/Gender
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Condition
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Prescription
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Next Visit
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">{patient.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.age}/{patient.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.nextVisit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getActionButton(patient.status)}
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

export default PatientRecords;
