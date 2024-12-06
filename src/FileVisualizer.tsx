import './App.css'; // Ensure styles are applied

interface FileProps {
  lineOfCodes: number;
  fileName: string;
  cloneRanges: [number, number][];
}

function openSourceCodeWindow(fileName: string, range: [number, number], content: string) {
  const windowTitle = `${fileName} - Duplication code from Line ${range[0]} to ${range[1]}`;
  const newWindow = window.open('', windowTitle, 'width=600,height=400');
  if (newWindow) {
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
}

const FileVisualizer: React.FC = () => {
  // Mock data for demonstration
  const files: FileProps[] = [
    { lineOfCodes: 100, fileName: 'File1.java', cloneRanges: [[20, 40], [60, 80]] },
    { lineOfCodes: 150, fileName: 'File2.java', cloneRanges: [[50, 70]] },
    { lineOfCodes: 200, fileName: 'File3.java', cloneRanges: [[100, 150], [160, 180]] }
  ];

  // const [selectedRange, setSelectedRange] = useState<{ fileIndex: number; rangeIndex: number } | null>(null);

  const handleRangeClick = (fileIndex: number, rangeIndex: number) => {
    const fileName = files[fileIndex].fileName;
    const range = files[fileIndex].cloneRanges[rangeIndex];
    const sourceCode = Array.from({ length: range[1] - range[0] + 1 }, (_, i) => {
      const lineNumber = range[0] + i;
      return `<span class="line-number">${lineNumber}</span>: // Code for line ${lineNumber}`;
    }).join('\n');
    openSourceCodeWindow(fileName, range, sourceCode);
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