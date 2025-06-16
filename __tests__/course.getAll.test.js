const express = require('express');
const app = express();
const mongodb = require('../data/database');
const courseRoute = require('../routes/courses')
const request = require('supertest');

app.use('/course', courseRoute);

let database;

describe("Get all courses", () => {
    it("should get all the courses from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/course')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});