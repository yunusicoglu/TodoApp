import ClearIcon from '@mui/icons-material/Clear';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction, getTodos } from '../../redux/todosSlice';




const TodoList = () => {
  const {loading, todos, error, newTodo} = useSelector((state)=>state.todos) 
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([])
  const [growText, setGrowText] = useState('')

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  
  //store'daki todos güncellenince component'deki todoList de güncelleniyor.
  useEffect(() => {
    setTodoList(todos)
  }, [todos])
  

  const handleDelete = (todoId) => {
    dispatch(deleteTodoAction(todoId));
  }

  
  return (
    <>
      <Box className='todo_list_section_main_box' >
        <Box sx={{ height:"50px", mb:"10px", pt:"15px", borderTopRightRadius:"25px", borderTopLeftRadius:"25px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
          <Typography sx={{fontSize:"25px", fontWeight:600, ml:"20px",}} >Yapılacaklar Listesi</Typography>
          <Divider sx={{bgcolor:"#ffdede",borderBottomWidth: 2}}/>
        </Box>
        <Box sx={{overflowY:"auto", width:"100%", height:"85%"}}>
          {todoList&&todoList.map((todo, index) => (
            <Box key={todo.id} sx={{ width:"100%", height:"40px", pt:"10px", pb:"0px", display:"flex", flexDirection:"column", justifyContent:"space-between", backgroundColor: index % 2 === 0 ? '' : 'rgb(0, 0, 0, 0.07)',}}> 
              <Box sx={{width:"100%" ,display:'flex',}}>
                <Typography sx={{ml:"20px", width:"95%", fontSize: growText===todo.id ? '21px' : '20px'}} >
                  {todo.name}
                </Typography>
                <IconButton onClick={()=>handleDelete(todo.id)} sx={{mt:"-6px", mr:"12px", ':hover':{transform:'scale(1.2)', backgroundColor:"transparent", }, transition:'transform 0.2s ease-in-out'}}>
                  <TaskAltIcon sx={{color:"#363636",}}/>
                </IconButton>
              </Box>
              <Divider sx={{mx:"15px"}}/>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default TodoList