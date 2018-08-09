const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
	const pathname = url.parse(req.url).pathname;
	const parsedUrl = url.parse(req.url); // 객체화 된 url
	const parsedQuery = qs.parse(parsedUrl.query, '&', '=');

	if (pathname === '/') {
		res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
		res.end('Hello world!');
	} else if (pathname === '/foo') {
		const bar = parsedQuery.bar;
		res.end(`Hello, ${bar}`)
	} else {
		res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
		res.end('404 Page Not Found');
	}
}).listen(8080);
