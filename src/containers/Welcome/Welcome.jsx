import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './welcome.scss';

const Welcome = () => {
  const [alignment, setAlignment] = useState('signIn')

  const handlePageChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

console.log(alignment)
  return (
    <>
      <Grid className='welcome_container'>
        <Grid className='welcome_left'>
        </Grid>
        <Grid className='welcome_right'>
          <Grid className='login_inputs_container'>
              {alignment==='signIn'?(
                <SignIn handlePageChange={handlePageChange}/>
              ):(
                <SignUp handlePageChange={handlePageChange}/>
              )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Welcome