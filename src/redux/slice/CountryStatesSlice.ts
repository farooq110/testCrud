import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IcountryCodeState {
    countryCode: string;
}

const initialState: IcountryCodeState = {
    countryCode: "",
}

export const countryCodeSlice = createSlice({
    name: 'countryCode',
    initialState,
    reducers: {
        setCountryCode: (state, action: PayloadAction<IcountryCodeState | null>) => {
            state.countryCode = action.payload?.countryCode || ""
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCountryCode } = countryCodeSlice.actions

export default countryCodeSlice.reducer