import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";

const store = configureStore({
    reducer: {
        auth : authslice,
        // Define your reducers here
    }
})

export default store;