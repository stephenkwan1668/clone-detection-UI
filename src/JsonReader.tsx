import { useEffect } from 'react';

const JsonReader: React.FC = () => {
    useEffect(() => {
        const path = '/testBasicClones.json'; // Update the path to the public directory

        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(jsonData => {
                jsonData.forEach((item: { id: string; node: string }) => {
                    const srcMatches = item.node.match(/src=\|[^|]*\|\([^)]+\)/g);
                    const lastSrc = srcMatches ? srcMatches[srcMatches.length - 1] : 'No src found';
                    const javaFileNameMatch = lastSrc.match(/\/([^/]+\.java)/);
                    const javaFileName = javaFileNameMatch ? javaFileNameMatch[1] : 'No Java file name found';
                    const match = lastSrc.match(/<(\d+),\d+>,<(\d+),\d+>/);
                    if (match) {
                        const firstNumber = match[1];
                        const secondNumber = match[2];
                        console.log(`First Number: ${firstNumber}, Second Number: ${secondNumber}`);
                    } else {
                        console.log('No match found');
                    }
                    console.log(`ID: ${item.id}, Java File Name: ${javaFileName}`);
                });
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
            });
    }, []);

    return null;
};

export default JsonReader;