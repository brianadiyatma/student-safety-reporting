import { Download } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportedOccurance = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [amountPage, setAmountPage] = useState(0);
  const [err, setErr] = useState();
  const { user } = useSelector((state) => state.auth);

  const handlePDFDownload = (id) => {
    axios
      .get(`/api/user/download-report/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user/get-reports?pagesize=20&page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setData(res.data.reports);
        if (res.data.reports.length === 0) {
          setErr("No reports found");
        }
        setLoading(false);
        setAmountPage(res.data.maxReports / 20);
      })
      .catch((err) => {
        setErr(err.response.data.error);
        setLoading(false);
      });
  }, [page, user]);

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* HEADER */}
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
            Reported Occurance
          </Typography>
          <Typography variant="subtitle1">Others Reported Occurance</Typography>
        </Box>
        <Box></Box>
      </Paper>
      {/* END OF HEADER */}
      {/* TABLE */}
      <Paper sx={{ marginTop: 4 }}>
        {loading && (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <CircularProgress />
          </Container>
        )}
        {err && <Alert severity="error">{err}</Alert>}
        {data && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Accident/Incident</TableCell>
                  <TableCell>Callsign</TableCell>
                  <TableCell align="right">Type of Aircraft</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Occurance</TableCell>
                  <TableCell align="right">PoB</TableCell>
                  <TableCell align="right">Cause</TableCell>
                  <TableCell align="right">Occurance Details</TableCell>
                  <TableCell align="right" width={120}>
                    Admin Feedback
                  </TableCell>
                  <TableCell align="right" width={120}>
                    Safety Index
                  </TableCell>
                  <TableCell align="center" width={120}>
                    PDF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, i) => (
                  <TableRow hover={true} key={i}>
                    <TableCell component="th" scope="row">
                      {data.accident}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.callsign}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.aircraftType}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.time}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.occurance}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.personOnBoard}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.cause}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.details}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.adminFeedBack}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {data.score}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <IconButton onClick={() => handlePDFDownload(data._id)}>
                        <Download />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
      >
        <Pagination
          count={Math.ceil(amountPage)}
          color="primary"
          defaultValue={page}
          value={page}
          onChange={(e, page) => {
            setPage(page - 1);
          }}
        />
      </Container>
    </Container>
  );
};

export default ReportedOccurance;
