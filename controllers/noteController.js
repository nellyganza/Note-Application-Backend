import { Sequelize } from 'sequelize';
import Note from '../models/Note'
const Op = Sequelize.Op

export default new class NoteController {
    async getAll(req, res){
        try {
            const note = await Note.findAll();
            if(note){
                return res.status(302).send({
                    message:'Notes Found',
                    notes: note
                })
            }
        } catch (error) {
            return res.status(404).send({
                message:'Notes not Found',
            })
        }
    }

    async getOne(req, res){
        try {
            const note = await Note.findAll({where:{id:req.params.id}});
            if(note.length === 0){
                return res.status(404).send({
                    message:'Notes not Found',
                })
            }
            return res.status(302).send({
                message:'Notes Found',
                notes: note
            })
        } catch (error) {
            return res.status(500).send({
                error:error.message,
            })
        }
    }

    async getAnd(req, res){
        try {
            const note = await Note.findAll({ where: { note: req.query.note, tag: req.query.tag } });
            if(note.length === 0){
                return res.status(404).send({
                    message:'Notes not Found',
                })
            }
            if(note){
                return res.status(302).send({
                    message:'Notes Found',
                    notes: note
                })
            }
        } catch (error) {
            return res.status(500).send({
                error:error.message
            })
        }
    }
    async getOr(req, res){
        try {
            const note = await Note.findAll({ where: { 
                tag: {
                    [Op.or]: [].concat(req.query.tag) 
                }
            } });
            if(note.length === 0){
                return res.status(404).send({
                    message:'Notes not Found',
                })
            }
            if(note){
                return res.status(302).send({
                    message:'Notes Found',
                    notes: note
                })
            }
        } catch (error) {
            return res.status(500).send({
                error:error.message 
            })
        }
    }

    async getLimit(req, res){
        try {
            const note = await Note.findAll({ 
                limit:2,
                where: { 
                    tag: {
                        [Op.or]: [].concat(req.query.tag) 
                    }
            } });
            if(note.length === 0){
                return res.status(404).send({
                    message:'Notes not Found',
                })
            }
            if(note){
                return res.status(302).send({
                    message:'Notes Found',
                    notes: note
                })
            }
        } catch (error) {
            return res.status(500).send({
                error: error.message,
            })
        }
    }

    async saveNote(req, res){
        try {
            const note = {note: req.body.note, tag: req.body.tag}
            const savedNote = await Note.create(note)
            if(savedNote){
                return res.status(201).send({
                    message:'Note Saved Successfully!!',
                    notes: savedNote
                })
            }
        } catch (error) {
            return res.status(400).send({
                message:error.message
            })
        }
    }

    async updateNote(req, res){
        try {
            const note = {note: req.body.note, tag: req.body.tag}
            const foundNote = await Note.findByPk(req.params.id)
            if(!foundNote){
                return res.status(404).send({
                    message:'Note not Found',
                })
            }
            const updatedNote = await foundNote.update(note)
            if(updatedNote){
                return res.status(201).send({
                    message:'Note Updated Successfully!!',
                    notes: updatedNote
                })
            }
        } catch (error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

    async deleteNote(req, res){
        try {
            const foundNote = await Note.findByPk(req.params.id);
            if(!foundNote){
                return res.status(404).send({
                    message:'Note not Found',
                })
            }
            await foundNote.destroy();
            return res.status(200).send({
                message:'Note Deleted Successfully!!',
            })
        } catch (error) {
            return res.status(500).send({
                error:error.message,
            })
        }
    }
}