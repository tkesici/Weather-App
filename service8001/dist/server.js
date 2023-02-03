"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static("client"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8001;
const APIURL_8000 = process.env.APIURL_8000;
const APIURL_8001 = process.env.APIURL_8001;
const APIURL_8002 = process.env.APIURL_8002;
const APIURL_8003 = process.env.APIURL_8003;
const APIURL_8004 = process.env.APIURL_8004;
app.get("/", (req, res) => {
    res.sendFile(__dirname, +"./client/index.html");
});
app.post("/antalyaWeather", (req, res) => {
    (0, axios_1.default)({
        method: 'post',
        url: APIURL_8000 + "/weather_8000_1",
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
});
app.post("/request_service_8001", (req, res) => {
    (0, axios_1.default)({
        method: 'post',
        url: APIURL_8004 + "/request_service_8004_1",
        headers: { 'Content-Type': 'application/json' },
        data: { cityName: "Antalya" }
    });
    res.send("ok");
});
const server = app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
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
