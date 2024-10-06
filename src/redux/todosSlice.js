import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, where, doc, getDocs, setDoc, orderBy, deleteDoc } from "firebase/firestore";
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
      const q = query(
        collectionRef,
        where('userRef', '==', userId),
        orderBy('createdAt', 'asc'),
      );
      const querySnapshot = await getDocs(q);
      const receivedTodos = await querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        createdBy: doc.data().userRef,
        createdAt: doc.data().createdAt, 
    }));
    return receivedTodos
    } else {
      console.error('Kullanıcı doğrulanamadı!')
    }
    
  }
)

export const addTodoAction = createAsyncThunk('todos/addTodo',
  async(todo)=>{
    setDoc(doc(db, collectionName, todo.id), {
      name: todo.name,
      userRef: todo.createdBy,
      createdAt: todo.createdAt,
    }); 

    return todo

  }
)

export const deleteTodoAction = createAsyncThunk('todos/deleteTodo',
  async(id)=>{
    deleteDoc(doc(db, collectionName, id))
    return id
  }
)


const todosSlice = createSlice({
  name:"todos", 
  initialState : {
    loading:false,
    todos:null,
    error:null
  },
  // reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getTodos.pending, (state)=>{
      state.loading=true
      // state.todos=null
      // state.error=null
    })
    .addCase(getTodos.fulfilled, (state, action)=>{
      state.loading=false
      state.todos=action.payload
      // state.error=null
    })
    .addCase(getTodos.rejected, (state, action)=>{
      state.loading=false
      // state.todos=null
      state.error=action.error.message
    })
    .addCase(addTodoAction.pending, (state)=>{
      state.loading=true
    })
    .addCase(addTodoAction.fulfilled, (state, action)=>{
      state.loading = false;
      state.todos.push(action.payload);
    })
    .addCase(addTodoAction.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(deleteTodoAction.pending, (state)=>{
      state.loading=true
    })
    .addCase(deleteTodoAction.fulfilled, (state, action)=>{
      state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      //state.deletedTodo = action.payload; //silinen todo'nun id'si state'de güncellenince component tekrar get isteği yapacak 
    })
    .addCase(deleteTodoAction.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    })
  }
})



export default todosSlice.reducer;
