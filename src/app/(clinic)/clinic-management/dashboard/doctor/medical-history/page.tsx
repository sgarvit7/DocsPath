// pages/index.tsx
"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  avatar: string;
}

interface ChartData {
  year: string;
  teleconsultation: number;
  opd: number;
}

interface MonthlyData {
  day: number;
  reports: number;
}

const MedicalDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const chartData: ChartData[] = [
    { year: '2017', teleconsultation: 20, opd: 25 },
    { year: '2018', teleconsultation: 35, opd: 40 },
    { year: '2019', teleconsultation: 50, opd: 55 },
    { year: '2020', teleconsultation: 70, opd: 65 },
    { year: '2021', teleconsultation: 85, opd: 70 },
    { year: '2022', teleconsultation: 90, opd: 75 },
  ];

  const monthlyReports: MonthlyData[] = [
    { day: 1, reports: 45 },
    { day: 2, reports: 52 },
    { day: 3, reports: 38 },
    { day: 4, reports: 61 },
    { day: 5, reports: 55 },
    { day: 6, reports: 67 },
    { day: 7, reports: 43 },
    { day: 8, reports: 58 },
    { day: 9, reports: 72 },
    { day: 10, reports: 65 },
    { day: 11, reports: 49 },
    { day: 12, reports: 78 },
    { day: 13, reports: 68 },
    { day: 14, reports: 82 },
  ];

  const patients: Patient[] = [
    { id: '#0000', name: 'Ankit Wind', age: 45, gender: 'Male', lastVisit: '10-Apr-2022/13:00pm', avatar: '👨' },
    { id: '#0000', name: 'ByeWind', age: 33, gender: 'Female', lastVisit: '8-Apr-2022/13:00pm', avatar: '👩' },
    { id: '#0000', name: 'Ankit Wind', age: 21, gender: 'Male', lastVisit: '10-Apr-2022/13:00pm', avatar: '👨' },
    { id: '#0000', name: 'Anna Mayin', age: 18, gender: 'Male', lastVisit: '8-Apr-2022/13:00pm', avatar: '👨' },
    { id: '#0000', name: 'Ankit Wind', age: 60, gender: 'Female', lastVisit: '10-Apr-2022/13:00pm', avatar: '👩' },
  ];

  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendar = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }
    
    return calendar;
  };

  const calendar = generateCalendar(2018, 10); // November 2018
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-lg">📋</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Medical History</h1>
          </div>
        </div>

        {/* Top Row - Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-4">Year</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line 
                    type="monotone" 
                    dataKey="teleconsultation" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="opd" 
                    stroke="#0891B2" 
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Teleconsultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
                <span className="text-sm text-gray-600">OPD</span>
              </div>
            </div>
          </div>

          {/* Monthly Reports */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Medical History</h3>
              <p className="text-gray-500">For a Month</p>
              <div className="text-4xl font-bold text-gray-800 mt-2">1,4K</div>
              <p className="text-sm text-gray-500">Reports in the month</p>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReports}>
                  <Bar dataKey="reports" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">November 2018</h3>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-xs text-gray-500 text-center p-2 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendar.map((day, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-2 text-sm cursor-pointer rounded
                    ${day === null ? '' : 'hover:bg-gray-100'}
                    ${day === selectedDate ? 'bg-teal-600 text-white' : 'text-gray-700'}
                  `}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day}
                </div>
              ))}
            </div>
            
            <div className="mt-4 bg-teal-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Today, +0dB5</div>
              <div className="font-semibold text-gray-800">Mumbai</div>
              <div className="text-2xl font-bold text-gray-800">12:54 <span className="text-sm font-normal">PM</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Stats and Patient List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-sm text-gray-500 mb-4">Today you have:</h4>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#14B8A6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${6 * 14.13} ${226.08 - 6 * 14.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">6</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">Patient</div>
              <div className="text-sm text-gray-500">in Lobby</div>
            </div>
          </div>

          {/* Appointment Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-sm text-gray-500 mb-4">Appointments for the day:</h4>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#22C55E"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${12 * 14.13} ${226.08 - 12 * 14.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">12</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">appointment</div>
              <div className="text-sm text-gray-500">Today</div>
            </div>
          </div>

          {/* Patient Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-teal-600 text-white text-sm font-medium">
              <div className="col-span-1">PID</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Age/Gender</div>
              <div className="col-span-2">Last visit</div>
              <div className="col-span-1">Lab Report</div>
              <div className="col-span-2">Prescription</div>
              <div className="col-span-2">Health Records</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredPatients.map((patient, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                  <div className="col-span-1 text-sm text-gray-600">{patient.id}</div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">{patient.avatar}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{patient.name}</span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {patient.age}/{patient.gender}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">{patient.lastVisit}</div>
                  <div className="col-span-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;