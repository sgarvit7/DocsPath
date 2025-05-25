'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Area, 
  AreaChart 
} from 'recharts';
import {
  Calendar,
  Users,
  Activity,
  FileText,
  BarChart3,
  Eye,
  Phone,
  MessageCircle,
  Clock,
  UserCheck,
  CalendarDays,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLayout } from './layout';

// Types for better type safety
interface ChartDataPoint {
  month?: string;
  day?: number;
  value: number;
}

interface StatsData {
  today: number;
  change: number;
  trend: "up" | "down";
}

interface ActiveDoctorsData {
  available: number;
  total: number;
  change: number;
  trend: "up" | "down";
}

interface RevenueData {
  amount: number;
  period: string;
  change: number;
  trend: "up" | "down";
}

interface QuickStatItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PatientDetail {
  pid: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  specialty: string;
  avatar: string;
  action: string;
}

// Dummy data structure for easy customization
const dashboardData = {
  admin: {
    name: "Admin",
    avatar: "/api/placeholder/80/80"
  },
  paymentIncome: {
    amount: 890.93,
    trend: "up" as const,
    chartData: [
      { month: 'Jan', value: 200 },
      { month: 'Feb', value: 150 },
      { month: 'Mar', value: 180 },
      { month: 'Apr', value: 220 },
      { month: 'May', value: 350 },
      { month: 'Jun', value: 320 },
      { month: 'Jul', value: 400 },
      { month: 'Aug', value: 380 },
      { month: 'Sep', value: 180 },
      { month: 'Oct', value: 160 },
      { month: 'Nov', value: 140 },
      { month: 'Dec', value: 120 }
    ] as ChartDataPoint[]
  },
  stats: {
    totalAppointments: {
      today: 235,
      change: 23,
      trend: "up" as const
    } as StatsData,
    activeDoctors: {
      available: 23,
      total: 130,
      change: 23,
      trend: "up" as const
    } as ActiveDoctorsData,
    revenue: {
      amount: 23000,
      period: "Month",
      change: 23,
      trend: "up" as const
    } as RevenueData
  },
  inputPatients: {
    value: "1.6k",
    change: 23,
    trend: "up" as const,
    chartData: [
      { day: 1, value: 50 },
      { day: 2, value: 80 },
      { day: 3, value: 60 },
      { day: 4, value: 90 },
      { day: 5, value: 120 },
      { day: 6, value: 100 },
      { day: 7, value: 140 }
    ] as ChartDataPoint[]
  },
  bedFree: {
    value: 179,
    change: 8.5,
    trend: "up" as const,
    chartData: [
      { day: 1, value: 160 },
      { day: 2, value: 170 },
      { day: 3, value: 165 },
      { day: 4, value: 175 },
      { day: 5, value: 180 },
      { day: 6, value: 179 },
      { day: 7, value: 179 }
    ] as ChartDataPoint[]
  },
  quickStats: {
    freeInMoment: {
      title: "Free in the moment",
      value: "9 Doctors",
      icon: UserCheck
    } as QuickStatItem,
    labReports: {
      title: "Lab Reports",
      value: "13 Done",
      icon: FileText
    } as QuickStatItem,
    patientWaiting: {
      title: "Patient Waiting",
      value: "10 in Lobby",
      icon: Clock
    } as QuickStatItem
  },
  currentTime: {
    time: "12:54",
    period: "PM",
    location: "Mumbai"
  },
  calendar: {
    currentMonth: "November 2018",
    selectedDate: 8,
    dates: Array.from({ length: 30 }, (_, i) => i + 1)
  },
  patientDetails: [
    {
      pid: "9999999",
      name: "Ankit Wind",
      age: 45,
      gender: "Male",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "Dentist",
      avatar: "/api/placeholder/32/32",
      action: "Reschedule"
    },
    {
      pid: "#0000",
      name: "ByeWind",
      age: 33,
      gender: "Female",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      avatar: "/api/placeholder/32/32",
      action: "Confirm"
    },
    {
      pid: "#0000",
      name: "Ankit Wind",
      age: 21,
      gender: "Male",
      date: "29-Apr-2022",
      time: "13:00pm",
      type: "Teleconsultation",
      doctor: "Dr. Zoe",
      specialty: "Pediatrician",
      avatar: "/api/placeholder/32/32",
      action: "Cancel"
    },
    {
      pid: "#0000",
      name: "Anna Mayin",
      age: 18,
      gender: "Male",
      date: "8-Apr-2022",
      time: "13:00pm",
      type: "OPD",
      doctor: "Dr. Smith",
      specialty: "ENT",
      avatar: "/api/placeholder/32/32",
      action: "Reschedule"
    }
  ] as PatientDetail[]
};

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { adminName, setAdminName, adminAvatar, setAdminAvatar } = useLayout()

  useEffect(()=>{
      setAdminName(dashboardData.admin.name)
      setAdminAvatar(dashboardData.admin.avatar)
  },[dashboardData])

  return (
      <div className="p-6 space-y-6">
        {/* Top Row - Payment Income Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Payment income</p>
                  <p className="text-2xl font-bold">${dashboardData.paymentIncome.amount}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboardData.paymentIncome.chartData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Calendar className="w-8 h-8 text-blue-500" />
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        +{dashboardData.stats.totalAppointments.change}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Total Appointment</p>
                    <p className="text-2xl font-bold">{dashboardData.stats.totalAppointments.today} Today</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-l-4 border-l-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Users className="w-8 h-8 text-teal-500" />
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        +{dashboardData.stats.activeDoctors.change}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">All Active Doctors Today</p>
                    <p className="text-2xl font-bold">
                      {dashboardData.stats.activeDoctors.available}/{dashboardData.stats.activeDoctors.total} Available
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <BarChart3 className="w-8 h-8 text-green-500" />
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        +{dashboardData.stats.revenue.change}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Revenue Summary</p>
                    <p className="text-2xl font-bold">
                      {dashboardData.stats.revenue.amount.toLocaleString()} {dashboardData.stats.revenue.period}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Input Patients</p>
                        <p className="text-2xl font-bold">{dashboardData.inputPatients.value}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        +{dashboardData.inputPatients.change}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={dashboardData.inputPatients.chartData}>
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

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Bed free</p>
                        <p className="text-2xl font-bold">{dashboardData.bedFree.value}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        +{dashboardData.bedFree.change}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={dashboardData.bedFree.chartData}>
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

          {/* Right Column - Calendar and Quick Stats */}
          <div className="space-y-6">
            {/* Calendar */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">{dashboardData.calendar.currentMonth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="p-1 font-medium text-gray-500">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    <div className="p-2 text-gray-400">31</div>
                    {dashboardData.calendar.dates.map(date => (
                      <div
                        key={date}
                        className={`p-2 text-sm cursor-pointer rounded ${
                          date === dashboardData.calendar.selectedDate
                            ? 'bg-teal-600 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Time and Location */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <CardContent className="p-6">
                  <p className="text-sm opacity-90">{dashboardData.currentTime.location}</p>
                  <p className="text-3xl font-bold">
                    {dashboardData.currentTime.time}
                    <span className="text-lg ml-1">{dashboardData.currentTime.period}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <div className="space-y-4">
              {Object.entries(dashboardData.quickStats).map(([key, stat], index) => (
                <motion.div
                  key={key}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{stat.title}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details Table */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Details Table</CardTitle>
                <Input
                  placeholder="Search by..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">PID</th>
                      <th className="text-left p-3 font-medium text-gray-600">Name</th>
                      <th className="text-left p-3 font-medium text-gray-600">Age/Gender</th>
                      <th className="text-left p-3 font-medium text-gray-600">Date</th>
                      <th className="text-left p-3 font-medium text-gray-600">Type</th>
                      <th className="text-left p-3 font-medium text-gray-600">Doctor</th>
                      <th className="text-left p-3 font-medium text-gray-600">Specialty</th>
                      <th className="text-left p-3 font-medium text-gray-600">Prescriptions</th>
                      <th className="text-left p-3 font-medium text-gray-600">Contact</th>
                      <th className="text-left p-3 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.patientDetails.map((patient, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">{patient.pid}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={patient.avatar}
                              alt={patient.name}
                              className="w-8 h-8 rounded-full"
                            />
                            {patient.name}
                          </div>
                        </td>
                        <td className="p-3">{patient.age}/{patient.gender}</td>
                        <td className="p-3">{patient.date}|{patient.time}</td>
                        <td className="p-3">
                          <Badge variant={patient.type === 'OPD' ? 'default' : 'secondary'}>
                            {patient.type}
                          </Badge>
                        </td>
                        <td className="p-3">{patient.doctor}</td>
                        <td className="p-3">{patient.specialty}</td>
                        <td className="p-3">
                          <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Phone className="w-4 h-4 text-gray-500 cursor-pointer" />
                            <MessageCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
                          </div>
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant={
                              patient.action === 'Cancel' ? 'destructive' :
                              patient.action === 'Confirm' ? 'default' : 'outline'
                            }
                          >
                            {patient.action}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
};

export default AdminDashboard;