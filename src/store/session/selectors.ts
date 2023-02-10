import { RootState } from "../index";

export const userNameSelector = (state: RootState): string => (
  state.session.username
);
