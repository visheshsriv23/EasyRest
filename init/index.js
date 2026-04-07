if(process.env.NODE_ENV != "production"){
	require('dotenv').config({path: "../.env"});
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const axios = require("axios");

main().then(() =>{
	console.log("connected to database");
}).catch(err => {
	console.log(err);
});

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/easyrest');
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Database cleared. Starting geocoding...");

    const updatedData = [];

    for (let obj of initData.data) {
        const jawgUrl = `https://api.jawg.io/places/v1/search?text=${encodeURIComponent(obj.location)}&access-token=${process.env.MAP_TOKEN}&limit=1`;
        
        try {
            const response = await axios.get(jawgUrl);
            let geometry = { type: "Point", coordinates: [0, 0] }; // Default

            if (response.data.features && response.data.features.length > 0) {
                geometry = response.data.features[0].geometry;
                return console.log(`Success: ${obj.location}`);
            } else {
                return console.log(`No results found for: ${obj.location}`);
            }

            updatedData.push({ ...obj, owner: "69ca731175212b3981290ce9", geometry });
            
            // Wait for 200ms between each request to avoid 403 rate limits
            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (e) {
            console.log(`Error for ${obj.location}: ${e.response ? e.response.status : e.message}`);
            updatedData.push({ 
                ...obj, 
                owner: "69ca731175212b3981290ce9", 
                geometry: { type: "Point", coordinates: [0, 0] } 
            });
        }
    }

    await Listing.insertMany(updatedData);
    console.log("Data was successfully initialized!");
};

initDB();