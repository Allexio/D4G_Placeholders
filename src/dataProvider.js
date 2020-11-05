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
    let departmentName = ""
    for (const department of departmentJSON) {
        if (department["code"] === departmentNumber) {
            departmentName = department["name"];
        }
    }
    postalCodeDict[postalCode] = {township, departmentName};
}

module.exports = {
    departmentList,
    fullData,
    postalCodeDict,
    regionList,
    townshipList,
};
