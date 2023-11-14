const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3003;

const uri = 'mongodb://localhost:27017/ecommerce_db' // replace with your connection string
const client = new MongoClient(uri);

app.get('/search', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ecommerce_db");
        const start = Date.now(); // Get start time in milliseconds

        const manufacturer = req.query.manufacturer;

        let textSearchStage = {};
        if (manufacturer) {
            textSearchStage = { $text: { $search: manufacturer } };
        }

        const results = await db.collection("listing_products")
            .aggregate([
                { $match: textSearchStage },
                { $limit: 100 } // Limit the results to 100 items
            ])
            .toArray();


            const end = Date.now(); // Get end time in milliseconds
            const duration = (end - start) / 1000; // Calculate duration in seconds
            res.json({ duration: duration.toFixed(3) + ' seconds', data: results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
