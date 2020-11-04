const express = require('express');
const helmet = require('helmet');
const path = require('path');
const {
  fullData,
  departmentList,
  boroughList
} = require('./dataProvider');

const app = express();
const pathStatic = path.resolve(`${__dirname}/../front/build`);
app.use('/', express.static(pathStatic));

const PORT = 80 || process.env.port;

app.use(helmet());

// Routes

app.get('/departments', (_, res) => {
  res.send(departmentList);
});

app.get('/boroughs', (_, res) => {
  res.send(boroughList);
});

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
