import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  folders: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

const initialState: initialStateProps = {
  folders: [],
};

export const Folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<initialStateProps>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = Folder.actions;
export default Folder.reducer;
