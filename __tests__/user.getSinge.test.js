const express = require('express');
const app = express();
const mongodb = require('../data/database');
const userRoute = require('../routes/users')
const request = require('supertest');

app.use('/user', userRoute);

let database;

describe("Get single user", () => {
    it("should get a user by thier id from the database", async () => {
        await mongodb.initDB((err, data) => {
            if(err) {
                console.error(err);
            } else {
                database = data;
            }
        });
        await request(app)
            .get('/user/684f7bfdf2bd168f05701fc1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                database.close();
            });
    });
});