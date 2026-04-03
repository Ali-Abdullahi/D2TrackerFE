import * as React from "react";
import ButtonBaseDemo from "./components/Button";
import BackgroundAnim from "./components/Background";
import NavBar from "./components/NavBar";
import { Box,Typography } from "@mui/material";
import Slideshow from "./components/Slides.jsx"
import RankContent from "./components/rankcontent";
import { useState,useEffect } from "react";


export default function Rankings() {
  const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:4001";
  const [fetchedPlayersData, setFetchedPlayersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);


  const playerNamesToFetch = [
    { name: "RedPhantom728", code: "0332", mType: 1, mId: "4611686018481484018" },
    { name: "SaboZeppeli", code: "0545", mType: 2, mId:"4611686018442519125"}, 
    { name: "Ronin24", code: "2465", mType:3, mId:"4611686018537748566",},
    { name: "Yellowflash3454", code: "7726", mType:3, mId:"4611686018484859421" },
  ];


  useEffect(() => {
    const fetchAllPlayersData = async () => {
        setIsLoading(true); 
        setError(null); 
  
        let playersDataPromises = playerNamesToFetch.map(async (player) => {
            
                const charRes = await fetch(`${BACKEND_API_BASE_URL}/get-char-ids/${player.mType}/${player.mId}`);
                if (!charRes.ok) throw new Error(`Could not get characters for ${player.name}`);
                const charData = await charRes.json();
                const charString = charData.characters.join(',');
                const [trialsRes, ibRes, compRes, careerRes] = await Promise.all([
                    fetch(`${BACKEND_API_BASE_URL}/get-Trials-stats/${player.mType}/${player.mId}/${charString}`),
                    fetch(`${BACKEND_API_BASE_URL}/get-IB-stats/${player.mType}/${player.mId}/${charString}`),
                    fetch(`${BACKEND_API_BASE_URL}/get-Comp-stats/${player.mType}/${player.mId}/${charString}`),
                    fetch(`${BACKEND_API_BASE_URL}/allTime-Stats/${player.mType}/${player.mId}`)
                ]);
                if (!trialsRes.ok || !ibRes.ok || !compRes.ok || !careerRes.ok) {
                    throw new Error(`Stat fetch failed for ${player.name}`);
                }

                const trialsData = await trialsRes.json();
                const ibData     = await ibRes.json();
                const compData   = await compRes.json();
                const careerData = await careerRes.json();

                return {
                    name: player.name,
                    trialsKDA: trialsData.averageKDA || "0.00", 
                    ibKDA:     ibData.averageKDA     || "0.00",
                    compKDA:   compData.averageKDA   || "0.00",
                    ovrKDA:    careerData.lifetimeKDA,
                    ovrKD:     careerData.lifetimeKD,
                    winR:      careerData.winRate
                };
        });

        const pointsMap = {
            ibKDA:    { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 },
            trialsKDA:  { 1: 4, 2: 3, 3: 2, 4: 1, 5: 0 },
            compKDA:    { 1: 7, 2: 5, 3: 4, 4: 3, 5: 2 },
            ovrKDA:   { 1: 12, 2: 9, 3: 7, 4: 5, 5: 3 },
            ovrKD:    { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 },
            winRate:    { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 }
        };

        try {
            const successfulPlayers = await Promise.all(playersDataPromises);

            const getStat = (player, stat) => parseFloat(player[stat]) || 0;
            const rankedByIB      = [...successfulPlayers].sort((a, b) => getStat(b, 'ibKDA') - getStat(a, 'ibKDA'));
            const rankedByTrials  = [...successfulPlayers].sort((a, b) => getStat(b, 'trialsKDA') - getStat(a, 'trialsKDA'));
            const rankedByComp    = [...successfulPlayers].sort((a, b) => getStat(b, 'compKDA') - getStat(a, 'compKDA'));
            const rankedByOvrKDA  = [...successfulPlayers].sort((a, b) => getStat(b, 'ovrKDA') - getStat(a, 'ovrKDA'));
            const rankedByOvrKD   = [...successfulPlayers].sort((a, b) => getStat(b, 'ovrKD') - getStat(a, 'ovrKD'));
            const rankedByWinRate = [...successfulPlayers].sort((a, b) => getStat(b, 'winR') - getStat(a, 'winR'));
            console.log("IB Leaderboard:", rankedByIB.map(p => `${p.name}: ${p.ibKDA}`));
            console.log("Comp Leaderboard:", rankedByComp.map(p => `${p.name}: ${p.compKDA}`));

            successfulPlayers.forEach(player => {
                player.totalScore = 0;
                const getRank = (sortedArray, playerValue, statKey) => {
                    return sortedArray.findIndex(p => getStat(p, statKey) === playerValue) + 1;
                };
                const trialsVal = getStat(player, 'trialsKDA');
                const ibVal     = getStat(player, 'ibKDA');
                const compVal   = getStat(player, 'compKDA');
                const trialsRank = getRank(rankedByTrials, trialsVal, 'trialsKDA');
                const ibRank     = getRank(rankedByIB, ibVal, 'ibKDA');
                const compRank   = getRank(rankedByComp, compVal, 'compKDA');
                const ovrKDARank = rankedByOvrKDA.findIndex(p => p.name === player.name) + 1;
                const ovrKDRank = rankedByOvrKD.findIndex(p => p.name === player.name) + 1;
                const winRank     = rankedByWinRate.findIndex(p => p.name === player.name) + 1;
                player.trialsP = trialsRank;
                player.ibR     = ibRank;
                player.compR   = compRank;
                player.ovrKDAR  = ovrKDARank; 
                player.ovrKDR   = ovrKDRank; 
                player.winRP    = winRank;
                player.totalScore += pointsMap.trialsKDA[trialsRank] || 0;
                player.totalScore += pointsMap.ibKDA[ibRank] || 0;
                player.totalScore += pointsMap.compKDA[compRank] || 0;
                player.totalScore += pointsMap.ovrKDA[ovrKDARank] || 0;
                player.totalScore += pointsMap.ovrKD[ovrKDRank] || 0;
                player.totalScore += pointsMap.winRate[winRank] || 0;
    
            });

            successfulPlayers.sort((a, b) => b.totalScore - a.totalScore);
            successfulPlayers.forEach((player, index) => { player.overallRank = index + 1; });
            successfulPlayers.sort((a, b) => b.overallRank - a.overallRank);

            setFetchedPlayersData(successfulPlayers);
            setIsLoading(false);

        } 
        catch (err) {
            console.error("Global Fetch Error:", err);
            setError("Fatal Error: Could not load the full leaderboard.");
            setIsLoading(false);
        }
    };
  
    fetchAllPlayersData(); 
}, []);


const playerAnimationMap = {
  "RedPhantom728": {
      video: "/videos/Warlockanim2.mov", 
      fadeDelay: '2500',
      videoWidth: '110vw', videoHeight: '110vh', videoTop: '-5%', videoLeft: '-5%',
  },
  "SaboZeppeli": {
      video:"/videos/Warlockanim3.mov",
      fadeDelay: '3000',
      videoWidth: '110vw', videoHeight: '110vh', videoTop: '-5%', videoLeft: '-5%',
  },
  "Ronin24": {
      video:"/videos/Titan Graphic.mov", 
      fadeDelay: '4000',
      videoWidth: '110vw', videoHeight: '110vh', videoTop: '-5%', videoLeft: '-5%',
  },
  "Yellowflash3454": {
      video:"/videos/Hunteranim1.mov",
      fadeDelay: '2500',
      videoWidth: '110vw', videoHeight: '110vh', videoTop: '-5%', videoLeft: '-5%',
  },
  "Awesomeman110444": {
      video:"/videos/Titananim2.mov",
      fadeDelay: '3500',
      videoWidth: '110vw', videoHeight: '110vh', videoTop: '-5%', videoLeft: '-5%',
  },
};


const playerStylingMap = {
    "RedPhantom728": {
        nameSize: "clamp(5.5rem, 8vw, 8rem)" 
    },
    "SaboZeppeli": {
        nameSize: "clamp(7rem, 10vw, 10rem)"
    },
    "Ronin24": {
        nameSize: "clamp(9rem, 12vw, 12rem)" 
    },
    "yellowflash3454": {
        nameSize: "5.5rem" 
    },
    "Awesomeman110444": {
        nameSize: "clamp(4rem, 6.5vw, 6.5rem)" 
    }
};





const slides=[
  ...fetchedPlayersData.map((player, idx) => {
      const hardcodedSlideStylingByRank = {
          1: { nameBorder: "/Images/Crimson2 Background Removed.png", borderHeight: "55%", borderWidth: "70%", nameColor: "#DC143C", nameFont: "Ole, cursive", nameShadow: "0 0 5px black, 0 0 10px #DC143C, 0 0 20px #DC143C", borderTop: "10%", borderLeft: "15.2%", nameTop: "16%"},
          2: {nameBorder: "/Images/Sapphirebdr Background Removed.png", borderHeight: "55%", borderWidth: "70%", nameColor: "#0F52BA", nameFont: "Jolly Lodger, system-ui", nameShadow: "0 0 5px black, 0 0 10px #0F52BA, 0 0 20px #0F52BA", borderTop: "10%", borderLeft: "15.2%", nameTop: "15%"},
          3: {nameBorder: "/Images/Newgoldborder Background Removed.png", borderHeight: "55%", borderWidth: "70%", nameColor: "#EFBF04", nameFont: "Macondo Swash Caps, cursive", nameShadow: "0 0 5px black, 0 0 10px #D3AF37, 0 0 20px #D3AF37", borderTop: "10%", borderLeft: "15.2%", nameTop: "15%"},
          4: {nameBorder: "/Images/silverborder2 Background Removed.png", borderHeight: "45%", borderWidth: "60%", nameColor: "#A9A9A9", nameFont: "Jolly Lodger, system-ui", nameShadow:"0 0 5px #black, 0 0 10px #A9A9A9, 0 0 20px #FFFFFF", borderTop: "13%", borderLeft: "20%", nameTop: "10%"},
          5: {nameBorder: "/Images/bronzeborder Background Removed.png", borderHeight: "40%", borderWidth: "60%", nameColor: "#A97142", nameFont: "Lilita One, sans-serif", nameShadow: "0 0 5px black, 0 0 10px #black, 0 0 20px #A97142", borderTop: "13%", borderLeft: "20%", nameTop: "10%"},
      };
      const slideStyling = hardcodedSlideStylingByRank[player.overallRank] || {}; 
      const playerSpecificAnimation = playerAnimationMap[player.name] || {};
      const playerStyling = playerStylingMap[player.name] || { nameSize: "clamp(6rem, 8rem, 10rem)" };

      return {
          Bcolor: 'black', 
          fadeDelay: playerSpecificAnimation.fadeDelay || '2500', 
          video: playerSpecificAnimation.video || "/videos/D2HomeAnim.mov", 
          videoWidth: playerSpecificAnimation.videoWidth || '110vw', 
          videoHeight: playerSpecificAnimation.videoHeight || '110vh', 
          videoTop: playerSpecificAnimation.videoTop || '-5%', 
          videoLeft: playerSpecificAnimation.videoLeft || '-5%',
          slideContent: (
              <RankContent
                  trialsKDA={player.trialsKDA} trialsP={player.trialsP}
                  ibKDA={player.ibKDA} ibR={player.ibR}
                  compKDA={player.compKDA} compR={player.compR}
                  ovrKDA={player.ovrKDA} ovrKDAR={player.ovrKDAR}
                  ovrKD={player.ovrKD} ovrKDR={player.ovrKDR}
                  winR={player.winR} winRP={player.winRP}
                  name={player.name}
                  
                  nameColor={slideStyling.nameColor} 
                  nameBorder={slideStyling.nameBorder} 
                  nameSize={playerStyling.nameSize} 
                  nameFont={slideStyling.nameFont} 
                  nameShadow={slideStyling.nameShadow} 
                  borderHeight={slideStyling.borderHeight} 
                  borderWidth={slideStyling.borderWidth} 
                  borderTop={slideStyling.borderTop} 
                  borderLeft={slideStyling.borderLeft} 
                  nameTop={slideStyling.nameTop} 
                  displayMode="full" 
              />
          ),
      };
  }),
];



  if (isLoading) {
    return (
        <BackgroundAnim Bcolor='black' Bgradient='none' fadeDelay='0'>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <Typography variant="h3" sx={{ color: 'white', fontFamily: 'Orbitron, sans-serif' }}>Loading Rankings...</Typography>
            </Box>
        </BackgroundAnim>
    );
  }


  if (error) {
    return (
        <BackgroundAnim Bcolor='black' Bgradient='none' fadeDelay='0'>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', p: 4 }}>
                <Typography variant="h3" sx={{ color: 'red', fontFamily: 'Orbitron, sans-serif' }}>Error Loading Data</Typography>
                <Typography variant="body1" sx={{ color: 'white', mt: 2 }}>{error}</Typography>
                <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>Please ensure your backend server is running and API key is correct.</Typography>
            </Box>
        </BackgroundAnim>
    );
  }
 


  return(
    <Slideshow slides={slides}>
    <NavBar>
    <Box sx={{ position: 'absolute', left: '2%', top: '1vh' }}>
      <ButtonBaseDemo
          image="/Images/Homebutton.png"
          height={110}
          borderradius={300}
          textcolorh={'#bbdefb'}
          textshadow={'-1px -1px 0 black,  1px -1px 0 black,  -1px  1px 0 black, 1px  1px 0 black, 0 0 5px #bbdefb, 0 0 10px #bbdefb, 0 0 20px #e3f2fd'}
          title="HOME"
          override="/"
          txtY={2}
      />
    </Box>
    <Box sx={{ position: 'absolute', left: '87%', top: '3vh' }}>
      <ButtonBaseDemo
          image="/Images/Newbuttonborder.png"
          height={50}
          width="18vh"
          borderradius={1}
          textcolorh={'#ffc400'}
          textshadow={'0 0 5px #18ffff, 0 0 10px #18ffff, 0 0 20px #ffff00'}
          title="Expand Rankings"
          txtY={1.1}  
          fontsize="0.8rem"
          txtcolor='#616161'
          Widthtxtbox="10"
          override="/rankings/ExpandedRankings"
          state={{ leaderboard: fetchedPlayersData }}
        />
    </Box>
    </NavBar>
    </Slideshow>
    )
}
