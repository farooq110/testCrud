import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import assesmentApiSlice from "../../api/assesmentType.api";
import LocalStorageService from "../../services/localstorage.service";

export interface IAssesmentState {
  enrolledList?: any[];
  enrolledSelectedAssesment?: string;
  enrolledSelectedAssesmentExpireAt?: string;
  selectedPricingPlan?: string;
}

export interface IAssesment {
  _id: string;
  assessmentName: string;
}

export interface IEnroleAssessment {
  assessment: IAssesment;
  subscriptionExpireAt: string;
  _id: string;
}

const initialState: IAssesmentState = {
  enrolledList: [],
  enrolledSelectedAssesment: "",
  enrolledSelectedAssesmentExpireAt: "",
  selectedPricingPlan: LocalStorageService.getSelectedPlan(),
};

export const assesmentSlice = createSlice({
  name: "assesment",
  initialState,
  reducers: {
    setEnrolledAssesment: (state, action: PayloadAction<IAssesmentState>) => {
      state.enrolledList = action.payload.enrolledList;
    },
    setSelectedAssesment: (state, action: PayloadAction<string>) => {
      state.enrolledSelectedAssesment = action.payload;
      const selectedAssesment: IEnroleAssessment = state.enrolledList?.find((itm: IEnroleAssessment) => itm.assessment._id == action.payload);
      state.enrolledSelectedAssesmentExpireAt = selectedAssesment.subscriptionExpireAt;
    },
    setSelectedPricingPlan: (state, action: PayloadAction<string>) => {
      state.selectedPricingPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(assesmentApiSlice.endpoints.GetUserEnrolledAssessment.matchFulfilled, (state, { payload }: any) => {
      const enrolledList: Array<IEnroleAssessment> = payload;
      state.enrolledList = enrolledList;
      if (enrolledList && enrolledList.length === 0) {
        state.enrolledSelectedAssesment = "";
        // Redirect user to login page
        return;
      }
      if (!state.enrolledSelectedAssesment) state.enrolledSelectedAssesment = enrolledList[0].assessment._id;
      if (!state.enrolledSelectedAssesmentExpireAt) state.enrolledSelectedAssesmentExpireAt = enrolledList[0].subscriptionExpireAt;
    });
  },
});

export const { setEnrolledAssesment, setSelectedAssesment, setSelectedPricingPlan } = assesmentSlice.actions;
export default assesmentSlice.reducer;
