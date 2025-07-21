"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import countriesArray from "../../../public/assets/countries.json";
import { Country } from "@/types/country";
// import { useCountry } from "@/contexts/CountryContext";

const NavbarCountrySelect: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
//   const { countryCode, setCountryCode } = useCountry();

  useEffect(() => {
    // const storedCode = localStorage.getItem("countryCode");
    // const initialCode = storedCode ? storedCode.replace(/"/g, "") : "IN";
    // setCountryCode(initialCode);
    setCountries(countriesArray);
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    // setCountryCode(newCode);
    localStorage.setItem("countryCode", newCode);
  };

//   if (!countryCode) return null; // Or show a loading spinner

  return (
    <div className="flex  items-center space-x-2">
      <Image
        src="/assets/prelogin-img/home/india.png"
        alt="flag"
        width={40}
        height={30}
    
      />
      <select
        value={"India"}
        onChange={handleSelectChange}
        className="bg-white border w-20 border-gray-300 rounded px-2 py-1 text-sm"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NavbarCountrySelect;