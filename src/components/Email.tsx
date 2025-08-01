"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { sendMagicLink } from "@/utils/emailMagicLink"

interface EmailVerificationInputProps {
  value?: string
  onVerified?: (email: string) => void
  onChange?: (val: string) => void
}

const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"]

export default function EmailVerificationInput({ value = "", onVerified, onChange }: EmailVerificationInputProps) {
  const [email, setEmail] = useState(value)
  const [error, setError] = useState("")
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)
  const [verifiedEmails, setVerifiedEmails] = useState<Set<string>>(new Set())
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const [showMethodChoice, setShowMethodChoice] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpStage, setOtpStage] = useState(false)

  const searchParams = useSearchParams()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const savedVerifiedEmails = window.sessionStorage.getItem("verifiedEmails")
    const verifiedFromStorage = window.localStorage.getItem("verified")

   const initialSet = savedVerifiedEmails
  ? new Set(JSON.parse(savedVerifiedEmails) as string[])
  : new Set<string>()


    if (verifiedFromStorage) {
      initialSet.add(verifiedFromStorage)
      setEmail(verifiedFromStorage)
      onVerified?.(verifiedFromStorage)
      onChange?.(verifiedFromStorage)
    }

    setVerifiedEmails(initialSet)

    const verified = searchParams?.get("verified")
    if (verified === "true") {
      const emailFromLocal = window.localStorage.getItem("emailForSignIn")
      const emailToVerify = emailFromLocal || email
      if (emailToVerify) {
        const newSet = new Set(initialSet)
        newSet.add(emailToVerify)
        setVerifiedEmails(newSet)
        setEmail(emailToVerify)
        onVerified?.(emailToVerify)
        onChange?.(emailToVerify)
        window.sessionStorage.setItem("verifiedEmails", JSON.stringify([...newSet]))
        window.localStorage.removeItem("emailForSignIn")
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete("verified")
        window.history.replaceState({}, "", newUrl.toString())
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("verifiedEmails", JSON.stringify([...verifiedEmails]))
    }
  }, [verifiedEmails])

  const isValidEmailFormat = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const verifyIfEmailValid = async (emailToCheck: string) => {
    if (!isValidEmailFormat(emailToCheck)) return
    try {
      setIsCheckingEmail(true)
      setError("")
      const res = await fetch(
        `https://apilayer.net/api/check?access_key=6229a94c41258965c750575f256dba92&email=${emailToCheck}&smtp=1&format=1`
      )
      const data = await res.json()
      setIsEmailValid(data.smtp_check === true)
      if (data.smtp_check !== true) setError("This email is not deliverable")
    } catch (err) {
      console.error("SMTP check failed:", err)
      setIsEmailValid(false)
      setError("Error verifying email")
    } finally {
      setIsCheckingEmail(false)
      setIsEmailValid(true) // fallback
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setEmail(input)
    onChange?.(input)
    setEmailVerificationSent(false)
    setError("")
    setIsEmailValid(false)

    const [local, domain] = input.split("@")
    if (input.includes("@") && local && domain !== undefined) {
      const filtered = commonDomains
        .filter(d => d.startsWith(domain.toLowerCase()))
        .map(d => `${local}@${d}`)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
    setHighlightedIndex(-1)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      verifyIfEmailValid(input)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setEmail(suggestion)
    onChange?.(suggestion)
    setShowSuggestions(false)
    verifyIfEmailValid(suggestion)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex(prev => (prev + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      const selected = suggestions[highlightedIndex]
      setEmail(selected)
      onChange?.(selected)
      setShowSuggestions(false)
      verifyIfEmailValid(selected)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleSendVerification = async () => {
    if (!email) return setError("Please enter your email")
    if (!isEmailValid) return setError("Please enter a valid deliverable email")
    if (verifiedEmails.has(email)) return setError("This email is already verified")
    setShowMethodChoice(true)
  }

  const handleMagicLink = async () => {
    setIsSendingVerification(true)
    setError("")
    const result = await sendMagicLink(email)
    if (result.success) {
      setEmailVerificationSent(true)
    } else {
      setError(result.error || "Failed to send verification email")
    }
    setIsSendingVerification(false)
    setShowMethodChoice(false)
  }

  const handleSendOtp = async () => {
    setIsSendingVerification(true)
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setOtpStage(true)
        setEmailVerificationSent(true)
      } else {
        setError(data.error || "Failed to send OTP")
      }
    } finally {
      setIsSendingVerification(false)
      setShowMethodChoice(false)
    }
  }

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    })
    const data = await res.json()
    if (res.ok && data.success) {
      setVerifiedEmails(prev => new Set([...prev, email]))
      onVerified?.(email)
      setOtpStage(false)
      setOtp("")
      window.localStorage.setItem("verified", email)
    } else {
      setError(data.message || "Invalid OTP")
    }
  }

  const isVerified = verifiedEmails.has(email) || !!window.localStorage.getItem("verified")

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-4" ref={wrapperRef}>
      <div className="flex w-full gap-3">
        <div className="relative w-full">
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your email"
            className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-3 ${
              isVerified
                ? "border-green-500 bg-green-50"
                : isEmailValid
                ? "border-blue-400"
                : "border-gray-300"
            }`}
            disabled={isVerified}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 top-full z-10 bg-white border border-gray-200 mt-1 rounded shadow-md w-full max-h-40 overflow-y-auto">
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
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleSendVerification}
          disabled={isSendingVerification || isVerified || !isEmailValid}
          className={`px-3 rounded-lg text-xs h-[37px] mt-1 font-medium transition duration-300 ${
            isVerified
              ? "bg-green-600 text-white cursor-default"
              : isSendingVerification || !isEmailValid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-700 text-white hover:bg-teal-800"
          }`}
        >
          {isVerified
            ? "Verified"
            : isSendingVerification
            ? "Sending..."
            : isCheckingEmail
            ? "Checking..."
            : "Verify"}
        </motion.button>
      </div>

      {showMethodChoice && (
        <div className="flex gap-3">
          <button onClick={handleMagicLink} className="flex-1 bg-purple-600 text-white p-2 rounded">
            Magic Link
          </button>
          <button onClick={handleSendOtp} className="flex-1 bg-green-600 text-white p-2 rounded">
            OTP
          </button>
        </div>
      )}

      {otpStage && (
        <div className="space-y-2">
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-2 border rounded"
          />
          <button onClick={handleVerifyOtp} className="w-full bg-green-700 text-white p-2 rounded">
            Verify OTP
          </button>
        </div>
      )}

      {emailVerificationSent && !isVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 text-sm bg-blue-50 p-3 rounded border border-blue-200"
        >
          📧 Verification email/OTP sent! Please check your inbox.
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm bg-red-50 p-2 rounded"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}
