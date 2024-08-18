const fs = require('fs');
const path = require('path');

let jobsData = {};
let jobTypeMapping = {}; // Added mapping

const loadJobs = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'jobs.json'), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        jobsData = JSON.parse(data);
        // Create reverse mapping from job names to codes
        jobTypeMapping = Object.entries(jobsData).reduce((acc, [code, jobs]) => {
          jobs.forEach(job => {
            acc[job] = code;
          });
          return acc;
        }, {});
        resolve();
      }
    });
  });
};

const getJobsByType = (type) => {
  const jobCode = jobTypeMapping[type];
  return jobCode || null;
};

module.exports = {
  loadJobs,
  getJobsByType
};
