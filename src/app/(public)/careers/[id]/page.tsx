"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobDescription } from "@/types/jobs";
import JobDescriptionPage from "@/components/publicPageComponents/CareersPage/JobDescriptionPage";

export default function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<JobDescription>(`/api/jobs/${params.id}`);
        setJob(response.data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
        setError("Failed to fetch job. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchJob();
  }, [params.id]);

  return (
    <JobDescriptionPage
      jobPosting={job}
      loading={loading}
      error={error}
    />
  );
}
