const express = require('express');
const app = express();
const mongodb = require('../data/database');
const gradeRoute = require('../routes/grades')
const request = require('supertest');

app.use('/grade', gradeRoute);

let database;

describe("Get all grades", () => {
    it("should get all the grades from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/grade')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});