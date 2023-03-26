const express = require("express");
const app = express();
const WSServer = require("express-ws");

const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  console.log("Connection established");
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
