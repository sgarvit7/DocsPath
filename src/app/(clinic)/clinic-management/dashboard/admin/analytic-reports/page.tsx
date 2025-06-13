'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus } from 'lucide-react';

interface Report {
  serialNumber: string;
  name: string;
}

interface DayData {
  day: string;
  value: number;
}

const AIAnalyticsDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [currentMonth, setCurrentMonth] = useState('November 2018');

  // Sample data for the bar chart
  const weekData: DayData[] = [
    { day: 'Mon', value: 60 },
    { day: 'Tues', value: 75 },
    { day: 'Wed', value: 100 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 50 },
    { day: 'Sun', value: 80 }
  ];

  // Sample report data
  const reports: Report[] = [
    { serialNumber: 'R001', name: 'Patient interaction insights & trends' },
    { serialNumber: 'R002', name: 'Doctor availability & appointment efficiency' },
    { serialNumber: 'LR003', name: 'Doctor availability & appointment efficiency' }
  ];

  // Calendar data for November 2018
  const calendarDays = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 1, 2, 3, 4]
  ];

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const maxValue = Math.max(...weekData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-xl font-bold">AI</div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">AI Analytics & Reports</h1>
          </div>
          
          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">{currentMonth}</h3>
              <div className="flex space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-xs">
              {dayNames.map(day => (
                <div key={day} className="text-center text-gray-500 py-1 text-[10px]">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((week, weekIndex) => 
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`text-center py-1 text-xs cursor-pointer rounded ${
                      day === selectedDate
                        ? 'bg-teal-600 text-white'
                        : day && day <= 30
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-300'
                    }`}
                    onClick={() => day && day <= 30 && setSelectedDate(day)}
                  >
                    {day}
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-3 text-xs text-gray-600">
              <div>Today, 14th 📅</div>
              <div className="font-medium">Mumbai</div>
              <div className="text-lg font-bold">12:54 <span className="text-xs">PM</span></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Reports Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  📊 AI Reports
                </h2>
                <span className="text-sm text-gray-500">AI Insights</span>
              </div>
              
              <p className="text-gray-600 mb-6">
                Balance of AI insights of the last 5 days in the company
              </p>

              {/* Bar Chart */}
              <div className="mb-8">
                <div className="flex items-end justify-between h-48 px-4">
                  {weekData.map((item, index) => (
                    <div key={item.day} className="flex flex-col items-center">
                      <div 
                        className={`w-12 rounded-t-md mb-2 ${
                          item.day === 'Wed' ? 'bg-teal-600' : 'bg-teal-200'
                        }`}
                        style={{ height: `${(item.value / maxValue) * 160}px` }}
                      />
                      <span className="text-xs text-gray-600">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reports Table */}
              <div className="overflow-hidden">
                <div className="grid grid-cols-3 gap-4 py-3 border-b text-sm font-medium text-gray-700">
                  <div>Serial Number</div>
                  <div>Report Name</div>
                  <div className="text-right">View</div>
                </div>
                
                {reports.map((report, index) => (
                  <div key={report.serialNumber} className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100">
                    <div className="text-sm font-medium text-teal-600">
                      {report.serialNumber}
                    </div>
                    <div className="text-sm text-gray-700">
                      {report.name}
                    </div>
                    <div className="text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
          {/* Right Panel */}
          <div className="space-y-6">
            {/* Daily Insight Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Select a day from the other chart to see the contributions
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">85%</div>
                <div className="text-lg font-medium text-gray-700">Wednesday</div>
                
                {/* Mini Chart */}
                <div className="mt-4 h-24 bg-gradient-to-t from-teal-100 to-teal-50 rounded-lg relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <path
                      d="M0,80 Q50,70 100,60 T200,20"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,80 Q50,70 100,60 T200,20 L200,100 L0,100 Z"
                      fill="url(#gradient)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* New Summary Button */}
            <div className="relative">
              <button className="absolute bottom-6 right-6 bg-black text-white rounded-full py-3 px-6 flex items-center space-x-2 hover:bg-gray-800 transition-colors shadow-lg">
                <Plus className="w-5 h-5" />
                <span>New Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard;