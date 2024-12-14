import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isConnect:false, // track connection status,
    onlineUsers:[],
}

const soketSlice= createSlice({
    name:'socket',
    initialState,
    reducers:{
        setSocketConnected:(state,action)=>{
            state.isConnect=action.payload
        },

        setOnlineUsers:(state,action)=>{
            state.onlineUsers= action.payload
        }
    }
})

export const {setOnlineUsers,setSocketConnected} = soketSlice.actions

export default soketSlice.reducer