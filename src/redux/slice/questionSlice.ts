import { createSlice } from '@reduxjs/toolkit'

/*

    NOT USING THIS SLICE

*/
interface IOption {
  id: string
  value: string
  htmlValue: string
}

export interface IQuestionState {
	_id: string
  subjectName: string
  docName: string
  questionNo: number
  encoded: string
  conceptName: string
  concept: string
  weightage: number
  question: string
  options: IOption[]
  htmlQuestion: string
  optionsInfo: string
  passage: any
  type: string
  isActive: boolean
}

const initialState: IQuestionState = {
	_id: '',
  subjectName: '',
  docName: '',
  questionNo: 0,
  encoded: '',
  conceptName: '',
  concept: '',
  weightage: 0,
  question: '',
  options: [],
  htmlQuestion: '',
  optionsInfo: '',
  passage: '',
  type: '',
  isActive: false,
}

export const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		// setQuestion: (state, action: PayloadAction<IQuestionState>) => {
    //   return state = action.payload;
		// }
	},
  // extraReducers: (builder) => {
  //   builder.addMatcher(diagnosticQuestionsApiSlice.endpoints.GetDiagnoseQuestionById.matchFulfilled, (state, payload: any) => {
  //     return state = payload.payload.data;
  //   });
  // }
})

export const {  } = questionSlice.actions
export default questionSlice.reducer


/**
 * enrolledList
 * enrolledAssesment

 */