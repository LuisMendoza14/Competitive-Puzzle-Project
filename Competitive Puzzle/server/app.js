/* 

    Here, we utilize packages express and path to describe
    how our web server listening on the port, let's say 3000, will
    respond.

    Notice that the app.get function call is going to return the specific files we want!

*/

const express = require('express');
const path = require('path');

const app = express();

// Serve static assets (CSS, JS, Images)
// This allows <script src="/index.js"> or <script src="/quiz/create-quiz.js"> to work
app.use(express.static(path.join(__dirname, '../public')));

// Map specific URLs to HTML files
// Route for the landing page (domain.com)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route for domain.com/create-quiz
app.get('/create-quiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/quiz/index.html'));
});

module.exports = app;