import express from "express";
import https from "https";

export const weatherRoute = express.Router();
weatherRoute.get("/", (req: any, res: { sendFile: (arg0: string, arg1: number) => void; }) => {
    res.sendFile(__dirname, + "../client/index.html")   
})

weatherRoute.post("/", (req: { body: { cityName: any; }; }, res: { json: (arg0: { success: boolean; message?: string; temperature?: string; cityName?: any; weatherDes?: any; }) => void; })=>{
        console.log(req.body);
        const city = req.body.cityName
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ process.env.API_KEY +""
        https.get(url, (response: { on: (arg0: string, arg1: (chunk: any) => void) => void; }) => {
            response.on("data", (chunk: string)=>{
                const responseData = JSON.parse(chunk);
                const code = responseData.cod;
                if(code > 299){
                    res.json({success: false, message: "City not found"});
                } else {
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
            })
            
        })
})