const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');

const {
  fullData,
  regionList,
} = require('./dataProvider');

const {
  middlewarePrefixQuery,
  middlewareRegionQuery,
  middlewareDepartment,
  middlewareTownship,
} = require('./middlewares');

const app = express();
app.use(compression());

app.use(path.resolve(`${__dirname}/../front/build`));

const PORT = process.env.port || 80;
app.use(helmet());
app.use(express.json());
// Routes

if (process.env.developer) {
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
}

app.get('/regions', [middlewarePrefixQuery.optional()], (req, res) => {
  const { prefix = '' } = req.query;
  const pattern = new RegExp(`^${prefix.trim()}`, 'i');
  const matchedRegions = regionList.filter((r) => pattern.test(r));
  res.send(matchedRegions);
});

app.get('/departments', [
  middlewarePrefixQuery.optional(),
  middlewareRegionQuery,
], (req, res) => {
  const { prefix = '', region: regionName } = req.query;
  const pattern = new RegExp(`^${prefix}`, 'i');
  const region = fullData[regionName];
  const departmentsFromRegion = Object.keys(region);
  res.send(departmentsFromRegion.filter((d) => pattern.test(d)));
});

app.get('/townships', [
  middlewareDepartment,
  middlewareRegionQuery,
  middlewareTownship,
], (req, res) => {
  const { department, prefix = '', region } = req.query;
  const pattern = new RegExp(`^${prefix}`, 'i');
  const townships = Object.keys(fullData[region][department]);
  console.log(townships);
  res.send(townships.filter((t) => pattern.test(t)));
});

app.use((err, req, res, _) => {
  console.error(req.path);
  console.error(err);
  res.status(500).send('INTERNAL_SERVER_ERROR');
});

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
