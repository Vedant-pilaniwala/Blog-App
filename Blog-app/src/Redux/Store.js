import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slice/authSlice';
import postSlice from './Slice/postSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
    },
});

export default store;