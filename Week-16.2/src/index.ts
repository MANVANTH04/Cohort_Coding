import {WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port: 8080});

interface User{
    socket: WebSocket;
    room: string;
}

let usercounter = 0;
let allSockets: User[] = [];


// there are some errors. please fix them.




wss.on("connection", (socket)=>{
    socket.on("message", (message)=>{
        // @ts-ignore
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "join"){
            allSockets.push({
                socket: socket,
                room: parsedMessage.payload.room
            });
        }

        if (parsedMessage.type == "chat") {
            // const currentserRoom = allSockets. find ((x) => x.socket = socket). room
            let currentUserRoom = null;
            for (let i = 0; i < allSockets. length; i++) {
                if (allSockets[i].socket == socket) {
                currentUserRoom = allSockets[i].room
                }
        }

            for (let i = 0; i < allSockets. length; i++) {
                // @ts-ignore
                if (allSockets[i].room = currentUserRoom) {
                allSockets [i].socket.send (parsedMessage.payload.message)
            }
        }
    }

    })
})










    //  socket.on("message", (message)=>{
    //     console.log("message recieved" + message.toString() + "from" + usercounter);

    //     // const s = allSockets;
    //     // allSockets.forEach(()=>{
    //     //     const s = all
    //     // })

    //     for (let i = 0; i< allSockets.length; i++){
    //         const s = allSockets[i];
    //         s.send(message.toString()+ "from" + usercounter);