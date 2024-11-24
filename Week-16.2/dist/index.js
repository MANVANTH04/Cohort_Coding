"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usercounter = 0;
wss.on("connection", (socket) => {
    usercounter++;
    console.log("New client connected " + usercounter);
});
