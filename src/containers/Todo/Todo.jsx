import {Box, Grid, IconButton } from '@mui/material'
import './todo.scss'
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {auth} from '../../firebase'
import { useCallback } from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore'

const Todo = () => {
  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <>
      <Grid className='todo_container'>
        <IconButton sx={{position:"absolute", color:"white", left:"10px", top:"10px"}} onClick={handleSignOut}>
          <LogoutIcon sx={{fontSize: 35, ml:"5px" }}/>
        </IconButton>
        <Grid className='add_todo_section_main_grid'>
          <AddTodo/>
        </Grid>
        <Grid className='todo_list_section_main_grid'>
          <TodoList/>
        </Grid>
      </Grid> 
    </>
  )
}

export default Todo