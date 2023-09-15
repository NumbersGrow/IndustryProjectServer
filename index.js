const express = require('express');
const app = express();
// const fileupload = require("express-fileupload");
const cors = require('cors');
require('dotenv').config();
const { PORT, BACKEND_URL } = process.env;


// app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



app.listen(PORT, () => {
    console.log(`App listening at ${BACKEND_URL}:${PORT}`);
});

app.get("/", (req,res) => {    
    return res.send("Test successful");
})