const express = require('express');
import noteController from '../controllers/noteController'
const noteRouter = express.Router();

noteRouter.get('/notes',noteController.getAll)
noteRouter.get('/notes/:id',noteController.getOne)
noteRouter.get('/notes/searchInfo/withAnd/search',noteController.getAnd)
noteRouter.get('/notes/searchInfo/withOr/search',noteController.getOr)
noteRouter.get('/notes/searchInfo/withLimit/search',noteController.getLimit)
noteRouter.post('/notes',noteController.saveNote)
noteRouter.put('/notes/:id',noteController.updateNote)
noteRouter.delete('/notes/:id',noteController.deleteNote)





export default noteRouter