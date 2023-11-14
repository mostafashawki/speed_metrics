const axios = require('axios');
const API_ENDPOINT = 'http://localhost:3001/search'; // Update with the correct endpoint
const numberOfRequests = 10; // Set the number of requests for the load test
let totalDuration = 0;

async function loadTest() {
    for (let i = 0; i < numberOfRequests; i++) {
        const start = new Date();
        await axios.get(API_ENDPOINT, { params: { manufacturer: 'Nokia' } });
        const end = new Date();
        totalDuration += end - start;
    }

    console.log(`Total duration for ${numberOfRequests} requests: ${totalDuration} ms`);
    console.log(`Average duration per request: ${totalDuration / numberOfRequests} ms`);
}

loadTest().catch(console.error);
