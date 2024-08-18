import React, { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/sb.png";
import { MAPLESTORY_JOBS } from "../../constants/jobs";

function Searchbar({ setError }) {
  const { register, handleSubmit, reset } = useForm();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  const allJobs = [
    ...MAPLESTORY_JOBS.BEGINNER,
    ...MAPLESTORY_JOBS.WARRIOR.PRIMARY,
    ...MAPLESTORY_JOBS.WARRIOR.SECONDARY,
    ...MAPLESTORY_JOBS.WARRIOR.TERTIARY,
    ...MAPLESTORY_JOBS.WARRIOR.QUATERNARY,
    ...MAPLESTORY_JOBS.MAGICIAN.PRIMARY,
    ...MAPLESTORY_JOBS.MAGICIAN.SECONDARY,
    ...MAPLESTORY_JOBS.MAGICIAN.TERTIARY,
    ...MAPLESTORY_JOBS.MAGICIAN.QUATERNARY,
    ...MAPLESTORY_JOBS.BOWMAN.PRIMARY,
    ...MAPLESTORY_JOBS.BOWMAN.SECONDARY,
    ...MAPLESTORY_JOBS.BOWMAN.TERTIARY,
    ...MAPLESTORY_JOBS.BOWMAN.QUATERNARY,
    ...MAPLESTORY_JOBS.THIEF.PRIMARY,
    ...MAPLESTORY_JOBS.THIEF.SECONDARY,
    ...MAPLESTORY_JOBS.THIEF.TERTIARY,
    ...MAPLESTORY_JOBS.THIEF.QUATERNARY,
    ...MAPLESTORY_JOBS.PIRATE.PRIMARY,
    ...MAPLESTORY_JOBS.PIRATE.SECONDARY,
    ...MAPLESTORY_JOBS.PIRATE.TERTIARY,
    ...MAPLESTORY_JOBS.PIRATE.QUATERNARY,
  ];

  const onSubmit = (data) => {
    const searchTerm = data.search.trim().toLowerCase();
    if (searchTerm) {
      navigate(`/${searchTerm}`);
    } else {
      setError("search", {
        type: "manual",
        message: "Please enter a valid search term",
      });
    }
  };

  const onInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    if (value) {
      const matches = allJobs.filter((job) =>
        job.toLowerCase().includes(value)
      );
      setFilteredJobs(matches.slice(0, 5));
    } else {
      setFilteredJobs([]);
    }
  };

  const onSelectJob = (job) => {
    navigate(`/${job.toLowerCase()}`);
    reset();
    setFilteredJobs([]);
  };

  return (
    <Form
      className="w-100 d-flex justify-content-center"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group>
        <img className="mx-auto" src={logo} width={100} alt="logo" />
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search Any Class"
            maxLength="30"
            autoComplete="search"
            {...register("search", {
              required: "This field is required",
              maxLength: {
                value: 30,
                message: "Maximum length is 30 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9]{3,30}$/,
                message: "Search must contain 3 letters or more",
              },
              onChange: onInputChange,
            })}
          />
        </InputGroup>
        {filteredJobs.length > 0 && (
          <ListGroup className="position-absolute z-1">
            {filteredJobs.map((job, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => onSelectJob(job)}
                action
              >
                {job}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>
    </Form>
  );
}

export default Searchbar;
