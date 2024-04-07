import ClearIcon from '@mui/icons-material/Clear';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction, getTodos } from '../../redux/todosSlice';




const TodoList = () => {
  const {loading, todos, error, newTodo, deletedTodo} = useSelector((state)=>state.todos) 
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([])
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  
  useEffect(() => {
    setTodoList(todos)
  }, [todos])
  

  useEffect(() => {
    if (deletedTodo) {
      dispatch(getTodos())
    }
    //eslint-disable-next-line
  }, [deletedTodo])
  

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
          {todoList&&todoList.map((todo) => (
            <Box key={todo.id} sx={{ width:"100%", height:"40px", pt:"10px", pb:"0px", display:"flex", flexDirection:"column", justifyContent:"space-between",
              ":hover":{bgcolor:"rgb(255, 255, 255, 0.3)"}}}>
              <Box sx={{width:"100%" ,display:'flex',}}>
                <Typography sx={{ml:"20px",fontSize:"20px", width:"95%"}}>
                  {todo.name}
                </Typography>
                <IconButton onClick={()=>handleDelete(todo.id)} sx={{mt:"-6px", mr:"12px"}}>
                  <ClearIcon/>
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