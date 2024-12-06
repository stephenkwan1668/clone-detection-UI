const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const outputFilePath = path.join(publicDir, 'files.json');

fs.readdir(publicDir, (err, files) => {
    if (err) {
        console.error('Error reading the public directory:', err);
        return;
    }

    const javaFiles = files.filter(file => file.endsWith('.java'));

    fs.writeFile(outputFilePath, JSON.stringify(javaFiles, null, 2), (err) => {
        if (err) {
            console.error('Error writing to files.json:', err);
            return;
        }

        console.log('files.json has been updated with Java file names.');
    });
});