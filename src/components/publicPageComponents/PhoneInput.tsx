"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
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

  const { countryCode, setCountryCode } = useCountry();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("countryCode")?.replace(/"/g, "");
      if (stored) setCountryCode(stored as Country["code"]);

      setCountries(countriesArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load countries");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "countryCode" && e.newValue) {
        setCountryCode(e.newValue.replace(/"/g, "") as Country["code"]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("countryCode", JSON.stringify(countryCode));
  }, [countryCode]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange(raw);
    setIsValid(null); // reset validity when input changes
  };

  const handleCountryChange = (newCode: Country["code"]) => {
    setCountryCode(newCode);
    setIsValid(null); // reset validity when country changes
  };

  const handleVerify = async () => {
    if (!value) return;
    setVerifying(true);
    setIsValid(null);
    try {
      const response = await fetch(
  `https://apilayer.net/api/validate?access_key=7862bb87c187e6cef6c118efd1453885&number=${encodeURIComponent(value)}&country_code=${countryCode}&format=1`
);
;

      const data = await response.json();
        console.log(data)
      const valid = data.valid === true;
      setIsValid(valid);
      onValidate?.(valid);
    } catch (err) {
      console.error("Verification error:", err);
      setIsValid(false);
      onValidate?.(false);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div>Loading countries…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex ">
      <div className="flex w-9/10 items-center border border-gray-300 rounded-lg px-2 py-3">
        <Image
          src={`https://flagsapi.com/${countryCode}/flat/32.png`}
          alt={`${countryCode} flag`}
          width={24}
          height={24}
        />

        <select
          className="rounded-lg  bg-white ml-2 w-auto"
          value={countryCode}
          onChange={(e) =>
            handleCountryChange(e.target.value as Country["code"])
          }
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.dial_code}
            </option>
          ))}
        </select>

        <input
          className="flex-1 rounded-lg px-2 bg-white ml-2"
          type="tel"
          placeholder="Enter phone number"
          value={value}
          onChange={handleInput}
        />
 </div>
        <button
          type="button"
          onClick={handleVerify}
          disabled={verifying || !value}
          className="ml-2 px-4  text-sm bg-teal-600 hover:bg-teal-700 text-white rounded"
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
     </div>

      <div className="text-sm mt-1 ml-1">
        {isValid === true && (
          <span className="text-green-600">✔ Valid number</span>
        )}
        {isValid === false && (
          <span className="text-red-600">✖ Invalid number</span>
        )}
      </div>
    </div>
  );
}
