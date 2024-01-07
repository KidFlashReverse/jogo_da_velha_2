import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import Join from './components/Join/Join';
import Game from './components/Game/JogoDaVelha.tsx';
import Off from './components/Game/Offline/JogoDaVelhaOff.jsx';

export default function(){

    const [players, setPlayers] = useState('');
    const [socket, setSocket] = useState<Socket>();
    const [roomCodeG, setRoomCodeG] = useState('');
    const [userNameG, setUserNameG] = useState('');

    useEffect(() => {
      socket?.on('roomPlayers', (roomCode, players) => {
          if(roomCode === roomCodeG){
              setPlayers(players);
          }
      });
    }, [socket]);

    return(
        <BrowserRouter>
           <Routes>
             <Route path = "/"  element = {<Join setSocket={setSocket} setRoomCodeG={setRoomCodeG} setUserNameG={setUserNameG} />} />
             <Route path = "/Game" element = {<Game socket={socket} players={players} userNameG={userNameG} roomCodeG={roomCodeG} />} />
             <Route path = "/Off" element = {<Off />} />
           </Routes>
        </BrowserRouter>
  );
}