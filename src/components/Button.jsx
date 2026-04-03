import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import {
    ImageButton,
    ImageSrc,
    ImageBackdrop,
    Image
  } from './styles'




export default function ButtonBaseDemo({image='/Images/defaultbutt.png',title='HOME',txtcolor,textcolorh,textshadow,buttcolor,borderradius,width='clamp(55px, 8vw, 110px)',height,fontsize='2rem',txtY='0',Widthtxtbox='2',override='',state=null}){

return(
    <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
      <ImageButton
      component={Link}
      state={state}
      to={override || `/${title.toLowerCase()}`}
        focusRipple
        key={title}
        sx={{
          width:width,
          minWidth: { xs: '55px', sm: '70px', md: '80px', lg: '90px', xl: '110px' },

        }
        }
        height={height}
        buttcolor={buttcolor}
        borderradius={borderradius}
      >
        <ImageSrc style={{ backgroundImage: `url(${image})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image
              sx={()=>({
                color:txtcolor,
                '&:hover':{
                    color:textcolorh,
                    textShadow: textshadow,
                }
                })}
        >
          <Typography
            component="span"
            variant="subtitle1"
            sx={(theme) => ({
              position: 'relative',
              fontSize:fontsize,
              p: Widthtxtbox, //text box width
              pt: txtY, // Y axis positioning
              pb: `calc(${theme.spacing(1)} + 2px)`,
            })}
          >
            {title}
          </Typography>
        </Image>
      </ImageButton>

  </Box>
)

}