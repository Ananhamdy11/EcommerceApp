import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
  
    const loginResponse = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    
    const token = loginResponse.data.token;

    
    const usersResponse = await axios.get("https://fakestoreapi.com/users");
    const user = usersResponse.data.find(u => u.username === username);

    if (!user) {
      throw new Error("User not found");
    }

    
    return {
      token,
      userId: user.id,
      username: user.username,
      email: user.email,
      name: `${user.name.firstname} ${user.name.lastname}`,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: null,
    userId: null,
    email: null,
    name: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.userId = null;
      state.email = null;
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.userId = action.payload.userId; 
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;