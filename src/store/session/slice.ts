import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setUsername } from "./actions";
import { SessionState, stateName } from "./types";

const initialState: SessionState = {
  username: ''
}

const sessionSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setUsername,
      (state: SessionState, action: PayloadAction<string>): SessionState => ({
        ...state,
        username: action.payload
      }),
    );
  },
});

export default sessionSlice;
