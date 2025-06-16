const express = require('express');
const app = express();
const mongodb = require('../data/database');
const gradeRoute = require('../routes/grades')
const request = require('supertest');

app.use('/grade', gradeRoute);

let database;

describe("Get single grade", () => {
    it("should get a grade by the id from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/grade/684b9217f7da40e3f741c617')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});