const express = require('express'),
	  path = require('path'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  fs = require('fs'),
	  util = require('util'),
	  session = require('express-session'),
	  cookieParser = require('cookie-parser');

// middlewares
app.use(express.static('client')); // app.use(express.static('public')) : 정적 파일을 사용하기 위한 설정
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(cookieParser());

app.use(session({
	secret: 'secretkey', // session의 암호화에 사용되는 key값
	name: 'sessionId',
	resave: false, // request가 요청되었을때, 기존의 session이 존재하는 경우 다시 저장할 필요가 있는지를 확인하는 option
	saveUninitialized: true, // 설정하지 않으면 세션이 저장되지 않음. 기본값은 true - 모든 초기화되지 않은 session이 저장.
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
	res.sendFile(path.join(__dirname, 'index.html'));
})

const findUser = (userId, userPw) => {
	return users.find(user => user.userId === userId && user.userPw === userPw)
}

app.get('/login', (req, res) => {
	const session = req.session;
	console.log(session)
	if (req.session) {
		console.log(req.session)
	}
})

app.post('/login', (req, res) => {
	const id = req.body.id;
	const pw = req.body.pw;
	console.log(id, pw)
	if (findUser(id, pw)) {
		console.log(req.session)
		req.session.username = id;
		req.session.login = true;
		success = true;
		res.redirect('/')
	} else {
		res.send('유효하지 않습니다. 다시 로그인해주세요.')
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
})

app.post('/memo', (req, res) => {
	let data = req.body;
	let fileName = data.title && data.title.split('.txt')[0];
	let fileText = data.text;
	
	fs.writeFile(path.join(__dirname, pathName) + fileName + '.txt', fileText, 'utf8', (err) => {
		res.json({
			"title": fileName,
			"text": fileText,
		})
		if (err) {
			console.error(err);
		}
	})
})

app.get('/memo/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	fs.readFile(path.join(__dirname, pathName, fileName), 'utf-8', (err, data) => {
		res.writeHead(200, {'Content-Type': 'application/json'});
		const fileData = {
			"title": fileName,
			"text": data
		}
		console.log('fileData: ', fileData)
		res.end(JSON.stringify(fileData));
		if (err) {
			console.log(err);
		}
	})
})

app.get('/memo', (req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
	const readdirAsync = util.promisify(fs.readdir)
 	const readFileAsync = title => new Promise((resolve, reject) => {
		fs.readFile(title, (err, text) => {
			text = text.toString();
			if (err) reject(err);
			resolve({title, text});
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