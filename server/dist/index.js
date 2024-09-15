import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    return res.send("hat tere mai ke chodo");
});
app.listen(PORT, () => console.log(`Setavanga Server rumming on port = ${PORT}`));
