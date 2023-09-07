var apm = require('elastic-apm-node').start({
    serviceName: 'exercise-tracker-api',
    secretToken: 'xU2Zey2QBRekZflwNQ',
    serverUrl: 'https://c4de3462d44a446f9cd959c9a9c4a631.apm.southcentralus.azure.elastic-cloud.com:443',
    environment: 'my-environment'
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 443;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
