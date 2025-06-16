const express = require('express');
const app = express();
const mongodb = require('../data/database');
const studentRoute = require('../routes/students')
const request = require('supertest');

app.use('/student', studentRoute);

let database;

describe("Get all students", () => {
    it("should get all the students from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/student')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});