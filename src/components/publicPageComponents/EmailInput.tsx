"use client";

import React, { useState, useRef, useEffect } from "react";

interface EmailInputProps {
  value: string;
  onChange: (email: string) => void;
  placeholder?: string;
}

const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, placeholder = "Enter your email" }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
    setIsVerified(null); // Reset verification state on change

    const [local, domain] = input.split("@");

    if (input.includes("@") && local && domain !== undefined) {
      const filtered = commonDomains
        .filter((d) => d.startsWith(domain.toLowerCase()))
        .map((d) => `${local}@${d}`);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }

    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      onChange(suggestions[highlightedIndex]);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const verifyEmailExists = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `https://apilayer.net/api/check?access_key=664cb6730045f4f9daed600e8e0a9725&email=${email}&smtp=1&format=1`
      );
      const data = await res.json();
      return data.smtp_check === true;
    } catch (error) {
      console.error("Email verification failed:", error);
      return false;
    }
  };

  const handleVerifyClick = async () => {
    if (!isValidEmail(value)) {
      alert("Please enter a valid email address first.");
      return;
    }

    const exists = await verifyEmailExists(value);
    if (!exists) {
      // alert("Email doesn't exist. Please re-enter.");
      onChange("");
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <input
          type="email"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 pl-10 py-3 border rounded-lg text-base transition-all focus:outline-none focus:ring-2 ${
            isValidEmail(value)
              ? "border-green-500 focus:ring-green-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        <button
          type="button"
          onClick={handleVerifyClick}
          className="px-3 py-2 text-sm bg-[#1F6E66] text-white rounded hover:bg-[#15544f] transition"
        >
          Verify
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 mt-1 rounded shadow-md w-full max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                idx === highlightedIndex ? "bg-blue-100" : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {value && !isValidEmail(value) && (
        <p className="text-red-500 text-sm mt-1">Invalid email format</p>
      )}

      {isVerified === true && (
        <p className="text-green-600 text-sm mt-1">Email verified successfully ✅</p>
      )}
      {isVerified === false && (
        <p className="text-red-500 text-sm mt-1">Email not valid ❌</p>
      )}
    </div>
  );
};

export default EmailInput;
