
'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, FileText, ChevronLeft, ChevronRight, Search, MoreHorizontal } from 'lucide-react';

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  date: string;
  mode: string;
  condition: string;
  status: 'Reschedule' | 'Cancel' | 'Upcoming';
  consultation: string;
  avatar: string;
}

interface LabReport {
  day: string;
  value: number;
}

interface AppointmentStats {
  total: number;
  change: string;
}

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2018, 10, 1)); // November 2018

  // Sample data
  const labReports: LabReport[] = [
    { day: 'M', value: 15 },
    { day: 'T', value: 8 },
    { day: 'W', value: 3 },
    { day: 'T', value: 18 },
    { day: 'F', value: 25 },
    { day: 'S', value: 6 },
    { day: 'S', value: 12 }
  ];

  const patients: Patient[] = [
    {
      id: '#0000',
      name: 'Ankit Wind',
      age: 45,
      gender: 'Male',
      date: '10-Apr-2022 | 3:00pm',
      mode: 'OPD',
      condition: 'Fever',
      status: 'Reschedule',
      consultation: 'Join now',
      avatar: 'AW'
    },
    {
      id: '#0000',
      name: 'Byrdwind',
      age: 33,
      gender: 'Female',
      date: '10-Apr-2022 | 3:00pm',
      mode: 'Teleconsultation',
      condition: 'Cold',
      status: 'Cancel',
      consultation: '-',
      avatar: 'BW'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      age: 21,
      gender: 'Male',
      date: '10-Apr-2022 | 3:00pm',
      mode: 'OPD',
      condition: 'Diabetes',
      status: 'Upcoming',
      consultation: '-',
      avatar: 'AW'
    },
    {
      id: '#0000',
      name: 'Anna Mayin',
      age: 18,
      gender: 'Male',
      date: '10-Apr-2022 | 3:00pm',
      mode: 'OPD',
      condition: 'Coughing',
      status: 'Cancel',
      consultation: '-',
      avatar: 'AM'
    }
  ];

  const hourlyData = [
    { hour: '3:00', value: 85 },
    { hour: '4:00', value: 95 },
    { hour: '5:00', value: 65 },
    { hour: '6:00', value: 75 },
    { hour: '7:00', value: 55 },
    { hour: '8:00', value: 45 },
    { hour: '9:00', value: 35 },
    { hour: '10:00', value: 25 }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reschedule':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Cancel':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'Upcoming':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-teal-700">Welcome, Dr. Max</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lab Reports Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-medium mb-4">Lab Reports</h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {labReports.map((report, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="bg-teal-600 rounded-t-sm w-full transition-all duration-300 hover:bg-teal-700"
                    style={{ height: `${(report.value / 30) * 100}%` }}
                  ></div>
                  <span className="text-sm text-gray-600">{report.day}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Week days</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Month</p>
                  <p className="text-lg font-semibold">231 Last Month</p>
                  <p className="text-sm text-gray-500">Total Appointments <span className="text-green-500">+23%</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Month</p>
                  <p className="text-lg font-semibold">11 to be Issued /Month</p>
                  <p className="text-sm text-gray-500">Pending Prescriptions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div>
                <p className="text-sm text-gray-600">Bed free</p>
                <p className="text-2xl font-bold">179</p>
                <p className="text-sm text-green-500">+8.50%</p>
              </div>
            </div>
          </div>

          {/* Patient Details Table */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium">Patient Details</h3>
              <div className="flex items-center gap-2">
                <button className="text-teal-600 hover:text-teal-700">See all</button>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">PID</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Age/Gender</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Mode</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Condition</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Consultation</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-sm">{patient.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${getAvatarColor(patient.name)} flex items-center justify-center text-white text-xs font-medium`}>
                            {patient.avatar}
                          </div>
                          <span className="text-sm font-medium">{patient.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{patient.age}/{patient.gender}</td>
                      <td className="p-3 text-sm">{patient.date}</td>
                      <td className="p-3 text-sm">{patient.mode}</td>
                      <td className="p-3 text-sm">{patient.condition}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        {patient.consultation === 'Join now' ? (
                          <button className="text-teal-600 hover:text-teal-700 text-sm">
                            {patient.consultation}
                          </button>
                        ) : (
                          patient.consultation
                        )}
                      </td>
                      <td className="p-3">
                        <button className="text-teal-600 hover:text-teal-700">
                          <FileText className="w-4 h-4" />
                        </button>
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
              <h3 className="font-medium">{formatMonth(currentDate)}</h3>
              <div className="flex gap-1">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
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
                    ${day === 14 ? 'bg-teal-600 text-white' : ''}
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
            <div className="text-sm text-gray-600">Today you have:</div>
            
            <div className="flex gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">6</p>
                    <p className="text-sm text-gray-600">Patient in Lobby</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">12</p>
                    <p className="text-sm text-gray-600">appointment Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time and Lab Reports */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Mumbai</p>
                <p className="text-2xl font-bold">12:54 <span className="text-sm font-normal">PM</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-teal-600" />
              <span className="text-sm">Lab Reports Review Today</span>
            </div>
            <p className="text-2xl font-bold">13 <span className="text-sm font-normal text-gray-500">Done</span></p>
          </div>

          {/* Hours Bar Chart */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-teal-600"></div>
                <span className="text-sm">Hours Bar chart</span>
                <span className="text-xs text-green-500">+86%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">Busy hours in the day check.</p>
            
            <div className="flex items-end justify-between h-24 gap-1">
              {hourlyData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div 
                    className={`w-full rounded-t transition-all duration-300 ${
                      index < 2 ? 'bg-teal-600' : 'bg-green-400'
                    }`}
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 transform -rotate-45 origin-center">
                    {item.hour}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;