import express, { Application,Response, Request } from "express";
import "dotenv/config";

const app:Application = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req:Request, res:Response) => {
    return res.send("hat tere mai ke chodo")
})

app.listen(PORT, () => console.log(`Setavanga Server rumming on port = ${PORT}`)
);