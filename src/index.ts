import express from 'express';
import { json, urlencoded } from 'body-parser';
import apiVersion1 from './router/v1';
import db from "./database/connection";
import createTable from './database/exec';
import { setDBExists } from './database/config';
import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);

app.get('/', (req, res) => {
  res.send({response: "Welcome to the home page"});
});

app.get('/createDB', (req, res) => {
    setDBExists(false);
    let query = `CREATE DATABASE ${process.env.DB_DB}`;
    db.query(query, (err: any, result: any) => {
        res.send(err || result)
    })
})

app.get('/runMigrations', (req, res) => {
    setDBExists(true);
    let query = createTable;
    db.query(query, (err: any, result: any) => {
        res.send(err || result)
    })
})

app.use((req, res) => {
  res.status(404).send({response: "404 - route not found"});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
