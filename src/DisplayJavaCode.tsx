import { useEffect, useState } from 'react';

interface HighlightedCodeProps {
    startCloneLine: number;
    endCloneLine: number;
}

const HighlightedCode: React.FC<HighlightedCodeProps> = ({ startCloneLine, endCloneLine }) => {
    const [fileContent, setFileContent] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [javaFiles, setJavaFiles] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        fetch('/files.json')
            .then(response => response.json())
            .then(files => {
                const javaFiles = files.filter((file: string) => file.endsWith('.java'));
                setJavaFiles(javaFiles);
            })
            .catch(error => {
                console.error('Error fetching the list of Java files:', error);
            });
    }, []);

    useEffect(() => {
        if (fileName) {
            const path = `/${fileName}`;

            fetch(path)
                .then(response => response.text())
                .then(text => {
                    setFileContent(text.split('\n'));
                })
                .catch(error => {
                    console.error('Error fetching the Java file:', error);
                });
        }
    }, [fileName]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowDropdown(event.target.value.length > 0);
    };

    const handleSearch = (file: string) => {
        setFileName(file);
        setSearchTerm(file);
        setShowDropdown(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const filteredFiles = javaFiles.filter(file => file.toLowerCase() === searchTerm.toLowerCase());
            if (filteredFiles.length > 0) {
                handleSearch(filteredFiles[0]);
            }
        }
    };

    const openSourceCodeWindow = (range: [number, number]) => {
        const windowTitle = `${fileName} - Duplication code from Line ${range[0]} to ${range[1]}`;
        const newWindow = window.open('', windowTitle, 'width=600,height=400');
        if (newWindow) {
            const content = fileContent.slice(range[0] - 1, range[1]).join('\n');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${windowTitle}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
                            .line-number { color: #888; }
                        </style>
                    </head>
                    <body>
                        <h3>${windowTitle}</h3>
                        <pre>${content}</pre>
                    </body>
                </html>
            `);
            newWindow.document.close();
        }
    };

    return (
        <div>
            <div>
                <div>
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(letter => (
                        <span key={letter} style={{ marginRight: '8px' }}>{letter.toUpperCase()}</span>
                    ))}
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search for a Java file..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        style={{ width: '100%' }}
                    />
                    {showDropdown && (
                        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', position: 'absolute', backgroundColor: 'black', zIndex: 1, width: '100%', marginTop: '2px', padding: '0', listStyleType: 'none' }}>
                            {javaFiles.filter(file => file.toLowerCase().includes(searchTerm.toLowerCase())).map(file => (
                                <li key={file} onClick={() => handleSearch(file)} style={{ padding: '5px', cursor: 'pointer' }}>
                                    {file}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {fileContent.length > 0 && (
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', paddingRight: '10px' }}>
                        {fileContent.map((_, index) => (
                            <div key={index} style={{ color: '#888' }}>
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                        {fileContent.map((line, index) => {
                            const lineNumber = index + 1;
                            const isHighlighted = lineNumber >= startCloneLine && lineNumber <= endCloneLine;
                            return (
                                <div key={index} style={{ backgroundColor: isHighlighted ? 'yellow' : 'transparent', cursor: isHighlighted ? 'pointer' : 'default' }} onClick={() => isHighlighted && openSourceCodeWindow([startCloneLine, endCloneLine])}>
                                    <span>{line}</span>
                                </div>
                            );
                        })}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default HighlightedCode;