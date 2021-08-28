"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
typeorm_1.createConnection({
    "type": "postgres",
    "host": "fiipsqlinstance.cip096wxuuna.sa-east-1.rds.amazonaws.com",
    "port": 5432,
    "username": "postgres",
    "password": "Fiip#Db1.",
    "database": "bar",
    "entities": [
        __dirname + '/../**/**{.ts,.js}'
    ],
    "migrations": [
        "src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}).then(function () {
    console.log("DB Connected!");
}).catch(function (err) {
    console.log("Error connecting to DB");
    console.log(err);
});
