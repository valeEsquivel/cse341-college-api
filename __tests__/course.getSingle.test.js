const express = require('express');
const app = express();
const mongodb = require('../data/database');
const courseRoute = require('../routes/courses')
const request = require('supertest');

app.use('/course', courseRoute);

let database;

describe("Get single course", () => {
    it("should get a course by the id from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/course/684b9179f7da40e3f741c616')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});