import { createSelector, createSlice } from "@reduxjs/toolkit";


const todosSlice = createSlice({
  name:"todos", 
  initialState : [],
  reducers:{
    addTodo:{
      reducer: (state, action) => {
        state.push(action.payload)
      }
    }
  },
})

const getTodos = createSelector(
  (state) => state.todos,
  (todos) => todos
);

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = getTodos;