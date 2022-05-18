import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import {
  Alert,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  height: "40%",
  boxShadow: 24,
  p: 4,
};

const AdminModal = ({ open, handleClose, target, reload, setReload }) => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleApprove = () => {
    setLoading(true);

    axios
      .post(`/api/admin/add-admin`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        handleClose();
        setData({
          name: "",
          email: "",
          password: "",
        });
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading ? (
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
        ) : (
          <>
            {err && <Alert severity="error">{err}</Alert>}
            <TextField
              id="name"
              name="name"
              label="Name"
              onChange={handleChange}
              value={data.name}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="E-Mail"
              onChange={handleChange}
              value={data.email}
              variant="outlined"
              sx={{ marginTop: 4 }}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              onChange={handleChange}
              value={data.password}
              variant="outlined"
              sx={{ marginTop: 4 }}
              fullWidth
              type="password"
            />
            <Button
              variant="contained"
              sx={{ float: "right", marginTop: 4 }}
              onClick={handleApprove}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AdminModal;
