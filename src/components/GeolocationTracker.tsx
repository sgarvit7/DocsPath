"use client";

import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export async function getCountryCodeFromCoords(lat: number, lng: number): Promise<string> {
  const res = await fetch(
  `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_KEY}`
);

  const data = await res.json();

  const countryCode = data?.results?.[0]?.components?.["ISO_3166-1_alpha-2"];
  return countryCode || "UNKNOWN";
}


export default function GeoTracker() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>("India");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      if (coords?.latitude && coords?.longitude) {
        const country = await getCountryCodeFromCoords(
          coords.latitude,
          coords.longitude
        );
        setCountryCode(country);
      }
    };

    fetchCountry();
  }, [coords]);

  return (
    <div className="p-4">
      {coords ? (
        <div>
          <p>📍 Country Code: {countryCode}</p>
        </div>
      ) : (
        <p>{error ? `❌ ${error}` : "Fetching location..."}</p>
      )}
    </div>
  );
}
