import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, IconButton, TextField, Tooltip, Typography, styled } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../../redux/todosSlice';
import { serverTimestamp } from 'firebase/firestore';



//close iconbutton bg
const StyledIconButton = styled(IconButton)({
  borderRadius: 0, // Kare arka plan için köşeleri sıfırla
  '&:hover': {
    backgroundColor: (theme) => theme.palette.action.hover, // Üzerine gelindiğinde arka plan rengi
  },
});

const AddTodo = () => {
    const [todoInput, setTodoInput] = useState('')

    
    const dispatch = useDispatch();
  
    const handleOnChange = (event) => {
      setTodoInput(event.target.value)
    }

  
    const handleAddButton = () => {
      if (todoInput) {
        const auth = getAuth();
        const user = auth.currentUser; //user.uid
        const id = nanoid();
        const todo = {
          id:id,
          createdBy:user.uid,
          name:todoInput,
          createdAt: serverTimestamp(),
        }
        dispatch(addTodoAction(todo));
        setTodoInput('')
        
        
      }
    }
  
    const handleClearButton = () => {
      setTodoInput('')
    }
  
    const handleAddKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleAddButton()
      } else if (event.key === 'Escape') {
        setTodoInput('')
      }
    }

    return (
      <>
          <Box className='add_todo_section_main_box' >
            <TextField focused id="outlined-basic" variant="outlined" fullWidth color={'muiwhite'} value={todoInput} onChange={handleOnChange} onKeyDown={handleAddKeyDown} autoComplete='off'
              placeholder="Bir görev yaz" type="text" sx={{bgcolor:"#ffffff3b", borderTopLeftRadius:"25px", borderBottomLeftRadius:"25px",borderStartEndRadius:"4px",borderEndEndRadius:"4px"}}
              InputProps={{ style: { borderTopLeftRadius:"25px",borderBottomLeftRadius:"25px", height: '100%',
              paddingLeft:"10px", color:"#000000", fontSize:"22px",}, 
              endAdornment: (
                <Tooltip title="Esc" placement='top'>
                  <StyledIconButton onClick={handleClearButton} edge="end" aria-label="delete" size="large">
                    <ClearIcon />
                  </StyledIconButton>
                </Tooltip>
              )}}/>
            <Tooltip title="Enter" placement='top'>
              <Button onClick={handleAddButton}
                sx={{h:"12%",height:"100%", bgcolor:"#242421", '&:hover': {bgcolor: '#000000'}, textTransform:"none", borderTopRightRadius:"25px", borderBottomRightRadius:"25px"}}>
                <Typography sx={{fontSize:"22px", color:"#ffffff", fontWeight:550}}>Ekle</Typography>
              </Button>
            </Tooltip>
          </Box>
      </>
    )
  }
  
  export default AddTodo