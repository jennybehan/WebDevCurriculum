const express = require('express'),
	  path = require('path'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  fs = require('fs'),
	  util = require('util'),
	  session = require('express-session');

// GET /memo list all contacts
// POST /memo create new contact
// GET /memo/{id} retrieve a single contact
// PUT /memo/{id} update a single contact

// middlewares
app.use(express.static('client')); // app.use(express.static('public')) : 정적 파일을 사용하기 위한 설정
app.use(bodyParser.json()) // parse requests of content-type - application/json

app.use(session({
	secret: 'secretkey', // session의 암호화에 사용되는 key값
	name: 'sessionId',
	resave: false, // request가 요청되었을때, 기존의 session이 존재하는 경우 다시 저장할 필요가 있는지를 확인하는 option
	saveUninitialized: false, // 설정하지 않으면 세션이 저장되지 않음. 기본값은 true - 모든 초기화되지 않은 session이 저장.
	// saveUninitialized: true,
	cookie: {
		domain: 'http://localhost:8080/',
		secure: true, // http로 호출되는 경우에만 session cookie를 생성하는 option. 	
	}
}))

const pathName = './memo/';
const users = [
	{
		userId: 'user01',
		userPw: '1111'
	},
	{
		userId: 'user02',
		userPw: '2222'
	},
	{
		userId: 'user03',
		userPw: '3333'
	}
]

app.get('/', (req, res) => {
	// if(req.session.userName) {
	// 	res.send(req.session.userName)
	// }
	res.sendFile(path.join(__dirname, 'index.html'));
})

const findUser = (userId, userPw) => {
	return users.find(user => user.userId === userId && user.userPw === userPw)
}

app.post('/login', (req, res) => {
	const body = req.body;
	console.log(req.body)
	// if (findUser(body.userId, body.userPw)) {
	// 	console.log(req.session)
	// 	res.set({ 'content-type': 'text/html; charset=utf-8' })
	// 	res.redirect('/')
	// } else {
	// 	res.send('유효하지 않습니다. 다시 로그인해주세요.')
	// }
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).end();
			res.redirect('/');
		}
	})
})

function writeMemo() {
	return new Promise((resolve, reject) => {
		fs.writeFile(pathName + fileName, {
			encoding: 'utf8'
		}, (err, fileText) => {
			if (err) reject(err);
			else resolve(
				{
					"title": fileName,
					"body": fileText,
				}
			)
		}
	)}
)}

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
	fs.readFile(pathName + fileName, 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'application/json'});
		const fileData = {
			data
		}
		res.end(JSON.stringify(fileData));
	})
})

app.get('/memo', (req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
	//  getPost();
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
			const fileData = {
				data
			}
			res.end(JSON.stringify(fileData))
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