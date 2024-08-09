const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
require('./config/mongodb')

const corsOptions = { origin: "http://localhost:8080" };
app.use(cors(corsOptions));
const PORT = 8888;

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app);

app.listen(PORT, () => {
    console.log(`backend listenning on http://localhost:${PORT}`);
});