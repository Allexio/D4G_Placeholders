const fs = require('fs');
const path = require('path');

const regionalData = path.resolve(`${__dirname}/../res/regional_data.csv`);

// get raw data
const file = fs.readFileSync(regionalData, 'UTF-8');

// split data (csv) by line
const rawLines = file.split('\n');
const fullData = {};
const regionList = [];
const departmentList = [];
const townshipList = [];

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
    if (!(region in fullData)){
        fullData[region] = {};
        regionList.push(region);
    }
    if (!(department in fullData[region])) {
        fullData[region][department] = {};
        departmentList.push(department);
    }
    fullData[region][department][township] = content;
    townshipList.push(township);
}

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
    const departmentNumber = postalCode.substring(0,2);
    let departmentName = "";
    for (const department of departmentJSON) {
        if (department["code"] === departmentNumber) {
            departmentName = department["name"];
        }
    }
    postalCodeDict[postalCode] = {township, departmentName};
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

let irisZone = {};
let township = null;
for (const line of lines) {
    const lineInfo = line.split(",");
    const townshipName = lineInfo[0];
    const field = lineInfo[2];
    const value = lineInfo[3];
    const scoreRank = lineInfo[4];

    if (township === null) {
        township = getTownship(townshipName);    
    }

    if (township === null) {
        console.log(townshipName);
        continue;
    }
    if (township['irisZones'] === undefined) {
        township['irisZones'] = [];
    }

    if (field in irisZone) {
        township['irisZones'].push(irisZone);
        irisZone = {};
        township = null;
    } else {
        if (isNaN(value)) {
            irisZone[field] = value;
        } else {
            irisZone[field] = parseFloat(value);
        }
    }
}
const fieldList = Object.keys(irisZone);
township['irisZones'].push(irisZone);

for (const regionName in fullData) {
    for (const departmentName in fullData[regionName]) {
        for (const townshipName in fullData[regionName][departmentName]) {
            const township = fullData[regionName][departmentName][townshipName];
            if (township.irisZones instanceof Array) {
                const totalPopulation = township.irisZones.reduce((sum, irisZone) => sum + irisZone.Population, 0);
                for (const field of fieldList) {
                    township[field] = township.irisZones.reduce(
                        (sum, irisZone) => sum + (irisZone.Population * irisZone[field]), 0
                    ) / totalPopulation;
                }
            }
        }
    }
}

fs.writeFileSync(`${__dirname}/../res/data.json`, JSON.stringify(fullData));

module.exports = {
    departmentList,
    fullData,
    postalCodeDict,
    regionList,
    townshipList,
};
