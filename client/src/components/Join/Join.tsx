import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Fade, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import {io, Socket} from 'socket.io-client'
import RandomCodeRoom from '../RandomCodeRoom.jsx'


export default function Join({
    setSocket,
    setRoomCodeG,
    setUserNameG
}: {
    setSocket: (value: Socket) => void
    setRoomCodeG: (value: string) =>void
    setUserNameG: (value: string) =>void
}) {
    const userNameRef = useRef();
    const roomCodeRef = useRef();
    const navigate = useNavigate();
    const [valueInput, setValueInput] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [showEnterRoom, setShowEnterRoom] = useState(false);
    const [socketLocal, setSocketLocal] = useState<Socket>();
    const [roomCode, setRoomCode] = useState('');

    const handleInputChange = (event) => {
        setValueInput(event.target.value);
    }

    const handleSubmit = async() => {
        const userName = userNameRef.current?.value;
        const randomNumber = RandomCodeRoom(5);
        
        if(!userName.trim()) return

        const socket: Socket = await io('http://192.168.0.102:3001');

        setRoomCode(randomNumber);

        socket.emit('setUserName', userName);
        socket.emit('setRoomCode', randomNumber);

        setRoomCodeG(randomNumber);
        setUserNameG(userName);

        setSocket(socket);
        setSocketLocal(socket);
    };

    const handleJoinInRoom = async() => {
        const userName = userNameRef.current?.value;
        const code = roomCodeRef.current?.value;
        
        if(!userName.trim()) return
        if(!code.trim()) return

        const socket: Socket = await io('http://192.168.0.102:3001');

        setRoomCode(code);

        socket.emit('setUserName', userName);
        socket.emit('setRoomCode', code);

        setRoomCodeG(code);
        setUserNameG(userName);

        setSocket(socket);
        setSocketLocal(socket);
    }

    useEffect(() => {
        if(valueInput.trim() && valueInput != '') { 
            setShowButtons(true);
        }else{
            setShowButtons(false);
        }
    }, [valueInput]);

    useEffect(() => {
        socketLocal?.on('roomFull', (response, boolean) => {
            if(response === roomCode && boolean === true){
                alert('Sala Cheia');
            }else if(response === roomCode && boolean === false){
                navigate('/Game#'+roomCode);
            }
        });
    }, [socketLocal]);

    return (
        <>
            <Box sx={{
                width: '100vw',
                textAlign: 'center',
                position: 'relative',
            }}>
                <Typography sx={{marginBottom: '20px'}} variant='h1'>JOIN</Typography>
                <FormControl> 
                    <InputLabel sx={{color: '#0276aa'}}>Nome de usuário</InputLabel>
                    <Input type='text' sx={{color: 'white'}} value={valueInput} onChange={handleInputChange} inputRef={userNameRef}></Input>
                    
                    {showEnterRoom && showButtons ? 
                        <Fade in={showEnterRoom}>
                            <FormControl sx={{marginTop: '20px'}}>
                                <InputLabel sx={{color: '#0276aa'}}>Código da Sala</InputLabel>
                                <Input type='text' sx={{color: 'white'}} inputRef={roomCodeRef}></Input>
                            </FormControl>
                        </Fade>
                    : <></>}

                    {showButtons ? 
                        <>
                            <Fade in={showButtons}>
                                <Button 
                                    onClick={() => showEnterRoom ? handleJoinInRoom() : setShowEnterRoom(true)}
                                    sx={{
                                        marginTop: '20px',
                                        opacity: 1,
                                        transform: 'all 2s',
                                    }} 
                                >
                                    {showEnterRoom ? 'Entrar' : 'Entrar em uma Sala'}
                                </Button>
                            </Fade>
                            <Fade in={showButtons}>
                                <Button 
                                    onClick={() => handleSubmit()}
                                    sx={{
                                        opacity: 1,
                                        transform: 'all 2s',
                                    }} 
                                >
                                    Criar uma Sala
                                </Button>
                            </Fade>
                        </>
                    : <></>}

                    <Button onClick={() => navigate('/Off')}>Jogar Offline</Button>
                </FormControl>
            </Box>
        </>
    )
}
