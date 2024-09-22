import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import cors from "cors";
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import fileUpload from "express-fileupload";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL
    }
});
export { io };
setupSocket(io);
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.static("public"));
//settig ejs viewEngine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
//Routes
app.use(Routes);
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
        name: "Redis",
    });
    // await sendEmail("cobaja4295@asaud.com", "New Test", html);
    await emailQueue.add(emailQueueName, { to: "cobaja4295@asaud.com", subject: "Email successfull", body: html });
    return res.json({ mesage: "Email send successfully" });
});
//Queues
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/emailjob.js";
import { appLimiter } from "./config/rate-limit.js";
import { setupSocket } from "./socket.js";
server.listen(PORT, () => console.log(`Setavanga Server rumming on port = ${PORT}`));
