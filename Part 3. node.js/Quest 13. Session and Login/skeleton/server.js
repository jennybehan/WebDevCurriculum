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
	// cookie: {
	// 	domain: 'http://localhost:8080/',
	// 	maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
	// 	// secure: true, // https로 호출되는 경우에만 session cookie를 생성하는 option. 	
	// }
}))

// const pathName = './memo/';
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

app.get('/login', (req, res) => {
	const session = req.session;
	if (req.session) {
		console.log(req.session)
	}
})

const findUser = (userId, userPw) => {
	return users.find(user => user.userId === userId && user.userPw === userPw)
}

const getFileNameAsync = (pathName) => {
	return new Promise((resolve, reject) => {
		fs.readdir(pathName, (err, data) => {
			if(err) reject(Err);
			else resolve(data);
		})
	})
}

const getFileDataAsync = (filePath) => {
	console.log(filePath)
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, {
			encoding: 'utf-8'
		}, (err, data) => {
			console.log('data: ', data)
			if (err) reject(err);
			else resolve(data);
		})
	})
}
// const getFileNameAsync = (pathName) => {
// 	const readdirAsync = util.promisify(fs.readdir)
// 	const readFileAsync = filePath => new Promise((resolve, reject) => {
// 		fs.readFile(filePath, {
// 			encoding: 'utf-8'
// 		}, (err, data) => {
// 			if (err) reject(err);
// 			else resolve(data);
// 		})
// 	})

// 	readdirAsync(pathName)
// 		.then(files => Promise.all(files.map(file => 
// 			readFileAsync(pathName + '/' + file))
// 		).then(data => {
// 			const fileData = {
// 				data
// 			}
// 			return fileData;
// 			// res.end(JSON.stringify(fileData))
// 		}).catch(err => { console.error(err) })
// 	)
// }

app.post('/login', (req, res, next) => {
	const id = req.body.id;
	const pw = req.body.pw;
	try {
		if (findUser(id, pw)) {
			console.log(req.session)
			req.session.username = id;
			res.status(200).send('로그인')
		} else {
			res.status(401).send('유효하지 않습니다. 다시 로그인해주세요.')
		}
	} catch(error) {
		res.status(500).json({ error: error.toString() })
	}
});

app.post('/logout', (req, res) => {
	res.clearCookie('secretkey');
	req.session.destroy(() => {
		res.status(200).redirect('/');
		// res.status(200).end()와 차이?
	});
})

app.get('/memo', async (req, res, next) => {
	try {
		// res.writeHead(200, {'Content-Type': 'application/json'});
		const pathName = path.join(__dirname, 'memo');
		const fileName = await getFileNameAsync(pathName);

		if (fileName) {
			res.status(200).send(JSON.stringify({data: fileName}));
		} else {
			next()
		}
	} catch (error) {
		res.sendStatus(500);
	};
})


app.post('/memo', (req, res) => {
	try {
			let data = req.body;
			let dirPath = path.join(__dirname, 'memo');
			// let fileName = data.title && data.title;

			console.log('req.body: ', req.body)
			// console.log('fileName: ', fileName)

			fs.writeFile(dirPath + fileName, fileText, 'utf8', (err) => {
				res.json({
					"title": fileName,
					"text": fileText,
				})
				if (err) {
					console.error(err);
				}
			})
	} catch (error) {
		res.sendStatus(500).end();
	}
	
	// let fileName = data.title && data.title;
	
	// let fileName = data.title && data.title.split('.txt')[0].split('./memo/')[1]; // 생성이 불가능, 수정이 가능
	// let fileText = data.text;
	// fs.writeFile(path.join(__dirname, pathName) + fileName, fileText, 'utf8', (err) => {
	// 	res.json({
	// 		"title": fileName,
	// 		"text": fileText,
	// 	})
	// 	if (err) {
	// 		console.error(err);
	// 	}
	// })
})

app.get('/memo/:fileName', async (req, res, next) => {
	try {
		const pathName = path.join(__dirname, 'memo');
		const fileName = req.params.fileName;
		const fileData = await getFileDataAsync(pathName + '/' + fileName);
		console.log(fileData);
		if (fileData) {
			res.status(200).send(JSON.stringify({data: fileData}))
		} else {
			next();
		}
	} catch (error) {
		res.sendStatus(500);
	}

	// fs.readFile(path.join(__dirname, pathName, fileName), 'utf-8', (err, data) => {
	// 	res.writeHead(200, {'Content-Type': 'application/json'});
	// 	const fileData = {
	// 		"title": fileName,
	// 		"text": data
	// 	}
	// 	console.log('fileData: ', fileData)
	// 	res.end(JSON.stringify(fileData));
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// })
})


app.delete(`/memo/:fileName`, (req, res) => {
	const fileName = req.params.fileName;

	fs.unlink(pathName + fileName, (err) => {
		if (err) throw err;
		console.log('deleted')
	})
	res.send('delete request');
})

const server = app.listen(8080, () => {
	console.log('Server started!');
});

// app.get('/User', async function(req, res) {
//   let users;
//   try {
//     users = await db.collection('User').find().toArray();
//   } catch (error) {
//     res.status(500).json({ error: error.toString() });
//   }
//   res.json({ users });
// });
// https://github.com/FEDevelopers/tech.description/wiki/%EC%97%90%EB%9F%AC-%EC%B2%98%EB%A6%AC%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9D%B5%EC%8A%A4%ED%94%84%EB%A0%88%EC%8A%A4-%EA%B0%80%EC%9D%B4%EB%93%9C