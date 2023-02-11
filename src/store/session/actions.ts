import { createAction } from "@reduxjs/toolkit";
import { stateName } from "./types";

export const setUsername = createAction<string>(`${stateName}/setUsername`);
