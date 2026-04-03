import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/material';



 export const ImageButton = styled(ButtonBase)(({ theme, height, buttcolor, borderradius}) => ({
    position:'relative',
    borderRadius:borderradius || 30,
    height: height || 70,
    overflow: 'hidden',
    backgroundColor: buttcolor || 'transparent',
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      transform:'scale(1.1)',
      transition:'transform 0.2s ease',
      '& .MuiImageBackdrop-root': {
        opacity: 0.00,
      },
    },
  }));

  export const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 51%',
  });

  export const Image = styled('span')(({theme,txtcolor,textcolorh,textshadow }) => ({

    position: 'absolute',
    inset:0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: txtcolor,
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
       color:textcolorh,
       textShadow: textshadow,
      },
  }));

  export const ImageBackdrop = styled('span')(({ theme,borderradius }) => ({
    position: 'absolute',
    inset:0,
    borderRadius: borderradius,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

export const BackgroundDes= styled(Box)(({Bcolor,Bgradient})=>({
  width:'100%',
  height:'100%',
  position:'fixed',
  backgroundColor:Bcolor,
  background:Bgradient,
  zIndex:-1,
}))