"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import countriesArray from "../../app/assets/countries.json"; // Assuming you have a JSON file with country data
import { Country } from "@/types/country";

export default function CountrySelect() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>("IN");
  const [phoneNumber, setPhoneNumber] = useState<string>("1234567890");

  useEffect(() => {
    const getCountries = async () => {
      setCountries(countriesArray);
      setLoading(false);
    };

    getCountries();
  }, []);

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>{error}</div>;
  setError(error);

  return (
    <div className="flex flex-row items-center">
      <Image
        src={`https://flagsapi.com/${countryCode}/flat/32.png`}
        alt={`${countryCode} flag`}
        width={24}
        height={24}
      ></Image>
      <select
        className="border border-gray-300 rounded px-1 bg-white ml-2 w-15"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        {countries.map((countriesArray) => (
          <option key={countriesArray.code} value={countriesArray.code}>
            {countriesArray.dial_code}
          </option>
        ))}
      </select>
      <input
        value={phoneNumber}
        id="phone"
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 rounded m-0 px-1 bg-white m-2 w-30"
      ></input>
    </div>
  );
}
