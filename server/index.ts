import express, {Request, Response} from "express";
import {Server, Socket} from "socket.io";
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://192.168.0.102:5173', 'http://26.231.193.230:5173'],
        methods: ['GET', 'POST'],
    }
});
const PORT = 3001;
const IP = '0.0.0.0';

const usersInRoom: Record<string, number> = {};
const usersInRoomName: Record<string, string> = {};
const roomScoreX: Record<string, number> = {};
const roomScoreO: Record<string, number> = {};

io.on('connection', (socket: Socket) => {
    socket.on('setUserName', userName => {
        socket.data.username = userName;
    });
    socket.on('setRoomCode', roomCode => {
        if(usersInRoom[roomCode] === undefined || usersInRoom[roomCode] < 2){

            usersInRoom[roomCode] = (usersInRoom[roomCode] || 0) + 1;

            usersInRoomName[roomCode] = usersInRoomName[roomCode] ? usersInRoomName[roomCode] + '|' + socket.data.username : socket.data.username;

            socket.data.roomCode = roomCode;

            io.emit('roomFull', roomCode, false);
            io.emit('roomPlayers', roomCode, usersInRoomName[roomCode]);
        }else{
            io.emit('roomFull', roomCode, true);  
        } 
    });
    socket.on('gameInformation', (game, local, isPlayerOne) => {
        io.emit('updateGame', socket.data.roomCode, socket.data.username, game, local, isPlayerOne);
    });
    socket.on('gameVictory', (gameVictory) => {
        const roomCode = socket.data.roomCode;

        roomScoreO[roomCode] = gameVictory === 'O' ? (roomScoreO[roomCode] || 0) + 0.5 : (roomScoreO[roomCode] || 0);
        roomScoreX[roomCode] = gameVictory === 'X' ? (roomScoreX[roomCode] || 0) + 0.5 : (roomScoreO[roomCode] || 0);

        const score = `${roomScoreO[roomCode]} - ${roomScoreX[roomCode]}`;

        io.emit('score', socket.data.roomCode, score);
        console.log(score);
    });
}); 

server.listen(PORT, IP, () => console.log('Server running'));