"use client";

import React, { useEffect, useState } from "react";
import { Settings, Edit3, User, Briefcase } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Admin } from "@/types/admin"; // Adjust the import path as necessary
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [adminData, setAdminData] = useState<Admin | null>(null);

  const personalInfo = [
    { label: "Full Name", value: adminData?.fullName || "Maya J." },
    { label: "Phone", value: adminData?.phone || "+91 123 456 7890" },
    { label: "Email address", value: adminData?.email || "Maya1223@gmail.com" },
    {
      label: "Emergency Contact",
      value: adminData?.phone || "+91 323 123 456",
    },
    {
      label: "Admin Med. ID",
      value: adminData?.registrationNumber || "#11111",
    },
    {
      label: "Home Address",
      value: adminData?.address || "New Delhi / St.Patron 63",
    },
  ];

  const workSettings = [
    { label: "Location", value: adminData?.address || "Mumbai" },
    {
      label: "Name of Hospital",
      value: adminData?.clinicName || "Saint Pavel Hospital",
    },
    { label: "Time Zone", value: "00:00:00+hv" },
    { label: "Preferred Language", value: "No language chosen" },
    { label: "Add new Staff Member", value: "( Nurses, Admin, Staff, ect. )" },
    { label: "Change Payment Plan", value: "Change current plan" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const email = useSelector((state: RootState) => state.user.email);
  // For demonstration, using a hardcoded email. Replace with actual email from Redux or context
  const [userEmail, setUserEmail] = useState("");

  const { user } = useAuth();
  console.log(user);
  // useEffect(() => {
  //   setUserEmail(email || "priya.sharma@example.com");
  // }, []);

  useEffect(() => {
    if (!userEmail) return;

    console.log("Email: ", userEmail);
    axios
      .post("/api/admin", { email: userEmail })
      .then((response) => {
        setAdminData(response.data.admin);
        console.log("Admin profiles fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin profiles:", error);
      });
  }, [userEmail]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-teal-500" />
            <h1 className="text-2xl font-semibold">Profile Settings</h1>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm">Dark mode</span>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                darkMode ? "bg-teal-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
              MJ
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm border"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>

        {/* Personal Information Section */}
        <div
          className={`rounded-xl p-6 mb-6 ${
            darkMode ? "bg-gray-800" : "bg-white shadow-sm border"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-teal-500" />
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
            <button
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                darkMode
                  ? "text-teal-400 hover:bg-gray-700"
                  : "text-teal-600 hover:bg-teal-50"
              }`}
            >
              Edit <Edit3 className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalInfo.map((item, index) => (
              <div key={index}>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-teal-400" : "text-teal-700"
                  }`}
                >
                  {item.label}
                </label>
                <p className="text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Work Settings Section */}
        <div
          className={`rounded-xl p-6 ${
            darkMode ? "bg-gray-800" : "bg-white shadow-sm border"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-teal-500" />
              <h2 className="text-lg font-semibold">Work Settings</h2>
            </div>
            <button
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                darkMode
                  ? "text-teal-400 hover:bg-gray-700"
                  : "text-teal-600 hover:bg-teal-50"
              }`}
            >
              Edit <Edit3 className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workSettings.map((item, index) => (
              <div key={index}>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-teal-400" : "text-teal-700"
                  }`}
                >
                  {item.label}
                </label>
                {item.label === "Preferred Language" ? (
                  <p
                    className={`text-base ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.value}
                  </p>
                ) : item.label === "Add new Staff Member" ? (
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } mb-2`}
                  >
                    {item.value}
                  </p>
                ) : item.label === "Change Payment Plan" ? (
                  <button
                    className={`text-sm underline ${
                      darkMode
                        ? "text-teal-400 hover:text-teal-300"
                        : "text-teal-600 hover:text-teal-700"
                    }`}
                  >
                    {item.value}
                  </button>
                ) : (
                  <p className="text-base">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
