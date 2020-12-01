import express from 'express';
import { json, urlencoded } from 'body-parser';
import apiVersion1 from './router/v1';
import db from "./database/connection";
import createTable from './database/exec';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);

app.get('/', (req, res) => {
  res.send({response: "Welcome to the home page"});
});

app.get('/createDB', (req, res) => {
    let query = "CREATE DATABASE bincomphptest";
    db.query(query, (err, result) => {
        res.send(err || result)
    })
})

app.get('/runMigrations', (req, res) => {
    let query = createTable;
    db.query(query, (err, result) => {
        res.send(err || result)
    })
})

app.use((req, res) => {
  res.status(404).send({response: "404 - route not found"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
