"use client";

import { useState, FormEvent } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../../../firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setEmail } from "@/store/userSlice";
import { motion } from "framer-motion";
// import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/components/publicPageComponents/EmailInput";
import PhoneInput from "@/components/publicPageComponents/PhoneInput";

interface FormState {
  name: string;
  email: string;
  phone: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function SignInForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [role, setRole] = useState<"admin" | "Self" | "doctor">(
    "admin"
  );
  const [error, setError] = useState("");
  const loading = false
  const router = useRouter();
  // const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const validateField = (field: keyof FormState, value: string) => {
    let errorMsg = "";
    if (field === "name" && !value.trim()) {
      errorMsg = "Name is required";
    } else if (field === "email") {
      if (!value.trim()) {
        errorMsg = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMsg = "Invalid email format";
      }
    } else if (field === "phone") {
      if (!value.trim()) {
        errorMsg = "Phone is required";
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = "Enter a valid 10-digit number";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return errorMsg === "";
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    Object.values(errors).every((e) => !e);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid =
      validateField("name", form.name) &&
      validateField("email", form.email) &&
      validateField("phone", form.phone);
    if (!isValid) return;

    console.log("Submit:", form);
    // ...submit logic here
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(returnUrl ?? "/");
    } catch (err) {
      setError("Google sign-in failed");
      console.log(err)
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(returnUrl ?? "/");
    } catch (err) {
      console.log(err)
      setError("Facebook sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4 p-4">
         <Image
                src="/assets/bg-pattern.png"
                alt=""
                width={500}
                height={350}
                className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
              />
              <Image
                src="/assets/lower-bg-pattern.png"
                alt=""
                width={500}
                height={350}
                className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
              />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl overflow-hidden h-[72vh] z-50 rounded-3xl shadow-xl bg-white flex flex-col md:flex-row"
      >
        <div className="hidden md:flex md:w-2/5 bg-teal-700 text-white h-full  justify-center items-center">
          <Image
            src="/assets/prelogin-img/free-trial.jpeg"
            alt="Docspath"
            width={800}
            height={200}
          />
          {/* <h2 className="text-3xl font-bold mt-6">Hello!</h2>
          <p className="text-white/80 text-center mt-2">
            Enter your personal details and start your journey with us.
          </p> */}
        </div>
{/* right section */}
        <div className="flex-1 overflow-y-auto max-h-screen p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800">
              Start Free Trial
            </h2>
            <p className="text-gray-500 text-center mt-2">No credit card required. Join today and transform your clinic experience.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5 mb-6">
              {/* Full Name */}
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name*"
                  value={form.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <EmailInput
                  value={form.email}
                  onChange={(val: string) => handleFieldChange("email", val)}
                />
                {/* {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )} */}
              </div>

              {/* Phone */}
              <div>
                <PhoneInput
                  value={form.phone}
                  onChange={(val: string) => handleFieldChange("phone", val)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Sign Up As
                </label>
                <div className="flex  space-x-2">
                  {(["admin", "doctor", "Self"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      className={`flex-1 px-2 py-2 cursor-pointer rounded-md border text-sm font-medium ${
                        role === r
                          ? "bg-teal-700 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                      onClick={() => setRole(r)}
                    >
                      {r === "Self"
                        ? "Self"
                        : r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                isFormValid && !loading
                  ? "bg-teal-700 text-white cursor-pointer"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!isFormValid || loading}
            >
              {loading ? "processing" : "Start Free Trail"}
            </motion.button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-md text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleGoogleSignIn}
              className="p-2 rounded-full border hover:bg-gray-50"
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
              onClick={handleFacebookSignIn}
              className="p-2 rounded-full border hover:bg-gray-50"
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
                  d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
