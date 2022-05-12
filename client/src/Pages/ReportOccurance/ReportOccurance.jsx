import {
  Alert,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportOccurance = () => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    accident: "",
    time: new Date(),
    occurance: "",
    aircraftType: "",
    personOnBoard: "",
    cause: "",
    details: "",
    callsign: "",
  });
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post("/api/user/submit-report", input, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      .then((res) => {
        setLoading(false);
        setStatus("success");
        setMessage(res.data.message);
        setInput({
          accident: "",
          time: new Date(),
          occurance: "",
          aircraftType: "",
          personOnBoard: "",
          cause: "",
          details: "",
          callsign: "",
        });
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setMessage(err.response.data.message);
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (time) => {
    setTime(time);
    setInput({
      ...input,
      time: time,
    });
  };
  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontSize: 40 }}>
            Report Occurance
          </Typography>
          <Typography variant="subtitle1">
            Report occurance of an accident
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ marginTop: 4 }}>
        {status && (
          <Alert severity={`${status === "success" ? "success" : "error"}`}>
            {message}
          </Alert>
        )}
        <Box
          sx={{
            px: 12,
            py: 4,
          }}
        >
          <TextField
            id="Accident"
            label="Accident/Incident"
            value={input.accident}
            variant="outlined"
            name="accident"
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: 4 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "45%" }}>
              <TextField
                value={input.callsign}
                id="Callsign"
                label="Callsign"
                variant="outlined"
                name="callsign"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 4 }}
              />
              <DateTimePicker
                renderInput={(props) => (
                  <TextField {...props} fullWidth sx={{ marginBottom: 4 }} />
                )}
                label="DateTimePicker"
                onChange={handleDateChange}
                value={time}
              />
              <TextField
                value={input.occurance}
                id="Occurance"
                label="Occurance"
                variant="outlined"
                name="occurance"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 4 }}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <TextField
                value={input.aircraftType}
                id="TypeOfAircraft"
                label="Type Of Aircraft"
                variant="outlined"
                name="aircraftType"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 4 }}
              />
              <TextField
                value={input.personOnBoard}
                id="PoB"
                label="Person On Board"
                variant="outlined"
                name="personOnBoard"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 4 }}
              />
              <TextField
                value={input.cause}
                id="Cause"
                label="Cause"
                variant="outlined"
                name="cause"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 4 }}
              />
            </Box>
          </Box>
          <TextField
            value={input.details}
            id="Accident"
            label="Details"
            variant="outlined"
            name="details"
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: 4 }}
          />
        </Box>
        <Box
          sx={{
            paddingBottom: 4,
            marginLeft: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 12,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ReportOccurance;
