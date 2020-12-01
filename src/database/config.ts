import * as dotenv from "dotenv";

dotenv.config();
let db_exists = true;

export const setDBExists = (exists: boolean): void => {
    db_exists = exists;
}

const config: any =  {
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    multipleStatements: true
}

if(db_exists)
    config.database = process.env.DB_DB;

export default config
