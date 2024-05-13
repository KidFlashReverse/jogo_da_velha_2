import { Dispatch, SetStateAction } from "react"

export default function GameBox({
    boxValue,
    index,
    hashtagMap,
    playerOne,
    setPlayerOne,
}: {
    boxValue: string,
    index: number,
    hashtagMap: any[],
    playerOne: boolean,
    setPlayerOne: Dispatch<SetStateAction<boolean>>
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
                        animation: 'XAnimation 0.7s forwards',
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
                        animation: 'XAnimation 0.7s forwards',
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
                                animation: 'OAnimation 1.5s forwards',
                            }}
                        />
                    </svg>
                </>
            );
        }

        return <></>
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
            onClick={() => boxValue === '' ? handleOnClick() : null}
        > 
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {checkValue()}
            </div>
        </div>
    )
}