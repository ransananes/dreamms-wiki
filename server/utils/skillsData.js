const fs = require("fs");
const path = require("path");

let skillsData = {};

const loadSkills = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "../data/data.json"),
      "utf8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            skillsData = JSON.parse(data);
            resolve(); // Resolve the promise after successfully parsing the data
          } catch (parseError) {
            reject(parseError); // Reject the promise if parsing fails
          }
        }
      }
    );
  });
};

const getSkillsByID = (ID) => {
  const skills = skillsData[ID];
  return skills || []; // Return an empty array if no skills are found for the given ID
};

module.exports = {
  loadSkills,
  getSkillsByID,
};
