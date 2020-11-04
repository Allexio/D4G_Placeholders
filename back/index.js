const express = require('express');
const helmet = require('helmet');
const app = express();

const PORT =  8080;

app.use(helmet());

// Routes


app.listen(PORT);
