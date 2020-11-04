const fs = require('fs');
const path = require('path');

const pathRawData = path.resolve(`${__dirname}/../res/raw_data.csv`);

// get raw data
const file = fs.readFileSync(pathRawData, 'UTF-8');

// split data (csv) by line
const rawLines = file.split('\n');
const fullData = {};
const regionList = [];
const departmentList = [];
const townshipList = [];

// loop through each line
for (const line of rawLines.slice(0, rawLines.length - 2)){
    // split by commas
    const lineContent = line.split(',');

    // store info in variables
    const township = lineContent[0];
    const department = lineContent[1];
    const region = lineContent[3];
    const townshipScore = lineContent[7];
    const departmentScore = lineContent[6];
    const regionScore = lineContent[5];

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
for (const postalCodeInstance of postalCodeJSON) {
    const postalCode = postalCodeInstance['codePostal'];
    const township = postalCodeInstance['nomCommune'];
    postalCodeDict[postalCode] = [township];
}

module.exports = {
    departmentList,
    fullData,
    postalCodeDict,
    regionList,
    townshipList,
};
