"use client";

import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import countriesArray from "../../../public/assets/countries.json";
import { Country } from "@/types/country";
import { useCountry } from "@/contexts/CountryContext";


type PhoneInputProps = {
  value: string;
  onChange: (val: string) => void;
  onValidate?: (isValid: boolean) => void;
};

export default function CountrySelect({
  value,
  onChange,
  onValidate,
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
 

  const { countryCode, setCountryCode } = useCountry();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("countryCode")?.replace(/"/g, "");
      if (stored) setCountryCode(stored as Country["code"]);
       console.log(showOtpModal)
      setCountries(countriesArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load countries");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("countryCode", JSON.stringify(countryCode));
  }, [countryCode]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange(raw);
    setIsValid(null);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      verifyPhoneNumber(raw);
    }, 1000);
  };

  const handleCountryChange = (newCode: Country["code"]) => {
    setCountryCode(newCode);
    setIsValid(null);
    if (value) {
      verifyPhoneNumber(value);
    }
  };

  const verifyPhoneNumber = async (phone: string) => {
    if (!phone) return;
    setVerifying(true);
    setIsValid(null);
    try {
      const response = await fetch(
        `https://apilayer.net/api/validate?access_key=961503d32a1556e3bfc02ff12055aee4&number=${encodeURIComponent(
          phone
        )}&country_code=${countryCode}&format=1`
      );

      const data = await response.json();
      console.log(data);
      if (data.line_type === "mobile") {
        const valid = data.valid === true;
        setIsValid(valid);
        onValidate?.(valid);

        if (valid) {
          localStorage.setItem("phoneNumber", phone);
          localStorage.setItem("countryCode", countryCode);
        } else {
          // alert("The phone number is invalid. Please check and try again.");
        }
      } else {
        setIsValid(false);
        onValidate?.(false);
        // alert("The phone number is invalid. Please check and try again.");/\
      }
    } catch (err) {
      console.error("Verification error:", err);
      setIsValid(false);
      onValidate?.(false);
      alert("Something went wrong while verifying. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSendOtp = async () => {
    const storedPhone = localStorage.getItem("phoneNumber");
    const storedCode = localStorage.getItem("countryCode");
    if (!storedPhone || !storedCode) {
      console.error("Missing phone or country code in localStorage");
      return;
    }

    try {
      setSendingOtp(true);
      const res = await fetch("/api/Otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: storedPhone,
          countryCode: storedCode,
        }),
      });

      const text = await res.text(); // parse manually for debug
      try {
        const data = JSON.parse(text);
        console.log("OTP Response:", data);
        setShowOtpModal(true);
      } catch (e) {
        console.error("Failed to parse JSON:", text);
        console.log(e)
      }
    } catch (err) {
      console.error("OTP send error:", err);
    } finally {
      setSendingOtp(false);
    }
  };

  if (loading) return <div>Loading countries…</div>;
  if (error) return <div>{error}</div>;

 return (
  <div className="w-full">
    <div className="flex flex-col gap-1 ">
      <div className="flex flex-col gap-1">
  <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">

  {/* Phone Input Group */}
  <div className="flex flex-1 items-center border border-gray-300  rounded-lg px-2 py-2 gap-2">
    <Image
      src={`https://flagsapi.com/${countryCode}/flat/32.png`}
      alt={`${countryCode} flag`}
      width={24}
      height={24}
    />

    <select
      className="rounded-lg bg-white w-20"
      value={countryCode}
      onChange={(e) => handleCountryChange(e.target.value as Country["code"])}
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.dial_code}
        </option>
      ))}
    </select>

    <input
      className="flex-1 rounded-lg  px-2 bg-white"
      type="tel"
      placeholder="Mobile No"
      value={value}
      onChange={handleInput}
    />
  </div>

  {/* Send OTP Button */}
  <button
    onClick={handleSendOtp}
    className={`px-2 py-[6px] cursor-pointer text-xs mt-1 rounded h-[35px] self-stretch ${
      isValid
        ? "bg-teal-600 hover:bg-teal-900 text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    disabled={!isValid || sendingOtp}
  >
    {sendingOtp ? "Sending..." : "Send OTP"}
  </button>
</div>
</div>
      <div className="text-sm mt-1 ml-1">
        {verifying && <span className="text-gray-700">Verifying...</span>}
        {isValid === true && <span className="text-green-600">✔ Valid number</span>}
        {isValid === false && <span className="text-red-600">✖ Invalid number</span>}
      </div>
    </div>

    {/* {showOtpModal && <OtpModal onClose={() => setShowOtpModal(false)} />} */}
  </div>
);


}
