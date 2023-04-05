const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const dist = path.resolve(__dirname, 'dist');

app.use(express.static(dist));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(dist, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Port ${PORT} is listened`)
})
