"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Power } from "lucide-react";
import { Edit, Briefcase, GraduationCap, Lock, Bell, Play } from "lucide-react";
import upgradeImage from "@/app/assets/upgrade.png"
import image from "./../../../../../assets/doctor-profile.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import PhoneInput from "@/components/publicPageComponents/PhoneInput";
import axios from "axios";
import { Doctor } from "@/types/doctor"; // Adjust the import path as necessary
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileItem {
  label: string;
  value: string | React.ReactNode; // Allow value to be a string or a React node
}

interface NotificationState {
  sms: boolean;
  email: boolean;
  newBookings: boolean;
  cancellations: boolean;
  appointmentReminders: boolean;
}

interface ProfileData {
  permanentAddress: ProfileItem[];
  currentAddress: ProfileItem[];
  personalInformation: ProfileItem[];
  professionalInformation: ProfileItem[];
  professionalEducation: ProfileItem[];
  availabilityWorkingHours: ProfileItem[];
  passwords: ProfileItem[];
}

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}
// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
//   enabled,
//   onToggle,
//   size = "md",
// }) => {
//   // Define size classes
//   const sizeClasses = {
//     sm: {
//       container: "h-4 w-8",
//       knob: "h-3 w-3",
//       translate: enabled ? "translate-x-5" : "translate-x-1",
//     },
//     md: {
//       container: "h-6 w-11",
//       knob: "h-4 w-4",
//       translate: enabled ? "translate-x-6" : "translate-x-1",
//     },
//     lg: {
//       container: "h-8 w-16",
//       knob: "h-6 w-6",
//       translate: enabled ? "translate-x-8" : "translate-x-1",
//     },
//   }[size];

//   return (
//     <div
//       className={`relative inline-flex items-center rounded-full cursor-pointer transition-colors ${
//         sizeClasses.container
//       } ${enabled ? "bg-teal-600" : "bg-gray-300"}`}
//       onClick={onToggle}
//     >
//       <span
//         className={`inline-block rounded-full bg-white transition-transform ${sizeClasses.knob} ${sizeClasses.translate}`}
//       />
//     </div>
//   );
// };

