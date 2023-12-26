import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IQuestions {
  questionId: string;
  selectedAnswer: number;
  status: string;
}

interface IPspDecisionTable {
  conceptId: string;
  conceptTitle: string;
  difficultyLevel: string;
  totalFrequency: number;
  totalCorrectAnswer: number;
  conceptWeightage: number;
  obtainedScore: number;
  accuracy: number;
}

export interface IDiagnosticTest {
  _id: string;
  questions: IQuestions[];
  userId: string;
  obtainedScore: number;
  totalWightage: number;
  status: string;
  pspDecisionTable: IPspDecisionTable[];
}

const initialState: IDiagnosticTest = {
  _id: "",
  questions: [],
  userId: "",
  obtainedScore: 0,
  totalWightage: 0,
  status: "",
  pspDecisionTable: [],
};

export const DianosticeTestSlice = createSlice({
  name: 'diagnosticPaper',
  initialState,
  reducers: {
    setDiagnosticPaper: (state, action: PayloadAction<IDiagnosticTest>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
});

export const { setDiagnosticPaper } = DianosticeTestSlice.actions;

export default DianosticeTestSlice.reducer;