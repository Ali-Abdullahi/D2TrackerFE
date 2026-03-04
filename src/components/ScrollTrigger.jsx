import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useInView } from 'react-intersection-observer';

export default function ScrollTrigger({ index, setActiveIndex }) {
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
          setActiveIndex(index);
        }
      }, [inView, index, setActiveIndex]);
    
      return (
        <Box
          ref={ref}
          sx={{height: '100vh',width: '100%', scrollSnapAlign: 'start',}}
        />
      );
    }
    



