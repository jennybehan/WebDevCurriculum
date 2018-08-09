## Checklist

### node.js는 어떤 식으로 동작하나요?

#### `require()` 함수는 어떻게 쓰는 것인가요?

```javascript
var fileSystem = require('fs');
var util = require('util');

var someModule = module.exports = {};
var userModule = require('someModule');

```

* `require()` 함수는 모듈을 추출합니다(불러옵니다). 모듈은 기능을 쉽게 사용하기 위해 메서드/속성을 미리 정의해 모아둔 것입니다.
* NodeJS에서 하나의 자바스크립트 파일은 하나의 모듈입니다. 따라서 자바스크립트 파일에서 정의한 객체는 지역 스코프로 정의되고 외부에서 접근할 수 없습니다. 그래서 외부에서 접근을 허용해야 하는 객체(변수, 함수)를 `module.exports`에 할당하고, 이를 참조/호출하기 위해 `require()`을 사용합니다.
* `require()` 호출에서 반환되는 것은 객체 참조로 NodeJS에 의해 자동으로 생성됩니다. `module.exports`를 참조합니다.

```javascript
// `http` 변수는 `require('http')`에 의해 반환된 값으로 HTTP API를 호출하는 데 사용됩니다.
const http = require('http');
const server = http.createServer();
```

#### `module.exports`와 `exports` 변수는 어떻게 다른가요?

* 둘은 사실상 의미가 같으며 `exports`는 하나의 별칭(alias)입니다. `exports` 변수는 `require()` 호출에 의해 반환되지 않습니다. `module.exports`에 대한 참조일 뿐입니다.
* `module.exports`는 `require()`를 통해 반환되어 사용가능해집니다. 즉 해당 모듈(파일) 외부에서 사용할 수 있는 객체다. `exports`로는 해당 모듈 내부에서만 사용 가능하다.

#### npm이 무엇인가요?

* NodeJS Package Manager. 수십만 개의 패키지(일종의 NodeJS 오픈소스 프로젝트 라이브러리들)가 있는 Node.js의 패키지 관리자입니다. 주요 목표는 종속성과 패키지를 자동화 하여 관리하는 것입니다. `package.json` 파일에서 프로젝트의 종속성을 지정하고 프로젝트를 시작할 때 `npm install`을 통해 종속성을 설치할 수 있습니다.

* 그래서 두가지 주요기능이 NodeJS 패키지/모듈 저장소, NodeJS 패키지 설치 및 버전/호환성 관리를 할 수 있는 커맨드라인 유틸리티 제공입니다.
  
#### npm 패키지를 `-g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

* Global로 저장하는 경우 시스템 디렉토리에 설치하는 것을 의미합니다. 현재 디렉토리가 어디인지와 상관없이 작동합니다. `/usr/local/lib/node_modules`에 모듈들이 위치하고 실행 파일은 `/usr/local/bin`에 위치합니다. CLI로 사용할 수 있습니다.
* 자신의 모듈에서만 패키지를 사용/의존하려면 로컬로 설치합니다. 로컬에 설치하면 현재 디렉토리에 `node_modules` 디렉토리가 생성되고 해당 디렉토리에 패키지가 다운로드 됩니다. 실행 파일은 `/node_modules/bin`에 설치됩니다. 자신의 모듈 내에서 사용 가능합니다. require 문을 사용해서 불러올 수 있습니다. 

## 스터디 노트

* NodeJS
1. C++로 쓰여있는 자바스크립트 실행환경입니다. 
2. 자바스크립트를 해석하고 실행할 수 있습니다.
3. NodeJS API 지원을 포함합니다.

* NodeJS API
    * 서버 프로그램을 만드는 데 유용한 자바스크립트 라이브러리 모음

* V8(크롬)
    * NodeJS가 자바스크립트를 해석, 컴파일, 실행하기 위해 사용하는 자바스크립트 인터프리터(엔진)

* NodeJS는 웹 브라우저에서 실행되는 자바스크립트와 달리 최상위 객체로 window를 가지지 않고 전역변수, 전역함수를 가진다.
    * 전역변수: `__filename`, `__dirname`
    * 전역객체: exports(모듈 관련 기능), process(프로그램 관련 기능), console

* `process.argv` : process 객체의 속성 중 하나로 실행 매개 변수를 나타냄
