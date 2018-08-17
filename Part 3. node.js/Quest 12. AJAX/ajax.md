## Topics

* expressJS
* `setTimeout()`
* AJAX, `XMLHttpRequest`, `fetch()`

* AJAX: 비동기적 자바스크립트와 XML의 약어로(Asynchronous Javascript And Xml) 비동기식 자바스크립트와 확장 마크업 언어를 뜻한다. 보통 브라우저 내에서 비동기 기능을 제공하는 모든 기법을 통칭한다. AJAX를 통해 서버와 비동기적으로 통신하면 페이지 전체를 새로 고칠 필요 없이 서버에서 데이터를 받아올 수 있다. 이를 가능하게 한 것이  XMLHttpRequest이다.

브라우저는 `<script>` 태그를 만나면 스크립트를 로드하고 처리하기 전까지 다른 작업은 중단한다. 이를 동기 처리 모델이라고 한다. AJAX는 서버로부터 데이터를 가져와 전체 페이지를 새로 고치지 않고도 페이지의 일부만 로드할 수 있게 하는 기법이다. 사용자는 웹 브라우저가 데이터를 로드하는 동안 기다리지 않고 다른 일을 할 수 있으므로 사용자 경험을 제공할 수 있다.

## Checklist

### 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 때엔 어떻게 해야 할까요?

콜백함수나 Promise 등을 사용해서 처리한다.

### 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?

서버와의 통신을 위해 사용하는 객체로 전체 페이지를 리프레시 할 필요없이 데이터를 되돌려받아 페이지의 일부만 업데이트 할 수 있다. XMLHttpRequest API는 콜백을 기반으로 하며 AJAX 프로그래밍에서 많이 사용된다.

1. 클라이언트에서 `XMlHttpRequest` 객체를 생성하여 서버로 보낸다.
2. 서버에서 메시지를 받으면 해당 정보를 다시 브라우저로 보낸다.
3. 클라이언트가 서버로부터 응답을 받으면 해당 정보를 특정 영역에 뿌려준다.

### `fetch` API는 무엇이고 어떻게 동작하나요?

Fetch API는 근본적으로 XHR를 조금 더 모던하게 쓰는 방법입니다. 브라우저에서 Fetch 위에 구축 된 개발자 및 기타 API 모두에서 비동기 HTTP 요청을 자바 스크립트에서보다 쉽게 ​​수행 할 수 있습니다.

```javascript
// XHR code
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';

request.onload = function() {
  poemDisplay.textContent = request.response;
};

request.send();

// ajax code
fetch(url)
    .then(function(response) {
        response.text()
        .then(function(text) {
            poemDisplay.textContent = text;
        });
    });
```

#### 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

Promise는 비동기 메서드가 동기 메서드처럼 값을 반환하게 하는 **객체**이다.
어떤 작업이 성공했을 때(resolve), Promise 객체의 then() 함수에 넘겨진 파라미터(함수)를 단 한번만 호출하겠다는 약속이다. 대기 중인 Promise는 값으로 이행(fullfilled)되거나 어떤 이유로(error) 거부될 수 있다. 이 중 하나가 일어난 경우 then 메서드에 의해 대기열에 오른다. then() 함수의 파라미터는 단 한번만 호출되기 때문에 함수를 호출하는 입장에서 확신을 가지고 코드를 작성할 수 있다. 실패했을 경우(reject)에도 catch() 함수를 통해 실패 이후의 작업을 처리할 수 있다. Promise는 구조화된 callback과 유사하다. (콜백을 다시 Promise로 바꿔서 쓸 수 있음)

비동기처리를 할 때 각각의 데이터가 반환되는 순서를 알 수 없기 때문에 콜백함수를 사용하는데, 콜백함수에서는 try/catch 문을 사용할 수 없기 때문에 에러핸들링이 어렵고, 계속 다음 함수로 전달되는 콜백함수에 대한 제어가 점점 어려워진다.

비동기를 위한 콜백에서 생기는 이러한 문제를 해결하기 위해 Promise가 도입되었다.

* `new Promise()`를 선언할 때 콜백함수의 인자로 `resolve`, `reject`에 접근할 수 있다.

```javascript
new Promise(function (resolve, reject){
    // ...
});
```

여기서 콜백함수의 인자인 `resolve`를 실행하면 fullfilled 상태가 된다.

```javascript
new Promise(function (resolve, reject) {
    resolve();  //fullfilled
});
```

이행 상태가 되면 `then()`을 이용해 처리결과 값을 받을 수 있다.

```javascript
function getData() {
    return new Promise(function (resolve, reject) {
        var data = 100;
        resolve(data);
    });
}

getData().then(function (resolvedData) {
    console.log(resolvedData);
});
```

실패상태

```javascript
new Promise(function (resolve, reject) {
    reject();
})
```

```javascript
function getData() {
    return new Promise(function (resolve, reject) {
        reject(new Error('요청 실패'));
    });
}

getData().then().catch(function (err) {
    console.log(err);
});
```

