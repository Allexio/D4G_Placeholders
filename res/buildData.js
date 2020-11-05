const fs = require('fs');
const path = require('path');

function build(save = false, pathToSave = '') {
  const regionalData = path.resolve(`${__dirname}/../res/regional_data.csv`);

  // get raw data
  const file = fs.readFileSync(regionalData, 'UTF-8');

  // split data (csv) by line
  const rawLines = file.split('\n');
  const fullData = {};

  // loop through each line
  for (const line of rawLines.slice(0, rawLines.length - 2)) {
    // split by commas
    const lineContent = line.split(',');

    // store info in variables
    const township = lineContent[0];
    const department = lineContent[1];
    const region = lineContent[2];
    const townshipScore = lineContent[6];
    const departmentScore = lineContent[5];
    const regionScore = lineContent[4];

    // merge relevant info into one dict
    const content = {
      'township_score': townshipScore,
      'department_score': departmentScore,
      'region_score': regionScore
    };
    if (!(region in fullData)) {
      fullData[region] = {};
    }
    if (!(department in fullData[region])) {
      fullData[region][department] = {};
    }
    fullData[region][department][township] = content;
  }

  const pathFragilityScores = path.resolve(`${__dirname}/../res/fragility_scores.csv`);
  const fileFragilityScores = fs.readFileSync(pathFragilityScores, 'UTF-8');

  const lines = fileFragilityScores.split('\n');

  function getTownship(township = '') {
    for (const regionName in fullData) {
      for (const departmentName in fullData[regionName]) {
        for (const townshipName in fullData[regionName][departmentName]) {
          const pattern = new RegExp(township, 'i');
          if (pattern.test(townshipName)) {
            return fullData[regionName][departmentName][townshipName];
          }
        }
      }
    }
    return null;
  }

  let township = null;
  let lastTownship = '';
  const fieldList = [];

  for (const line of lines.slice(0, lines.length - 2)) {
    const lineInfo = line.split(",");

    const townshipName = lineInfo[0];
    const irisZoneName = lineInfo[1];
    const field = lineInfo[2];
    const value = lineInfo[3];
    if (lastTownship !== townshipName) {
        lastTownship = townshipName;
        township = getTownship(townshipName);
    }

    if (township === null) {
      // console.log(townshipName);
      continue;
    }

    if (township['irisZones'] === undefined) {
      township['irisZones'] = [];
    }

    let irisZone = township.irisZones.find((iz) => iz.name === irisZoneName);
    if (irisZone === undefined) {
      irisZone = {
        name: irisZoneName,
      };
      township.irisZones.push(irisZone);
    }

    if (!isNaN(value)) {
      const number = parseFloat(value);
      irisZone[field] = number;
    }

    if (!fieldList.includes(field)) {
      fieldList.push(field);
    }
  }

  for (const regionName in fullData) {
    for (const departmentName in fullData[regionName]) {
      for (const townshipName in fullData[regionName][departmentName]) {
        const township = fullData[regionName][departmentName][townshipName];
        if (township.irisZones instanceof Array) {
          const totalPopulation = township.irisZones.reduce((sum, irisZone) => {
            if (typeof irisZone.Population === 'number') {
                return sum + irisZone.Population;
            }
            return sum;
          }, 0);
          for (const field of fieldList) {
            township[field] = township.irisZones.reduce(
              (sum, irisZone) => {
                if (typeof irisZone[field] === "number" && typeof irisZone.Population === 'number') {
                  return sum + (irisZone.Population * irisZone[field]);
                }
                return sum;
              }, 0
            ) / totalPopulation;
          }
          township['Population'] = totalPopulation;
          delete township.irisZones;
        }
      }
    }
  }

  if (save) {
    fs.writeFile(pathToSave, JSON.stringify(fullData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log(pathToSave, 'saved');
    });
  }

  return fullData;
}

function getPostaleCodeData() {
  // get postal code data
  postalCodeDict = {};
  const pathPostalCodeData = path.resolve(`${__dirname}/../res/postal_codes.json`);
  const postalCodeData = fs.readFileSync(pathPostalCodeData, 'UTF-8');
  const postalCodeJSON = JSON.parse(postalCodeData);

  const pathDepartmentData = path.resolve(`${__dirname}/../res/departments.json`);
  const departmentData = fs.readFileSync(pathDepartmentData, 'UTF-8');
  const departmentJSON = JSON.parse(departmentData);

  for (const postalCodeInstance of postalCodeJSON) {
    const postalCode = postalCodeInstance["codePostal"];
    const township = postalCodeInstance["nomCommune"];
    const departmentNumber = postalCode.substring(0, 2);
    let departmentName = "";
    for (const department of departmentJSON) {
      if (department["code"] === departmentNumber) {
        departmentName = department["name"];
      }
    }
    postalCodeDict[postalCode] = { township, departmentName };
  }

  return postalCodeDict;
}

module.exports = { 
  build,
  getPostaleCodeData,
};
