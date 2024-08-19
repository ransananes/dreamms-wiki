import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import notFoundGif from '../assets/nf.gif'; 

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container className="text-center mt-1 p-3" style={{ backgroundColor:"white"}}>
      <Row>
        <Col>
          <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>404</h1>
          <Image src={notFoundGif} alt="Not Found" fluid style={{ maxWidth: '200px', marginBottom: '30px' }} />
          <h2 style={{ marginBottom: '30px' }}>Page Not Found</h2>
          <Button variant="warning" onClick={handleGoBack}>
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
