const express = require('express');
const app = express();
const mongodb = require('../data/database');
const userRoute = require('../routes/users')
const request = require('supertest');

app.use('/user', userRoute);

let database;

describe("Get all users", () => {
    it("should get all the users from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/user')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});