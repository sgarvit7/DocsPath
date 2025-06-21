"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  User,
} from "lucide-react";
import { UserAccess } from "@/types/userAccess";
import axios, { AxiosError } from "axios";

interface User {
  id: number;
  department: string;
  dateOfJoin: string;
  name: string;
  avatar: string;
  access: "Full" | "Partial" | "Non";
  status: "Active" | "Inactive";
}

interface UsageData {
  name: string;
  value: number;
  color: string;
}

const UserManagementDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [currentMonth, setCurrentMonth] = useState("November 2018");
  const [users, setUsers] = useState<UserAccess[]>([]);

  // Sample usage data for the horizontal bar chart
  const usageData: UsageData[] = [
    { name: "Wind", value: 100, color: "#0d9488" },
    { name: "Craig", value: 85, color: "#14b8a6" },
    { name: "Dochev", value: 70, color: "#2dd4bf" },
    { name: "Kutropoli", value: 60, color: "#5eead4" },
    { name: "Maik", value: 50, color: "#99f6e4" },
  ];
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // Skip if already ran
    hasFetched.current = true;

    axios
      .get<UserAccess[]>("/api/admin/user-access")
      .then((response) => {
        if (
          !response.data ||
          (Array.isArray(response.data) && response.data.length === 0)
        ) {
          throw new Error("No user data found");
        }
        setUsers(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          console.error("404: User not found");
          alert("No User exists");
        } else if (error.message === "No user data found") {
          alert(error.message);
        } else {
          console.error("Error fetching user access data:", error);
          alert("Something went wrong while fetching user access data.");
        }
      });
  }, []);
  // Sample user data

  // Calendar data for November 2018
  const calendarDays = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 1, 2, 3, 4],
  ];

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const getAccessColor = (access: string) => {
    switch (access) {
      case "Full":
        return "text-green-600 bg-green-50";
      case "Partial":
        return "text-orange-600 bg-orange-50";
      case "Non":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "text-green-600 bg-green-50"
      : "text-gray-500 bg-gray-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="text-white text-2xl">🔒</div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              User Management
            </h1>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">{currentMonth}</h3>
              <div className="flex space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-gray-500 py-1 text-[10px]"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`text-center py-1 text-xs cursor-pointer rounded ${
                      day === selectedDate
                        ? "bg-teal-600 text-white"
                        : day && day <= 30
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300"
                    }`}
                    onClick={() => day && day <= 30 && setSelectedDate(day)}
                  >
                    {day}
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 text-xs text-gray-600">
              <div>Today, 14th 📅</div>
              <div className="font-medium">Mumbai</div>
              <div className="text-lg font-bold">
                12:54 <span className="text-xs">PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Scale of Use Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Scale of Use
            </h2>

            <div className="bg-white border-2 border-teal-500 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">Name</span>
                <span className="text-sm font-medium text-gray-600">
                  List of Users
                </span>
              </div>

              <div className="space-y-3">
                {usageData.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <div className="w-16 text-sm text-white font-medium text-right mr-3">
                      {item.name}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-start pl-4 text-white text-sm font-medium"
                        style={{
                          backgroundColor: item.color,
                          width: `${item.value}%`,
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add User Button */}
          <div className="flex items-start">
            <button className="bg-black text-white rounded-full py-3 px-6 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-teal-600 text-white">
            <div className="grid grid-cols-7 gap-4 px-6 py-4 text-sm font-medium">
              <div>ID</div>
              <div>Department</div>
              <div>Date of join</div>
              <div>Name</div>
              <div>Access</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {users &&
              users.map((user: UserAccess) => (
                <div
                  key={user.id}
                  className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {user.id}
                  </div>
                  <div className="text-sm text-gray-600">{user.department}</div>
                  <div className="text-sm text-gray-600">{user.dateOfJoin}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-xs">
                      {/* {user.avatar} */}
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-sm text-gray-900">{user.name}</span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAccessColor(
                        user.accessLevel
                      )}`}
                    >
                      {user.accessLevel}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;
