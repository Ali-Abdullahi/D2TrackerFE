import React,  { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {BackgroundDes} from './styles'  

export default function BackgroundAnim({Bcolor,Bgradient,children,video,width='100vw',height='100vh',top='-5%',left='-5%', fadeDelay='4500',slide}){

    const [showButtons, setShowButtons]= useState(false);
    const [backgroundOpacity, setBackgroundOpacity] = useState(1);

    useEffect(() => {
       
        setShowButtons(false); 
        setBackgroundOpacity(1);
         const timer = setTimeout(() => {
          setShowButtons(true);
          setBackgroundOpacity(.35);
        }, fadeDelay);



        return () => clearTimeout(timer);
      }, [fadeDelay,slide]);


    return(
        <BackgroundDes
            Bcolor={Bcolor}
            Bgradient={Bgradient}
        >
        
        {video && (
         <Box
            component="video"
            muted
            src={video}
            autoPlay
            playsInline
            preload="auto"
            sx={{
                position:   'absolute',     
                top:top,
                left:left,
                width: width,
                height: height,
                objectFit:  'cover',
                zIndex:     -1,          
                opacity: backgroundOpacity, 
                transition: 'opacity 0.5s ease-in-out', 
            }}
         
         />
        )}

        <Box
            sx={{
                opacity: showButtons ? 1:0, 
                transition: 'opacity 0.5s ease-in-out',
            }}
        >


        {children}
        </Box>

       </BackgroundDes>
    )

}