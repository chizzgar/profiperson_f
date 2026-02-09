import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "client" | "provider" | null;

type AuthState = {
  role: UserRole;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  role: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setRole, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
