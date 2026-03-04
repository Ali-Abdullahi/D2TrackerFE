import * as React from "react";
import ButtonBaseDemo from "./components/Button";
import BackgroundAnim from "./components/Background";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
import HomeText from "./components/hometxt";



export default function Home(){
    return(
      <>
    <BackgroundAnim
        Bcolor='Black'
        Bgradient=""
        video="videos/D2HomeAnim.mov"
        width="110vw"
        height="110vh"
    >
    <NavBar>

    <Box sx={{ position: 'absolute', left: '2%', top: '1vh' }}>
    <ButtonBaseDemo
        image="Images/Homebutton.png"
        height={110}
        borderradius={300}
        textcolorh={'#bbdefb'}
        textshadow={'-1px -1px 0 black,  1px -1px 0 black,  -1px  1px 0 black, 1px  1px 0 black, 0 0 5px #bbdefb, 0 0 10px #bbdefb, 0 0 20px #e3f2fd'}
        title="HOME"
        override="/"
        txtY={2}
    />
    </Box>

    <Box sx={{ position: 'absolute', left: '90%', top: '3vh' }}>
    <ButtonBaseDemo
        image="Images/RankingsButton.png"
        height={40}
        borderradius={1}
        textcolorh={'#ffc400'}
        textshadow={'0 0 5px #ffc400, 0 0 10px #ffc400, 0 0 20px #ffff00'}
        title="RANKINGS"
        txtY={1}  
        fontsize="1rem"
        txtcolor='#ffab00'
        Widthtxtbox="10"
      />
    </Box>
    </NavBar>
    <HomeText/>
    </BackgroundAnim>
    </>
    )    
}