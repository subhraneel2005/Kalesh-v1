import { votingQueue, votingQueueName } from "./jobs/VotingJob.js";
import { commentQueue, commentQueueName } from "./jobs/CommentJob.js";
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
            else if (eventName.startsWith("clashing_comment-")) {
                console.log("The comment data is = ", data);
                await commentQueue.add(commentQueueName, data);
                socket.broadcast.emit(`"clashing_comment-${data?.id}`, data);
            }
        });
    });
}
