const express = require('express');
const app = express();
// const fileupload = require("express-fileupload");
const cors = require('cors');
require('dotenv').config();
const { PORT, BACKEND_URL } = process.env;

const profilesRoutes= require('./routes/profilesRoutes');
const itemsRoutes=require('./routes/itemsRoutes');
const ordersRoutes=require('./routes/ordersRoutes');
const orderBatchRoutes= require('./routes/orderBatchRoutes');

// app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/profiles', profilesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/orderBatch', orderBatchRoutes);



app.listen(PORT, () => {
    console.log(`App listening at ${BACKEND_URL}:${PORT}`);
});

app.get("/", (req,res) => {    
    return res.send("Test successful");
})