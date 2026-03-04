import React,{ useState,useEffect } from "react"
import { Box } from "@mui/material"
import BackgroundAnim from "./Background"
import IconButton from "@mui/material/IconButton"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'


export default function Slideshow({slides,children,}){
    const [index, setIndex] = useState(0);
    const last = slides.length - 1;
    const slide = slides[index];
    const prev = ()=> setIndex(i=> Math.max(i-1,0))
    const next = ()=> setIndex(i=> Math.min(i+1,last))
    const SlideContent=slide.Content;






    return(
        <Box sx={{width:'100%',height:'100%', color:'black',}}>
        
            <BackgroundAnim
                key={index} 
                Bcolor={slide.Bcolor}
                Bgradient={slide.Bgradient}
                video={slide.video}
                width={slide.videoWidth}
                height={slide.videoHeight}
                top={slide.videoTop}
                left={slide.videoLeft}
                fadeDelay={slide.fadeDelay}
            >

                {slide.slideContent}

            </BackgroundAnim>
                {children}
                <Box
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent: 'space-between',
                        width:'100%',
                        height:'100%',
                        px:4,
                    }}
                >

                

                    <IconButton onClick={prev} disabled={index===0} sx={{position:'absolute', top:'50%', left:'-1%', width:'auto', height:'auto', p:0, flexWrap:'wrap', color:'#9e9e9e', display:'flex', '&:hover': { backgroundColor: 'transparent'}}} disableRipple disableFocusRipple>
                    <ArrowLeftIcon sx={{fontSize:'6rem', backgroundSize: '100% 100%', p:0,  '&:hover':{fontSize:'7rem', color:'white'} }}/>
                    </IconButton>

                    <Box sx={{ flexGrow:1, textAlign:'center'}}/>

                    <IconButton onClick={next} disabled={index===last} sx={{position:'absolute', top:'50%', right:'-1%', width:'auto', height:'auto', p:0, color:'#9e9e9e', minWidth:0, '&:hover': { backgroundColor: 'transparent'}}} disableRipple disableFocusRipple >
                        <ArrowRightIcon sx={{fontSize:'6rem', backgroundSize: '100% 100%', p:0,  '&:hover':{fontSize:'7rem', color:'white'} }}/>
                    </IconButton>

                </Box>

              


        </Box>
    )
    
}


