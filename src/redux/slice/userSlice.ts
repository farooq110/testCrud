import { createSlice } from "@reduxjs/toolkit";
// import userApiSlice from "../../api/user.api";
// import mockApiSlice from "../../api/mockTest.api";

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar:string;
}

const initialState: IUser[] = [
    {id:1,email:"george.bluth@reqres.in",first_name:"George","last_name":"Bluth",avatar:"https://reqres.in/img/faces/1-image.jpg"},
  {id:2,email:"janet.weaver@reqres.in",first_name:"Janet",last_name:"Weaver",avatar:"https://reqres.in/img/faces/2-image.jpg"},
  {id:3,email:"emma.wong@reqres.in",first_name:"Emma",last_name:"Wong",avatar:"https://reqres.in/img/faces/3-image.jpg"},
  {id:4,email:"eve.holt@reqres.in",first_name:"Eve",last_name:"Holt",avatar:"https://reqres.in/img/faces/4-image.jpg"},
  {id:5,email:"charles.morris@reqres.in",first_name:"Charles",last_name:"Morris",avatar:"https://reqres.in/img/faces/5-image.jpg"},
  {id:6,email:"tracey.ramos@reqres.in",first_name:"Tracey",last_name:"Ramos",avatar:"https://reqres.in/img/faces/6-image.jpg"}
  ];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action,"action==================")
      const newUser = {...action.payload,avatar:"https://reqres.in/img/faces/1-image.jpg",id:state.length+1}
      state.push(newUser);
      console.log(state,"state============")
    },
    updateUser: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeUser: (state, action) => {
      console.log(action.payload)
      const idToRemove = action.payload;
      return state = state.filter((item:IUser) => item.id != idToRemove);
    },
  },
});

export const {
  addUser, updateUser, removeUser 
 } = userSlice.actions;
 export const selectUsers = (state:any) => state.user;
export default userSlice.reducer;
