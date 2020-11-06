const express = require('express');
const path = require('path');
const compression = require('compression');

const {
  data,
  regionList,
  postalCodeDict
} = require('./dataProvider');

const PORT = process.env.port || 80;

const app = express();
app.use(compression());
app.use(express.json());

app.use(express.static(path.resolve(`${__dirname}/../front/build`)));

// Routes

if (!process.env.production) {
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
}

app.get('/regions', (_, res) => {
  res.send(regionList.sort());
});

app.get('/departments', (req, res) => {
  const { region: regionName } = req.query;

  const region = data[regionName];
  const departmentsFromRegion = Object.keys(region).sort();
  res.send(departmentsFromRegion);
});

function getTownshipDTO(township, townshipName = '') {
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
  const townshipDTO = {
    townshipName
  };

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

app.get('/townships', (req, res) => {
  const {
    department = '',
    region = '',
    postalCode,
    township:townshipName,
  } = req.query;

  if (typeof postalCode === 'string') {
    const code = postalCode.replace(/\s/, '');
    if (!(code in postalCodeDict)) {
      res.status(422).send('Bad code');
      return;
    }

    const townshipDict = postalCodeDict[code];
    if (!townshipDict) {
      res.status(404).send('Not found');
      return;
    }

    const {
      departmentName: departmentNameFromDict,
      townshipName: townshipNameFromDict,
    } = townshipDict;

    for (const regionName in data) {
      for (const departmentName in data[regionName]) {
        if (departmentName === departmentNameFromDict) {
          if (!(townshipNameFromDict in data[regionName][departmentName])) {
            res.status(404).send('Not found');
          } else {
            const townshipDTO = getTownshipDTO(data[regionName][departmentName][townshipNameFromDict], townshipNameFromDict);
            res.send(townshipDTO);
          }
          return;
        }
      }
    }
    res.status(404).send('Not found');
    return;
  }

  if (!(region in data)) {
    res.status(422).send('Bad region provided');  
    return;
  }

  if (!(department in data[region])) {
    res.status(422).send('Bad department provided');  
    return;
  }

  if (typeof townshipName !== 'string') {
    res.send(Object.keys(data[region][department]).sort());
    return;
  }

  if (!(townshipName in data[region][department])) {
    res.status(422).send('Bad townshipName provided');  
    return;
  }

  const township = data[region][department][townshipName];
  if (township) {
    res.send(getTownshipDTO(township, townshipName));
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
