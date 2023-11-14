const express = require('express');
const app = express();
const port = 3004;
const generateProducts = require('./seed');

let products = [];

async function createManufacturerIndex(products) {
    const indexProducts = new Map();

    products.forEach(product => {
        if (!indexProducts.has(product.manufacturer)) {
            indexProducts.set(product.manufacturer, []);
        }
        indexProducts.get(product.manufacturer).push(product);
    });

    return indexProducts;
}

async function startServer() {
    // Generate the products
    products = await generateProducts();
    const indexProducts = await createManufacturerIndex(products); // Create the index

app.get('/search-vanilla', (req, res) => {
    const manufacturer = req.query.manufacturer;
    const start = Date.now();

    const foundProducts = products.filter(product => product.manufacturer === manufacturer);

    const end = Date.now();
    res.json({ duration: (end - start) / 1000 + ' seconds', product: foundProducts.slice(0, 1000) });
});

app.get('/search-indexed', (req, res) => {
    const manufacturer = req.query.manufacturer;
    const start = Date.now();

    const foundProducts = indexProducts.get(manufacturer) || [];

    const end = Date.now();
    res.json({ duration: (end - start) / 1000 + ' seconds', products: foundProducts.slice(0, 1000) });
});
}

app.listen(port, () => console.log(`Server listening on port ${port}`));

startServer().catch(console.error);
