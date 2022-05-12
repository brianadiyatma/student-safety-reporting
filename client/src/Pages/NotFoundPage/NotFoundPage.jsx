import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 3 }}>
        404 - Not Found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back
      </Button>
    </Container>
  );
};

export default NotFoundPage;
