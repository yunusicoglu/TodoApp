import { createSelector, createSlice } from "@reduxjs/toolkit";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";


const todosSlice = createSlice({
  name:"todos", 
  initialState : [],
  reducers:{
    addTodo:{
      reducer: (state, action) => {
        const { todo } = action.payload;
        try {
          let collectionName=import.meta.env.VITE_COLLECTION_TODOS
          setDoc(doc(db, collectionName, todo.id), {
            name: todo.name,
            created_by: todo.createdBy,
            created_at: serverTimestamp(),
          }); 
        } catch (error) {
          console.error('Todo adding error message :', error);
        }
      },
      prepare: (todo) => ({
        payload: {
          todo,
        },
        // meta: { 

        // },
      }),
    },
  },
})

const getTodos = createSelector(
  (state) => state.todos,
  (todos) => todos
);

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = getTodos;