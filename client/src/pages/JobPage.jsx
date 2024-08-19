import React from "react";
import { useParams } from "react-router-dom";
import { MAPLESTORY_JOBS } from "../constants/jobs";
import JobSkills from "../components/Jobs/JobSkills";
import NotFoundPage from "./NotFoundPage";

function JobPage() {
  const { job } = useParams();
  const normalizedJob = job;

  const jobExists = (jobName) => {
    const normalizedJobName = jobName.toLowerCase();
    return Object.values(MAPLESTORY_JOBS).some((category) => {
      if (Array.isArray(category)) {
        return category.some((job) => job.toLowerCase() === normalizedJobName);
      }
      return Object.values(category).flat().some((job) => job.toLowerCase() === normalizedJobName);
    });
  };
  

  if (!jobExists(normalizedJob)) {
    return <NotFoundPage/>;
  }

  return (
    <div className="text-center z-0 mt-5 text-white">
      <h1 >{normalizedJob.toLocaleUpperCase()}</h1>
      <p>Information about the skills.</p>
      <JobSkills job={job} />
    </div>
  );
}

export default JobPage;
