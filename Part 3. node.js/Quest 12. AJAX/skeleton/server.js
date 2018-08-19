const express = require('express'),
	  path = require('path'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  fs = require('fs'),
	  util = require('util');

// GET /memo list all contacts
// POST /memo create new contact
// GET /memo/{id} retrieve a single contact
// PUT /memo/{id} update a single contact

// middlewares
app.use(express.static('client')); // app.use(express.static('public')) : 정적 파일을 사용하기 위한 설정
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

const pathName = './memo/';

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/memo', (req, res) => {
	let data = req.body;
	let fileName = data.title + '.txt';
	let fileText = data.body;
	fs.writeFile(pathName + fileName, fileText, 'utf8', (err) => {
		res.json({
			"title": fileName,
			"body": fileText,
		})
		if (err) return;
	})
})

app.get('/memo/:fileName', (req, res) => {
	const fileName = req.params.fileName;

	fs.readFile(pathName + fileName, 'utf-8', (err, result) => {
		const jsonData = {data: data};

		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(jsonData));
		// res.send(result);
	})
})

app.get('/memo', (req, res) => {
 	res.writeHead(200, {'Content-Type': 'application/json'});

	const readdirAsync = util.promisify(fs.readdir)
 	const readFileAsync = filePath => new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			data = data.toString();
			if (err) reject(err);
			resolve({filePath, data});
		})
	})

	readdirAsync(pathName)
		.then(files => Promise.all(files.map(file => 
			readFileAsync(pathName + file))
		).then(data => {
			console.log(data)
			res.end(JSON.stringify(data))
		}).catch(err => { console.error(err) })
	)
})

app.delete(`/memo/:fileName`, (req, res) => {
	const fileName = req.params.fileName;

	fs.unlink(pathName + fileName, (err) => {
		if (err) throw err;
		console.log('deleted')
	})
	res.send('delete request');
	// res.redirect('/')
})

const server = app.listen(8080, () => {
	console.log('Server started!');
});