import GameBox from "@/components/gameBox";
import { useEffect, useState } from "react";

export default function Deashboard() {
    const [hashtagMap, setHashtagMap] = useState(Array(9).fill(''));
    const [playerOne, setPlayerOne] = useState(true);
    const [winPlayer, setWinPlayer] = useState<string>('');
    const [winCoordinates, setWinCoordinates] = useState<number>();

    const handleChange = () => {
        const checkVictory = [
            [hashtagMap[0], hashtagMap[1], hashtagMap[2]],//coordinate 0
            [hashtagMap[3], hashtagMap[4], hashtagMap[5]],//coordinate 1
            [hashtagMap[6], hashtagMap[7], hashtagMap[8]],//coordinate 2

            [hashtagMap[0], hashtagMap[3], hashtagMap[6]],//coordinate 3
            [hashtagMap[1], hashtagMap[4], hashtagMap[7]],//coordinate 4
            [hashtagMap[2], hashtagMap[5], hashtagMap[8]],//coordinate 5
            
            [hashtagMap[0], hashtagMap[4], hashtagMap[8]],//coordinate 6
            [hashtagMap[2], hashtagMap[4], hashtagMap[6]],//coordinate 7
        ];

        checkVictory.map((value, index) => {
            if(value.every((item) => item === 'X')) return (setWinPlayer('1'), setWinCoordinates(index))
            if(value.every((item) => item === 'O')) return (setWinPlayer('2'), setWinCoordinates(index))
        });

        if(hashtagMap.every((value) => value != '') && winPlayer === undefined){
            return setWinPlayer('Velha');
        }
    }

    useEffect(() => {
        handleChange()
    }, [playerOne, hashtagMap]);

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
                            winPlayer={winPlayer}
                            winCoordinates={winCoordinates}
                        />
                    );
                })}             
            </div>
        </div>
    );
}