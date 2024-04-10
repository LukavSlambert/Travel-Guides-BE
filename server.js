require('dotenv').config()

const express = require('express')
const app = express()

app.use(require('cors')());
app.use(express.json());

const hostname = '0.0.0.0';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});