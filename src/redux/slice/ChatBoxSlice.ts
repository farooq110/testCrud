import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IChatBox {
    openChatBox: boolean;
}

const initialState: IChatBox = {
    openChatBox: false,
}

export const ChatBoxSlice = createSlice({
    name: 'chatBox',
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>): any => {
            state.openChatBox = action.payload
        },
    },
})

// Action creators are generated for each case reducer function

export const { setOpen } = ChatBoxSlice.actions

export default ChatBoxSlice.reducer