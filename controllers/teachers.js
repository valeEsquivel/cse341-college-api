const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Teacher'];
    try {
        const result = await mongodb.getDB().db().collection('teachers').find();
        result.toArray().then((teacher) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(teacher);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getById = async (req, res) => {
    //#swagger.tags = ['Teacher'];
    try {
        const teacherId = new ObjectId(req.params.teacherId);
        const result = await mongodb.getDB().db().collection('teachers').find({ _id: teacherId });
        result.toArray().then((teacher) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(teacher);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const createTeacher = async (req, res) => {
    //#swagger.tags = ['Teacher'];
    try {
        const teacher = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };
        const response = await mongodb.getDB().db().collection('teachers').insertOne(teacher);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong while creating the teacher');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updateTeacher = async (req, res) => {
    //#swagger.tags = ['Teacher'];
    try {
        const teacherId = new ObjectId(req.params.teacherId);
        const teacher = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };
        const response = await mongodb.getDB().db().collection('teachers').replaceOne({ _id: teacherId }, teacher);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the teacher');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteTeacher = async (req, res) => {
    //#swagger.tags = ['Teacher'];
    try {
        const teacherId = new ObjectId(req.params.teacherId);
        const response = await mongodb.getDB().db().collection('teachers').deleteOne({ _id: teacherId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the teacher');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getAll,
    getById,
    createTeacher,
    updateTeacher,
    deleteTeacher
};