import React, { useEffect, useState } from "react";
import { Spinner, Alert, Card, ListGroup, Col, Row } from "react-bootstrap";
import axios from "axios";
import { SERVER } from "../../constants/config";

function JobSkills({ job }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformSkillsData = (data) => {
    return Object.keys(data).map((key) => {
      const skill = data[key];
      const levelsArray = Object.keys(skill)
        .filter((k) => !isNaN(k))
        .map((levelKey) => ({
          level: levelKey,
          description: skill[levelKey].desc,
        }));
      return {
        id: key,
        name: skill.name,
        desc: skill.desc,
        note: skill.note,
        levels: levelsArray,
      };
    });
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log(job);
        const response = await axios.get(`${SERVER}/jobs/${job}`);
        const data = transformSkillsData(response.data);
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [job]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4 text-center">
      <Row>
        {skills.map((skill) => (
          <Col md={12} key={skill.id} className="mb-3">
            <Card>
              <Card.Body>
                <Row>
                  {/* First Column: Skill Name and Description */}
                  <Col md={6}>
                    <Card.Img
                      variant="top"
                      src={`${SERVER}/skills/${skill.id}.png`}
                      alt={skill.id}
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                    />
                    <Card.Title>{skill.name}</Card.Title>
                    <Card.Text>
                      <span>{skill.desc}</span>

                      <span>{skill.note}</span>
                    </Card.Text>
                  </Col>
                  {/* Second Column: Skill Levels */}
                  <Col md={6}>
                    <Card.Text>
                      <strong>Skill Levels:</strong>
                    </Card.Text>
                    <ListGroup variant="flush">
                      {skill.levels.map((level) => (
                        <ListGroup.Item key={level.level}>
                          <strong>Level {level.level}:</strong>{" "}
                          {level.description}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default JobSkills;
