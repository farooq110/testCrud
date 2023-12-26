import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPerformanceStatsState {
  show: boolean;
}

const initialState: IPerformanceStatsState = {
  show: false,
};


export const performanceStatsSlice = createSlice({
  name: 'performanceStats',
  initialState,
  reducers: {
    showPerfomanceStats: (state, action: PayloadAction<IPerformanceStatsState>) => {
      state.show = action.payload.show;
    }
  }
});

export const { showPerfomanceStats } = performanceStatsSlice.actions;

export default performanceStatsSlice.reducer;