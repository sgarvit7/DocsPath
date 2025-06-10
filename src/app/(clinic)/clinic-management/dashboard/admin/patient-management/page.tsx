"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Phone,
  MessageCircle,
  Calendar,
  X,
  Filter,
  Users,
  TrendingUp,
  FileText,
  Clock
} from 'lucide-react';

// Dummy data objects for easy modification
const summaryStats = {
  newPatients: {
    count: '21.0k',
    period: 'Month',
    growth: '+50%',
    trend: 'up'
  },
  inputPatients: {
    count: '2087',
    period: 'Month',
    growth: '+22%',
    trend: 'up'
  },
  bedsFree: {
    count: '179',
    period: 'Month',
    growth: '+8.5%',
    trend: 'up'
  }
};

const patientAgeData = {
  ageGroups: [
    { range: '30-40', percentage: 50.0, color: '#2563eb' },
    { range: '20-30', percentage: 30.0, color: '#10b981' },
    { range: '60-80', percentage: 20.0, color: '#f59e0b' }
  ]
};

const sidebarStats = {
  patientsWaiting: {
    count: 10,
    location: 'Lobby'
  },
  doctorsAvailable: {
    count: 9,
    status: 'Free in the moment'
  },
  labReports: {
    count: 13,
    status: 'Done'
  }
};

const calendarData = {
  currentMonth: 'November 2018',
  currentDate: 14,
  currentTime: '12:54',
  currentPeriod: 'PM',
  location: 'Mumbai'
};

