import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FileVisualizer from './FileVisualizer';
import HighlightedCode from './DisplayJavaCode';

const AnalysisPage: React.FC = () => {
    const { analysisType } = useParams<{ analysisType: string }>();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [cloneRange, setCloneRange] = useState<[number, number] | null>(null);
    const [basicClones, setBasicClones] = useState<any[]>([]);
    const [sequenceClones, setSequenceClones] = useState<any[]>([]);
    const [expandedTab, setExpandedTab] = useState<string | null>(null);

    useEffect(() => {
        const fetchClonesData = async (type: string) => {
            try {
                const response = await fetch(`/${analysisType}_${type}_clones.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            } catch (error) {
                console.error(`Error fetching the ${type} clones data:`, error);
                return [];
            }
        };

        const fetchAllClonesData = async () => {
            const basicData = await fetchClonesData('basic');
            const sequenceData = await fetchClonesData('sequence');
            setBasicClones(basicData);
            setSequenceClones(sequenceData);
        };

        fetchAllClonesData();
    }, [analysisType]);

    const handleFileClick = (fileName: string, range: [number, number]) => {
        setSelectedFile(fileName);
        setCloneRange(range);
    };

    const toggleTab = (tabName: string) => {
        setExpandedTab(expandedTab === tabName ? null : tabName);
    };

    return (
        <div>
            <div>
                <button onClick={() => toggleTab('basic')}>Basic Clones</button>
                {expandedTab === 'basic' && (
                    <FileVisualizer onFileClick={handleFileClick} clonesData={basicClones} />
                )}
            </div>
            <div>
                <button onClick={() => toggleTab('sequence')}>Sequence Clones</button>
                {expandedTab === 'sequence' && (
                    <FileVisualizer onFileClick={handleFileClick} clonesData={sequenceClones} />
                )}
            </div>
            {selectedFile && cloneRange && (
                <HighlightedCode startCloneLine={cloneRange[0]} endCloneLine={cloneRange[1]} />
            )}
        </div>
    );
};

export default AnalysisPage;