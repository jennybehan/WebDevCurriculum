## Checklist
* node.js는 어떤 식으로 동작하나요?
  * `require()` 함수는 어떻게 쓰는 것인가요?
    `require()` 함수는 모듈을 불러옵니다. `require()` 호출에서 반환되는 것은 객체 참조로 NodeJS에 의해 자동으로 생성됩니다. `module.exports`를 참조합니다. 
    ```javascript
    const http = require('http');
    const server = http.createServer();
    ```
    `http` 변수는 `require('http')`에 의해 반환된 값으로 HTTP API를 호출하는 데 사용됩니다.

  * `module.exports`와 `exports` 변수는 어떻게 다른가요?
    * `module.exports` 객체는 새 객체로 완전히 대체될 수 있고 exports 역시 재할당합니다.
    * `module.exports`는 모듈이 무엇을 내보냈는지를 정의하고 `require()`를 통해 사용가능(반환된 변수) 해집니다. 기본적으로 빈 객체입니다.
    * `exports`는 하나의 별칭입니다. `exports` 변수는 `require()` 호출에 의해 반환되지 않습니다. `module.exports`에 대한 참조일 뿐입니다. 모듈 작성자가 짧은 코드를 작성할 수 있도록 도와주는 변수입니다. 모듈의 파일레벨 스코프에서 사용가능하며 모듈 평가(?) 전에 `module.exports` 값이 할당됩니다.

* npm이 무엇인가요?
    * NodeJS Package Manager. 수십만 개의 패키지(일종의 NodeJS 오픈소스 프로젝트 라이브러리들)가 있는 Node.js의 패키지 관리자입니다. 주요 목표는 종속성과 패키지를 자동화 하여 관리하는 것입니다. `package.json` 파일에서 프로젝트의 종속성을 지정하고 프로젝트를 시작할 때 `npm install`을 통해 종속성을 설치할 수 있습니다.
    * 그래서 두가지 주요기능이 NodeJS 패키지/모듈 저장소, NodeJS 패키지 설치 및 버전/호환성 관리를 할 수 있는 커맨드라인 유틸리티 제공입니다.
  * npm 패키지를 `-g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?
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

* `process.argv` : process 객체의 실행 매개변수