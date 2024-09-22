import { votingQueue, votingQueueName } from "./jobs/VotingJob.js";
export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("A user is now  connected", socket.id);
        socket.on("disconnect", () => {
            console.log("A user has disconnected");
        });
        //litsen
        socket.onAny(async (eventName, data) => {
            if (eventName.startsWith("clashing-")) {
                console.log("The vote data is = ", data);
                await votingQueue.add(votingQueueName, data);
                socket.broadcast.emit(`clashing-${data?.kaleshId}`, data);
            }
        });
    });
}
