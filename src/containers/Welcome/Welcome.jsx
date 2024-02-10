import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './welcome.scss';

const Welcome = () => {
  const [alignment, setAlignment] = useState('signIn')

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Grid className='welcome_container'>
        <Grid className='login_main_grid'>
          <Box className='login_box'>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton sx={{width:"50%", textTransform:"none"}} 
                value="signIn">
                <Typography sx={{fontSize:"19px"}}>Giriş Yap</Typography>

              </ToggleButton>
              <ToggleButton sx={{width:"50%",         textTransform:"none"}} 
                value="signUp">
                <Typography sx={{fontSize:"19px"}}>Kayıt Ol</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            {alignment==='signIn'?(
              <SignIn/>
            ):(
              <SignUp/>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Welcome