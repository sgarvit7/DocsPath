"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  AuthError,
} from "firebase/auth";
import EmailVerificationInput from "./Email";
import { auth } from "../../firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import PhoneInput from "./publicPageComponents/PhoneInput";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const isChecking = useState(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [role, setRole] = useState<"admin" | "clinic-owner">("admin");
  const [clinicName, setClinicName] = useState("");
  const [location, setLocation] = useState("");
  const [verifiedEmails, setVerifiedEmails] = useState<Set<string>>(new Set());
  const [phoneOk, setPhoneOk] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleField = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }, []);

  const handleEmailChange = (val: string) => handleField("email", val);
  const handlePhoneChange = (val: string) => handleField("phone", val);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedForm = window.sessionStorage.getItem("signupFormData");
    const savedVerified = window.sessionStorage.getItem("verifiedEmails");

    if (savedForm) setForm(JSON.parse(savedForm));
    if (savedVerified) setVerifiedEmails(new Set(JSON.parse(savedVerified)));

    const verified = searchParams?.get("verified");
    if (verified === "true") {
      const emailFromStorage =
        window.localStorage.getItem("emailForSignIn") ||
        JSON.parse(savedForm || "{}").email ||
        "";
      if (emailFromStorage) {
        setVerifiedEmails((prev) => {
          const next = new Set(prev).add(emailFromStorage);
          window.sessionStorage.setItem(
            "verifiedEmails",
            JSON.stringify([...next])
          );
          return next;
        });
        window.localStorage.removeItem("emailForSignIn");
        const url = new URL(window.location.href);
        url.searchParams.delete("verified");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("signupFormData", JSON.stringify(form));
    }
  }, [form]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "verifiedEmails",
        JSON.stringify([...verifiedEmails])
      );
    }
  }, [verifiedEmails]);

  const handleSubmit = async () => {
    setError("");
    const { name, email, phone, password, confirmPassword } = form;

    if (!name) return setError("Name is required");
    if (!email) return setError("Email is required");
    if (!phone) return setError("Phone number is required");
    if (!phoneOk) return setError("Please enter a valid phone number");
    if (!password) return setError("Password is required");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });

      window.sessionStorage.setItem(
        "userData",
        JSON.stringify({ name, email, phone })
      );
      window.sessionStorage.removeItem("signupFormData");
      window.sessionStorage.removeItem("verifiedEmails");
      window.localStorage.setItem("fullName", name);
      window.localStorage.setItem("emailAddress", email);
      window.localStorage.setItem("phoneNumber", phone);

      if (role == "admin") {
        router.push("/clinic-onboarding/Admin-boarding");
      }
      if (role == "clinic-owner") {
        router.push("/clinic-onboarding/self-onboarding");
      }
    } catch (err) {
      const authErr = err as AuthError;
      switch (authErr.code) {
        case "auth/email-already-in-use":
          setError("Email is already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    }
  };

  const validatePassword = (value: string) => {
    const errors: string[] = [];

    if (value.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("Password must include at least one capital letter");
    }
    if (!/[0-9]/.test(value)) {
      errors.push("Password must include at least one number");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
      errors.push("Password must include at least one special character");
    }

    return errors;
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      window.sessionStorage.setItem(
        "userData",
        JSON.stringify({ name: user.displayName, email: user.email })
      );
      window.sessionStorage.removeItem("signupFormData");
      window.sessionStorage.removeItem("verifiedEmails");
      router.push("/clinic-onboarding");
    } catch {
      setError("Google Sign‑in failed");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      window.sessionStorage.setItem(
        "userData",
        JSON.stringify({ name: user.displayName, email: user.email })
      );
      window.sessionStorage.removeItem("signupFormData");
      window.sessionStorage.removeItem("verifiedEmails");
      router.push("/clinic-onboarding");
    } catch {
      setError("Facebook Sign‑in failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-teal-50 px-4 py-6 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12  lg:py-21">
      {/* Floating button */}
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/clinic-onboarding/doctor-onboarding"
          className="bg-teal-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-xl text-xs sm:text-sm font-medium hover:bg-teal-700 transition"
        >
          Register as a Practitioner
        </a>
      </div>

      {/* Background images */}
      <Image
        src="/assets/bg-pattern.png"
        alt=""
        width={450}
        height={200}
        className="absolute -top-10 -left-10 z-0 opacity-40 rotate-180 hidden sm:block"
      />
      <Image
        src="/assets/lower-bg-pattern.png"
        alt=""
        width={450}
        height={200}
        className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl h-auto md:h-[77vh] bg-white rounded-lg z-50 shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left */}
        <div className="bg-teal-700 text-white w-full md:w-[380px] flex items-center justify-center p-6 md:p-0">
          <Image
            src="/assets/onboarding/docs/yo.jpg"
            alt="Docspath"
            width={400}
            height={200}
            className="rounded-lg md:rounded-none object-cover"
          />
        </div>

        {/* Right */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[80vh] md:max-h-screen flex-1">
          <div className="text-center mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-700">
              Create Account
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base">
              Sign Up & Begin Your Journey!
            </p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="relative flex gap-1">
              <div className="absolute left-3 top-3 sm:top-3.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                name="name"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Name"
                className="w-full p-2 sm:p-3 border z-999 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 lg:pl-8 text-sm sm:text-base"
              />
              
            </div>

            {/* Phone */}
            <PhoneInput
              value={form.phone}
              onChange={handlePhoneChange}
              onValidate={setPhoneOk}
            />

            {/* Email */}
            <EmailVerificationInput
              value={form.email}
              onVerified={(verifiedEmail) =>
                setForm((prev) => ({ ...prev, email: verifiedEmail }))
              }
              onChange={handleEmailChange}
            />

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  handleField("password", e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                placeholder="Password"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10 text-sm sm:text-base"
              />
              {Array.isArray(passwordError) && passwordError.length > 0 && (
                <div className="mt-1 space-y-1">
                  {passwordError.map((err, idx) => (
                    <p key={idx} className="text-red-500 text-xs sm:text-sm">
                      {err}
                    </p>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-2.5 sm:top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => handleField("confirmPassword", e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-2.5 sm:top-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role selection */}
            <label className="block text-xs sm:text-sm font-semibold mb-2">
              Sign Up As
            </label>
            <div className="flex mb-6 space-x-2">
              <button
                type="button"
                className={`flex-1 px-2 py-2 sm:px-4 rounded-md border text-xs sm:text-sm font-medium ${
                  role === "admin"
                    ? "bg-teal-700 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
              <button
                type="button"
                className={`flex-1 px-2 py-2 sm:px-4 rounded-md border text-xs sm:text-sm font-medium ${
                  role === "clinic-owner"
                    ? "bg-teal-700 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                onClick={() => setRole("clinic-owner")}
              >
                DocMin(Doctor + Admin)
              </button>
            </div>

            {/* Clinic name */}
            <div className="mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Clinic / Hospital Name
              </label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                placeholder="Sunrise Medical Center"
                className="w-full px-2 sm:px-4 py-2 border rounded-md text-xs sm:text-sm text-gray-700"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full px-2 sm:px-4 py-2 border rounded-md text-xs sm:text-sm text-gray-700"
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs sm:text-sm bg-red-50 p-2 rounded"
              >
                {error}
              </motion.div>
            )}

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition duration-300"
            >
              Sign Up
            </motion.button>

            {/* Sign in link */}
            <div className="text-center text-xs sm:text-sm">
              Already have an account?
              <a href="/sign-in" className="text-teal-800">
                {" "}
                Sign In
              </a>
            </div>

            {/* Social splitter */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm">
                or
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGoogleSignIn}
                className="p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.98 10.98 0 001 12c0 1.79.43 3.48 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.07.56 4.21 1.65l3.15-3.15C17.46 2.07 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFacebookSignIn}
                className="p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12a12 12 0 10-13.875 11.84v-8.39h-3.24V12h3.24V9.39c0-3.2 1.91-4.96 4.83-4.96 1.4 0 2.86.25 2.86.25v3.14h-1.61c-1.59 0-2.09.99-2.09 2v2.28h3.57l-.57 3.45h-3v8.39A12 12 0 0024 12z"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
