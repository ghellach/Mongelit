const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const os = require('os');
const moment = require("moment");
const mongoose = require('mongoose');

router.post("/list_collections", (req, res) => {
    // Connection url
    try {
        const MongoClient = require("mongodb").MongoClient;
        const url = req.body.url;
        const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;
    
        const dbName = req.body.db;
        client
            .connect()
            .then(
                client =>
                client
                    .db(dbName)
                    .listCollections()
                    .toArray() // Returns a promise that will resolve to the list of the collections
            )
            .then(cols => {res.send(cols)})
            .catch(err => res.json(err))
            .finally(() => client.close());
    }catch(err) {
        return res.json(err);
    }
    
});


router.post("/export_db", (req, res) => {

    // ! I don't like how MongoDB actions are done in this code. Should be remade !
  
    // * initialize mongodb connection for the specified url and db
    const MongoClient = require("mongodb").MongoClient;
    const client = new MongoClient(req.body.url, { useUnifiedTopology: true });

    const date = "./";
    const fileLocation = path.join(os.homedir(), "./documents/mongelit/./", req.body.db, date, `db_${req.body.db}.json`);
    

    // * function that fetches collection content
    function fetchCollectionAsSeparate(col) {

        MongoClient.connect(req.body.url, function(err, db) {
    
            let full;
            if (err) throw err;
            
            var dbo = db.db(req.body.db);
            dbo.collection(col.name).find({}).toArray(function(err, result) {
                if (err) throw err;
    
                // * writes found collection's documents to fs.
                fs.writeFile(path.join(os.homedir(), "./documents/mongelit/./", req.body.db, date, `${col.name}.json`), JSON.stringify(result), function (err) {
                if (err) return console.log(err);
                });
                return result;
            });
            //db.close();
            return res.json(full);
        });
    
    }
    
    function fetchCollectionAsUnique(col) {
    
        MongoClient.connect(req.body.url, function(err, db) {
    
            let full;
            if (err) throw err;
            
            var dbo = db.db(req.body.db);
            dbo.collection(col.name).find({}).toArray(function(err, result) {
                if (err) throw err;
    
                console.log(1);
                const current = JSON.parse(fs.readFileSync(fileLocation));
                current[col.name] = result;
                console.log(02)
    
                // * writes found collection's documents to fs.
                fs.writeFile(fileLocation, JSON.stringify(current), function (err) {
                if (err) return console.log(err);
                });
                return result;
            });
            //db.close();
            return res.json(full);
        });
    
    }
    

    client
        .connect()
        .then(
            // * finds collections
            client =>
            client
                .db(req.body.db)
                .listCollections()
                .toArray() // Returns a promise that will resolve to the list of the collections
        )
        .then(cols => {
            
            // * creates appropriate directories
            try {
                fs.mkdirSync(path.join(os.homedir(), "./documents", "./mongelit"))
            }catch{

            }

            const dbFolder = path.join(os.homedir(), "./documents", "./mongelit/", req.body.db,"/", date)
            try {
                console.log(dbFolder);
                fs.mkdirSync(path.join(os.homedir(), "./documents", "./mongelit/", req.body.db))
                fs.mkdirSync(dbFolder)
            }catch{

            }
            
            // * performs fetch and fs write for each collection.
            if(req.body.separate) {
                cols.forEach(col => {
                    try {
                        fetchCollectionAsSeparate(col);
                    }catch(err) {
                        throw err;
                    }
                    
                })
            }

            if(req.body.unique) {
                try {
                    console.log(fileLocation)
                    fs.writeFileSync(fileLocation, "{}");
                }catch(err){return res.json(err)}
    
                
                // * performs fetch and fs write for each collection.
                cols.forEach(col => {
                    try {
                        fetchCollectionAsUnique(col);
                    }catch(err) {
                        throw err;
                    }
                    
                })
            }

            return res.json({
                message: "All collections exported successfully to " + dbFolder,
                dbFolder
            });
            
            
        })
        .catch(err => {
            return res.json(err);
        })
        //.finally(() => client.close());

    
});

module.exports = router;