import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "conections",
    initialState: [],
    reducers: {
        addConection: (store, action) => { return action.payload },
        removeConnection: (store, action) => {
            return nul
        }
    }
})

export const {addConection, removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;