import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: initialStateProps = {
  workspaces: [],
};

const workspace = createSlice({
  name: "workspace",
  initialState: initialState,
  reducers: {
    WORKSPACE: (state, action: PayloadAction<initialStateProps>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACE } = workspace.actions;
export default workspace.reducer;
