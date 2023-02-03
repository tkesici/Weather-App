import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import {weatherRoute} from './weather';

dotenv.config();

const PORT = process.env.PORT || 8000;
const APIURL_8000 = process.env.APIURL_8000;
const APIURL_8001 = process.env.APIURL_8001;
const APIURL_8002 = process.env.APIURL_8002;
const APIURL_8003 = process.env.APIURL_8003;
const APIURL_8004 = process.env.APIURL_8004;

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: ["application/json"]}));

app.use("/weather_8000_1", weatherRoute);
app.use("/weather_8000_2", weatherRoute);

app.post("/service1loop1", (req, res) => {
    axios({
        method: 'post',
        url: APIURL_8001 + "/request_service_8001",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Eskisehir" }
    })
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.sendStatus(500);
            console.log(error);
        });
})

app.post("/service_8000_loop_1", (req, res) => {
    axios({
        method: 'post',
        url: APIURL_8001 + "/request_service_8001",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Test" }
    })
    .then(function (response) {
        res.json(response.data);
    })
    .catch(function (error) {
        res.sendStatus(500);
        console.log(error);
    });
});

app.post("/service_8000_loop_2", (req, res) => {
    axios({
        method: 'post',
        url: APIURL_8000 + "/request8002",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Test" }
    })
    .then(function (response) {
        res.json(response.data);
    })
    .catch(function (error) {
        res.sendStatus(500);
        console.log(error);
    });
});

app.post("/request8002",(req,res) => {
    axios({
        method: 'post',
        url: APIURL_8002 + "/antalyaWeather",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Barcelona" }
})
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        res.sendStatus(500);
        console.log(error);
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    
    server.close(() => {
        process.exit(0);
    });
    
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    
    server.close(() => {
        process.exit(0);
    });
});
