import React from "react";
import {Box} from "@mui/material";
import RankItem from "./RankItems";
import {Typography} from "@mui/material";

export default function RankContent({trialsKDA=2.6,trialsP=5,winR=21,winRP=5,ibKDA=1.4,ibR=3,compKDA=1.23,compR=3,ovrKDA=1.16,ovrKDAR=4,ovrKD=1.07,ovrKDR=5,nameBorder="Images/bronzeborder Background Removed.png",nameSize='8rem',nameColor='Black',nameFont='5rem',nameShadow='0 0 5px black, 0 0 10px black',name='AAA',borderWidth='50%',borderHeight='35%',borderLeft='25%',borderTop='20%', nameTop='15%'}){
    return(
        <>
        <Box sx={{width:'90%',height:'40%',position:'absolute', display:'flex',justifyContent:'flex-start',flexWrap: 'wrap',flexDirection: 'row', gap:'20px',top:'66%',left:'6%'}} >
            <RankItem title={'Trials of Osiris'} position={trialsP} value={trialsKDA} titleFont={"Kablammo, system-ui"} titleColor={'Black'} titleVariant={'h6'} titleShadow={'0 0 5px #ffff00, 0 0 10px #ffff00'}/>
            <RankItem title={'IRON BANNER'} position={ibR} value={ibKDA} titleFont={"Metal Mania, cursive"} titleColor={'#8d6e63'} titleVariant={'h5'} titleShadow={'0 0 5px #3e2723, 0 0 10px #3e2723'}/>
            <RankItem title={'COMPETITIVE'} position={compR} value={compKDA} titleFont={"Knewave, system-ui"} titleColor={'#e53935'} titleVariant={'h5'} titleShadow={'0 0 5px black, 0 0 10px #9e9e9e'}/>
            <RankItem title={'OVERALL KDA'} position={ovrKDAR} value={ovrKDA} titleFont={"Alegreya SC, serif"} titleColor={'#eeeeee'} titleVariant={'h5'} titleShadow={'0 0 5px black, 0 0 10px black'}/>
            <RankItem title={'OVERALL KD'} position={ovrKDR} value={ovrKD} titleFont={"Alegreya SC, serif"} titleColor={'#607d8b'} titleVariant={'h5'} titleShadow={'0 0 5px red, 0 0 10px black'}/>
            <RankItem title={'Win %'} position={winRP} value={winR} titleFont={"Kablammo, system-ui"} titleColor={'#76ff03'} titleVariant={'h5'} titleShadow={'0 0 5px #3e2723, 0 0 10px #3e2723'}/>

        </Box>

        <Box component="img" src={nameBorder}   sx={{width:borderWidth,top:borderTop,position:'absolute', height:borderHeight, left:borderLeft}}/>

        <Box sx={{width:'50%',top:nameTop,position:'absolute', height:'35%', left:'25%',overflow:'hidden',display:'flex',justifyContent:'center',}}>
            <Typography sx={{fontSize:nameSize, position:'relative',top:'15%',color:nameColor,fontFamily:nameFont,textShadow:nameShadow, justifyContent:'center', alignContent:'center'}}>
                {name}

            </Typography>   
        </Box>


        </>
    )
}
