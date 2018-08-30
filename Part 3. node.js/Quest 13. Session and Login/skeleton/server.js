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
	saveUninitialized: false,
	cookie: {
		domain: 'http://localhost:8080/',
		maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
		// secure: true, // https로 호출되는 경우에만 session cookie를 생성하는 option. 	
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

// app.use((req, res, next) => {
// 	console.log('req.path: ', req.path);
// 	console.log('req.session: ', req.session);
// 	if((req.session && req.session.username) || req.path === '/login') return next();
// 	else return res.redirect('/login');
// });

app.post('/login', (req, res) => {
	const id = req.body.id;
	const pw = req.body.pw;
	console.log('req.session: ', req.session)
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	if (findUser(id, pw)) {
		console.log(req.session)
		req.session.authenticated = true;
		req.session.username = id;
		req.session.login = true;
		success = true;
		res.redirect('/')
	} else {
		res.redirect('/login')
		// res.redirect('/')
		// redirect만 되고(302) res.end 왜 안될까..
		res.end('유효하지 않습니다. 다시 로그인해주세요.')
	}
});

// logout을 get으로 처리해야 하는지 post로 처리해야 하는지
app.post('/logout', (req, res) => {
	res.clearCookie('secretkey');
	req.session.destroy(() => {
		res.redirect('/');
	});
})


app.post('/memo', (req, res) => {
	let data = req.body;
	console.log(data)
	// title이 서로 다르게 들어옴
	// { title: './memo/test.txt', text: '1ggg' }
	// { title: 'test222', text: 'dfdf' }
	// let fileName = data.title && data.title; // 생성 가능, 수정하면 다음과 같은 에러가 남
	//{ Error: ENOENT: no such file or directory, open '/Users/juyeonhan/repo/WebDevCurriculum/Part 3. node.js/Quest 13. Session and Login/skeleton/memo/./memo/undefined.txt.txt'
  	// errno: -2,
  	// code: 'ENOENT',
  	// syscall: 'open',
  	// path: '/Users/juyeonhan/repo/WebDevCurriculum/Part 3. node.js/Quest 13. Session and Login/skeleton/memo/./memo/undefined.txt.txt' }
	let fileName = data.title && data.title.split('.txt')[0].split('./memo/')[1]; // 생성이 불가능, 수정이 가능
	let fileText = data.text;
	fs.writeFile(path.join(__dirname, pathName) + fileName + '.txt', fileText, 'utf8', (err) => {
	// fs.writeFile(path.join(__dirname, pathName + fileName + '.txt', fileText, 'utf8', (err) => {
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