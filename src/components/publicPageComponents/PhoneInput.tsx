"use client";

import React, { useEffect, useState } from "react";
import { countries as countriesArray, Country } from "@/lib/countries";
import Image from "next/image";

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

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-row items-center">
      <Image
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt={`${countryCode} flag`}
        width={32}
        height={32}
      ></Image>
      <select
        className="border border-gray-300 rounded p-2 bg-white ml-2 w-30"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        {countries.map((countries) => (
          <option key={countries.dial_code} value={countries.code}>
            ({countries.dial_code}) {countries.name} 
          </option>
        ))}
      </select>
      <input
        value={phoneNumber}
        id="phone"
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 rounded m-0 p-2 bg-white m-4 w-30"
      ></input>
    </div>
  );
}
