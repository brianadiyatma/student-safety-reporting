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

const UserModal = ({ open, handleClose, target, reload, setReload }) => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    activation: "",
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
    if (data.activation && target) {
      axios
        .post(
          `/api/admin/activate-user`,
          {
            activation: data.activation,
            id: target,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          handleClose();
          setData({
            activation: "",
          });
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
          setErr(err.response.data.error);
          setLoading(false);
        });
    } else {
      setErr("Please select an option");
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="standard-basic"
          name="id"
          label="ID"
          onChange={handleChange}
          disabled
          variant="outlined"
          value={target}
          fullWidth
        />
        {err && <Alert severity="error">{err}</Alert>}
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
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <InputLabel id="demo-simple-select-label">Activation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.activation}
                name="activation"
                label="Approval"
                onChange={handleChange}
                defaultValue={data.activation}
              >
                <MenuItem value={"activated"}>Activate</MenuItem>
                <MenuItem value={"rejected"}>Reject</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              style={{ float: "right", marginTop: 20 }}
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

export default UserModal;
