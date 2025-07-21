"use client";
import React, { useState } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const LifeAtDocspath: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const testimonials: Testimonial[] = [
    {
      quote:
        "We work with real doctors solving real problems — the impact is immediate and tangible. It feels good to build something meaningful.",
      author: "Neha",
      role: "AI Research Lead",
    },
    {
      quote:
        "Flexible hours, a kind team, and the freedom to take risks — this is the kind of workplace I always hoped for.",
      author: "Akash",
      role: "Frontend Engineer",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Email submitted:", email);
      alert("Thank you for signing up! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} min-h-screen`}>
      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold mb-16">Life at DocsPath</h1>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-[#0868610F]"
              }`}
            >
              <blockquote className="text-lg mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="pt-4">
                <p className="font-semibold">
                  — {testimonial.author}, {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg">
            Don&apos;t see a role that fits? We still want to hear from you.
          </p>
          <a
            href="mailto:careers@DocsPath.com"
            className="text-lg underline hover:text-teal-400 transition-colors duration-200"
          >
            careers@DocsPath.com
          </a>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/prelogin-img/medical.jpg')`,
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-teal-600 opacity-20"></div>
        <div className="absolute inset-0 bg-teal-600 opacity-60"></div>

        {/* Signup Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl font-bold mb-4">Never Miss an Opportunity</h2>
            <p className="text-xl mb-8">
              Sign up for job alerts and be the first to know about new openings.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-1/2 px-4 py-3 bg-[#005A51] cursor-pointer text-white font-semibold rounded-lg hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 transition disabled:opacity-50"
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeAtDocspath;
