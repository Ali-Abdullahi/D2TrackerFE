import React from "react";
import { useLocation } from "react-router-dom";
import BackgroundAnim from "./components/Background";
import NavBar from "./components/NavBar";
import ButtonBaseDemo from "./components/Button";
import { Box, Typography } from "@mui/material";
import RankItem from "./components/RankItems";

function getRankSuffix(rank) {
    if (rank === 11 || rank === 12 || rank === 13) return 'th';
    const lastDigit = rank % 10;
    switch (lastDigit) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

const PlayerRow = ({ player, verticalPosition }) => {
    const rankStylingMap = {
        1: { color: '#dc143c', shadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' }, 
        2: { color: '#0f52ba', shadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' }, 
        3: { color: '#ffd700', shadow: '0 0 5px black, 0 0 10px #ffd700' }, 
        4: { color: '#a9a9a9', shadow: '0 0 5px black, 0 0 10px #a9a9a9' }, 
        5: { color: '#cd7f32', shadow: '0 0 5px black, 0 0 10px #cd7f32' } 
    };

    const style = rankStylingMap[player.overallRank] || rankStylingMap[5];
    const playerFontSize = player.name.length > 12 ? '1rem' : '1.3rem'; 

    return (
        <Box sx={{
            position: 'absolute',
            left: '2.5%',
            top: verticalPosition,
            height: '12vh',
            width: '95%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <RankItem title={`${player.overallRank}${getRankSuffix(player.overallRank)}`} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={player.name.toUpperCase()} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={playerFontSize} />
            <RankItem title={player.trialsKDA} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={player.ibKDA} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={player.compKDA} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={player.ovrKDA} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={player.ovrKD} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
            <RankItem title={`${player.winR}%`} titleFont={"Orbitron, sans-serif"} titleColor={style.color} titleShadow={style.shadow} titleWeight={900} titleSize={'2rem'} />
        </Box>
    );
};

export default function ExpandedRankings(){
    const location = useLocation();
    const fetchedPlayersData = location.state?.leaderboard || [];
    return(
        <BackgroundAnim Bgradient={'linear-gradient(to bottom right, #1a2a40 0%, #2a3a50 25%, #4a3a60 50%, #6a4a70 75%, #8a5a80 100%)'} Bcolor={'black'} fadeDelay="100">
            <Box sx={{position: 'absolute', left: '17%', top: '12vh', height:'12vh', width:'65%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography sx={{fontSize:'4rem', fontFamily:"Orbitron, sans-serif", background: `linear-gradient(to right, #dc143c 0%, #0f52ba 25%, #ffd700 50%, #a9a9a9 75%, #cd7f32 100% )`,WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',backgroundClip: 'text',color: 'transparent',textShadow: '0 0 8px rgba(255,255,255,0.5)', }}>
                    LEADERBOARD
                </Typography>
            </Box>

            <Box sx={{position: 'absolute', left: '2.5%', top: '24vh', height:'12vh', width:'95%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <RankItem title={'RANK'}  titleFont={"Orbitron, sans-serif"} titleColor={'#ff7043'}  titleShadow={'0 0 5px black, 0 0 10px #ff7043'} fontWeight={900}/>
                <RankItem title={'PLAYER'}  titleFont={"Orbitron, sans-serif"} titleColor={'#ffff00'}  titleShadow={'0 0 5px black, 0 0 10px #ffff00'} fontWeight={900}/>
                <RankItem title={'TRIALS'}  titleFont={"Kablammo, system-ui"} titleColor={'Black'}  titleShadow={'0 0 5px #ffff00, 0 0 10px #ffff00'}/>
                <RankItem title={'IRON BANNER'}  titleFont={"Metal Mania, cursive"} titleColor={'#8d6e63'}  titleShadow={'0 0 5px #3e2723, 0 0 10px #3e2723'}/>
                <RankItem title={'COMP'}  titleFont={"Knewave, system-ui"} titleColor={'#e53935'}  titleShadow={'0 0 5px black, 0 0 10px #9e9e9e'}/>
                <RankItem title={'OVR KDA'}  titleFont={"Alegreya SC, serif"} titleColor={'#eeeeee'}  titleShadow={'0 0 5px black, 0 0 10px black'}/>
                <RankItem title={'OVR KD'}  titleFont={"Alegreya SC, serif"} titleColor={'#607d8b'}  titleShadow={'0 0 5px red, 0 0 10px black'}/>
                <RankItem title={'Win%'}  titleFont={"Kablammo, system-ui"} titleColor={'#76ff03'} titleVariant={'h5'} titleShadow={'0 0 5px #3e2723, 0 0 10px #3e2723'}/>               
            </Box>

            <Box sx={{ position: 'absolute', top: '37vh', width: '100%', height: '60vh' }}>
                {fetchedPlayersData.sort((a, b) => a.overallRank - b.overallRank) .map((player, index) => (
                <PlayerRow 
                    key={player.name} 
                    player={player} 
                    verticalPosition={`${index * 11}vh`} 
                />
                ))
            }
            </Box>

            <NavBar>
                <Box sx={{ position: 'absolute', left: '2%', top: '1vh'}}>
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

                <Box sx={{ position: 'absolute', left: '90%', top: '3vh' }}>
                <ButtonBaseDemo
                    image="/Images/RankingsButton.png"
                    height={40}
                    borderradius={1}
                    textcolorh={'#ffc400'}
                    textshadow={'0 0 5px #ffc400, 0 0 10px #ffc400, 0 0 20px #ffff00'}
                    title="RANKINGS"
                    txtY={1}  
                    fontsize="1rem"
                    txtcolor='#ffab00'
                    Widthtxtbox="10"
                    override="/Rankings"
                />
                </Box>
            </NavBar>
        </BackgroundAnim>
    )
}