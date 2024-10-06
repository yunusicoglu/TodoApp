import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useState } from 'react'
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"
import MarkunreadIcon from '@mui/icons-material/Markunread';
import LockIcon from '@mui/icons-material/Lock';


const SignUp = ({handlePageChange}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emailPlaceholder, setEmailPlaceholder] = useState('E-posta')
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Şifre')

  const handleButtonClick = useCallback((e) => {
    if (!email || !password){
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .catch((e) => {
      console.log(e)
    })
  },[email, password])

  const handleAddKeyDown = (event) => {
    if (event.key==='Enter') {
      handleButtonClick()
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (e.target.value) {
      setEmailPlaceholder('E-posta')
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value) {
      setPasswordPlaceholder('Şifre')
    }
  }
  return (
    <>
      <Box className='login_inputs'>
        <Typography className='login_title'
        >Kayıt Ol</Typography>
        <div className='login_email'>
          <div className='email_icon_div'>
            <MarkunreadIcon color='action'/>
          </div>
          <div className='email_input_div'>
            <input className='email_input' type="email"
              value={email} onChange={handleEmailChange} 
              placeholder={emailPlaceholder} 
              onFocus={()=>setEmailPlaceholder('')}  
            />
          </div>
        </div>
        <div className='login_password'>
          <div className='password_icon_div'>
            <LockIcon color='action'/>
          </div>
          <div className='password_input_div'>
            <input className='password_input' type="password" 
              onKeyDown={handleAddKeyDown} value={password} 
              onChange={handlePasswordChange}  
              placeholder={passwordPlaceholder} 
              onFocus={()=>setPasswordPlaceholder('')} 
            />
          </div>
        </div>
        <div className='login_button'></div>
        <Button onClick={handleButtonClick} variant='contained' 
          sx={{bgcolor:'#4b8ae3', height:"60px", textTransform:"none", 
            mt:"30px", width:"100%", borderRadius:"30px", 
            ":hover":{bgcolor:'#155dc2',transform:'scale(1.05)'}, 
            transition:'transform 0.2s ease-in-out'}}
          ><Typography sx={{fontSize:"20px"}}>Kayıt Ol</Typography>
        </Button>
        <Typography sx={{mt:"17px", fontSize:"20px"}} >
          Zaten kayıtlı mısınız? 
          <Button onClick={()=>handlePageChange('signIn')} 
            sx={{textTransform:"none", fontSize:"20px", 
            ":hover":{backgroundColor:"white", transform:'scale(1.1)'}, 
            transition:'transform 0.1s ease-in-out'}}
            >Giriş Yapın
          </Button> 
        </Typography>
      </Box>
    </>
  )
}

export default SignUp