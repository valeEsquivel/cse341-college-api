const express = require('express');
const app = express();
const mongodb = require('../data/database');
const teacherRoute = require('../routes/teachers')
const request = require('supertest');

app.use('/teacher', teacherRoute);

let database;

describe("Get single teacher", () => {
    it("should get a teacher by the id from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/teacher/68448c58914cf9e4944f5271')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});