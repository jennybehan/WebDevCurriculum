const express = require('express'),
	  path = require('path'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  queryString = require('querystring'),
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
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	let data = req.body;
	let fileName = data.title + '.txt';
	let fileText = data.body;
	fs.writeFileSync(pathName + fileName, fileText, 'utf8', (err) => {
		if (err) return;
	})
	// res.redirect('./memo/' + fileName)
	// res.send(fileName+' 제목으로' + fileText + ' 내용의 ' + '메모가 등록되었습니다 ✅');
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
	res.send(dom.join(''))
})


app.put('/memo', (req, res) => {
})

app.delete(`/delete/aa.txt`, (req, res) => {
	res.send('delete request');
	console.log('deleted')

})

const server = app.listen(8080, () => {
	console.log('Server started!');
});