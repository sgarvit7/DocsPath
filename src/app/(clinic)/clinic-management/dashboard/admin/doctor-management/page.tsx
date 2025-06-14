"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Phone,
  MessageCircle,
  Eye,
  Clock,
  X,
  Filter,
  // Calendar,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "@/store/doctorSlice";
import {Doctor} from "@/types/doctor";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";

// Dummy data objects for easy modification
const summaryStats = {
  revenue: {
    amount: "23,000",
    period: "Month",
    growth: "+23%",
    trend: "up",
  },
  activeDoctors: {
    available: 23,
    total: 100,
    growth: "+23%",
    trend: "up",
  },
  totalAppointments: {
    count: 135,
    period: "Today",
    growth: "+23%",
    trend: "up",
  },
};

const calendarData = {
  currentMonth: "November 2018",
  currentDate: 12,
  currentTime: "12:54",
  currentPeriod: "PM",
  location: "Mumbai",
};

// Helper function to determine status based on consultation type and availability
const getStatusInfo = (doctor: Doctor) => {
  const consultationType = doctor.professionalDetails?.consultationType;
  console.log(consultationType);
  const isAvailable = Math.random() > 0.5; // Random availability for demo

  if (consultationType === "Online") {
    return isAvailable
      ? { status: "Online", statusColor: "bg-green-100 text-green-800" }
      : { status: "Offline", statusColor: "bg-red-100 text-red-800" };
  } else {
    return isAvailable
      ? { status: "In The House", statusColor: "bg-green-100 text-green-800" }
      : { status: "On Break", statusColor: "bg-yellow-100 text-yellow-800" };
  }
};

const DoctorManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const allDoctorList = useSelector<RootState>(
    (store) => store.doctorOnboarding.doctors
  ) as Doctor[];
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[] | null>(null);

  useEffect(() => {
    const getAllDoctors = async () => {
      const doctors = await dispatch(getDoctors());
      console.log(doctors.payload);
    };
    getAllDoctors();
  }, [dispatch]);

  useEffect(() => {
    if (allDoctorList) {
      console.log("allDoctorList: ", allDoctorList);
      setFilteredDoctors(allDoctorList);
    }
  }, [allDoctorList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allDoctorList.filter(
      (doctor) =>
        doctor.personalInfo.fullName
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        doctor.professionalDetails.specialization
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleAction = (action: string, doctorId: string) => {
    console.log(`${action} action for doctor ${doctorId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor Management
            </h1>
            <p className="text-gray-500 text-sm">Free in the moment</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-teal-600 text-white px-4 py-2 rounded-full">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <span className="font-semibold">{allDoctorList.length} Doctors</span>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">Revenue Summary</span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.revenue.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {summaryStats.revenue.amount}
                </span>
                <span className="text-gray-500">
                  {summaryStats.revenue.period}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">
                  Active Doctors Today
                </span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.activeDoctors.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {summaryStats.activeDoctors.available}/
                  {summaryStats.activeDoctors.total}
                </span>
                <span className="text-gray-500">Available</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">Total Appointment</span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.totalAppointments.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {summaryStats.totalAppointments.count}
                </span>
                <span className="text-gray-500">
                  {summaryStats.totalAppointments.period}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Add Doctor and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Doctor
            </Button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Doctors Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="text-left py-4 px-6 font-medium">Doc. ID</th>
                    <th className="text-left py-4 px-6 font-medium">Name</th>
                    <th className="text-left py-4 px-6 font-medium">
                      Specialty
                    </th>
                    <th className="text-left py-4 px-6 font-medium">Contact</th>
                    <th className="text-left py-4 px-6 font-medium">Status</th>
                    <th className="text-left py-4 px-6 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors &&
                    filteredDoctors.map((doctor, index) => {
                      const statusInfo = getStatusInfo(doctor);
                      return (
                        <motion.tr
                          key={`${doctor.id}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-6 text-gray-600 font-medium">
                            {doctor.professionalDetails?.medicalLicenseNumber}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                src={
                                  doctor.personalInfo?.profilePhoto ||
                                  "/placeholder.jpg"
                                } // fallback image if undefined
                                alt={
                                  doctor.personalInfo?.fullName ||
                                  "Doctor Photo"
                                }
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                              />
                              <span className="font-medium text-gray-900">
                                {doctor.personalInfo?.fullName}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {doctor.professionalDetails?.specialization}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-teal-600" />
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.statusColor}`}
                            >
                              {statusInfo.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleAction("info", doctor.id as string)
                                }
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                              >
                                <Eye className="w-3 h-3 text-gray-600" />
                              </button>
                              <button
                                onClick={() =>
                                  handleAction("schedule", doctor.id as string)
                                }
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                              >
                                <Clock className="w-3 h-3 text-gray-600" />
                              </button>
                              <button
                                onClick={() =>
                                  handleAction("remove", doctor.id as string)
                                }
                                className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                              >
                                <X className="w-3 h-3 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Calendar Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-80"
        >
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                {calendarData.currentMonth}
              </h3>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">‹</span>
                </button>
                <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">›</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar dates */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                <div
                  key={date}
                  className={`text-center py-2 text-sm cursor-pointer rounded ${
                    date === calendarData.currentDate
                      ? "bg-teal-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>

            {/* Current Time */}
            <div className="bg-teal-50 rounded-xl p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Today • DRIIFF</p>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {calendarData.location}
                </p>
                <div className="text-2xl font-bold text-teal-600">
                  {calendarData.currentTime}
                  <span className="text-sm ml-1">
                    {calendarData.currentPeriod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorManagement;
