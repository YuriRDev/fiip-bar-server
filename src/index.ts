import 'reflect-metadata';
import './database/connect'

import cors from 'cors'
import express from 'express';

import routes from './routes'

const app = express();
app.use(cors())
app.use(express.json());
app.use( express.static( __dirname + '/fiipSite' ));

app.use(routes)


app.listen(3333, ()=>{
  console.log("Server started at 3333")
})