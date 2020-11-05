const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');

const {
  data,
  regionList,
  postalCodeDict
} = require('./dataProvider');

const {
  middlewareRegionQuery,
  middlewareDepartment,
  middlewareTownship,
} = require('./middlewares');

const app = express();
app.use(compression());

app.use(express.static(path.resolve(`${__dirname}/../front/build`)));

const PORT = process.env.port || 80;
app.use(helmet());
app.use(express.json());
// Routes

if (!process.env.production) {
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
}

app.get('/regions', (_, res) => {
  res.send(regionList);
});

app.get('/departments', [
  middlewareRegionQuery,
], (req, res) => {
  const { region: regionName } = req.query;

  const region = data[regionName];
  const departmentsFromRegion = Object.keys(region);
  res.send(departmentsFromRegion);
});

app.get('/townships', [
  middlewareDepartment,
  middlewareRegionQuery,
  middlewareTownship,
], (req, res) => {
  const { department, region } = req.query;
  const townships = Object.keys(data[region][department]);
  res.send(townships);
});

function getTownshipDTO(township) {
  const desiredKeys = [
    "ACCES A L'INFORMATION",
    "ACCÈS AUX INTERFACES NUMERIQUES",
    "COMPETENCES ADMINISTATIVES",
    "COMPÉTENCES NUMÉRIQUES / SCOLAIRES",
    "department_score",
    "Population",
    "region_score",
    "township_score",
  ];
  const townshipDTO = {};

  for (const key of desiredKeys) {
    let value;

    if (typeof township[key] ===  'string') {
      value = parseInt(township[key].replace(/\r/, ''), 10);
    } else {
      value = parseInt(township[key], 10);
    }

    townshipDTO[key] = value;
  }

  return townshipDTO;
}

app.get('/townships/:township', (req, res) => {
  const { department, region } = req.query;
  const { township:townshipName } = req.params;

  const township = data[region][department][townshipName];
  if (township) {
    res.send(getTownshipDTO(township));
    return;
  }
  res.status(404).send('Not found');
});

app.use((err, req, res, _) => {
  console.error(req.path);
  console.error(err);
  res.status(500).send('INTERNAL_SERVER_ERROR');
});

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
