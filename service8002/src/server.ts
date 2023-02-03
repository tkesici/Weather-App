import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8002;
const APIURL_8000 = process.env.APIURL_8000;
const APIURL_8001 = process.env.APIURL_8001;
const APIURL_8002 = process.env.APIURL_8002;
const APIURL_8003 = process.env.APIURL_8003;
const APIURL_8004 = process.env.APIURL_8004;

app.get("/", (req, res) => {
    res.sendFile(__dirname, + "./client/index.html")
})

app.post("/antalyaWeather", (req, res) => {
    axios({
        method: 'post',
        url: APIURL_8001 + "/antalyaWeather",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Antalya" }
    })
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.sendStatus(500);
            console.log(error);
        });
})

const server = app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})

// sigterm handler
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        process.exit(0);
    });
});
// sigint handler
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        process.exit(0);
    });
});
