const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/data', (req, res) => {
    const { message } = req.body;
    res.json({ echo: message });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});