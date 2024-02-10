import { Grid } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Todo from './Todo/Todo'
import Welcome from './Welcome/Welcome'
import MainLayout from '../components/MainLayout'
import AuthLayout from '../components/AuthLayout'


const ContainerMain = () => {
  return (
    <>
      <Grid sx={{ width:"100vw", height:"100vh" }}>
        <Grid className='main_index'>
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route path="/todo" element={<Todo/>} />
            </Route>
            <Route path='/' element={<AuthLayout/>}>
              <Route path='/login' element={<Welcome/>} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </>
  )
}

export default ContainerMain
