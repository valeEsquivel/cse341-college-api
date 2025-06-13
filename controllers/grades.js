const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Grades'];
    try {
        const result = await mongodb.getDB().db().collection('grades').find();
        result.toArray().then((grade) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(grade);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getGradesByStudentId = async (req, res) => {
    //#swagger.tags = ['Grades'];
    try {
        const studentId = new ObjectId(req.params.studentId);
        const result = await mongodb.getDB().db().collection('grades').find({ studentId: studentId });
        result.toArray().then((grade) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(grade);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const addGrade = async (req, res) => {
    //#swagger.tags = ['Grades'];
    try {
        // verification of role to add a grade
        // const user = await mongodb.getDB().db().collection('users').findOne({ username: req.body.username });
        // if (!user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        // if (user.role !== 'TEACHER' && user.role !== 'ADMIN') {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        // Verify if course exists
        const courseId = new ObjectId(req.body.courseId);
        const course = await mongodb.getDB().db().collection('courses').findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Verify if student exists
        const studentId = new ObjectId(req.body.studentId);
        const student = await mongodb.getDB().db().collection('students').findOne({ _id: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const grade = {
            studentId: new ObjectId(req.body.studentId),
            courseId: new ObjectId(req.body.courseId),
            term: req.body.term,
            grade: req.body.grade,
            addDate: req.body.addDate
        };

        const response = await mongodb.getDB().db().collection('grades').insertOne(grade);
        
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the grade');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updateGrade = async (req, res) => {
    //#swagger.tags = ['Grades'];
    try {
        // verification of role to add a grade
        // const user = await mongodb.getDB().db().collection('users').findOne({ username: req.body.username });
        // if (!user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        // if (user.role !== 'TEACHER' && user.role !== 'ADMIN') {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        // Verify if course exists
        const courseId = new ObjectId(req.body.courseId);
        const course = await mongodb.getDB().db().collection('courses').findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Verify if student exists
        const studentId = new ObjectId(req.body.studentId);
        const student = await mongodb.getDB().db().collection('students').findOne({ _id: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const gradeId = new ObjectId(req.params.gradeId);

        const grade = {
            studentId: new ObjectId(req.body.studentId),
            courseId: new ObjectId(req.body.courseId),
            term: req.body.term,
            grade: req.body.grade,
            addDate: req.body.addDate
        };

        const response = await mongodb.getDB().db().collection('grades').replaceOne({ _id: gradeId }, grade);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the grade');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteGrade = async (req, res) => {
    //#swagger.tags = ['Grades'];
    try {
        const gradeId = new ObjectId(req.params.gradeId);
        const response = await mongodb.getDB().db().collection('grades').deleteOne({ _id: gradeId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the grade');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const verifyStudent = async (id) => {
  try {
    const studentId = new ObjectID(id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("students")
      .find({ _id: studentId })
      .toArray();

    return result.length > 0;
  } catch (err) {
    return false;
  }
};

const verifyCourse = async (id) => {
  try {
    const courseId = new ObjectID(id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("courses")
      .find({ _id: courseId })
      .toArray();

    return result.length > 0;
  } catch (err) {
    return false;
  }
};

module.exports = {
    getAll,
    getGradesByStudentId,
    addGrade,
    updateGrade,
    deleteGrade,
    verifyCourse,
    verifyStudent
};