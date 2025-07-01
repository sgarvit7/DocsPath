"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import LifeAtDocspath from "@/components/publicPageComponents/CareersPage/LifeAtDocspath";
import { JobDescription } from "@prisma/client";
import axios from "axios";
import Link from "next/link";

interface FilterOption {
  value: string;
  label: string;
}


const departments: FilterOption[] = [
  { value: "all", label: "All job category" },
  { value: "design", label: "Design" },
  { value: "hr", label: "HR" },
  { value: "marketing", label: "Marketing & Communication" },
  { value: "product", label: "Product Management" },
  { value: "sales", label: "Sales" },
];

const jobTypes: FilterOption[] = [
  { value: "all", label: "All job type" },
  { value: "full-time", label: "Full Time" },
  { value: "intern", label: "Intern" },
];

const locations: FilterOption[] = [
  { value: "all", label: "All job location" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "Onsite" },
];

const CareersPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    department: "all",
    type: "all",
    location: "all",
  });

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => setFilters((prev) => ({ ...prev, [filterType]: value }));

  // Fetching Jobs
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs", {
          headers: { "Cache-Control": "no-store" },
        });

        if (mounted) {
          // Axios returns response data in res.data
          setJobs(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        if (mounted) {
          setError("Failed to load jobs. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.department === "all" ||
        job.department.toLowerCase().includes(filters.department)) &&
      (filters.type === "all" ||
        job.type.toLowerCase().includes(filters.type)) &&
      (filters.location === "all" ||
        job.location.toLowerCase().includes(filters.location))
    );
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell
          className={`w-6 h-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full cursor-pointer border border-black transition-colors duration-200 ${
            darkMode ? "bg-teal-600" : "bg-white"
          }`}
        >
          <div
            className={`absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Header Section */}
      <div
        className={`relative overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Background Pattern */}
        <Image
          src="/assets/bg-pattern.png"
          alt="bg"
          width={400}
          height={400}
          className="absolute -top-30 -left-30 z-0 opacity-50 rotate-180"
        />

        <div className="relative text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="col-span-2">
              <h1
                className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Careers at DocsPath
              </h1>
              <p
                className={`text-lg mb-8 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Join us in shaping the future of healthcare automation with
                AI-driven innovation
              </p>

              <div className="mb-12">
                <h2
                  className={`text-4xl font-bold mb-8 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Why DocsPath?
                </h2>
                <p
                  className={`mb-8 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  At DocsPath, we&apos;re empowering clinics and hospitals to
                  operate more efficiently using cutting-edge AI voice agents,
                  real-time diagnostics, and streamlined operations. We&apos;re
                  looking for passionate, purpose-driven individuals who are
                  excited to reimagine the healthcare experience with us.
                </p>
              </div>
            </div>

            <div className="col-span-1 relative w-full">
              <div className="w-full h-[200px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-[3/2] overflow-hidden mx-auto">
                <Image
                  src="/assets/prelogin-img/jobs.png"
                  alt="Jobs"
                  fill
                  className="object-cover w-full rounded-[4rem] border border-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div
        className={`py-16 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#086861] text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Remote-First Culture</h3>
              <p>
                Work from anywhere, collaborate digitally, and maintain
                work-life balance with our async-first communication model.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border-2 border-[#086861] transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-[rgba(8,104,97,0.06)] text-black"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Mission-Driven</h3>
              <p>
                Every task we take up is focused on helping doctors and
                improving patient outcomes through intelligent automation.
              </p>
            </div>

            <div className="bg-[#086861] text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Growth Opportunities</h3>
              <p>
                We support professional development, learning budgets,
                mentorship programs, and ownership across all roles.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border-2 border-[#086861] transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-[rgba(8,104,97,0.06)] text-black"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Diverse & Inclusive</h3>
              <p>
                We celebrate diverse perspectives and foster an inclusive
                culture where everyone has a voice and space to grow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Filters */}
      <div
        className={`py-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <label
                className={`block text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Filter by job type:
              </label>
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All jobs">All</option>
              </select>
              <select
                value={filters.department}
                onChange={(e) =>
                  handleFilterChange("department", e.target.value)
                }
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div
        className={`py-16 transition-colors duration-300 ${
          darkMode ? "bg-gray-700" : "bg-[#0868610F]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headings */}
          <div className="mb-12 text-[#00665F]">
            <h2
              className={`text-6xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? "text-teal-400" : "text-[#00665F]"
              }`}
            >
              Join our team
            </h2>
            <h3
              className={`text-4xl font-semibold transition-colors duration-300 ${
                darkMode ? "text-teal-300" : "text-[#00665F]"
              }`}
            >
              Current openings
            </h3>
          </div>

          {/* Loading / Error states */}
          {loading && (
            <p
              className={`text-center text-lg ${
                darkMode ? "text-teal-300" : "text-[#00665F]"
              }`}
            >
              Loading jobs…
            </p>
          )}
          {error && <p className="text-center text-red-500 text-lg">{error}</p>}

          {/* Job cards */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`border-2 border-[#086861] rounded-xl p-6 shadow-lg hover:shadow-md transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <div className="mb-2">
                      <h4 className="text-lg font-bold mb-2">{job.title}</h4>
                      <div
                        className={`space-y-1 text-sm transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <p>{job.department}</p>
                        <p>{job.type}</p>
                        <p>{job.location}</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Link href={`/careers/${job.id}`}>
                        <button className="text-red-500 font-medium text-sm hover:text-red-700 transition-colors">
                          More Details →
                        </button>
                      </Link>
                    </div>

                    <Link href={`/careers/${job.id}`}>
                      <button
                        className="w-2/3 flex justify-center mx-auto text-white font-semibold px-10 py-3
        rounded-full border border-white shadow-[0_4px_8px_rgba(0,0,0,0.2)]
        hover:bg-teal-700 transition-colors duration-300"
                        style={{ backgroundColor: "#086861" }}
                      >
                        Apply Now
                      </button>
                    </Link>
                  </div>
                ))}

                {/* Load More Button */}
                <div className="md:col-span-2 lg:col-span-3">
                  <button
                    className={`w-full text-2xl font-bold py-3 rounded-lg border-2 border-[#086861] shadow-lg transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800 text-teal-400 hover:bg-gray-700"
                        : "bg-white text-[#086861] hover:bg-gray-50"
                    }`}
                  >
                    Load More
                  </button>
                </div>
              </div>

              {/* Empty‑state message */}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p
                    className={`text-lg transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No jobs found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Life at Docspath */}
      <LifeAtDocspath darkMode={darkMode} />
    </div>
  );
};

export default CareersPage;
