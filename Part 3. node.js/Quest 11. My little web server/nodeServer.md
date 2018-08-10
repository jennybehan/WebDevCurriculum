## Checklist

### HTTP의 GET과 POST 메소드는 어떻게 다른가요?

* GET과 POST 메소드는 둘 다 클라이언트가 서버에 데이터를 전달하기 위해 사용하는 방식이다.
* GET 메소드는 특정한 리소스를 가져오도록(retreive) 요청한다. POST 메소드는 데이터를 서버에 보낸다(send).

* GET 방식으로 요구하는 경우 바디가 비어있는 요청을 하게 된다. 파라미터가 없다면 인자 값에 null을 주면 된다.
* POST방식으로 요구하는 경우 body 안에 제공되는 데이터를 고려한 응답을 서버에 요청한다. 어떠한 데이터라도 가능하다. 다만 데이터는 서버에서 쉽게 parse할 수 있는 형식(format)이어야 하거나 JSON, SOAP 등과 같은 다른 형식으로도 가능하다.
* POST 메서드로 요청하면 보통 HTML form을 통해 서버에 데이터를 전송한다.

(* GET은 데이터 값을 URL에 붙여 보내기 때문에 전송하는 데이터량에 제한이 있고 데이터가 사용자에게 노출된다. URL 형식에 맞추기 위해 인코딩도 필요하다.
* POST의 경우 데이터를 HTTP body에 넣어 전달한다. 따라서 사용자에게 데이터 노출이 되지 않으며 전송량에도 제한이 없다.)

#### 다른 HTTP 메소드에는 무엇이 있나요?

```
GET: GET 메소드는 특정 리소스의 표시를 요청합니다. GET을 사용하는 요청은 오직 데이터를 받기만 합니다.
HEAD: HEAD 메소드는 GET 메소드의 요청과 동일한 응답을 요구하지만, 응답 본문을 포함하지 않습니다.
POST: POST 메소드는 특정 리소스에 엔티티를 제출할 때 쓰입니다. 이는 종종 서버의 상태의 변화나 부작용을 일으킵니다. 
PUT: PUT 메소드는 목적 리소스 모든 현재 표시를 요청 payload로 바꿉니다.
DELETE: DELETE 메소드는 특정 리소스를 삭제합니다.
CONNECT: CONNECT 메소드는 목적 리소스로 식별되는 서버로의 터널을 맺습니다.
OPTIONS: OPTIONS 메소드는 목적 리소스의 통신을 설정하는 데 쓰입니다.
TRACE: TRACE 메소드는 목적 리소스의 경로를 따라 메시지 loop-back 테스트를 합니다.
PATCH: PATCH 메소드는 리소스의 부분만을 수정하는 데 쓰입니다.
```

### HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?

* GET 메서드로 요청할 경우 본문이 비어 있으므로 이 메서드를 사용하여 양식을 보내면 서버에 보낸 데이터가 URL에 추가됩니다.
* POST 메서드를 사용해 양식을 보내면 데이터를 URL에 추가하는 게 아니라 HTTP 요청의 본문에 추가합니다.

#### HTTP 요청의 `Content-Type` 헤더는 무엇인가요?

리소스의 미디어 타입을 나타내기 위해 사용되는 값. 클라이언트에게 반환된 컨텐츠의 컨텐츠 유형이 실제로 무엇인지를 알려준다.

`media-type | charset | boundary` : 리소스 혹은 데이터의 MIME type | 문자 인코딩 표준 | 

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

* MIME type: 클라이언트에게 전송된 문서의 종류를 알려주기 위한 메커니즘으로 각 문서가 올바른 MIME 타입을 전송하도록 서버가 정확히 설정해 주어야 한다. 브라우저들이 리소스를 내려받았을 때 해야 할 기본 동작이 무엇인지 결정하기 위해 MIME 타입을 사용한다. 

|타입|설명|서브타입 예시|
|-----|---------|-------|
|text|텍스트를 포함하는 모든 문서를 나타냄.|   |text/plain, text/html, text/css, text/javascript
|image|모든 종류의 이미지. gif 같은 animated 이미지도 포함됨. 비디오는 포함하지 않음|image/gif, image/png, image/jpeg, image/bmp, image/webp|
|audio|모든 종류의 오디오 파일|audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav|
|video|모든 종류의 비디오 파일|video/webm, vidio/ogg|
|application|모든 종류의 이진 데이터|application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf|

#### Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?

POST 요청에 포함되는 body 안에 들어가는 데이터의 타입을 정한다.

`form-data`: 웹의 form 양식에서 데이터를 전송하는 데 사용하는 기본 인코딩. 웹 사이트에 양식을 채우고 제출하는 것을 시뮬레이션 한다. form-data 에디터가 key-value 값 쌍을 설정해주며 파일(바이너리 파일)도 추가할 수 있다.
`x-www-form-urlencoded`: `&`로 분리되고, `=` 기호로 값과 키를 연결하는 key-value 쌍으로 인코딩 되는 값을 전달할 때 사용한다. 즉 URL 매개변수에 사용된 인코딩과 동일하다. 파일 업로드는 불가능하다.
`raw`: 어떠한 형식의 데이터도 들어갈 수 있다. (text, application/json, application/javascript, application/xml, text/plain, text/xml text/html, xml/json, ) Content-type 헤더도 수동으로 설정할 수 있다. XML/JSON을 선택하면 요청 본문에 대한 구문 강조 표시가 가능하고 Content-type 헤더도 설정된다.
`binary`: 포스트맨으로 보낼 수 없는 이미지, 오디오, 비디오 파일 등을 보낼 수 있다. 텍스트 파일도 보낼 수 있다. 

* [참고자료 - Postman document](https://www.getpostman.com/docs/v6/postman/sending_api_requests/requests)

## 스터디 노트

* node.js `http` module

HTTP 모듈은 `require(http')`로 사용하고 서버와 클라이언트를 모두 제공한다. `http.Server`는 EventEmitter의 객체로 request 이벤트, connection 이벤트, close 이벤트와 같은 이벤트를 사용할 수 있다.

1. request 이벤트: 요청이 들어올 때마다 발생하는 request 이벤트의 콜백함수(`function(request, response) {}`)에서 request, response 객체가 만들어진다.

콜백 함수의 request는 http.ServerRequest의 객체이고 response는 http.ServerResponse의 객체다.

2. connection 이벤트: 새로운 TCP 스트림이 생성되면 발생한다. 콜백함수는 `function (soket) {}`이다.

3. close 이벤트: 서버가 닫힐 때 발생하며, 콜백 함수는 `function() {}`이다. 

* `req`와 `res` 객체

request 이벤트의 콜백함수에 전달된다. req(요청) 객체는 http.IncomingMessage 인스턴스에서 시작하고 res(응답) 객체는 http.ServerResponse 인스턴스에서 시작된다.

- req 객체

```
req.params: 이름 붙은 라우트 매개변수를 담고 있는 배열
req.param(name): 이름 붙은 라우트 매개변수나 GET, POST 매개변수를 반환한다.
req.query: 쿼리스트링 매개변수(GET 매개변수)를 이름/값 쌍 형태로 담고있는 객체이다.
req.body: POST 매개변수를 담고있는 객체. 즉 request 본문.
req.route: 현재 일치한 라우트에 관한 정보
req.cookies, req.signedCookies: 클라이언트에서 전달한 쿠키 값을 담고 있는 객체
req.headers: 클라이언트에서 받은 요청 헤더
req.accepts([types]): 클라이언트가 주어진 타입을 받는지 확인하는 간편 메서드. 옵션인 types에 application/json 같은 타입이나 목록, 배열 등을 쓸 수 있음.
req.ip: 클라이언트의 IP 주소
req.path: 프로토콜, 호스트, 포트, 쿼리스트링을 제외한 요청 경로
req.host: 클라이언트에서 보고한 호스트 이름을 반환하는 간편 메서드.
```

- res 객체

```
res.status(code): HTTP 상태 코드 설정.
res.set(name, value): 응답 헤더 설정
res.cookie(name, value, [options]), res.clearCookie(name, [options]): 클라이언트에 저장될 쿠키를 설정하거나 제거한다.
res.redirect([status], url): 브라우저를 리다이렉트 한다.
res.send(body), res.send(status, body): 클라이언트에 응답을 보낸다. 
res.json(json), res.json(status.json): 클라이언트에 JSON을 보내며, 상태 코드는 옵션이다.
res.type(type): Content-Type 헤더를 설정하는 간편 메서드. res.set('Content-Type', type)과 동등하다.
```

* [Quest 참고자료](https://javafa.gitbooks.io/nodejs_server_basic/content/chapter4.html)