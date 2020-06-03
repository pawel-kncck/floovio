const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');

// https://www.youtube.com/watch?v=m_u6P5k0vP0

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dialetton.firebaseio.com"
});

const app = express();

app.get('/exercises', (req, res) => {
    admin
        .firestore()
        .collection('exercises')
        .get()
        .then(data => {
            let exercises = [];
            data.forEach(doc => {
                exercises.push(doc.data());
            });
            return res.json(exercises);
        })
        .catch(err => console.error(err));
})

exports.createExercise = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: 'Method not alowed' });
    }
    const newExercise = {
        title: req.body.title,
        rawHtml: req.body.rawHtml,
        tags: req.body.tags,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
        .collection('exercises')
        .add(newExercise)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        })
});

// https://baseurl.com/api/your_route

exports.api = functions.https.onRequest(app); 