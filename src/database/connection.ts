import mysql from 'mysql';
import dbConfig from "./config";

const db = mysql.createConnection(dbConfig)
const new_db = mysql.createConnection(dbConfig)


db.connect((err)=>{
    console.log(err || "Db connected")
})

export default db;
