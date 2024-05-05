const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.status(200).send({message: 'API is working'});
});

app.use("/api", require("./routers/b2bRouter"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});