import {
  Alert,
  Chip,
  CircularProgress,
  Container,
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OccuranceHistory = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [amountPage, setAmountPage] = useState(0);
  const [err, setErr] = useState();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/user/get-reports-by-user?pagesize=20&page=${page}`, {
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
            History Reporting
          </Typography>
          <Typography variant="subtitle1">
            Your History of Occurance Reporting
          </Typography>
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
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, key) => (
                  <TableRow hover={true} key={key}>
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
                      <Chip
                        label={data.approval ? "Approved" : "Denied"}
                        color={data.approval ? "success" : "error"}
                      />
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

export default OccuranceHistory;
