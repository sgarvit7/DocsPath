"use client";
import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const OtpModal: React.FC<Props> = ({ onClose }) => {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const phone = typeof window !== "undefined" ? localStorage.getItem("userPhone") : "";

  const handleVerify = async () => {
    if (!phone) return alert("Phone number not found");

    setVerifying(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Phone verified!");
        onClose();
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl space-y-4">
        <h2 className="text-xl font-bold">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex gap-4 justify-end">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
