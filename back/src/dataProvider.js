const fs = require('fs');

// get raw data
const file = fs.readFileSync('../res/raw_data.csv', 'UTF-8');

// split data (csv) by line
const rawLines = file.split('\n')
var fullData = {}
var departmentList = []
var boroughList = []

// loop through each line
for (const line of rawLines){
    // split by commas
    const lineContent = line.split(',')

    // store info in variables
    const borough = lineContent[0]
    const department = lineContent[1]
    const region = lineContent[3]
    const boroughScore = lineContent[7]
    const departmentScore = lineContent[6]
    const regionScore = lineContent[5]

    boroughList.push(borough)

    // merge relevant info into one dict
    const content = {
        'borough_score': boroughScore,
        'department_score': departmentScore,
        'region_score': regionScore
    }
    if (!(region in fullData)){
        fullData[region] = {}
    }
    if (!(department in fullData[region])) {
        departmentList.push(department)
        fullData[region][department] = {}
    }
    fullData[region][department][borough] = content
}

module.exports = [fullData, departmentList, boroughList]
