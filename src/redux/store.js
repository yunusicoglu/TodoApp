import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './dataSlice'

export const store = configureStore({
  reducer: {
    todos : todosReducer
  }
})