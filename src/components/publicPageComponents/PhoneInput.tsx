"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import countriesArray from "../../../public/assets/countries.json";
import { Country } from "@/types/country";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

export default function CountrySelect() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>("IN");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const storedCode = localStorage.getItem("countryCode");
        const sanitizedCode = storedCode && storedCode.replace(/"/g, '');

        if(sanitizedCode){
          setCountryCode(sanitizedCode);
        }
        setCountries(countriesArray);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load countries");
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    if (!phoneNumber) {
      setIsValid(null);
      setFormatted("");
      return;
    }

    const parsed = parsePhoneNumberFromString(phoneNumber, countryCode as CountryCode);

    if (parsed && parsed.isValid()) {
      setIsValid(true);
      setFormatted(parsed.formatInternational());
    } else {
      setIsValid(false);
      setFormatted("");
    }
  }, [phoneNumber, countryCode]);

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <Image
          src={`https://flagsapi.com/${countryCode}/flat/32.png`}
          alt={`${countryCode} flag`}
          width={24}
          height={24}
        />
        <select
          className="border border-gray-300 rounded px-1 bg-white ml-2 w-20"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.dial_code}
            </option>
          ))}
        </select>
        <input
          value={phoneNumber}
          id="phone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded px-2 bg-white ml-2 w-52"
          type="tel"
          placeholder="Enter phone number"
        />
      </div>

      <div className="text-sm mt-1 ml-1">
        {isValid === true && (
          <span className="text-green-600">✔ Valid: {formatted}</span>
        )}
        {isValid === false && (
          <span className="text-red-600">✖ Invalid phone number</span>
        )}
      </div>
    </div>
  );
}
