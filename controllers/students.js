const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Student'];
    try {
        const result = await mongodb.getDB().db().collection('students').find();
        result.toArray().then((student) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(student);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Student'];
    try {
        const studentId = new ObjectId(req.params.studentId);
        const result = await mongodb.getDB().db().collection('students').find({ _id: studentId });
        result.toArray().then((student) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(student);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const createStudent = async (req, res) => {
    //#swagger.tags = ['Student'];
    try {
        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDB().db().collection('students').insertOne(student);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the student');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updateStudent = async (req, res) => {
    //#swagger.tags = ['Student'];
    try {
        const studentId = new ObjectId(req.params.studentId);
        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDB().db().collection('students').replaceOne({ _id: studentId }, student);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the student');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags = ['Student'];
    try {
        const studentId = new ObjectId(req.params.studentId);
        const response = await mongodb.getDB().db().collection('students').deleteOne({ _id: studentId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the student');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};