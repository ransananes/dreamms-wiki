import React, { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
  Card,
  ListGroup,
  Col,
  Row,
  Accordion,
} from "react-bootstrap";
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
            <Card style={{ backgroundColor: "#1B1B1B" }}>
              <Card.Body>
                <Row>
                  <Col md={6} className="text-white">
                    <Card.Img
                      variant="top"
                      src={`${SERVER}/skills/${skill.id}.png`}
                      alt={skill.id}
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Title>{skill.name}</Card.Title>
                    <Card.Text>
                      <span>{skill.desc}</span>

                      <span className="d-block" style={{ color: "red" }}>
                        {skill.note}
                      </span>
                    </Card.Text>
                  </Col>
                  {/* Second Column: Skill Levels */}
                  <Col md={6} className="text-white mt-3">
                    <Card.Text>
                      <strong  style={{marginRight:"1rem"}}>Skill Levels:</strong>
                    </Card.Text>
                    <Accordion>
                      <Accordion.Item eventKey={skill.id}>
                        <Accordion.Header className="custom-header">
                          <div className="header-text">
                            Skill Levels 
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup variant="flush">
                            {skill.levels.map((level) => (
                              <ListGroup.Item key={level.level}>
                                <strong>Level {level.level}:</strong>{" "}
                                {level.description}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
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
