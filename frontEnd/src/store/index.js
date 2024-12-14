import {configureStore} from "@reduxjs/toolkit"
import socketReducer from './slices/sokets/soketSlice'

const store = configureStore({
    reducer: {
        socket: socketReducer,
    },
});

export default store;