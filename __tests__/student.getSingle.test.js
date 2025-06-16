const express = require('express');
const app = express();
const mongodb = require('../data/database');
const studentRoute = require('../routes/students')
const request = require('supertest');

app.use('/student', studentRoute);

let database;

describe("Get single student", () => {
    it("should get a student by the id from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/student/684487866e3f207c59435967')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});