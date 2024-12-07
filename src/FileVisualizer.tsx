import React from 'react';
import './App.css'; // Ensure styles are applied

interface FileProps {
  lineOfCodes: number;
  fileName: string;
  cloneRanges: [number, number][];
}

interface FileVisualizerProps {
  onFileClick: (fileName: string, range: [number, number]) => void;
  clonesData: any[];
}

const FileVisualizer: React.FC<FileVisualizerProps> = ({ onFileClick, clonesData }) => {
  const files: FileProps[] = clonesData.map(clone => ({
    lineOfCodes: 100, // Mock value, replace with actual data if available
    fileName: clone.fileName,
    cloneRanges: [[clone.cloneRange.startLine, clone.cloneRange.endLine]]
  }));

  const handleRangeClick = (fileIndex: number, rangeIndex: number) => {
    const fileName = files[fileIndex].fileName;
    const range = files[fileIndex].cloneRanges[rangeIndex];
    const sourceCode = Array.from({ length: range[1] - range[0] + 1 }, (_, i) => {
      const lineNumber = range[0] + i;
      return `<span class="line-number">${lineNumber}</span>: // Code for line ${lineNumber}`;
    }).join('\n');
    openSourceCodeWindow(fileName, range, sourceCode);
    onFileClick(fileName, range);
  };

  return (
      <div className="file-container">
        {files.map((file, fileIndex) => (
            <div key={fileIndex} className="file" style={{ height: `${file.lineOfCodes}px` }}>
              <div className="file-title">{file.fileName}</div>
              <div className="file-content">
                {file.cloneRanges.map((range, rangeIndex) => {
                  const rangeHeight = ((range[1] - range[0]) / file.lineOfCodes) * 100;
                  const rangeTop = ((range[0] + (range[1] - range[0]) / 2) / file.lineOfCodes) * 100 - rangeHeight / 2;
                  return (
                      <div
                          key={rangeIndex}
                          className="clone-range"
                          style={{
                            top: `${rangeTop}%`,
                            height: `${rangeHeight}%`,
                          }}
                          onClick={() => handleRangeClick(fileIndex, rangeIndex)}
                      />
                  );
                })}
              </div>
            </div>
        ))}
      </div>
  );
};

export default FileVisualizer;