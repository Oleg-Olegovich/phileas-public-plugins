const fs = require('fs');
const path = require('path');

const dataDir = './data/';
const outputJSON = './en.json';

let localizationData = {};

function extractMessageText(events, prefix) {
    events.forEach(event => {
        if (event && event.pages) {
            event.pages.forEach((page, pageIndex) => {
                if (page && page.list) {
                    page.list.forEach((command, commandIndex) => {
                        if (command && command.code === 401) { // Show Text command
                            command.parameters.forEach((param, paramIndex) => {
                                if (typeof param === 'string' && param.trim() !== '') {
                                    const tag = `${prefix}_event${event.id}_page${pageIndex}_command${commandIndex}_param${paramIndex}`;
                                    localizationData[tag] = param;
                                    command.parameters[paramIndex] = `#{${tag}}`;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

fs.readdirSync(dataDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const fileNameWithoutExtension = path.basename(file, '.json');

        if (fileNameWithoutExtension.startsWith('Map')) {
            if (data.events) {
                extractMessageText(Object.values(data.events), fileNameWithoutExtension);
            }
        } 

        if (fileNameWithoutExtension == 'CommonEvents') {
            extractMessageText(Object.values(data), fileNameWithoutExtension);
        } 

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
});

fs.writeFileSync(outputJSON, JSON.stringify(localizationData, null, 2), 'utf8');

console.log('Text export and replacement complete.');