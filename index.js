const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    
    const cityName=req.body.cityName;
    const appId="ea0d39dda4a3a3ed9e11b15c204c950d"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid="+appId;
    https.get(url,function(response){
        response.on("data",function(data){
            const weather=JSON.parse(data);
            const temp=weather.main.temp;
            const descr=weather.weather[0].description;
            const icon=weather.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather description says "+ descr+"</p>");
            res.write("<h2>Temperature of "+cityName+ " is "+temp+" degree celsius</h2>");
            res.write("<img src="+imgURL+">");
            
            
            res.send();
        });
    })
})

app.listen(3000,()=>{
    console.log("server started on the port 3000");
})