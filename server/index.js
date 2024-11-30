
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const DB = require('./configs/config.db.js');
const JSONconfig = require("./configs/config.json.js");
const usersRoute = require('./routes/route.users.js');
const vaultsRoute = require('./routes/route.vaults.js');
const trimmer = require('./middlewares/middleware.trimmer.js');
const fs = require('fs');
const { SERVER_HOST, SERVER_PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json(JSONconfig));
app.use(trimmer);
app.use("/uploads", express.static("uploads"));
app.use('/users', usersRoute);
app.use('/vaults', vaultsRoute);

DB.connect((err) => {
  err && console.error("Error initializing DB.", err);
});

fs.mkdir('uploads', { recursive: true }, (err) => {
    if (err) throw err;
});

app.get('/', (_req, res) => {
  res.status(202).json({ message: "Server running." });
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server running:\n  host: ${SERVER_HOST}\n  port: ${SERVER_PORT}\n`)
});

