## Checklist

### 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

#### ES5

- 배열과 관련 메소드 추가: `forEach`, `map`, `filter`, `reduce`, `some`, `every` 등 순환, 반복 작업을 위한 메소드들
- 객체 관련 메소드 추가: `Object.create()`, `Object.defineProperty()`, `Object.freeze()`, `Object.assign()`, `Object.keys()`, getter/setter 등
- strict 모드 추가: 선언되지 않은 변수에 할당하면 참조에러(ReferenceError)가 생김. non-strict 모드에서는 이 경우 전역 변수가 생성되었음. (string의 length 같은) 읽기 전용 프로퍼티를 변경하는 것은 타입에러(TypeError)를 일으킴. non-strict 모드에서는 아무런 영향 없음.
- `bind()` 메서드
- lexical 환경
- JSON

#### ES6**

1. 이미 존재하는 기능을 위한 더 나은 문법
- Classes
- Modules
- 함수 단위 스코프가 아닌 블록 단위 스코프의 변수 `const`, `let` 추가
- arrow function: Function.prototype.bind() 대신 화살표 함수를 사용할 수 있다. 즉 `this`를 동적으로 바인딩 하지 않는다.

2. 표준 라이브러리의 새로운 기능
- 문자열, 배열을 위한 새로운 메소드
- Promise 객체: 콜백 함수 대신 사용
- Map, Set

3. 완전히 새로운 기능
- Generator
- proxy
- Weakmap
- 비구조화 할당: rest 파라미터, spread 연산자, default 파라미터
- 템플릿 리터럴

#### ES2017

- async/await 함수: Promise.prototype.then의 체이닝 대신 사용
- Generator 객체: 취소 가능한 비동기 동작 구현
- Object: `Object.values(obj)`, `Object.keys(obj)` 등 - 객체의 enumerable한 속성값들만 배열로 만들어준다.

* [참고: ](https://gist.github.com/marocchino/841e2ff62f59f420f9d9)

#### 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?

정보통신 시스템 기반 비영리 표준화 기구 ECMA에서 표준화 하는 스크립트 프로그리맹 언어로, 넷스케이프에서 표준화를 위해 자바스크립트 기술 규격을 제출하면서 시작된 이름이다.
ES5는 2009년에 발행되었으며 다음 버전인 ES6(ES2015)가 나올 때까지 6년이 걸렸다. 초기 버전의 ECMAScript들은 번호로 이름을 붙였다.
2015년부터 시작된 새로운 버전들은 숫자 대신 발행된 연도가 붙는다. 따라서 ES2016은 ES7과 동일하고 ES2017 역시 ES8과 동일하다.

* [참고: JavaScript — WTF is ES6, ES8, ES 2017, ECMAScript…?](https://codeburst.io/javascript-wtf-is-es6-es8-es-2017-ecmascript-dca859e4821c)

### 웹 브라우저의 자바스크립트 콘솔은 어떻게 사용할까요?

- `console` 객체를 통해 접근하여 로그를 확인하고 디버깅 할 때 사용: 일반 메시지, 오류/경고 메시지, 호출 스택 표시, 데이터 확인, 경과 시간 확인, 호출 시점 확인, 오브젝트의 key/value 출력, 노드 선택 및 가져오기 등

* [참고](https://developers.google.com/web/tools/chrome-devtools/?utm_source=dcc&utm_medium=redirect&utm_campaign=2018Q2)

#### 웹 브라우저(Chrome)에서 자바스크립트 콘솔을 띄우는 단축키는 무엇인가요?

- Window/Linux: `Ctrl` + `Shift` + `i`/`j`
- Mac: `Command` + `Option` + `i`/`j`

### `let`를 이용하여 변수를 선언하는 것과 `const`를 이용하여 변수를 선언하는 것은 어떻게 다를까요?

let은 재할당이 자유로우나 const는 재할당이 금지된다.

#### `var`를 이용하여 선언하는 방법은 어떻게 다를까요?

- const와 let은 공통적으로 블록 레벨 스코프(코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없음)를 갖는다. 반면 var는 함수 레벨 스코프(Function-level scope)로 의도하지 않은 변수의 전역화, 중복 선언 허용, 의도하지 않은 변수값 변경, 변수 호이스팅(변수를 선언하기 전에 참조가 가능) 등의 문제를 가지고 있다.

- 함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다. 즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다. 코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.

- 항상 선언과 할당이 동시에 이루어진(undefined) var와 달리 let은 선언과 할당이 각각 일어난다. const는 반드시 선언과 동시에 할당이 이루어져야 한다.

### 자바스크립트의 익명 함수는 무엇인가요?

- 런타임에 동적으로 할당되는 함수
- 함수 선언식 대신 함수 표현식으로 선언된다.
- 새 함수를 함수 호출의 매개 변수로 선언하거나 다른 객체의 속성을 할당할 수 있다.(1급 함수)

- 이름이 있는 함수와 이름이 없는 함수 차이: 이름이 있는 함수는 JS를 파싱할 때 브라우저에서 함수를 미리 올려놓는다. 해당 스크립트가 모두 파싱된 상태라면 이름있는 함수는 바로 사용가능하다. 이름이 없는 익명함수는 함수를 선언하는 시점에 가야만 사용 가능하다. 즉 함수선언식으로 정의된 함수는 자바스크립트 인터프리터가 스크립트가 로딩되는 시점에 바로 초기화 하고 이를 VO(Variable Object)에 저장한다. 그렇기 때문에 함수 선언의 위치와는 상관없이 어느 곳에서나 호출이 가능하다. 함수 표현식은 함수 선언식과 다르게 스크립트 로딩 시점에 VO에 함수를 저장하지 않고 런타임시에 해석되고 실행된다.

* [참고](http://helephant.com/2008/08/23/javascript-anonymous-functions/)

#### 자바스크립트의 Arrow function은 무엇일까요?

- `()`는 익명함수를, `=>`는 return을 가리킨다.
- 언제나 익명함수다.
- 자신의 this, arguments, super를 바인딩하지 않으며 생성자로 사용할 수 없다.
- 기존 함수 표현식과 다르게 this를 정의한다. 
- 기존 함수 표현식은 자기 자신을 `this` 객체로 정의하지만 화살표 함수 표현식은 자기 자신을 `this`로 생성하지 않고 해당 함수가 감싸고 있는 본문 컨텍스트로 의미화 한다.