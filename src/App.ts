import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { container } from 'tsyringe';
import EventController from './application/controllers/EventController';

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', container.resolve(EventController).routes());

module.exports = app