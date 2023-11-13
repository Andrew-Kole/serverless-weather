const axios = require('axios');

exports.handler = async (event) => {
    const ip = event.requestContext.identity.sourceIp;
    try {
        const location = await getLocation(ip);
        const weather = await getWeather(location.lat, location.lon);
        return {
            statusCode: 200,
            body: JSON.stringify(weather)
        };
    }
    catch (error) {
        console.error('Error making request', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Internal server error'})
        };
    }
};

async function getLocation(ip) {
    const ipStackUrl = 'http://api.ipstack.com/'
    const accessKey = process.env.GEO_API_KEY;

    try {
        const res = await axios.get(`${ipStackUrl}${ip}?access_key=${accessKey}`);
        const { latitude, longitude } = res.data;
        return { lat: latitude, lon: longitude };
    }
    catch (error) {
        console.error('Error getting location', error.message);
        throw error;
    }
}

async function getWeather(lat, lon) {
    const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const accessKey = process.env.OPENWEATHER_API_KEY;
    const res = await axios.get(`${openWeatherUrl}?lat=${lat}&lon=${lon}&appid=${accessKey}`);
    return res.data;
}