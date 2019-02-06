const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.router();
const app = express();

const authors = require('./controllers/authors.js');
const memos = require('./controllers/memos.js');

const corsOption = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
};

// express config
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

// define routes
router.get('/authors', authors.findAll);
router.get('/authors/:id', authors.findById);
router.post('/authors', authors.create);
router.put('/authors', authors.update);
router.delete('/authors', authors.delete);

router.get('/memos', memos.index);
router.get('/memos/:id', memos.show);
router.post('/memos', memos.create);
router.put('/memos', memos.update);
router.delete('/memos', memos.delete);

// register api routes
// app.use('/api', router);

const server = app.listen(8080, () => {
    console.log('Server started!');
});