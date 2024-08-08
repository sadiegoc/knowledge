const app = require('express')();
const consign = require('consign');
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

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