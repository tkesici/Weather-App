"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const weather_1 = require("./weather");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const APIURL_8000 = process.env.APIURL_8000;
const APIURL_8001 = process.env.APIURL_8001;
const APIURL_8002 = process.env.APIURL_8002;
const APIURL_8003 = process.env.APIURL_8003;
const APIURL_8004 = process.env.APIURL_8004;
const app = (0, express_1.default)();
app.use(express_1.default.static("client"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ type: ["application/json"] }));
app.use("/weather_8000_1", weather_1.weatherRoute);
app.use("/weather_8000_2", weather_1.weatherRoute);
app.post("/service1loop1", (req, res) => {
    (0, axios_1.default)({
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
});
app.post("/service_8000_loop_1", (req, res) => {
    (0, axios_1.default)({
        method: 'post',
        url: APIURL_8001 + "/request_service_8001",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Test" }
    })
        .then(function (res) {
        res.data("sent");
    });
});
app.post("/service_8000_loop_2", (req, res) => {
    (0, axios_1.default)({
        method: 'post',
        url: APIURL_8002 + "/request_service_8002",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Test" }
    })
        .then(function (res) {
        res.data("sent");
    });
});
app.post("/request8002", (req, res) => {
    (0, axios_1.default)({
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
    console.log(`Server running at port ${PORT}`);
});
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
