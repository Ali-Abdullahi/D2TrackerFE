import React from 'react';
import { Box } from '@mui/material';


export default function NavBar({children,height='5vh',}) {
  return (
    <Box
        component="nav"
        sx={{
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
            background:'transparent',
            zIndex:'1000',
        }}
        >
        {children}
        </Box>
 
  );
}