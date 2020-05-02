const fs = require('fs');
const inputFileName = 'input.csv';
const outputFileName = 'output.xls';

const fileContent = fs.readFileSync(inputFileName, 'utf8');
const outputContent = fileContent
    .split(/^/gm)
    .map((line) => line.slice(0, line.length - 1))
    .filter((line) => RegExp('....-..-01', 'gm').test(line))
    .map((line) => {
        const newLine = line.match('....-..-01')[0] + ' ';
        const close = line.match(/^[\d|\.]+;[\d|\.]+;/gm)[0].match(/;[\d|\.]+;$/gm)[0].replace('\.', ',');
        return newLine + close.slice(1, close.length - 1);
    })
    .reverse()
    .join('\r\n');

fs.writeFileSync(outputFileName, outputContent)