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
// import { sendMagicLink } from "@/utils/emailMagicLink";
import Image from "next/image";
// import EmailInput from "./publicPageComponents/EmailInput";
import PhoneInput from "./publicPageComponents/PhoneInput";
// import { json } from "stream/consumers";
// import EmailOtpModal from "./EmailOtpVerifciationForm";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  /* ------------------------------------------------------------------
   * ░░ STATE
   * -----------------------------------------------------------------*/
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
  const isChecking = useState(false);
const [passwordError, setPasswordError] = useState<string[]>([]);
  const [role, setRole] = useState<"admin" | "clinic-owner">("admin");
  const [clinicName, setClinicName] = useState("");
  const [location, setLocation] = useState("");

  // const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  // const [isSendingVerification, setIsSendingVerification] = useState(false);
  // const isSendingVerification = false;
  const [verifiedEmails, setVerifiedEmails] = useState<Set<string>>(new Set());
  const [phoneOk, setPhoneOk] = useState<boolean>(true); // ← Phone validity status
  // const [showModal, setShowModal] = useState(false);

  // const [isEmailVerified, setIsEmailVerified] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  /* ------------------------------------------------------------------
   * ░░ FORM FIELD HELPERS
   * -----------------------------------------------------------------*/
  const handleField = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(""); // clear any existing error

    if (field === "email") {
      // Reset email verification UI when email changes
      // setEmailVerificationSent(false);
    }
  }, []);

  /* ------------------------------------------------------------------
   * ░░ EMAIL + PHONE CHANGE HANDLERS (for custom inputs)
   * -----------------------------------------------------------------*/
  const handleEmailChange = (val: string) => handleField("email", val);
  const handlePhoneChange = (val: string) => handleField("phone", val);

  /* ------------------------------------------------------------------
   * ░░ EFFECTS: RESTORE + SAVE
   * -----------------------------------------------------------------*/
  useEffect(() => {
    // ----- Restore saved state (including verified‑email list) -----
    if (typeof window === "undefined") return;

    const savedForm = window.sessionStorage.getItem("signupFormData");
    const savedVerified = window.sessionStorage.getItem("verifiedEmails");

    if (savedForm) setForm(JSON.parse(savedForm));
    if (savedVerified) setVerifiedEmails(new Set(JSON.parse(savedVerified)));

    /* When returning from magic‑link verification page ?verified=true */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Persist form + verified‑emails on every change */
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
    // if (!verifiedEmails.has(email))
    //   return setError("Please verify your email first");
    if (!phone) return setError("Phone number is required");
    if (!phoneOk) return setError("Please enter a valid phone number");
    if (!password) return setError("Password is required");
    if (password !== confirmPassword) return setError("Passwords do not match");

    console.log(form);

    // Phone uniqueness (server)
    // const exists = await checkPhoneExists(phone);
    // if (exists) return setError("This phone number is already registered");

    /* Firebase create */
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

      // router.push("/sign-up/verify-otp");
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

  /* ------------------------------------------------------------------
   * ░░ RENDER
   * -----------------------------------------------------------------*/
  // const isEmailVerified = verifiedEmails.has(form.email);

  return (
    <div className=" flex items-center justify-center bg-teal-50 px-4">
      
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/clinic-onboarding/doctor-onboarding"
          className="bg-teal-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium hover:bg-teal-700 transition"
        >
          Register as a Practitioner
        </a>
      </div>

      <Image
        src="/assets/bg-pattern.png"
        alt=""
        width={450}
        height={350}
        className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
      />
      <Image
        src="/assets/lower-bg-pattern.png"
        alt=""
        width={450}
        height={350}
        className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl h-[77vh] mt-15 mb-27 bg-white rounded-lg z-50 shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* ░ Left */}
        <div className="bg-teal-700 text-white h-full md:w-[380px] flex flex-col items-center justify-center text-center">
          <div className="">
            <div className="h-full">
              <Image
                src="/assets/onboarding/docs/yo.jpg"
                alt="Docspath"
                width={500}
                height={200}
              />
            </div>
          </div>
          
        </div>

        {/* ░ Right */}
        <div className="p-8 overflow-y-auto max-h-screen flex-1">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-teal-700">Create Account</h1>
            <p className="text-gray-500 text-sm">
              Sign Up & Begin Your Journey!
            </p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            {/* Phone (custom) */}
            <PhoneInput
              value={form.phone}
              onChange={handlePhoneChange}
              onValidate={setPhoneOk}
            />
            {/* Email (custom) */}
            <div>
            <EmailVerificationInput
              value={form.email}
              onVerified={(verifiedEmail) =>
                setForm((prev) => ({ ...prev, email: verifiedEmail }))
              }
              // onChange={(val) => setForm((prev) => ({ ...prev, email: val }))}
              onChange={handleEmailChange}

            />
            </div>


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
    className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
  />
  {Array.isArray(passwordError) && passwordError.length > 0 && (
    <div className="mt-1 space-y-1">
      {passwordError.map((err, idx) => (
        <p key={idx} className="text-red-500 text-xs">
          {err}
        </p>
      ))}
    </div>
  )}
  <button
    type="button"
    onClick={() => setShowPassword((p) => !p)}
    className="absolute right-3 top-3 text-gray-400"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

            {/* Confirm */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => handleField("confirmPassword", e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500 pl-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <label className="block text-sm font-semibold mb-2">
              Sign Up As
            </label>
            <div className="flex mb-6 space-x-2">
              <button
                type="button"
                className={`flex-1 px-4 py-2 rounded-md border text-sm font-medium ${
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
                className={`flex-1 px-4 py-2 rounded-md border text-sm font-medium ${
                  role === "clinic-owner"
                    ? "bg-teal-700 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                onClick={() => setRole("clinic-owner")}
              >
                Clinic Owner (Doctor + Admin)
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Clinic / Hospital Name
              </label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                placeholder="Sunrise Medical Center"
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 "
              />
            </div>

            {/* Any error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-2 rounded"
              >
                {error}
              </motion.div>
            )}

            {/* Sign‑up */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              // disabled={isChecking || !isEmailVerified || !phoneOk || (form.password !== form.confirmPassword)}
              className={`w-full ${
                isChecking || !phoneOk
                  ? "bg-teal-700 hover:bg-teal-800"
                  : "bg-teal-700 hover:bg-teal-800"
              } text-white py-3 rounded-lg font-medium transition duration-300`}
            >
              {isChecking ? "sign up" : "Sign Up"}
            </motion.button>

            {/* Sign‑in instead */}
            <div className="text-center">
              Already have an account?
              <a href="/sign-in" className="text-teal-800">
                {" "}
                Sign In
              </a>
            </div>
            {/* Social splitter */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGoogleSignIn}
                className="p-2 rounded-full"
              >
                {/* Google SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFacebookSignIn}
                className="p-2 rounded-full"
              >
                {/* Facebook SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.953 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.025 24 18.063 24 12.073z"
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
