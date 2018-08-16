const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;
	// const parsedUrl = url.parse(req.url); // 객체화 된 url
	// const parsedQuery = qs.parse(parsedUrl.query, '&', '=');

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
			res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
			res.end(`Hello, ${bar}`)
		})
		// parse(req.body) 이거는 왜 안되는가 -> 콜백으로 지연시켜 놔야 큰 파일이 와도 괜찮음.
	} else {
		res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
		res.end('404 Page Not Found');
	}
}).listen(8080);

// 그냥 body를 qs.parser(body) 이렇게 넣어버리지 않는 이유?
// 비동기 콜백으로 넘겨서 용량이 클 경우에도 적절히 처리할 수 있게 하려고