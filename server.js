const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, 2-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'] }));
app.use(cors({ origin: '*', credentials: true }));
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

// passport requires this. don't know why, but make sure to add it in whenever using passport.
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Welcome to CSE341 College API! Logged in as ${req.session.user.username}` : "Welcome to CSE341 College API! Logged Out")
    console.log(req.session);
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        req.session.save();
        // console.log(req.session);
        res.redirect('/');
        //I know this isn't normal, but for other 
        // req.body.username = "temp@mail.com";
});

mongodb.initDB((err) => {
    if(err) {
        console.error(err);
    } else {
        app.listen(port, () => {
          console.log(`Database listening and Server is running on port ${port}`);
        });
    }
})
