const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.status(200).send({message: 'API is working'});
});

app.use("/api", require("./routers/b2bRouter"));
app.use("/api", require("./routers/callbackRouter"));
app.use("/api", require("./routers/c2bRouter"));
app.use("/api", require("./routers/b2cRouter"));
app.use("/api", require("./routers/usersRouter"));
app.use("/api", require("./routers/regConfRouter"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});