import React from "react";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container
      className="text-center mt-5 w-50 p-4"
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ color: "#333", fontSize: "14px" }}>
        Not affiliated with DREAMMS. There might be bugs; feel free to report
        them on{" "}
        <a
          href="https://discord.com/users/ranisawesome"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Discord: ranisawesome
        </a>
        <br/>
        
      </p>
      <footer style={{ color: "#333", fontSize: "14px" }} >buff shadowers pls</footer>
    </Container>
  );
}

export default HomePage;
