import { winCoordinateInfo } from "@/typescript/constantes";
import { Dispatch, SetStateAction, useState } from "react"

export default function GameBox({
    boxValue,
    index,
    hashtagMap,
    playerOne,
    setPlayerOne,
    winPlayer,
    winCoordinates
}: {
    boxValue: string,
    index: number,
    hashtagMap: any[],
    playerOne: boolean,
    setPlayerOne: Dispatch<SetStateAction<boolean>>,
    winPlayer: string,
    winCoordinates: number | undefined,
}) {
    const checkValue = () => {
        if(boxValue === 'X'){
            return (
                <>
                    <div style={{
                        position: 'absolute',
                        width: '100px',
                        height: '7px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, red 50%, transparent 0%)',
                        backgroundSize: '200% 100%',
                        backgroundPosition: 'right',
                        rotate: '45deg',
                        animation: 'XAnimation 0.5s forwards',
                        animationDelay: '0.5s',
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '100px',
                        height: '7px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, red 50%, transparent 0%)',
                        backgroundSize: '200% 100%',
                        backgroundPosition: 'right',
                        rotate: '-45deg',
                        animation: 'XAnimation 0.5s forwards',
                        animationDelay: '0.2s',
                    }} />
                </>
            );
        }

        if(boxValue === 'O'){
            return (
                <>
                    <svg height={100} width={100}>
                        <circle 
                            cx={50} 
                            cy={50} 
                            r={40} 
                            style={{
                                fill: 'black',
                                stroke: 'blue',
                                strokeWidth: '4px',
                                strokeDasharray: '250',
                                strokeDashoffset: '250',
                                animation: 'OAnimation 1s forwards',
                            }}
                        />
                    </svg>
                </>
            );
        }

        return <></>
    }

    const checkVictory = () => {
        const positionIndex = winCoordinateInfo(winCoordinates).indexs;
        const rotate = winCoordinateInfo(winCoordinates).rotate;
        const delay = () => {
            if(positionIndex[0] === index){
                return 0.2
            }
            if(positionIndex[1] === index){
                return 0.4
            }
            if(positionIndex[2] === index){
                return 0.6
            }
        };

        if(!positionIndex?.includes(index)){
            return <></>
        }

        return (
            <div style={{
                position: 'absolute',
                width: [45, 135].includes(rotate) ? '310px' : '250px',
                height: '8px',
                backgroundColor: 'red',
                background: 'linear-gradient(to right, #F05E16 50%, transparent 0%)',
                backgroundSize: '200% 100%',
                backgroundPosition: 'right',
                borderRadius: '10px',
                rotate: `${rotate}deg`,
                animation: 'XAnimation 0.5s forwards',
                animationDelay: `${delay()}s`
            }}/>
        );
    }

    const handleOnClick = () => {
        hashtagMap.fill(playerOne ? 'X' : 'O', index, index + 1);
        setPlayerOne(!playerOne)
    }

    return (
        <div 
            key={index}
            style={{
                width: '196px',
                height: '196px',
                borderRight: '4px white solid',
                borderBottom: '4px white solid',
                cursor: 'pointer',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={() => boxValue === '' && winPlayer === '' ? handleOnClick() : null}
        > 
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {checkValue()}
                {checkVictory()}
            </div>
        </div>
    )
}