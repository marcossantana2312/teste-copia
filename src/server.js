import express from "express";
import bodyParser from "body-parser";
const router = require("./routes");
const connectDb = require("./mongoose")

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(router);

console.log(process.env.DATABASE_URL);

connectDb().then(async () => {
    app.listen(PORT, () => {
        console.log("Server listenin on port " + PORT);
    })
});