import React from "react";
import { useParams } from "react-router-dom";
import { MAPLESTORY_JOBS } from "../constants/jobs";
import JobSkills from "../components/Jobs/JobSkills";

function JobPage() {
  const { job } = useParams();
  const normalizedJob = job.toLowerCase();

  const jobExists = (jobName) => {
    return Object.values(MAPLESTORY_JOBS).some((category) => {
      if (Array.isArray(category)) {
        return category.includes(jobName);
      }
      return Object.values(category).flat().includes(jobName);
    });
  };

  if (!jobExists(normalizedJob)) {
    return <h2>Job not found</h2>;
  }

  return (
    <div className="text-center z-0">
      <h1>{normalizedJob.toLocaleUpperCase()}</h1>
      <p>Information about the {normalizedJob} Skills.</p>
      <JobSkills job={job} />
    </div>
  );
}

export default JobPage;
