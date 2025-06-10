const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Course'];
    try {
        const result = await mongodb.getDB().db().collection('courses').find();
        result.toArray().then((course) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(course);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Course'];
    try {
        const courseId = new ObjectId(req.params.courseId);
        const result = await mongodb.getDB().db().collection('courses').find({ _id: courseId });
        result.toArray().then((course) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(course);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const createCourse = async (req, res) => {
    //#swagger.tags = ['Course'];
    try {
        const course = {
            name: req.body.name,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            registered: req.body.registered,
            teacherid: new ObjectId(req.body.teacherid),
            inperson: req.body.inperson
        };
        const response = await mongodb.getDB().db().collection('courses').insertOne(course);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the course');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updateCourse = async (req, res) => {
    //#swagger.tags = ['Course'];
    try {
        const courseId = new ObjectId(req.params.courseId);
        const course = {
            name: req.body.name,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            registered: req.body.registered,
            teacherid: new ObjectId(req.body.teacherid),
            inperson: req.body.inperson
        };
        const response = await mongodb.getDB().db().collection('courses').replaceOne({ _id: courseId }, course);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the course');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteCourse = async (req, res) => {
    //#swagger.tags = ['Course'];
    try {
        const courseId = new ObjectId(req.params.courseId);
        const response = await mongodb.getDB().db().collection('courses').deleteOne({ _id: courseId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the course');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCourse,
    updateCourse,
    deleteCourse
};