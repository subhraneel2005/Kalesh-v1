import {Server} from "socket.io";
export function setupSocket(io:Server){
    io.on("connection", (socket) => {
        console.log("A user is now  connected", socket.id);

        socket.on("disconnect", () => {
            console.log("A user has disconnected");
        });

        //litsen
        socket.onAny((eventName:string, data:any) => {
            if(eventName.startsWith("clashing-")){
                console.log("The vote data is = ", data);
                
            }
        })
    });
}