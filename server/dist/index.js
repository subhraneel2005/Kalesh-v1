import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import { sendEmail } from "./config/mail.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//settig ejs viewEngine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
        name: "Subraneel Goswami",
    });
    await sendEmail("cobaja4295@asaud.com", "New Test", html);
    return res.json({ mesage: "Email send successfully" });
});
app.listen(PORT, () => console.log(`Setavanga Server rumming on port = ${PORT}`));
