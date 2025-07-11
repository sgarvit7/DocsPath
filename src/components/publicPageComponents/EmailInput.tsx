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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);

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
    </div>
  );
};

export default EmailInput;
