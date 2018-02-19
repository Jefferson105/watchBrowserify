const fs = require("fs");
const readline = require("readline");

function watchBrowserify(bundle) {
    //Get the file configured in bundle and making it absolute path
    let mainFile = bundle._options.entries.replace(".", __dirname);
    
    // Get the current path of the main file
    let lastSlash = mainFile.lastIndexOf("/");
    const currentPath = mainFile.slice(0, lastSlash + 1);

    // Set up listener when update some bundle file
    bundle.on("update", function(bundle) {

    });

    // Call function for get import files 
    getFiles(mainFile);

    // Function for get files in import statement
    function getFiles(fileName) {
        
        // Watch changes in file
        fs.watch(fileName, { encoding: "buffer" }, (event, fileName) => {
            if(fileName && event == "change") {
                bundle.emit("update", bundle, bundle);
            }
        });
        
        // Set up readLine
        let readFile = readline.createInterface({
            input: fs.createReadStream(fileName),
            terminal: false
        });
        
        // Verifying line by line for import statement
        readFile.on("line", (line) => {
            // Import files checking. These files must have .js and .jsx prefixes
            if(line.indexOf("import") >= 0 && line.indexOf("//") == -1 && line.indexOf(".jsx") >= 0 && line.indexOf(".js") >= 0) {
                let importLine = line.split(" ");
                var file = importLine[importLine.length - 1].replace(/\".\//gi, "").split("\";").join("");
                
                // If file is valid, the function is call again with the file path 
                if(file) {
                    file = currentPath + "/" + file;
                    getFiles(file);
                }
            }
        });
    }

    return bundle;
}

module.exports = watchBrowserify;