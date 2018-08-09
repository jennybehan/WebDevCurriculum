const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;

	if (pathname === '/') {
		res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
		res.end('Hello world!');
	} else if (pathname === '/foo') {
		var bar = '';
		req.on('data', (data) => {
			bar = bar + data;
		});
		req.on('end', () => {
			const parsedQuery = qs.parse(bar);
			console.log(parsedQuery);
			res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
			res.end(`Hello, ${bar}`)
		})
	} else {
		res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
		res.end('404 Page Not Found');
	}
}).listen(8080);