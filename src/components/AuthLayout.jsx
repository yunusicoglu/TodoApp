import { Box } from '@mui/material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { auth } from '../firebase'

const AuthLayout = () => {
  const [user, isLoading,] = useAuthState(auth)

  if (isLoading) {
    return (
      <>
        <Box sx={{width:"100vw", height:"100vh",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <PulseLoader
            speedMultiplier={1.2}
            color={'#000000'}
            loading={isLoading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </>
    )    
  }


  if (user) {
      return <Navigate to='/' replace/>
  }

  return (
    <>
        <Outlet/>
    </>
  )
}

export default AuthLayout