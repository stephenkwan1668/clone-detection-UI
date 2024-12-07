import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    const [javaFiles, setJavaFiles] = useState<{ file: string, source: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [fileContent, setFileContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async (fileName: string) => {
            try {
                const response = await fetch(`/javaFileNames/${fileName}`);
                const files = await response.json();
                return files.map((file: string) => ({ file, source: fileName.replace('_files.json', '') }));
            } catch (error) {
                console.error(`Error fetching the list of Java files from ${fileName}:`, error);
                return [];
            }
        };

        const fetchAllFiles = async () => {
            const fileNames = ['hsqldb-2.3.1_files.json', 'smallsql0.21_src_files.json', 'test_files.json'];
            const allFiles = await Promise.all(fileNames.map(fetchFiles));
            setJavaFiles(allFiles.flat());
        };

        fetchAllFiles();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowDropdown(event.target.value.length > 0);
    };

    const handleSearch = async (file: string) => {
        setSearchTerm(file);
        setShowDropdown(false);
        try {
            const response = await fetch(`/${file}`);
            const content = await response.text();
            setFileContent(content);
        } catch (error) {
            console.error(`Error fetching the Java file content:`, error);
            setFileContent(null);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const filteredFiles = javaFiles.filter(file => file.file.toLowerCase() === searchTerm.toLowerCase());
            if (filteredFiles.length > 0) {
                handleSearch(filteredFiles[0].file);
            }
        }
    };

    const filteredFiles = javaFiles
        .filter(file => file.file.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const aStartsWith = a.file.toLowerCase().startsWith(searchTerm.toLowerCase());
            const bStartsWith = b.file.toLowerCase().startsWith(searchTerm.toLowerCase());
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.file.localeCompare(b.file);
        });

    return (
        <div>
            <nav style={{ padding: '10px', backgroundColor: 'grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/">Home</Link>
                <div style={{ position: 'relative', width: '200%', display: 'flex', justifyContent: 'flex-end' }}>
                    <input
                        type="text"
                        placeholder="Search for a Java file..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        style={{ width: '200%' }}
                    />
                    <button onClick={() => handleSearch(searchTerm)}>Search</button>
                    {showDropdown && (
                        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', position: 'absolute', backgroundColor: 'white', zIndex: 1, width: '200%', marginTop: '2px', padding: '0', listStyleType: 'none', top: '100%' }}>
                            {filteredFiles.map(file => (
                                <li key={file.file} onClick={() => handleSearch(file.file)} style={{ padding: '5px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'grey' }}>{file.file}</span>
                                    <span style={{ color: 'lightgrey' }}>project: {file.source}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
            {fileContent && (
                <div style={{ padding: '10px', backgroundColor: '#f4f4f4', marginTop: '10px' }}>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
};

export default NavBar;