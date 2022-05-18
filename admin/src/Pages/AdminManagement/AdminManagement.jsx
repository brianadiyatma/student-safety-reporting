import {
  Alert,
  Button,
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
  Chip,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Approval from "../../Components/Modal/Approval";
import Delete from "@mui/icons-material/Delete";

import AdminModal from "../../Components/Modal/AdminModal";

const AdminManagement = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [amountPage, setAmountPage] = useState(0);
  const [err, setErr] = useState();
  const { user } = useSelector((state) => state.auth);
  const [reload, setReload] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [target, setTarget] = useState();

  const handleOpen = (id) => {
    setTarget(id);
    setOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/admin/get-admin?pagesize=20&page=${page}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setData(res.data.users);
        console.log(res.data.users);
        if (res.data.users.length === 0) {
          setErr("No reports found");
        }
        setLoading(false);
        setAmountPage(res.data.maxUsers / 20);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.error);
        setLoading(false);
      });
  }, [page, user, reload]);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .post(
        `/api/admin/delete-admin`,
        { id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box sx={{ marginTop: 4, marginX: 20 }}>
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
              Admin Management
            </Typography>
            <Typography variant="subtitle1">
              Manage Your Admin Account
            </Typography>
          </Box>
          <Box>
            <Button onClick={handleOpen}>Add Admin</Button>
          </Box>
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
                    <TableCell>Name</TableCell>
                    <TableCell width={120}>Email</TableCell>
                    <TableCell align="right">Activation</TableCell>
                    <TableCell align="right">Created At</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((data, i) => (
                    <TableRow hover={true} key={i}>
                      <TableCell component="th" scope="row">
                        {data.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.email}
                      </TableCell>

                      <TableCell component="th" scope="row" align="right">
                        {data.activation === "pending" && (
                          <Chip
                            label="Pending"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                        {data.activation === "activated" && (
                          <Chip
                            label="Approved"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                        {data.activation === "rejected" && (
                          <Chip
                            label="Rejected"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {data.createdAt}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <IconButton onClick={() => handleDelete(data._id)}>
                          <Delete />
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
      </Box>
      <AdminModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        target={target}
        setReload={setReload}
        reload={reload}
      />
    </>
  );
};

export default AdminManagement;
