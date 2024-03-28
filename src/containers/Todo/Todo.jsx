import LogoutIcon from '@mui/icons-material/Logout';
import { Grid, IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './todo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/todosSlice';

const Todo = () => {
  const [newTodo, setNewTodo] = useState({})
  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, [])


  //AddTodo'da eklenen yeni todo alınır ve TodoList'e gonderilir
  const addNewTodo = (newTodo) => {
    setNewTodo(newTodo)
  }

  return (
    <>
      <Grid className='todo_container'>
        <IconButton sx={{position:"absolute", color:"white", left:"10px", top:"10px"}} onClick={handleSignOut}>
          <LogoutIcon sx={{fontSize: 35, ml:"5px" }}/>
        </IconButton>
        <Grid className='add_todo_section_main_grid'>
          <AddTodo addNewTodo={addNewTodo}/>
        </Grid>
        <Grid className='todo_list_section_main_grid'>
          <TodoList newTodo={newTodo}/>
        </Grid>
      </Grid> 
    </>
  )
}

export default Todo