import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useState } from 'react'
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"


const SignUp = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleButtonClick = useCallback((e) => {
    if (!email || !password){
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
    .catch((e) => {
      console.log(e)
    })
  },[email, password])

  return (
    <>
      <Box className='sign_up'>
        <TextField type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-Posta' sx={{mt:"30px", bgcolor:"GhostWhite", width:"90%"}} inputProps={{style:{height:'18px'}}}/>
        <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Şifre' sx={{mt:"18px", bgcolor:"GhostWhite", width:"90%" }} inputProps={{style:{height:'18px'}}}/>
        <Button onClick={handleButtonClick} color='success' variant='contained' sx={{textTransform:"none", mt:"25px", width:"90%"}}>
        <Typography sx={{fontSize:"20px"}}>Kayıt Ol</Typography>
        </Button>
      </Box>
    </>
  )
}

export default SignUp