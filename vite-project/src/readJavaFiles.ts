const javaFiles = import.meta.glob(
    '/Users/stephenkwan/Documents/GitHub/clone-detection-UI/java projects/test/src/main/java/com/mycompany/app/*.java',
    { as: 'raw' }
);



console.log(Object.keys(javaFiles)); // Log the paths to verify they are being matched

export const readJavaFiles = async () => {
    const files = [];
    for (const path in javaFiles) {
        const content = await javaFiles[path]();
        files.push({ fileName: path.split('/').pop() || 'Unknown', content });
    }
    return files;
};
