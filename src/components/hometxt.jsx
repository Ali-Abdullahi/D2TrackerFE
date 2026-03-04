import React from "react";
import { Typography } from "@mui/material";
import {Box} from "@mui/material";
import ScrollTrigger from "./ScrollTrigger";
import { useState,useEffect } from "react";






const textSections = [
    {
      type: "h3",
      fontFamily: "Orbitron, sans-serif",
      content: (
        <span style={{ textShadow: '0 0 5px black, 0 0 10px #8c9eff', color: '#8c9eff', fontWeight: 'bold' }}>
          Welcome to the Hall of Guardians
        </span>
      ),
    },
    {
      type: "h3",
      content: (
        <span style={{ textShadow: '0 0 5px black, 0 0 10px black', color: '#69f0ae', fontWeight: 'bold' }}>
          House Of Joestar
        </span>
      ),
    },
    {
      type: "h5",
      fontStyle: "italic",
      content: '"Only the strongest rise. Will your Light shine the brightest?"',
    },
    {
      type: "body1",
      fontStyle: "italic",
      fontSize:"2rem",
      content: <>Welcome to the official tracker for <span style={{ textShadow: '0 0 5px black, 0 0 10px black', color: '#69f0ae', fontWeight: 'bold' }}>House Of Joestar</span>, where every bullet fired and every match fought fuels the fire of friendly rivalry."</>
    },
    {
      type: "body1",
      fontSize:"1.1rem",
      content: (
        <>
          This site ranks our finest Guardians — <span style={{ textShadow: '0 0 5px black, 0 0 10px #fdd835', color: '#fdd835', fontWeight: 'bold' }}>RedPhantom728, SaboZeppeli, Ronin24, Yellowflash3454, Awesomeman110444</span> — across the deadliest trials Destiny has to offer:
        </>
      ),
    },
    {
      type: "h6",
      fontSize:"6rem",
      fontFamily:"Orbitron, sans-serif",
      content: (
        <>
          🐺<span style={{ textShadow: '0 0 5px #3e2723, 0 0 10px #3e2723', color: '#5d4037', fontWeight: 'bold' }}>Iron Banner</span>
          <br />
          ⚔️ <span style={{ textShadow: '0 0 5px #78909c, 0 0 10px #b0bec5', color: '#d50000', fontWeight: 'bold' }}>Competitive</span>
          <br />
          👁️ <span style={{ textShadow: '0 0 5px #ffff00, 0 0 10px #ffff00', color: 'black', fontWeight: 'bold' }}>Trials of Osiris</span>
        </>
      )
    },
    {
      type: "body1",
      fontSize:"1.7rem",
      content: (
        <>
        Each Guardian’s KDA, Win %, and Kill Efficiency are tracked and ranked from 
       <span style={{color:"#CE8946",textShadow: "0 0 10px #ffc107" }}> Bronze </span> 
       to 
       <span style={{color:"#B22222", textShadow: '0 0 5px #dc143c, 0 0 10px #dc143c, 0 0 20px #ff0000'}}> Crimson </span> 
       .
        </>
        )
    },
    {
      type: "h6",
      fontSize:"2.5rem",
      fontWeight: "bold",
      content: (
        <>
        "Who leads the <span style={{ textShadow: '0 0 5px black, 0 0 10px black', color: '#69f0ae'}}>House Of Joestar</span>
        ? Who needs to step up?"
        </>)
    },
    {
      type: "h6",
      fontSize:"1.7rem",
      fontWeight: "bold",
      content: "It's time to find out.",
    },
  ];




  export default function HomeText({}) {
    const [activeIndex, setActiveIndex] = useState(-1); 

    
    return (
      <Box sx={{ position: 'relative',width: '100%', height: '100vh', }}>

        <Box sx={{position:'absolute', top:0, left:0, width:'100%', height: `${textSections.length * 15}vh`,overflowY: 'scroll',zIndex: 1, scrollSnapType: 'y mandatory',scrollBehavior:'smooth' }}>

          {textSections.map((_, index) => (
            <ScrollTrigger key={index} index={index} setActiveIndex={setActiveIndex} />
          ))}
        </Box>
  
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 4,
            zIndex:10,
            pointerEvents: 'none',
         
          }}
        >
          
          {textSections.map((section, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                color: "#e3f2fd",
                textShadow: "-1px -1px 0 black,  1px -1px 0 black,  -1px  1px 0 black, 1px  1px 0 black, 0 0 10px #42a5f5, 0 0 20px #90caf9",
                transition: 'opacity 0.6s ease-in-out, transform 1s ease-in-out',
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'translateY(0)' : 'translateY(50px)',
              }}
            >
              <Typography
                variant={section.type}
                fontFamily={section.fontFamily}
                fontStyle={section.fontStyle}
                fontWeight={section.fontWeight}
                fontSize={section.fontSize}
              >
                {section.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }