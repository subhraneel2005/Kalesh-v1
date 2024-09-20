import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import Routes from "./routes/index.js";
import fileUpload from "express-fileupload";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
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
app.listen(PORT, () => console.log(`Setavanga Server rumming on port = ${PORT}`));
