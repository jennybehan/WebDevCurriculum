const express = require("express"),
	path = require("path"),
	app = express(),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	session = require("express-session"),
	cookieParser = require("cookie-parser");

// middlewares
app.enable('trust proxy');
app.use(express.static("client")); // app.use(express.static('public')) : 정적 파일을 사용하기 위한 설정
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(cookieParser());

app.use(
	session({
		secret: "secretkey",
		// name: "sessionId",
		// resave: false, // request가 요청되었을때, 기존의 session이 존재하는 경우 다시 저장할 필요가 있는지를 확인하는 option
		// saveUninitialized: true,
		cookie: {
			secure: true,
			// domain: 'http://localhost:8080',
			maxAge: 86400
		}
	})
);

const users = [{
		userId: "user01",
		userPw: "1111"
	},
	{
		userId: "user02",
		userPw: "2222"
	},
	{
		userId: "user03",
		userPw: "3333"
	}
];

app.all("/*", (req, res, next) => {
	// webpack server port 주소 변경, 보안 문제(각각 내용 확인)
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, Content-Type, X-Requested-With, Authorization, withCredentials"
	);
	res.header('Access-Control-Allow-Credentials', 'true')
	// [TODO] login 여부에 따라 달라지게
	// if (!req.session.username) {
	// 	res.redirect('/')
	// } else next();
	// console.log(req.session.username) // undefined. 세션 저장되지 않음
	next();
});

app.use((req, res, next) => {
	fs.readdir(__dirname + "/memo", err => {
		if (err) {
			fs.mkdir(__dirname + "/memo", err => {
				if (err) console.error(err);
			});
		}
	});
	next();
});

const findUser = (userId, userPw) => {
	return users.find(user => user.userId === userId && user.userPw === userPw);
};

const getFileNameAsync = pathName => {
	return new Promise((resolve, reject) => {
		fs.readdir(pathName, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

const writeFileDataAsync = (pathName, fileText) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(
			pathName,
			fileText, {
				encoding: "utf8"
			},
			err => {
				if (err) reject(err);
				else resolve();
			}
		);
	});
};

app.post("/login", async (req, res, next) => {
	const id = req.body.id;
	const pw = req.body.pw;

	try {
		if (findUser(id, pw)) {
			req.session.save(err => {
				if (err) {
					res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
				} else {
					req.session.username = id;
					success = true;
					res.send({
						username: id
					})
				}
			})
		} else {
			res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
		}
	} catch (error) {
		res.status(500).json({
			error: error.toString()
		});
	}
});

app.post("/logout", (req, res) => {
	res.clearCookie("secretkey");
	delete req.session.username;
	req.session.destroy(() => {
		res.status(200).redirect("/memo");
	});
});

app.get("/user", (req, res) => {
	if (req.session.username) {
		res.status(200).send(
			JSON.stringify({
				username: req.session.username,
				userdata: req.session.userdata
			})
		);
	} else {
		res.status(401).end();
	}
});

app.get("/memo", async (req, res, next) => {
	try {
		const pathName = path.join(__dirname, "memo");
		const fileNames = await getFileNameAsync(pathName);
		if (fileNames) {
			const data = fileNames.map(fileName => {
				const content = fs.readFileSync(pathName + "/" + fileName).toString();
				const data = JSON.parse(content);
				return data;
			});
			res.status(200).send({
				data
			});
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.post("/memo", async (req, res) => {
	try {
		const data = req.body;
		const pathName = path.join(__dirname, "memo");
		const fileName = data._id; // changed

		await writeFileDataAsync(
			pathName + "/" + fileName + ".json",
			JSON.stringify(data)
		);
		res.status(200).end();
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
});

app.delete(`/memo/:fileName`, (req, res) => {
	const pathName = path.join(__dirname, "memo");
	console.log(req.params);
	const fileName = req.params.fileName || "title";

	fs.unlink(pathName + "/" + fileName + ".json", err => {
		if (err) throw err;
		console.log("deleted");
	});
	res.send("delete request");
});

const server = app.listen(3000, () => {
	console.log("Server started!");
});