// Dummy patient data
const patientData = [
  {
    id: '#0000',
    name: 'Ankit Wind',
    age: 23,
    gender: 'Female',
    date: '10-Apr-2022',
    time: '13:00pm',
    mode: 'OPD',
    condition: 'Fever',
    status: 'Reschedule',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3c5d3?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '#0001',
    name: 'ByeWind',
    age: 55,
    gender: 'male',
    date: '8-Apr-2022',
    time: '13:00pm',
    mode: 'Teleconsultation',
    condition: 'Cold',
    status: 'Cancel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '#0002',
    name: 'Ankit Wind',
    age: 88,
    gender: 'Male',
    date: '10-Apr-2022',
    time: '13:00pm',
    mode: 'OPD',
    condition: 'Diabetese',
    status: 'Reschedule',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '#0003',
    name: 'Anna Mayim',
    age: 66,
    gender: 'Female',
    date: '8-Apr-2022',
    time: '13:00pm',
    mode: 'OPD',
    condition: 'Coughing',
    status: 'Reschedule',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '#0004',
    name: 'Ankit Wind',
    age: 7,
    gender: 'Female',
    date: '10-Apr-2022',
    time: '13:00pm',
    mode: 'Teleconsultation',
    condition: 'Pain',
    status: 'Upcoming',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
];

const PatientManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patientData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = patientData.filter(patient =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.condition.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleAction = (action: string, patientId: string) => {
    console.log(`${action} action for patient ${patientId}`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Reschedule':
        return 'bg-orange-100 text-orange-600 border border-orange-200';
      case 'Cancel':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'Upcoming':
        return 'bg-green-100 text-green-600 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  // Create pie chart segments
  const createPieSegments = () => {
    let cumulativePercentage = 0;
    return patientAgeData.ageGroups.map((group, index) => {
      const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
      const endAngle = (cumulativePercentage + group.percentage) * 3.6;
      cumulativePercentage += group.percentage;
      
      const startAngleRad = (startAngle - 90) * (Math.PI / 180);
      const endAngleRad = (endAngle - 90) * (Math.PI / 180);
      
      const largeArcFlag = group.percentage > 50 ? 1 : 0;
      
      const x1 = 50 + 40 * Math.cos(startAngleRad);
      const y1 = 50 + 40 * Math.sin(startAngleRad);
      const x2 = 50 + 40 * Math.cos(endAngleRad);
      const y2 = 50 + 40 * Math.sin(endAngleRad);
      
      const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      return {
        path: pathData,
        color: group.color,
        percentage: group.percentage,
        range: group.range
      };
    });
  };

  const pieSegments = createPieSegments();

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-500 text-xs">Manage your patients efficiently</p>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Container */}
      <div className="grid grid-rows-2 gap-4 h-[calc(100vh-120px)]">
        
        {/* First Grid - 4 Columns */}
        <div className="grid grid-cols-4 gap-4">
          
          {/* Column 1: Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border"
          >
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Your Patients</h3>
            
            {/* Pie Chart */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  {/* Outer ring */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20"/>
                  
                  {/* Pie segments */}
                  {pieSegments.map((segment, index) => (
                    <path
                      key={index}
                      d={segment.path}
                      fill={segment.color}
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  ))}
                  
                  {/* Inner circle */}
                  <circle cx="50" cy="50" r="20" fill="white"/>
                </svg>
                
                {/* Percentage Labels */}
                <div className="absolute top-2 left-6 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  50.0%
                </div>
                <div className="absolute bottom-6 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  30.0%
                </div>
                <div className="absolute bottom-2 right-6 bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
                  20.0%
                </div>
              </div>
            </div>

            {/* Age Legend */}
            <div className="space-y-2">
              {patientAgeData.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }}></div>
                  <span className="text-xs text-gray-600">Age {group.range}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Stats Cards */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-3 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500 text-xs">New Patients</span>
                <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <TrendingUp className="w-2 h-2" />
                  {summaryStats.newPatients.growth}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-teal-600">
                  {summaryStats.newPatients.count}
                </span>
                <span className="text-gray-500 text-xs">{summaryStats.newPatients.period}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-3 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500 text-xs">Input Patients</span>
                <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <TrendingUp className="w-2 h-2" />
                  {summaryStats.inputPatients.growth}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-teal-600">
                  {summaryStats.inputPatients.count}
                </span>
                <span className="text-gray-500 text-xs">{summaryStats.inputPatients.period}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-3 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500 text-xs">Beds Free</span>
                <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <TrendingUp className="w-2 h-2" />
                  {summaryStats.bedsFree.growth}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-teal-600">
                  {summaryStats.bedsFree.count}
                </span>
                <span className="text-gray-500 text-xs">{summaryStats.bedsFree.period}</span>
              </div>
            </motion.div>
          </div>

          {/* Column 3: Quick Stats */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Patients Waiting</p>
                <p className="font-bold text-gray-900 text-sm">
                  {sidebarStats.patientsWaiting.count} in {sidebarStats.patientsWaiting.location}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{sidebarStats.doctorsAvailable.status}</p>
                <p className="font-bold text-gray-900 text-sm">
                  {sidebarStats.doctorsAvailable.count} Doctors
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Lab Reports</p>
                <p className="font-bold text-gray-900 text-sm">
                  {sidebarStats.labReports.count} {sidebarStats.labReports.status}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Column 4: Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm">{calendarData.currentMonth}</h3>
              <div className="flex items-center gap-1">
                <button className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">‹</span>
                </button>
                <button className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">›</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <div key={day} className="text-center text-xs text-gray-500 py-1">
                  {day}
                </div>
              ))}
              
              <div className="text-center py-1 text-xs text-gray-400">31</div>
              {Array.from({ length: 30 }, (_, i) => i + 1).map(date => (
                <div
                  key={date}
                  className={`text-center py-1 text-xs cursor-pointer rounded ${
                    date === calendarData.currentDate
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date}
                </div>
              ))}
              {Array.from({ length: 4 }, (_, i) => i + 1).map(date => (
                <div key={`next-${date}`} className="text-center py-1 text-xs text-gray-400">
                  {date}
                </div>
              ))}
            </div>

            {/* Current Time */}
            <div className="bg-teal-50 rounded-lg p-3">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Today • DRIIFF</p>
                <p className="text-xs font-medium text-gray-700 mb-1">{calendarData.location}</p>
                <div className="text-lg font-bold text-teal-600">
                  {calendarData.currentTime}
                  <span className="text-xs ml-1">{calendarData.currentPeriod}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Grid - 2 Rows */}
        <div className="grid grid-rows-2 gap-4">
          
          {/* Row 1: Register New Patient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Register New Patient
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-48 text-sm"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </motion.div>

          {/* Row 2: Patient Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="text-left py-2 px-3 font-medium text-xs">PID</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Name</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Age/Gender</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Date</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Mode</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Condition</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Contact</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Status</th>
                    <th className="text-left py-2 px-3 font-medium text-xs">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient, index) => (
                    <motion.tr
                      key={`${patient.id}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2 px-3 text-gray-600 font-medium text-xs">{patient.id}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={patient.avatar}
                            alt={patient.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-medium text-gray-900 text-xs">{patient.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{patient.age}/{patient.gender}</td>
                      <td className="py-2 px-3 text-gray-600 flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3" />
                        {patient.date}|{patient.time}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{patient.mode}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{patient.condition}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1">
                          <button className="w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors">
                            <Phone className="w-3 h-3 text-blue-600" />
                          </button>
                          <button className="w-5 h-5 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors">
                            <MessageCircle className="w-3 h-3 text-green-600" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => handleAction('remove', patient.id)}
                          className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                        >
                          <X className="w-3 h-3 text-red-600" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;