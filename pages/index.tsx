import GameBox from "@/components/gameBox";
import { useState } from "react";

export default function Deashboard() {
    const [hashtagMap, setHashtagMap] = useState(Array(9).fill(''));
    const [playerOne, setPlayerOne] = useState(true);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                width: '600px',
                height: '600px',
                backgroundColor: 'black',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {hashtagMap.map((value, index) => {
                    return (
                        <GameBox 
                            boxValue={value}
                            index={index}
                            hashtagMap={hashtagMap}
                            playerOne={playerOne}
                            setPlayerOne={setPlayerOne}
                        />
                    );
                })}                
            </div>
        </div>
    );
}