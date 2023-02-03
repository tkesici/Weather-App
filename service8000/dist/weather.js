"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRoute = void 0;
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
exports.weatherRoute = express_1.default.Router();
exports.weatherRoute.get("/", (req, res) => {
    res.sendFile(__dirname, +"../client/index.html");
});
exports.weatherRoute.post("/", (req, res) => {
    console.log(req.body);
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.API_KEY + "";
    https_1.default.get(url, (response) => {
        response.on("data", (chunk) => {
            const responseData = JSON.parse(chunk);
            const code = responseData.cod;
            if (code > 299) {
                res.json({ success: false, message: "City not found" });
            }
            else {
                const temperature = (responseData.main.temp - 273.15).toString();
                const weatherDes = responseData.weather[0].description;
                const cityName = responseData.name;
                res.json({
                    success: true,
                    temperature,
                    cityName,
                    weatherDes
                });
            }
        });
    });
});
