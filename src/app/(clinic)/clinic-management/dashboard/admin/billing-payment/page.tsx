'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export default function BillingPaymentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2018, 10, 14)); // November 14, 2018

  const [status, setStatus] = useState<string>("paid");
  // Sample data for the chart (monthly revenue)
  const chartData = [
    { month: 'Jan', amount: 150 },
    { month: 'Feb', amount: 200 },
    { month: 'Mar', amount: 180 },
    { month: 'Apr', amount: 220 },
    { month: 'May', amount: 300 },
    { month: 'Jun', amount: 280 },
    { month: 'Jul', amount: 350 },
    { month: 'Aug', amount: 380 },
    { month: 'Sep', amount: 200 },
    { month: 'Oct', amount: 250 },
    { month: 'Nov', amount: 180 },
    { month: 'Dec', amount: 160 }
  ];

  // Sample transaction data
  const transactions = [
    {
      id: '#0000',
      name: 'Ankit Wind',
      avatar: 'AW',
      amount: 150,
      paymentDate: '10-Apr-2022/13:00pm',
      receiveDate: '10-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Online',
      status: 'Failed'
    },
    {
      id: '#0000',
      name: 'ByetWind',
      avatar: 'BW',
      amount: 150,
      paymentDate: '8-Apr-2022/13:00pm',
      receiveDate: '8-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Cash',
      status: 'Paid'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      avatar: 'AW',
      amount: 122222,
      paymentDate: '10-Apr-2022/13:00pm',
      receiveDate: '10-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Online',
      status: 'Refunded'
    },
    {
      id: '#0000',
      name: 'Anna Mayin',
      avatar: 'AM',
      amount: 150,
      paymentDate: '8-Apr-2022/13:00pm',
      receiveDate: '8-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Cash',
      status: 'Cancel'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      avatar: 'AW',
      amount: 150,
      paymentDate: '10-Apr-2022/13:00pm',
      receiveDate: '10-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Online',
      status: 'Failed'
    },
    {
      id: '#0000',
      name: 'Anna Mayin',
      avatar: 'AM',
      amount: 150000,
      paymentDate: '8-Apr-2022/13:00pm',
      receiveDate: '8-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Cash',
      status: 'Pending'
    },
    {
      id: '#0000',
      name: 'Ankit Wind',
      avatar: 'AW',
      amount: 150,
      paymentDate: '10-Apr-2022/13:00pm',
      receiveDate: '10-Apr-2022/13:00pm',
      transactionId: '*13110',
      paymentMode: 'Online',
      status: 'Cancel'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancel':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatAmount = (amount: number = 0) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const maxAmount = Math.max(...chartData.map(d => d.amount));

  // Calendar component
  const Calendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date(2018, 10, 14); // November 14, 2018
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{monthNames[month]} {year}</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
            <div key={day} className="text-xs text-gray-500 text-center p-1">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === month;
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <button
                key={index}
                className={`p-2 text-sm text-center rounded ${
                  isCurrentMonth 
                    ? isToday 
                      ? 'bg-teal-600 text-white' 
                      : 'hover:bg-gray-100 text-gray-900'
                    : 'text-gray-300'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <div className="text-xs text-teal-600">Current Time</div>
          <div className="text-lg font-semibold text-teal-800">Mumbai</div>
          <div className="text-2xl font-bold text-teal-800">12:54 <span className="text-sm">PM</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-6 bg-orange-500 rounded"></div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Billing & Payment</h1>
            </div>
          </div>
          <Calendar />
        </div>

        {/* Revenue Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-3xl font-bold text-gray-900">$890.93</div>
              <div className="text-sm text-gray-500 mt-1">Revenue</div>
              <div className="text-sm text-gray-500">Month</div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="relative h-64">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>MAX</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>
            
            <div className="ml-12 h-full flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full rounded-t ${
                      data.month === 'Jul' || data.month === 'Aug' ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                    style={{
                      height: `${(data.amount / maxAmount) * 100}%`,
                      minHeight: '8px'
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">PID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Payment Date
                      <Info className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <div className="flex items-center gap-1">
                      Receive Date
                      <Info className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Payment mode</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {transaction.avatar}
                        </div>
                        <span className="text-sm text-gray-900">{transaction.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatAmount(transaction.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{transaction.paymentDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{transaction.receiveDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{transaction.transactionId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.paymentMode}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}