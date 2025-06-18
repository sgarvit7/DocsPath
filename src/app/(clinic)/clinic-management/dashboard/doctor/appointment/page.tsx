'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search, Check, Edit, X } from 'lucide-react';

// Types
interface Patient {
  id: string;
  name: string;
  date: string;
  condition: string;
  mode: 'OPD' | 'Teleconsultation';
  avatar: string;
  avatarColor: string;
}

interface PatientOverviewData {
  month: string;
  male: number;
  female: number;
}

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2018, 10, 1)); // November 2018

  // Sample data for patient overview chart
  const patientOverviewData: PatientOverviewData[] = [
    { month: 'Jan', male: 45, female: 55 },
    { month: 'Feb', male: 52, female: 48 },
    { month: 'Mar', male: 48, female: 52 },
    { month: 'Apr', male: 61, female: 49 },
    { month: 'May', male: 55, female: 45 },
    { month: 'Jun', male: 67, female: 48 },
    { month: 'Jul', male: 69, female: 52 },
    { month: 'Aug', male: 78, female: 53 },
    { month: 'Sep', male: 88, female: 48 },
    { month: 'Oct', male: 77, female: 45 },
    { month: 'Nov', male: 83, female: 52 },
    { month: 'Dec', male: 92, female: 58 }
  ];

  const scheduledAppointments: Patient[] = [
    {
      id: '#0000',
      name: 'Ankit Wind',
      date: '10-Apr-2022 | 3:00pm',
      condition: 'Fever',
      mode: 'OPD',
      avatar: 'AW',
      avatarColor: 'bg-green-500'
    },
    {
      id: '#0000',
      name: 'ByeWind',
      date: '8-Apr-2022 | 3:00pm',
      condition: 'Cold',
      mode: 'Teleconsultation',
      avatar: 'BW',
      avatarColor: 'bg-purple-500'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      date: '10-Apr-2022 | 3:00pm',
      condition: 'Diabetese',
      mode: 'OPD',
      avatar: 'AW',
      avatarColor: 'bg-green-500'
    },
    {
      id: '#0000',
      name: 'Anna Mayin',
      date: '8-Apr-2022 | 3:00pm',
      condition: 'Coughing',
      mode: 'OPD',
      avatar: 'AM',
      avatarColor: 'bg-orange-500'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      date: '10-Apr-2022 | 3:00pm',
      condition: 'Pain',
      mode: 'Teleconsultation',
      avatar: 'AW',
      avatarColor: 'bg-green-500'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedStartingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // SVG path for the area chart
  const createAreaPath = (data: PatientOverviewData[], key: 'male' | 'female', width: number, height: number) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.male, d.female)));
    const stepX = width / (data.length - 1);
    
    let path = '';
    data.forEach((point, index) => {
      const x = index * stepX;
      const y = height - (point[key] / maxValue) * height;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    // Close the path for area fill
    path += ` L ${width} ${height} L 0 ${height} Z`;
    return path;
  };

  // Circular progress component
  const CircularProgress: React.FC<{ percentage: number; size: number; strokeWidth: number; color: string; children: React.ReactNode }> = ({ 
    percentage, size, strokeWidth, color, children 
  }) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-teal-700">Upcoming Appointments</h1>
          </div>

          {/* Patient Overview Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Patient Overview</h3>
                <p className="text-sm text-gray-500">Today</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-700">100%</div>
              </div>
            </div>
            
            <div className="relative h-48 mb-4">
              <svg viewBox="0 0 400 160" className="w-full h-full">
                {/* Male area (darker teal) */}
                <path
                  d={createAreaPath(patientOverviewData, 'male', 400, 160)}
                  fill="url(#maleGradient)"
                  className="opacity-80"
                />
                {/* Female area (lighter teal) */}
                <path
                  d={createAreaPath(patientOverviewData, 'female', 400, 160)}
                  fill="url(#femaleGradient)"
                  className="opacity-60"
                />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="maleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-700 rounded-full"></div>
                <span className="text-sm text-gray-600">Male</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Female</span>
              </div>
            </div>
          </div>

          {/* Scheduled Appointments Table */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium">Scheduled Appointments</h3>
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
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm font-medium">{appointment.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${appointment.avatarColor} flex items-center justify-center text-white text-xs font-medium`}>
                            {appointment.avatar}
                          </div>
                          <span className="text-sm font-medium">{appointment.name}</span>
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

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">{formatMonth(currentDate)}</h3>
              <div className="flex gap-1">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="text-xs text-gray-500 text-center p-1 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div 
                  key={index} 
                  className={`
                    text-center p-2 text-sm cursor-pointer rounded transition-colors
                    ${day === null ? '' : 'hover:bg-gray-100'}
                    ${day === 14 ? 'bg-teal-600 text-white font-medium' : ''}
                    ${day && day < 14 ? 'text-gray-400' : ''}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Today Stats */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="text-xs text-gray-500 mb-2">Today you have:</div>
                <CircularProgress percentage={75} size={80} strokeWidth={6} color="#0d9488">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">6</div>
                    <div className="text-xs text-gray-500">Patient in Lobby</div>
                  </div>
                </CircularProgress>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="text-xs text-gray-500 mb-2">Appointments for the day:</div>
                <CircularProgress percentage={80} size={80} strokeWidth={6} color="#10b981">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">12</div>
                    <div className="text-xs text-gray-500">appointment Today</div>
                  </div>
                </CircularProgress>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Month</p>
                  <p className="text-lg font-semibold text-gray-800">231 Last Month</p>
                  <p className="text-sm text-gray-500">Total Appointments <span className="text-green-500 font-medium">+23%</span></p>
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
                  <p className="text-lg font-semibold text-gray-800">11 to be Issued /Month</p>
                  <p className="text-sm text-gray-500">Pending Prescriptions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
            <div className="text-right">
              <div className="text-xs text-teal-600 mb-1">Today, 14 Nov</div>
              <div className="text-xs text-gray-500">Mumbai</div>
              <div className="text-3xl font-bold text-teal-700">12:54 <span className="text-lg font-normal">PM</span></div>
            </div>
          </div>

          {/* Search */}
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
      </div>
    </div>
  );
};