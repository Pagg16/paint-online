const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json({ message: "Загружено" });
  } catch (e) {
    console.log(e);
    return res.status(500).json("error");
  }
});

app.get("/image", (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "files", `${req.query.id}.jpg`);
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      const data = `data:image/png;base64,` + file.toString("base64");
      return res.json(data);
    }
    return res.json(null);
  } catch (e) {
    console.log(e);
    return res.status(500).json("eror");
  }
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
