const { port } = require('./config/index.js');
const express = require('express');
const mongoose = require("mongoose");
const app = express();

const { createConnection } = require('./models/connect.js');
createConnection(mongoose);

// event listener for errors
mongoose.connection.on("error", function (error) {
  console.log(`Error: ${error}`);
});

const authRouter = require('./routes/auth/auth.js');

app.use(express.json());

//app.use('/', authRouter);

// set port who listens for requests
const PORT = port || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});