import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  message: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    const { email, password } = payload;
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retriveLocalStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
  },
});

export default authSlice;
