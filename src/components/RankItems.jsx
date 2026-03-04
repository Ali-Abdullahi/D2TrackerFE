import React from "react";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {useState} from "react";

export default function RankItem({value,position,title,titleColor,titleShadow,titleFont,titleVariant,titleWeight,titleSize}){
    const[isHovered,setHovered]=useState(false);

    const getColorForKDA = (kdaValue) => {
        if (kdaValue < 1.0) {
            return '#f44336'; 
        } else if (kdaValue >= 1.0 && kdaValue < 1.5) {
            return '#ffeb3b'; 
        } else if (kdaValue >= 1.5 && kdaValue < 2.0) {
            return '#81c784'; 
        } else if (kdaValue > 2.0) {
            return '#1b5e20'; 
        }
        
        else { 
            return '#9e9e9e'; 
        }
    };

    const getColorForKD = (kdValue) => {
        if (kdValue < 0.9) {
            return '#f44336'; 
        } else if (kdValue >= 0.9 && kdValue < 1.3) {
            return '#ffeb3b'; 
        } else if (kdValue >= 1.3 && kdValue <1.7) {
            return '#81c784'; 
        } else {
            return '#388e3c';
        }
    };


    const getColorForPosition = (positionNumber) => {
        switch (positionNumber) {
            case 1:
                return '#dc143c';
            case 2:
                return '#0f52ba'; 
            case 3:
                return '#ffd700'; 
            case 4:
                return '#a9a9a9'; 
            case 5:
                return '#cd7f32'; 
            default:
                return '#ffffff'; 
        }
    };

    const getColorForWin = (winValue) => {
        if (winValue < 25) {
            return '#f44336'; 
        } else if (winValue >= 25 && winValue < 45) { 
            return '#ffeb3b'; 
        } else if (winValue >= 45 && winValue < 70) { 
            return '#81c784'; 
        } else {
            return '#388e3c'; 
        }
    };


    const getOrdinalSuffix = (num) => {
        if (typeof num !== 'number' || isNaN(num)) {
            return '';
        }
        const s = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return(
        
        <Box sx={{width:'15%',height:'80%', display:'flex', flexDirection:'column', alignItems:'center',}}>
        <Box sx={{width:'75%',height:'28%', display:'flex', flexDirection:'column', alignItems:'center', transformStyle: 'preserve-3d', transition: 'transform 0.6s ease-in-out',transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',position:'relative'}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >

            <Typography
                variant="h2"
                sx={{
                    fontWeight: 'bold',
                    color: title === 'Win %' ? getColorForWin(value) : (title===('KD') ? getColorForKD(value) : getColorForKDA(value)),
                    fontFamily: 'Orbitron, sans-serif',
                    mb: 0.5,
                    backfaceVisibility: 'hidden',
                    position:'absolute',
                    textShadow:'0 0 5px black, 0 0 10px black'
                }}
            >
               {value}{title === 'Win %'}
            </Typography>

            <Typography 
                variant="h2" 
                sx={{
                    fontWeight:'bold', 
                    color:getColorForPosition(position),
                    fontFamily: 'Orbitron, sans-serif',
                    backfaceVisibility: 'hidden',
                    position:'absolute',
                    transform: 'rotateY(180deg)'
                }}
                  
            >
                {getOrdinalSuffix(position)}

            </Typography>




            </Box>


            <Typography
                variant={titleVariant}
                sx={{
                    color: titleColor,
                    textShadow: titleShadow,
                    fontFamily: titleFont,
                    fontWeight:titleWeight,
                    fontSize:titleSize,
                }}
            >
                {title}
            </Typography>

        </Box>


    

        


    )



}