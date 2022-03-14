let express = require("express");
require('dotenv').config();

const app = express();

app.use(express.json())

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log("Running on port: ", process.env.PORT);
});