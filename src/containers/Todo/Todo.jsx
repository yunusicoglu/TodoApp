import LogoutIcon from '@mui/icons-material/Logout';
import { Grid, IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './todo.scss';

const Todo = () => {
  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <>
      <Grid className='todo_container'>
        <IconButton sx={{position:"absolute", 
          color:"white", left:"10px", top:"10px", 
          ':hover':{transform:'scale(1.15)'}, 
          transition:'transform 0.2s ease-in-out'}} 
          onClick={handleSignOut}
        >
          <LogoutIcon sx={{fontSize: 35, ml:"5px" }}/>
        </IconButton>
        <Grid className='add_todo_section_main_grid'>
          <AddTodo />
        </Grid>
        <Grid className='todo_list_section_main_grid'>
          <TodoList/>
        </Grid>
      </Grid> 
    </>
  )
}

export default Todo