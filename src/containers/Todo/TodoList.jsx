import ClearIcon from '@mui/icons-material/Clear';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/todosSlice';




const TodoList = ({newTodo}) => {
  const {loading, todos, error} = useSelector((state)=>state.todos) 
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([])
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  

  useEffect(() => {
    setTodoList(todos)
    if (Object.keys(newTodo).length > 0) { //"obje dolu mu" kontrolü
      setTodoList([...todos, newTodo])
    }
  }, [todos, newTodo])



  
  return (
    <>
      <Grid className='todo_list_section_main_grid'>
        <Box className='todo_list_section_main_box' >
          <Box sx={{ height:"50px", mb:"10px", pt:"15px", borderTopRightRadius:"25px", borderTopLeftRadius:"25px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Typography sx={{fontSize:"25px", fontWeight:600, ml:"20px"}} >Yapılacaklar Listesi</Typography>
            <Divider sx={{bgcolor:"#ffdede",borderBottomWidth: 2}}/>
          </Box>
          <Box sx={{overflowY:"auto", width:"100%", height:"505px"}}>
            {todoList&&todoList.map((todo) => (
              <Box key={todo.id} sx={{ width:"100%", height:"40px", pt:"10px", pb:"0px", display:"flex", flexDirection:"column", justifyContent:"space-between",
                ":hover":{bgcolor:"rgb(255, 255, 255, 0.3)"}}}>
                <Box sx={{width:"100%" ,display:'flex',}}>
                  <Typography sx={{ml:"20px",fontSize:"20px", width:"95%"}}>
                    {todo.name}
                  </Typography>
                  <IconButton sx={{mt:"-6px", mr:"12px"}}>
                    <ClearIcon/>
                  </IconButton>
                </Box>
                <Divider sx={{mx:"15px"}}/>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default TodoList