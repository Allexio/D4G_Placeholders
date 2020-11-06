const fs = require('fs');
const path = require('path');

const {
    build,
    getPostalCodeData,
} = require('./buildData');

const pathData = path.resolve(`${__dirname}/../res/data.json`);
let data = null;

function tryBuild() {
    try {
        data = build(true, pathData);
    } catch (e) {
        console.error('Can not build data.json', e);
        process.exit(1);
    }
}

try {
    if (fs.existsSync(pathData)) {
        try {
            data = JSON.parse(fs.readFileSync(pathData, 'utf-8'));
        } catch (e) {
            console.error('Can not get data as json try to rebuild it');
            tryBuild();
        }   
    } else {
        tryBuild();
    }
} catch(e) {
    console.error(e);
    tryBuild();
}

let postalCodeDict = null;
try {
    postalCodeDict = getPostalCodeData();
} catch (e) {
    console.error(e, 'Can not get postal code');
    process.exit(1);
}

const regionList = Object.keys(data).sort();
const departmentList = [];
const townshipList = [];

for (const regionName in data) {
    departmentList.push(...Object.keys(data[regionName]));
}

for (const regionName in data) {
    for (const departmentName in data[regionName]) {
        townshipList.push(...Object.keys(data[regionName][departmentName])
        );
    }    
}

module.exports = {
    departmentList: departmentList.sort(),
    data,
    postalCodeDict,
    regionList,
    townshipList: townshipList.sort(),
};
