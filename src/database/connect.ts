import { createConnection } from 'typeorm';
import path from 'path'

createConnection({
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
}).then(() => {
  console.log("DB Connected!")
}).catch((err) => {
  console.log("Error connecting to DB")
  console.log(err)
})