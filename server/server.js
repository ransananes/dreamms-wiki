const express = require("express");
const cors = require("cors"); // Import the cors package
const path = require("path");
const app = express();
const port = 5000;

// Import the jobsData and skillsData modules
const { loadJobs, getJobsByType } = require("./utils/jobsData");
const { loadSkills, getSkillsByID } = require("./utils/skillsData");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/skills", express.static(path.join(__dirname, "/public/icons")));

// Load jobs and skills data at server startup
Promise.all([loadJobs(), loadSkills()])
  .then(() => {
    console.log("Jobs and skills data loaded successfully");

    // Endpoint to get jobs by type
    app.get("/jobs/:type", (req, res) => {
      const jobType = req.params.type;
      const filteredJobs = getJobsByType(jobType);
      const skills = getSkillsByID(filteredJobs) || null;
      res.json(skills);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error loading data:", err);
  });
