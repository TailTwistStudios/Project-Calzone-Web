require("fs/promises")
const { readdir } = require("fs");
const databases = require("../databases.json");

function initialize() {
    //generate preconfigured helper objects for each database
    for (databaseMetadata in databases) {
        generateCache(databaseMetadata.name)
    }

    console.log("Initialized local databases.")
}

function generateCache(databaseName) {
    let database = getDatabase(databaseName);


    let directory = database.databaseDirectory;
    let cacheFilePath = directory + "Cache.json";
    
    try {
        const files = readdir(directory);
        for (let file of files) {
            console.log(file);
        } 
        
    } catch (err) {
        console.error(err);
        return;
    }
    

}

function getDatabase(databaseName) {
    let result = databases.find((databaseObject) => databaseObject.name == databaseName);

    if (result == undefined) {
        throw new Error("Requested cache generation with name " + databaseName + " but no database by that name exists in the database config file.");
    }
    return result;
}


module.exports = { initialize };

