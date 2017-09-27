const express = require('express');

const app = express();

// how middleware works
app.use((req, res, next) => {
    // console.log(Date.now());
    req.name = 'Nicky Meuleman';
    next();
});

// Index Route
app.get('/', (req, res) => {
    console.log(req.name);
    res.send(req.name);
});

// About Route
app.get('/about', (req, res) => {
    res.send('ABOUT1');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
