const app = require('express')();
const consign = require('consign');
const db = require('./config/db')

const PORT = 8888;

app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(PORT, () => {
    console.log(`backend listenning on http://localhost:${PORT}`);
});