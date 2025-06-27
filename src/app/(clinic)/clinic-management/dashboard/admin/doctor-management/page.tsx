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
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "@/store/doctorSlice";
import { Doctor } from "@/types/doctor";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import BulkUploadModal from "@/utils/BulkUploadModal";
import Calendar from "@/components/dashboard/Calendar";

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



// Helper function to determine status based on consultation type and availability
const getStatusInfo = (doctor: Doctor) => {
  const consultationType = doctor.professionalDetails?.consultationType;
  console.log(consultationType);
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

  // const getStatusColor = (action: string) => {
  //   let color = "";
  //   switch (action.toLowerCase()) {
  //     case "in the house":
  //       color = "#92E3A9";
  //       break;
  //     case "vacation":
  //       color = "#EBA352"; break;
  //     case "free day":
  //       color = "#FF0000"; break;
  //     default:
  //       color = "black"; break;
  //   }

  //   return `text-[${color}] border-[${color}] border-2 rounded-full shadow-md bg-white`;
  // };

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
      console.log("filteredDoctors: ", filteredDoctors);
    }
  }, [allDoctorList, filteredDoctors]);

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Image
            src="/assets/stethoscope.png"
            alt="Stethoscope Icon"
            width={100}
            height={100}
            className="object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor Management
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-b from-[#395F5D] to-[#086861] rounded-full flex items-center justify-center">
            <Stethoscope className="w-6 h-6  text-white font-medium" />
          </div>
          <div className="flex flex-col justify-end items-end">
            
            <span className="text-gray-500 text-sm">Free in the moment</span>
            <span className="font-semibold">
              {allDoctorList.length} Doctors
            </span>
          </div>
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
            <div className="bg-white rounded-2xl p-6  shadow-xl border-1 border-[#005A51]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#005A51] text-xs">Revenue Summary</span>
                <span className="text-[#30C559] text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.revenue.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#005C56]">
                  {summaryStats.revenue.amount} {summaryStats.revenue.period}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-1 border-[#005A51]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#005A51] text-sm">
                  Active Doctors Today
                </span>
                <span className="text-[#30C559] text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.activeDoctors.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#005C56]">
                  {summaryStats.activeDoctors.available}/
                  {summaryStats.activeDoctors.total} Available
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-1 border-[#005A51]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#005A51] text-sm">
                  Total Appointment
                </span>
                <span className="text-[#30C559] text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {summaryStats.totalAppointments.growth}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#005C56]">
                  {summaryStats.totalAppointments.count}{" "}
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
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-2 flex items-center gap-2 cursor-pointer"
            >
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
          <Calendar />
        </motion.div>
      </div>

      <BulkUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        uploadType={"doctor"}
      />
    </div>
  );
};

export default DoctorManagement;
