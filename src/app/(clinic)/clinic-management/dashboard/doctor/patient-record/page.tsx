'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  Phone, 
  Mail, 
  User,
  TrendingUp,
  Menu
} from 'lucide-react';

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  prescription: string;
  nextVisit: string;
  status: 'Pending' | 'Completed' | 'Upcoming';
  avatar: string;
}

interface ChartData {
  category: string;
  age: number;
  genderM: number;
  genderF: number;
}

interface StatsCard {
  title: string;
  value: number;
  subtitle: string;
  color: string;
  icon?: React.ReactNode;
}

const PatientRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data
  const chartData: ChartData[] = [
    { category: '0-10', age: 25, genderM: 12, genderF: 13 },
    { category: '11-20', age: 35, genderM: 18, genderF: 17 },
    { category: '21-30', age: 45, genderM: 22, genderF: 23 },
    { category: '31-40', age: 38, genderM: 19, genderF: 19 },
    { category: '41-50', age: 42, genderM: 21, genderF: 21 },
    { category: '51-60', age: 35, genderM: 17, genderF: 18 },
    { category: '61+', age: 28, genderM: 14, genderF: 14 }
  ];

  const patients: Patient[] = [
    {
      id: '#0000',
      name: 'Ankit Wind',
      age: 45,
      gender: 'Male',
      condition: 'Fever',
      prescription: 'RX-001',
      nextVisit: '10 Apr, 2025',
      status: 'Pending',
      avatar: '👨‍💼'
    },
    {
      id: '#0000',
      name: 'ByeWind',
      age: 33,
      gender: 'Female',
      condition: 'Cold',
      prescription: 'RX-002',
      nextVisit: '10 Apr, 2025',
      status: 'Completed',
      avatar: '👩‍💼'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      age: 21,
      gender: 'Male',
      condition: 'Diabetes',
      prescription: 'RX-003',
      nextVisit: '10 Apr, 2025',
      status: 'Upcoming',
      avatar: '👨‍💼'
    },
    {
      id: '#0000',
      name: 'Anna Mavin',
      age: 18,
      gender: 'Male',
      condition: 'Coughing',
      prescription: 'RX-004',
      nextVisit: '10 Apr, 2025',
      status: 'Upcoming',
      avatar: '👤'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      age: 60,
      gender: 'Female',
      condition: 'Pain',
      prescription: 'RX-005',
      nextVisit: '10 Apr, 2025',
      status: 'Upcoming',
      avatar: '👩‍💼'
    }
  ];

  const statsCards: StatsCard[] = [
    {
      title: 'Today you have:',
      value: 6,
      subtitle: 'Patient in Lobby',
      color: 'bg-teal-600',
      icon: <User className="w-6 h-6" />
    },
    {
      title: 'Appointments for the day:',
      value: 12,
      subtitle: 'appointment Today',
      color: 'bg-green-600',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: 'Pending Prescriptions',
      value: 5,
      subtitle: 'to be Issued',
      color: 'bg-blue-50',
      icon: <FileText className="w-6 h-6 text-blue-600" />
    }
  ];

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionButton = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
            Reschedule
          </button>
        );
      case 'Completed':
        return (
          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
            Cancel
          </button>
        );
      case 'Upcoming':
        return (
          <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            Upcoming
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
            <div className="text-green-600 font-bold text-xl">📋</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Records</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Calendar Widget */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">November 2018</div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="text-center text-gray-400 py-1">{day}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`text-center py-1 ${i === 13 ? 'bg-teal-600 text-white rounded' : ''}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Time Widget */}
          <div className="bg-teal-50 rounded-lg p-4">
            <div className="text-sm text-gray-500">Today •DHRS</div>
            <div className="text-lg font-bold">Mumbai</div>
            <div className="text-2xl font-bold text-teal-600">{currentTime}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Chart Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Condition in Patients</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Bar dataKey="age" fill="#14b8a6" />
              <Bar dataKey="genderM" fill="#0891b2" />
              <Bar dataKey="genderF" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-600 rounded"></div>
              <span>Age</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-sky-600 rounded"></div>
              <span>Gender M</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Gender F</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">{card.title}</div>
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${card.color.includes('bg-') ? card.color : 'bg-teal-600'}`}>
                <div className="text-2xl font-bold text-white">{card.value}</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold">{card.subtitle}</div>
                {card.title.includes('Pending') && (
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +11%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Lab Reports Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Menu className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-sm text-gray-500 mb-1">Lab Reports review Today</div>
          <div className="text-2xl font-bold">13 Done</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">PID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Age/Gender</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Condition</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Prescription</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Next Visit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">{patient.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.age}/{patient.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.condition}</td>
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.nextVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getActionButton(patient.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;