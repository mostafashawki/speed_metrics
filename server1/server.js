const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

const uri = 'mongodb://localhost:27017/ecommerce_db' // replace with your connection string
const client = new MongoClient(uri);



app.get('/search', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("ecommerce_db");
        const start = Date.now(); // Get start time in milliseconds

        // Get search parameters
        const manufacturer = req.query.manufacturer;
        const storageOption = req.query.storage;

        let matchStage = {};

        if (manufacturer) {
            matchStage['manufacturer'] = { $regex: manufacturer, $options: 'i' }; // Case-insensitive regex search
        }

        const results = await db.collection("products")
                                .aggregate([
                                    {
                                        $lookup: {
                                            from: "product_details",
                                            localField: "_id",
                                            foreignField: "product_id",
                                            as: "details"
                                        }
                                    },
                                    { $match: matchStage },
                                    { $unwind: "$details" },
                                    { $match: { "details.specifications.memory.storage_options": storageOption } },
                                    // { $skip: 0 }, // Skip 0 for the first page
                                    { $limit: 100 } // Limit of 100 items
                                ], { maxTimeMS: 120000 }).toArray();

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
