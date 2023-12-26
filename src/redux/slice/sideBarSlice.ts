import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISideBarState {
	selectedmenu: string | undefined;
}

const initialState: ISideBarState = {
	selectedmenu: 'Dashboard',
}

export const sideBarSlice = createSlice({
	name: 'sideBar',
	initialState,
	reducers: {
		setselectedmenu: (state, action: PayloadAction<string>) => {
			state.selectedmenu = action.payload
		}
	},
})

export const { setselectedmenu } = sideBarSlice.actions
export default sideBarSlice.reducer


/**
 * enrolledList
 * enrolledAssesment

 */