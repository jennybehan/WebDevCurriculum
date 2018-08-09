const http = require('http');
const url = require('url');
const qs = require('querystring');

// server 객체 생성
http.createServer((req, res) => {
	// 응답 객체 res의 res.writeHead 함수로 응답의 헤더를 지정한다.
	res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
	// res.end()로 응답을 종료하면서 응답 바디에 문자열을 추가한다.
	res.end('Hello World!');
}).listen(8080);