#### 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

async/await 함수는 Promise의 동작을 동기적으로 사용할 수 있게 해준다.

* async : async 함수는 비동기적인 함수를 정의한다. 동기적으로 시작해서 비동기적으로 해결된다.(???) 

1. async 함수의 결과는 항상 프로미스 `P`이다. 이 프로미스는 해당 async 함수의 실행을 시작할 때 생성된다.
2. 본문이 실행된다. 실행은 `return`이나 `throw`를 통해 영구적으로 종료될 수 있다. 혹은 `await`를 통해 일시적으로 종료될 수도 있다.
3. 프로미스 `P`가 반환된다.

* await : await는 실행이 완료되었음을 알려주는 신호로 사용된다. await 뒷부분은 반드시 **Promise를 반환해야 한다.**

1. async function의 실행 도중 await 키워드를 만나면 함수의 실행을 잠시 멈춘다.
2. 그리고 Promise가 완료될 때까지 기다린 후, 그 성공값을 await 표현식의 값으로 사용한다.
3. 만약 Promise가 실패할 경우, 지금 위치에서 실패값을 throw한다. Async function은 항상 Promise를 리턴하며 그 성공값은 리턴값과 같다.

## 스터디 노트

* 비동기 실행의 가장 큰 목적, 가장 중요한 요점은 *어떤 것도 차단하지 않는다*는 것
* 비동기 실행에서 혼란스럽고 에러도 자주 일어나는 부분은 스코프와 글로저가 비동기 실행에 영향을 미치는 부분이다.
* 프로미스 기반 비동기 함수를 호출하면 그 함수는 Promise 인스턴스를 반환합니다. 프로미스는 성공fullfilled하거나, 실패rejected하거나 단 두 가지뿐입니다. 프로미스는 성공 혹은 실패 둘 중 하나만 일어납니다. 성공이든 실패든 단 한번만 일어납니다. 프로미스가 성공 혹은 실패하면 그 프로미스를 결정됐다settled고 합니다.
* 프로미스는 객체이므로 어디든 전달할 수 있다는 점도 콜백에 비해 간편한 장점입니다. 비동기적 처리를 여기서 하지 않고 다른 함수에서 처리하게 하고 싶다면 프라미스를 넘기기만 하면 됩니다.

### Express

* `app` 관련 메소드
  * `app.use`: middleware 설정
  * `app.set`
  * `app.get`: GET 요청이 만들어졌을 때 해당 요청에 대한 반응

* `res` 관련 메소드
  * `res.end()`: 응답 프로세스 종료
  * `res.send()`: 다양한 유형의 응답을 전송
  * `res.json()`: JSON 객체로 응답
  * `res.render()`: 템플릿을 렌더링
  * `res.sendFile()`: 파일을 옥텟 스트림의 형태로 전송합니다.

* `filesystem` 관련 메소드
  * `fs.writeSync`: 비동기적 파일 쓰기. 연속된 문자열 데이터를 파일에 저장
  * `fs.write`: 비동기적 파일 쓰기. 쓰기 요청을 이벤트 큐에 넣은 후 호출한 코드로 제어를 반환한다. 실제 쓰기는 이벤트 큐에서 쓰기 요청이 뽑아져 나와 실행되기 전까지 이뤄지지 않는다. 동일한 파일에 여러 쓰기 요청을 수행할 때는 실행 순서가 보장되지 않으므로 주의해야 함. 콜백을 이용해 순서를 맞출 수 있다.

* `qs`라이브러리와 `query-string`라이브러리 사용은 어떻게 다를까?: https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0

* `body-parser`: 클라이언트의 HTTP 요청 중 POST 요청의 바디 데이터에 접근하기 위한 모듈

* app.router 사용

* `__dirname`: 현재 작업 디렉터리 지정
* `middleware`: 개발자와 기반 시스템 간에 존재하는 소프트웨어. 시스템에 따라 운영체제를 의미하는 것일 수도 있고 Node에서 제공되는 것과 같은 기반기술 일 수도 있다. 애플리케이션과 기반 시스템 사이에서 통신 체인 역할을 수행하는 것이다. 

## Quest
* 자바스크립트를 이용하여 간단한 웹브라우저 기반의 텍스트 파일 메모장을 만들어 보겠습니다.
  * 먼저 연습으로 Quest 11의 GET/POST 요청을 AJAX를 통해 처리하는 것을 시도해 보세요!
    * 화면에 출력되는 대신 콘솔에 결과가 나오면 됩니다.
  * 새 파일, 로드, 저장, 수정 등의 기능이 있어야 합니다.
  * 탭을 통해 여러 개의 파일을 동시에 편집할 수 있어야 합니다.
  * 이 메모장의 메모들은 서버의 파일시스템에 그대로 저장되어야 합니다.
* `skeleton` 디렉토리에서 작업을 하시되, 작업을 시작하기 전에 해당 디렉토리에서 `npm install` 명령을 날리시면 자동으로 express가 설치됩니다.