const ProfileSettings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationState>({
    sms: true,
    email: true,
    newBookings: true,
    cancellations: false,
    appointmentReminders: true,
  });

  // For demonstration, using a hardcoded email. Replace with actual email from Redux or context
  const [userEmail, setUserEmail] = useState("");
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);

  const { user } = useAuth();
  useEffect(() => {
    const Email = user?.email;
    console.log(user?.email);
    if (Email) {
      setUserEmail(Email);
    } else {
      setUserEmail("ananya.sharma@example.com");
    }
    console.log(userEmail); // Replace with actual email from Redux or context
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    axios
      .post(
        "/api/doctor",
        { email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setDoctorData(response.data.doctor);
        console.log("Doctor profile fetched:", response.data);
        console.log(doctorData?.personalInfo?.fullName);
      })
      .catch((error) => {
        console.error("Error fetching doctor profile:", error);
      });
  }, [userEmail]);

  // Profile data as dictionary of arrays with label-value pairs
  const profileData: ProfileData = {
    permanentAddress: [
      { label: "State/District", value: "Kerala" },
      { label: "Town / Village", value: "Leecia, East London" },
      {
        label: "Street /Area/Locality",
        value: doctorData?.professionalDetails?.specialization || "Dermatology",
      },
      { label: "Pin Code", value: "6834602" },
      { label: "Post Office", value: "EST 524" },
      { label: "House No", value: "a 67M" },
    ],
    currentAddress: [
      { label: "State/District", value: "South India" },
      { label: "Town / Village", value: "Leecia, East London" },
      { label: "Street /Area/Locality", value: "Dermatology" },
      { label: "Pin Code", value: "6834602" },
      { label: "Post Office", value: "EST 524" },
      { label: "House No", value: "a 67M" },
    ],
    personalInformation: [
      { label: "First Name", value: "Mira" },
      { label: "Last Name", value: "Jendob" },
      { label: "Field of practice", value: "Dermatology" },
      { label: "Email address", value: "Mira1229@gmail.com" },
      { label: "Phone", value: <PhoneInput></PhoneInput> },
      { label: "Emergency Contact", value: <PhoneInput></PhoneInput> },
    ],
    professionalInformation: [
      { label: "Medical registration number", value: "4000000000" },
      { label: "Name of Hospital", value: "Saint Pixel Hospital" },
      { label: "Field of practice", value: "Acute Care" },
      { label: "Consultation Fees", value: "₹100-300" },
      { label: "Specialization", value: "Dermatology" },
      { label: "Consultation type", value: "All type consulting" },
      { label: "Years of practice", value: "6" },
      { label: "Languages", value: "English,Hindi" },
    ],
    professionalEducation: [
      { label: "1.Graduation - Medical College", value: "Name of Uni..." },
      { label: "2.Post Graduation", value: "I" },
      { label: "Field of practice", value: "Acute Care" },
      { label: "Year of graduation", value: "2009" },
      { label: "Qualifications", value: "MBBS" },
      { label: "Years of practice", value: "6" },
    ],
    availabilityWorkingHours: [
      { label: "Emergency Availability", value: "Yes" },
      { label: "Consultation Duration", value: "00:00:00h" },
      { label: "Working Days", value: "Mon-Wed-Fri" },
      { label: "Teleconsultation Availability", value: "✓" },
      { label: "Maximum Appointments Per Day", value: "5" },
      { label: "Working Hours", value: "08:00 - 17:00 h every working day" },
    ],
    passwords: [
      { label: "Your password", value: "kisjdkacij8677" },
      { label: "Create new password", value: "Enter" },
      { label: "Working with E-Signature", value: "+Add" },
      { label: "Set patient booking window", value: "" },
      { label: "Repeat new password", value: "" },
      {
        label: "Minimum & maximum time prior to appointments",
        value: "Min 0  Max 0",
      },
    ],
  };

  const toggleNotification = (key: keyof NotificationState): void => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onToggle }) => (
    <div
      className={`relative inline-flex h-4 w-8 items-center rounded-full cursor-pointer transition-colors ${
        enabled ? "bg-teal-600" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </div>
  );

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    data: ProfileItem[],
    columns: number = 3
  ): React.ReactElement => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <button className="bg-gray-200 rounded-full p-3 hover:text-teal-700 font-medium text-sm flex items-center space-x-1">
          <span>Edit</span>
          <Edit className="w-4 h-4" />
        </button>
      </div>

      <div className={`grid grid-cols-${columns} gap-8`}>
        {data.map((item, index) => (
          <div key={index}>
            <p className="text-sm font-medium text-teal-700 mb-1">
              {item.label}
            </p>
            <div className="text-gray-800 font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // const renderPersonalSection = (
  //   title: string,
  //   icon: React.ReactNode,
  //   data: ProfileItem[],
  //   columns: number = 3
  // ): React.ReactElement => (
  //   <div className="bg-white rounded-lg shadow-sm p-6">
  //     <div className="flex items-center justify-between mb-6">
  //       <div className="flex items-center space-x-2">
  //         <div className="w-5 h-5 rounded-full flex items-center justify-center">
  //           <span className="text-white text-xs">{icon}</span>
  //         </div>
  //         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  //       </div>
  //       <button className="bg-gray-200 rounded-full p-3 hover:text-teal-700 font-medium text-sm flex items-center space-x-1">
  //         <span>Edit</span>
  //         <Edit className="w-4 h-4" />
  //       </button>
  //     </div>

  //     <div className={`grid grid-cols-${columns} gap-8`}>
  //       {data.map((item, index) => (
  //         <div key={index}>
  //           <p className="text-sm font-medium text-teal-700 mb-1">
  //             {item.label}
  //           </p>
  //           <p className="text-gray-800 font-medium">{item.value}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const renderSpecialSection = (
    title: string,
    icon: React.ReactNode,
    data: ProfileItem[],
    columns: number = 4, // Default to 4 columns
    specialLayout: boolean = false
  ): React.ReactElement => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <button className="bg-gray-200 rounded-full p-3 hover:text-teal-700 font-medium text-sm flex items-center space-x-1">
          <span>Edit</span>
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {specialLayout ? (
        // Special layout for availability section
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-6">
            {data.slice(0, 4).map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                <p className="text-gray-800 font-medium">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {data.slice(4).map((item, index) => (
              <div key={index + 4}>
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                {item.label === "Teleconsultation Availability" ? (
                  <div className="flex items-center">
                    <span className="text-green-600 font-medium mr-2">✓</span>
                  </div>
                ) : (
                  <p className="text-gray-800 font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-${columns} gap-8`}>
          {data.map((item, index) => (
            <div key={index}>
              <p className="text-sm text-teal-700 mb-1">{item.label}</p>
              <p className="text-gray-800 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {title === "Professional Education" && (
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="mr-2">📎</span>
          <span>Uploaded File.pdf</span>
          <button className="ml-2 text-red-500 hover:text-red-700">✕</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b flex"
      >
        <div className="bg-[#086861] px-4 py-3 h-14 z-0 top-0 left-0 flex justify-end fixed w-screen z-10 ">
          <div className="flex items-center space-x-3">
            <button className="bg-white px-3 py-1 border-1 border-black rounded-full text-sm font-medium">
              Free Plan
            </button>
            <button className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              <Image
                src={upgradeImage}
                alt="Upgrade"
                width={30}
                height={30}
                className="float-left mx-2 flex items-center justify-center"
              />
              Upgrade
            </button>
            <div className="w-8 h-8 text-white rounded-full flex items-center justify-center">
              <Bell />
            </div>
            <div className="w-6 h-6 text-white border-2 p-1 border-white rounded-full flex items-center justify-center">
              <Play />
            </div>
            <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white h-screen shadow-sm fixed">
          {/* Profile Section */}
          <div className="p-6">
            <div className="flex justify-center items-center">
              <div className="relative border-4 border-teal-500 rounded-full">
                <Image
                  src={image}
                  alt="Dr. Mira Moreno"
                  className="rounded-full object-cover h-30 w-30"
                />
                <div className="absolute -bottom-1 -right-1 bg-teal-600 rounded-full p-1">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p h-auto txt-2xl">
            <button className="flex w-50 p-1 justify-center mx-auto px-1 bg-teal-100 text-teal rounded-lg font-medium text-xl">
              My Profile
            </button>
          </div>

          {/* Notifications Section */}
          <div className="px-4 ml-5 my-5">
            <h4 className="font-bold text-medium text-gray-800 mb-4">
              Notifications
            </h4>
            <div className="font-8 space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">SMS Notifications</span>
                <ToggleSwitch
                  enabled={notifications.sms}
                  onToggle={() => toggleNotification("sms")}
                  size="lg"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Notifications</span>
                <ToggleSwitch
                  enabled={notifications.email}
                  onToggle={() => toggleNotification("email")}
                  size="md"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">New bookings</span>
                <ToggleSwitch
                  enabled={notifications.newBookings}
                  onToggle={() => toggleNotification("newBookings")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Cancellations</span>
                <ToggleSwitch
                  enabled={notifications.cancellations}
                  onToggle={() => toggleNotification("cancellations")}
                />
              </div>
              <div className="flex items-center justify-between txt-sm">
                <span className="text-gray-700">Appointment reminders</span>
                <ToggleSwitch
                  enabled={notifications.appointmentReminders}
                  onToggle={() => toggleNotification("appointmentReminders")}
                />
              </div>
            </div>
          </div>

          {/* More Info Section */}
          <div className="px-4">
            <h4 className="font-semibold text-gray-800 mb-3">More info Add</h4>
            <div className="text-sm leading-relaxed border-2 rounded-lg p-2 h-auto">
              <p>
                Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor
                sit
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit Lorem ipsum dolor sit
              </p>
            </div>
          </div>

          {/* Log Out Button */}
          <div className="px-4 pb-6 my-2 flex justify-center items-center">
            <button className="flex px-4 py-2 items-center justify-center text-3xl space-x-2 font-medium border border-teal-600 rounded-full hover:bg-teal-50 transition-colors">
              <span className="text-xl bg-gradient-to-r from-teal-800 to-teal-600 text-transparent bg-clip-text">
                Log Out
              </span>
              <Power className="w-6 h-6 text-white p-1 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}

        <div className="flex-1 p-8 ml-80 w">
          <div className="flex justify-between items-start">
            <div className="text-teal-900 text-left my-5 text-2xl font-semibold">
              Profile & Settings
            </div>
            <Link href="/clinic-management/dashboard/doctor">
              <button className="cursor-pointer h-10 w-10 bg-[#086861] text-white mx-10 rounded-lg text-xl font-medium">
                {"<"}
              </button>
            </Link>
          </div>

          <div className="max-w-screen mx-auto space-y-6">
            <div className="shadow-sm p-6 bg-white rounded-lg mb-6">
              <h3 className="text-3xl font-semibold text-teal-800 py-10">
                DR. {doctorData?.personalInfo?.fullName}
              </h3>
              <p className="text-teal-800 text-lg font-medium">
                {doctorData?.professionalDetails?.specialization}
                <br></br>10+ Year of Practice
              </p>
              <p className="text-lg text-gray-400 mt-1">
                Setting and details you can change
              </p>
            </div>
            {/* Permanent Address */}
            {renderSection(
              "Permanent Address",
              <FaMapMarkerAlt className="w-5 h-5 text-teal-600" />,
              profileData.permanentAddress,
              3
            )}

            {/* Current Address */}
            {renderSection(
              "Current Address",
              <FaMapMarkerAlt className="w-5 h-5 text-teal-600" />,
              profileData.currentAddress,
              3
            )}

            {/* Personal Information */}
            {renderSection(
              "Personal Information",
              "👤",
              profileData.personalInformation,
              3
            )}

            {/* Professional Information */}
            {renderSpecialSection(
              "Professional Information",
              <Briefcase className="w-5 h-5 text-teal-600" />,
              profileData.professionalInformation,
              4
            )}

            {/* Professional Education */}
            {renderSection(
              "Professional Education",
              <GraduationCap className="w-5 h-5 text-teal-600" />,
              profileData.professionalEducation,
              3
            )}

            {/* Availability & Working hours */}
            {renderSection(
              "Availability & Working hours",
              "🕐",
              profileData.availabilityWorkingHours,
              3
            )}

            {/* Passwords */}
            {renderSection(
              "Passwords",
              <Lock className="w-5 h-5 text-teal-600" />,
              profileData.passwords,
              2
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
