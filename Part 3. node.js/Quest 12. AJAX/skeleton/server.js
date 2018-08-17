const express = require('express'),
	  path = require('path'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  fs = require('fs');

	  
// middlewares
app.use(express.static('client'));
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
		// res.send(fileName +' 제목으로' + fileText + ' 내용의 ' + '메모가 등록되었습니다 ✅');
		console.log('메모가 등록되었습니다 ✅')
		if (err) return;
	})
})

// READ
app.get('/memo/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	
	fs.readFile(pathName + fileName, 'utf-8', (err, result) => {
		if (err) throw err;
		res.send(result);
	})
})

app.get('/memo', (req, res) => {
	const files = fs.readdirSync('./memo');
	const dom = files.map(file => {
		var list = `<li><a href="/memo/${file}">https://localhost:8080/memo/${file}</a></li>`;
		return list;
	})
	
	res.send(dom.join(''));
})


app.put('/memo/:fileName', (req, res) => {
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