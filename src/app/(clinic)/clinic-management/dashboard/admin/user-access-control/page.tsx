"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  User,
} from "lucide-react";
import { UserAccess } from "@/types/userAccess";
import axios, { AxiosError } from "axios";
import Calendar from "@/components/dashboard/Calendar";
import lock from "@/app/assets/lock.png";
import Image from "next/image";

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

  const getAccessColor = (access: string) => {
    switch (access) {
      case "Full":
        return "text-[#00AB3F]";
      case "Partial":
        return "text-[#EBA352]";
      case "Non":
        return "text-[#FF0000]";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "text-[#00AB3F]"
      : "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
      
        {/* Header */}
        <div className="flex items-start justify-between mb-8 w-auto ">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center">
              <Image src={lock} alt="Lock Icon" width={100} height={100} />
            </div>
            <h1 className="text-3xl p-1 font-semibold bg-gradient-to-r from-[#007065] to-[#28988D] bg-clip-text text-transparent">
              User Management
            </h1>
          </div>

          {/* Scale of Use Chart */}
          <div className="bg-white w-1/3 rounded-lg shadow-sm p-6">
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

          {/* Calendar Widget */}
          <Calendar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col grid grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          

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
          <div className="bg-[#1C6D65] text-white">
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
              users.map((user: UserAccess, index: number) => (
                <div
                  key={user.id}
                  className={`grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-[#EBF4F3]" : "bg-white"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {user.id}
                  </div>
                  <div className="text-sm">{user.department}</div>
                  <div className="text-sm">{user.dateOfJoin}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-xs">
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-lg font-medium rounded-full ${getAccessColor(
                        user.accessLevel
                      )}`}
                    >
                      {user.accessLevel}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-lg font-medium rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-full">
                      <Trash2 className="w-4 h-4 text-[#005A51]" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-full">
                      <Edit className="w-4 h-4 text-[#005A51]" />
                    </button>
                    <button className="px-3 py-1 text-[#005A51] text-xs  border border-gray-300 rounded-full hover:bg-gray-50">
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
