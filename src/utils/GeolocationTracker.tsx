"use client";

import { useEffect } from "react";
import { useCountry } from "@/contexts/CountryContext";

export async function getCountryCodeFromIP(): Promise<string> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Failed to fetch IP geolocation data");

    const data = await res.json();
    return data?.country || "UNKNOWN";
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return "UNKNOWN";
  }
}

export default function GeoLocationTracker() {
  const { setCountryCode } = useCountry();

  useEffect(() => {
    const fetchCountryFromIP = async () => {
      const country = await getCountryCodeFromIP();
      setCountryCode(country);
      localStorage.setItem("countryCode", JSON.stringify(country));
      console.log("Country code from IP (VPN-based):", country);
    };

    fetchCountryFromIP();
  }, []);

  return null;
}