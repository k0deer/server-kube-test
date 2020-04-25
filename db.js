const mongoose = require('mongoose');
const logger = require('./util/logger');

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const CLUSTER = process.env.CLUSTER

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/kube-test`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then( () => {
    logger.info("Conexión a Base de datos hecha con exito")
})
.catch((err) => {
    logger.info("Error - Conexión a Base de datos " + err)
})
