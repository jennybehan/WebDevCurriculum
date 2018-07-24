## Checklist

### 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?

`element.className`으로 클래스 속성을 가져오거나 설정합니다.
- `element.classList`로 클래스 속성에 접근하고 `add`, `remove`, `toggle` 등의 메서드를 이용하여 클래스를 조작할 수 있습니다.
  
#### IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?

`className`의 경우 모든 브라우저에서 동작합니다. 따라서 class attribute를 생성하고 설정하는 방식으로 사용합니다. 
혹은.. `setAttribute(attribute, value)`와 `removeAttribute(attribute, value)`를 이용할 수 있습니다.

`
setAttribute('class', 'enabled');
removeAttribute('class', 'enabled');
`

- `document.querySelector()`는 IE8 이상에서만 동작
- `document.getElementByClassName()`는 IE9 이상에서만 동작

### 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

자바스크립트는 기본적으로 함수 유효범위만을 제공하며, 중괄호로 표현되는 블럭범위의 유효범위는 존재하지 않았습니다. 이런 경우 함수 코드 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고 함수 외부에서는 유효하지 않습니다(참조가 되지 않음).
  
#### `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

ES6에서 let을 제공하면서 블럭범위의 유효범위도 사용할 수 있게 되었습니다. 그래서 함수를 사용하지 않더라도 블럭 내에서 변수를 참조할 수 있습니다.
퀘스트에서 푼 문제의 경우에도 `node` 변수를 let으로 설정했기 때문에 for문 블록에서도 원하는 방식으로 서로 다른 node를 선택할 수 있습니다.
(`for (let x ...)` 형태의 루프(for of, for in, 기본 for 문)는 루프를 반복할 때마다 매번 x 변수를 새로 바인딩합니다.)

- [참고](http://hacks.mozilla.or.kr/2016/03/es6-in-depth-let-and-const/)

## 스터디 노트

### DOM: NodeList vs HTMLCollection 차이

* NodeList나 HTMLCollection이나 모두 DOM node이다. 가지고 있는 노드의 형식과 제공하는 메서드에 따라 달라진다. NodeList가 어떤 노드 타입이든 가질 수 있는 데 반해 HTMLCollection은 요소 노드만 가질 수 있다. 그래서 HTMLCollection에서 제공하는 것과 동일한 메서드들을 제공하고 추가로 `namedItem`이라는 메서드를 제공한다.

배열은 아니지만 Array-like object이다.

* node type VS. node element
    
DOM에서 모든 건 node이고 모든 node는 object이다. element는 node의 타입 중 하나이다.

* NodeList는 `element.childNodes` 속성 및 `document.querySelectorAll` 메서드에 의해 반환되는 노드의 컬렉션이다. NodeList를 선택할 수는 없다. NodeList 자체가 선택의 결과물이기 때문이다.
    * `element.childNodes`에 의해 반환된 노드 컬렉션인 경우 live collection이므로 변경사항이 실시간으로 적용된다.
    * `document.querySelectorAll` 메서드에 의해 반환된 노드 커렉션인 경우에는 static collection이므로 DOM을 변경해도 컬렉션 내용에 영향을 주지 않는다.
    * NodeList는 다음과 같은 방법으로 Array로 변환 가능하다. `querySelectorAll('tag')` -> `Array.prototype.slice.call(div_list)`

* HTMLCollection은 노드들의 리스트이다. 개별 노드들은 노드의 이름이나 인덱스, id 값으로 접근가능하다. HTMLCollection들은 live collection이다.

* [참고](https://stackoverflow.com/questions/15763358/difference-between-htmlcollection-nodelists-and-arrays-of-objects)

### for ... of

NodeList 객체 반복 시 `for ... in`, `for each ... in` 대신 `for ... of`를 사용해야 합니다.