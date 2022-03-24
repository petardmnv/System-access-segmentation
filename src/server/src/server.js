const { port } = require('./config/index.js');
const mongoose = require("mongoose");
const app = require('./app.js');
const { createConnection } = require('./models/connect.js');
createConnection(mongoose);

// event listener for errors
mongoose.connection.on("error", function (error) {
  console.log(`Error: ${error}`);
});

// set port who listens for requests
const PORT = port || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});