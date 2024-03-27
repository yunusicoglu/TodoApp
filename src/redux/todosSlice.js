import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, where, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'

const collectionName=import.meta.env.VITE_COLLECTION_TODOS
const collectionRef = collection(db, collectionName)

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const q = query(collectionRef, where("created_by", "==", userId));
      const querySnapshot = await getDocs(q);
      const receivedTodos = await querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        createdBy: doc.data().created_by,
        createdAt: doc.data().created_at.toDate().toISOString(), // Seri hale getirilebilir dizeye dönüştürme
    }));
    return receivedTodos
    }
    
  }
)

const todosSlice = createSlice({
  name:"todos", 
  initialState : {
    loading:false,
    todos:null,
    error:null
  },
  reducers:{
    addTodo:{
      reducer: (state, action) => {
        const { todo } = action.payload;
        try {
          setDoc(doc(db, collectionName, todo.id), {
            name: todo.name,
            created_by: todo.createdBy,
            created_at: todo.createdAt,
          }); 
          console.log(todo.name,"görevi eklendi.")
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
  extraReducers:(builder)=>{
    builder.addCase(getTodos.pending, (state)=>{
      state.loading=true
      state.todos=null
      state.error=null
    })
    .addCase(getTodos.fulfilled, (state, action)=>{
      state.loading=false
      state.todos=action.payload
      state.error=null
    })
    .addCase(getTodos.rejected, (state, action)=>{
      state.loading=false
      state.todos=null
      state.error=action.error.message
    })
  }
})



export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
