import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IModalState {
  open?: boolean;
  Component: any;
  headerTitle: string;
  subTitle?: string;
  values?: any;
  actions?: () => void;
  actionButtonTitle?: string;
  Icon?: any;
  // formAction: 'create' | 'update';
}

const initialState: IModalState = {
  open: false,
  Component: null,
  headerTitle: '',
  values: null,
  actions: () => {},
  actionButtonTitle: '',
  Icon: null,
  subTitle: '',
  // formAction: 'create',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModalState>) => {         
      return { ...state, ...action.payload, open: true };
    },
    closeModal: () => {
      return { ...initialState };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;


export default modalSlice.reducer;
