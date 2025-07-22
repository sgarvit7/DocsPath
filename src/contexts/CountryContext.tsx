"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CountryContextType = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countryCode, setCountryCodeState] = useState("IN");

  useEffect(() => {
    const stored = localStorage.getItem("countryCode")?.replace(/"/g, "");
    if (stored) {
      setCountryCodeState(stored);
    }
  }, []);

  const setCountryCode = (code: string) => {
    setCountryCodeState(code);
    localStorage.setItem("countryCode", JSON.stringify(code));
  };

  return (
    <CountryContext.Provider value={{ countryCode, setCountryCode }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountry must be used within CountryProvider");
  return context;
};