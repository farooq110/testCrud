import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import userTodoApiSlice from "../../api/userTodo.api";
import { eTestStatus } from "../../dto/common.enum";

interface ITestPaper {
	subjectName:  string;
	progress: number;
	testDuration: number;
	createdAt: string;
	endTime: string;
	isReviewed: boolean;
	pauseTime: string | null;
	startTime: string | null;
	totalWightage: number;
	status: eTestStatus, 
	conceptName?: string
}

interface ITodoList {
  _id: string;
  assessment: string;
  user: string;
  priority: number;
  practice: string;
  status: string;
  testPaper: string;
  statusDescription: string;
  isActive: boolean;
	populatedTestPaper: ITestPaper;
}

interface ICurrentTestQuestion {
  questionId: string | null;
  index: number;
  selectedAnswer?: string;
  isCorrect?: boolean;
  status?: string;
  remainingHints: number;
  totalHints: number;
  isReviewed?: boolean;
  correctAnswer?: string;
  chatToken?: string | null;
	chatInteractionCount?: number;
}

export interface IUserTodo {
  todoList: ITodoList[];
  currentTask: ITodoList;
	timePracticeTest?: ITodoList;
  questionList: any[];
  currentTestQuestion: ICurrentTestQuestion;
  practicePhase: string;
  testStatus?: string;
  testStartedTime: string;
  isPaused: boolean;
  testDuration?: number;
}

const initialState: IUserTodo = {
  todoList: [],
  currentTask: {
    _id: "",
    assessment: "",
    user: "",
    priority: 0,
    practice: "",
    status: "",
    testPaper: "",
    statusDescription: "",
    isActive: false,
    populatedTestPaper: {
      subjectName: "",
      progress: 0,
      testDuration: 0,
      createdAt: "",
      endTime: "",
      isReviewed: false,
      pauseTime: null,
      startTime: null,
      totalWightage: 0,
      status: eTestStatus.READY,
    },
  },
  questionList: [],
  currentTestQuestion: { 
    questionId: null, 
    index: 0, 
    isCorrect: false, 
    status: eTestStatus.READY, 
    remainingHints: 0, 
    totalHints: 0, 
    isReviewed: undefined, 
    correctAnswer: "", 
    chatToken: null,
		chatInteractionCount: 0,
  },
  practicePhase: "",
  testStartedTime: '',
  isPaused: false,
  testDuration: 0,
};

export const UserTodoSlice = createSlice({
  name: "userTodo",
  initialState,
  reducers: {
    setUserTodo: (state, action: PayloadAction<IUserTodo>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setNextQuestion: (state: any) => {
      const index = state.currentTestQuestion.index + 1;
      if (state.questionList.length === index) return;
      const question = state.questionList[index];
      state.currentTestQuestion = { index, ...question };
    },
    setPreviousQuestion: (state: any) => {
      const index = state.currentTestQuestion.index - 1;
      if (index < 0) return;
      const question = state.questionList[index];
      state.currentTestQuestion = { index, ...question };
    },
    setSelectedOption: (state, action: PayloadAction<any>) => {
      const { selectedOption } = action.payload;
			const currentIndex = state.currentTestQuestion.index;
      state.currentTestQuestion.selectedAnswer = selectedOption;
			state.questionList[currentIndex].selectedAnswer = selectedOption;
    },
    setAnswerAndStatus: (state, action: PayloadAction<any>) => {
      state.currentTestQuestion.isCorrect = action.payload.isCorrect;
      if (action.payload.status) {
        state.currentTestQuestion.status = action.payload.status;
      }
    },
    navigateToSpecificeQuestion: (state, action: PayloadAction<any>) => {
      const index = action.payload.index;
      const question = state.questionList[index];
      state.currentTestQuestion = { index, ...question };
    },

    updateCurrentTestQuestion: (state, action: PayloadAction<{ keys: Array<keyof ICurrentTestQuestion>; result: any }>) => {
      const { keys, result } = action.payload;
      const currentTestQuestion = state.currentTestQuestion as any;
      for (const key of keys) {
        currentTestQuestion[key] = result[key];
      }
      state.currentTestQuestion = currentTestQuestion;
    },
    updateUserTodo: (state, action: PayloadAction<{ keys: Array<keyof IUserTodo>; result: any }>) => {
      const { keys, result } = action.payload;
      const currentTodo = state as any;
      for (const key of keys) {
        currentTodo[key] = result[key];
      }
      // currentTestQuestion[key] = value;
      state = {...currentTodo};
    },
    setFlag: (state, action: PayloadAction<any>) => {
      const { questionId } = action.payload;
      const questionIndex = state.questionList.findIndex((question) => question.questionId === questionId);

      state.questionList[questionIndex].isFlagged = !state.questionList[questionIndex].isFlagged;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userTodoApiSlice.endpoints.GetTestQuestions.matchFulfilled, (state, { payload }) => {
      if (payload.data && payload.data.length === 0) {
        state.questionList = [];
        return;
      }

      state.currentTestQuestion = { ...payload.data?.questionList[0], index: 0, isReviewed: false };
      state.questionList = payload.data.questionList;
      state.practicePhase = payload.data.practicePhase;
      state.testStatus = payload.data.testStatus;
      state.testStartedTime = payload.data.testStartedTime;
      if (state.testStatus === eTestStatus.PAUSED) {
        state.isPaused = true;
      }
    });
  },
});

export const { 
  updateCurrentTestQuestion, 
  setUserTodo, 
  setNextQuestion, 
  setPreviousQuestion, 
  setSelectedOption, 
  setAnswerAndStatus, 
  navigateToSpecificeQuestion, 
  setFlag,
  updateUserTodo
} = UserTodoSlice.actions;

export default UserTodoSlice.reducer;
