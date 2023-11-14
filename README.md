# Experimental Database Optimization App

## Overview
This application is designed for experimental and educational purposes, to demonstrate the real benefits of database optimization and different data retrieval strategies. It is structured to highlight various approaches to data management and querying, making it clear to software engineers the impact of these strategies on application performance.

## Important Note
This application is not intended for production use. It serves as an educational tool to understand database optimization concepts.

## Setup and Configuration
Each server in this application operates independently. You can set your MongoDB URI (either local or remote) in each server's configuration. 

### Common Steps
- Make sure MongoDB is running and accessible.
- Navigate to each server's directory.
- Use `npm install` to install dependencies.

### Server1
- Demonstrates data retrieval without optimization.
- Navigate to the `server1` directory.
- Run `npm install`.
- Run `node seed.js` to seed the database with 1M items.
- Run `node server.js` to start the server.

### Server2
- Implements the CQRS pattern (Command and Query Responsibility Segregation).
- Embeds product details under products for optimized reading operations.
- Navigate to the `server2` directory.
- Run `npm install`.
- Run `node seed.js` to seed the database.
- Run `node server.js` to start the server.

### Server3
- Shows the benefits of database indexing and TEXT Search.
- Ensure you have run `ecommerce_db.listing_products.createIndex({ manufacturer: "text" });` on your MongoDB.
- Navigate to the `server3` directory.
- Run `npm install`.
- Run `node server.js` to start the server (no seeding required).

### Server4
- Compares the performance between native JavaScript `find` method and a Map-based indexing approach.
- Automatically seeds data and creates an index in-memory.
- Navigate to the `server4` directory.
- Run `npm install`.
- Run `node server.js` to start the server.

## Application Purpose
Each server in this application demonstrates a unique aspect of data retrieval and optimization:

- **Server1**: Basic data retrieval using MongoDB's `find` with aggregation.
- **Server2**: Demonstrates the concept of CQRS by separating create/update operations from reading operations.
- **Server3**: Focuses on the benefits of indexing in a database and using MongoDB's TEXT Search feature.
- **Server4**: Provides a comparative analysis of performance between JavaScript's native `find` method which require iterating over the entire array until the desired element is found. This means that the performance of find() can be significantly affected by the size of the array. and an indexing approach using JavaScript's `Map` object.

## Load Testing
run `node loadTest` and change the server and `numberOfRequests` accordingly

## Mongodb
there's a `docker-compose.yml` file to spin up Mongodb if you would

## Conclusion
This application provides hands-on insights into various data management and querying techniques, emphasizing the importance of database optimization and the impact of different strategies on performance. It is a valuable resource for software engineers looking to deepen their understanding of these concepts.