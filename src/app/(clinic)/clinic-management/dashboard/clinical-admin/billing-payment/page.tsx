"use client";

import React, { useEffect, useState } from "react";
import { Search,  Info } from "lucide-react";
import { Payment } from "@/types/payment";
import axios from "axios";
import Calendar from "@/components/dashboard/Calendar";
import billImage from "@/app/assets/payment.png";
import Image from "next/image";
export default function BillingPaymentDashboard() {
  // const [currentDate, setCurrentDate] = useState(new Date(2018, 10, 14)); // November 14, 2018
  const [transactions, setTransactions] = useState<Payment[]>([]);

  // Sample data for the chart (monthly revenue)
  const chartData = [
    { month: "Jan", amount: 150, percentage: 50 },
    { month: "Feb", amount: 200, percentage: 66.67 },
    { month: "Feb", amount: 200, percentage: 66.67 },
    { month: "Mar", amount: 180, percentage: 60 },
    { month: "Apr", amount: 220, percentage: 73.33 },
    { month: "May", amount: 300, percentage: 100 },
    { month: "Jun", amount: 350, percentage: 116.67 },
    { month: "Jul", amount: 200, percentage: 66.67 },
    { month: "Aug", amount: 380, percentage: 126.67 },
    { month: "Sep", amount: 200, percentage: 66.67 },
    { month: "Oct", amount: 250, percentage: 83.33 },
    { month: "Nov", amount: 180, percentage: 60 },
    { month: "Dec", amount: 160, percentage: 53.33 },
  ];

  useEffect(() => {
    axios
      .get("/api/admin/payment") // Adjust the endpoint as needed
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);
  // Sample transaction data

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-[#A0E79F] border-[#A0E79F] shadow-md bg-white";
      case "failed":
        return "text-[#4400FF] border-[#4400FF] shadow-md bg-white";
      case "pending":
        return "text-[#FF00F6] border-[#FF00F6] shadow-md bg-white";
      case "cancel":
        return "text-[#FF0000] border-[#FF0000] shadow-md bg-white";
      case "refunded":
        return "text-[#EBA352] border-[#EBA352] shadow-md bg-white";
      default:
        return "text-[#4400FF] border-[#4400FF] shadow-md bg-white";
    }
  };

  const formatAmount = (amount: number = 0) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // const maxAmount = Math.max(...chartData.map((d) => d.amount));

  // Calendar component

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <Image src={billImage} alt="Lock Icon" width={100} height={100} />
            </div>
            <div className="w-[50vw] bg-gradient-to-r from-[#10CEC047] to-teal-50">
            <h1 className="text-3xl p-1 font-bold bg-gradient-to-r from-[#007065] to-[#28988D] bg-clip-text text-transparent">
              Billing & Payment
            </h1>
            </div>
          </div>
          <Calendar />
        </div>

        {/* Revenue Chart Section */}
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-sm border -mt-70 w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div className="text-3xl font-bold text-gray-900">$890.93</div>

            <div>
              <div className="text-sm text-teal-700 font-medium mt-1">
                Revenue
              </div>
              <div className="text-sm text-gray-500">Month</div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-72">
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
                      data.amount >= 300 ? "bg-[#086861]" : "bg-gray-200"
                    }`}
                    style={{
                      height: `${(data.percentage * 180) / 100}px`,
                      minHeight: "10px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4 w-1/4 -mt-20 justify-end float-right">
          <div className="flex-1 relative items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#086861] flex flex-col w-full justify-end p-1 rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#086861] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    PID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Amount
                  </th>
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
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Payment mode
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#EBF4F3]"
                    } border-3 border-[#086861]`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {transaction.avatar}
                        </div>
                        <span className="text-sm text-gray-900">
                          {transaction.payerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {transaction.paymentDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {transaction.receiveDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {transaction.transactionId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.paymentMode}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          transaction.status
                        )}`}
                      >
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
