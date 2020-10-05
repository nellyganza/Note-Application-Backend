const express = require('express');
import NoteRouter from './routers/noteRouter'
const app = express();
require('./helpers/database')
require('./models/Note')
app.use(express.json());
app.use(express.urlencoded());
app.use(NoteRouter);

module.exports = app