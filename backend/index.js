const express = require('express');
require('dotenv').config();
const cors = require('cors');

const routes = require('./routes/post.routes');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", routes);
app.use("/api/search", routes);

// const searchRoutes = require ("./routes/search.js");
// app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.error("MongoDB connection error:", err));
    
app.listen(PORT, () => {
    console.log(`Server Listning on ${PORT}`);
});