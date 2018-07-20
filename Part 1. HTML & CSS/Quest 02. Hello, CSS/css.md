## Checklist

### CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?

1. HTML 파일에서 각 태그 안에 인라인 스타일로 적용하기(인라인 스타일 시트)

* 장점: 간편함. 태그에 적용되는 스타일이 직관적으로 파악된다. 특정 부분만 CSS 문서로 작성한 규칙을 따르지 않게 해야할 경우가 생길 때 유용하다.
* 단점: 문서의 구조와 스타일이 분리되지 않는다. 재사용이 되지 않으며 중복 코드를 반복적으로 작성해야 한다.

2. HTML 파일에서 `<style>` 태그 안에 포함하여 적용하기(내부 스타일 시트)

* 장점: HTML 문서 내부의 여러 요소를 한번에 꾸밀 수 있다.
* 단점: 해당 HTML 파일이 아닌 다른 HTML 파일에는 적용시킬 수 없다.

3. CSS를 별도의 파일로 작성한 후 HTML 문서 내에서 `<link>` 태그로 불러와 적용하기(외부 스타일 시트ㅇ)

* 장점: 하나의 스타일 시트를 사용하여 여러 문서의 스타일을 지정할 수 있다. 따라서 코드가 중복되지 않는다. 문서의 구조와 스타일을 분리하는 방법이기 때문에, 이후 추가/수정 작업에도 해당 파일만 수정하면 일괄적으로 변경이 되니 관리가 유용하다.

### 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?

* 속성 값 뒤에 `!important` 를 붙인 속성
* HTML 태그에서 inline-style로 직접 지정한 속성
* `id` 로 지정한 속성
* `.`(클래스), `:`(추상 클래스) 로 지정한 속성
* 태그 이름으로 지정한 속성
* 상위 객체에 의해 상속된 속성

### 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?

* `position: relative` 속성이 적용된 부모요소가 있는 경우 해당 부모요소의 모서리를 기준점으로 한다. 그렇지 않은 경우 최상위 부모인 document의 body 요소의 모서리를 기준점으로 한다.

### 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?

### `float` 속성은 왜 좋지 않을까요?

float 속성을 사용하면 문서의 흐름을 벗어나며 여러 문제가 생겨 부가적인 처리를 필요로 한다. 하지만 이러한 속성들을 적용할 시에도 상황에 따라 문제가 생기거나 불필요하게 의미없는 태그들을 추가해야 한다.

float 프로퍼티가 선언된 요소와 float 프로퍼티가 선언되지 않은 요소간 margin이 사라지는 문제, float 프로퍼티를 가진 자식 요소를 포함하는 부모 요소의 높이가 정상적으로 반영되지 않는 문제 등이 있다. 

각각 float 속성을 사용하지 않은 요소, 속성을 사용한 태그의 부모에 `overflow: hidden`을 적용하거나 `clear: both | right | left`와 같은 부가적인 처리를 해주어야 한다. 

### Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?

* 차이점
  1. Flexbox는 한 줄로 된 행 혹은 열 방향의 레이아웃(1차원)을 염두에 두고 설계되었으나 Grid는 행과 열 모두를 염두에 둔 2차원적 레이아웃을 고려해서 설계되었다. 따라서 레이아웃을 조정할 때 가로 행 혹은 세로 열 만을 조정한다면 Flexbox, 둘 모두를 조정한다면 Grid를 사용한다.
  2. Flexbox는 여러 콘텐츠가 든 아이템들을 고르게 배치하는 데에 초점이 맞추어져 있다. 반면 Grid는 레이아웃적인 측면을 더욱 고려한다.

* Flexbox
  * 장점: 요소의 사이즈가 불명확하거나 동적으로 변화할 때에도 유연한 레이아웃을 실현할 수 있다. 복잡한 레이아웃이라도 적은 코드로 보다 요소 정렬, 간격 조정, 순서변경 등을 간단하게 표현할 수 있다.
  * 단점: 정렬해야 하는 요소들이 두줄이 되는 경우 계산 내용이 복잡해진다. 브라우저 지원이 아직 부족하다. IE10,11의 경우도 일부 지원하고 그 아래 버전은 지원되지 않는다.

* Grid
  * 장점: 페이지의 요소들을 문서 계층 구조의 관점에서 배치할 때 좋다. 유연한 배치(`fr`)와 고정된 배치가 모두 가능하다. `wrapper`와 같이 행을 감싸는 별도의 마크업을 하지 않아도 된다. `float`나 `flex`요소를 사용할 때처럼 복잡한 부가처리나 계산이 필요없다. 번호, 이름 등을 지정하여 정확한 위치에 요소를 배치할 수 있으며 위치가 명확하게 지정되지 않은 아이템을 알아서 적절히 배치하는 알고리즘도 가지고 있다.
  * 단점: 신기술임에도 꽤 많은 브라우저에서 지원하지만, 완벽하지 않다. IE11에서 부분적인 지원만 가능하다.

* [참고자료](http://webactually.com/2017/11/css-%EA%B7%B8%EB%A6%AC%EB%93%9C-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EC%9D%84-%EC%A7%80%EA%B8%88-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%8F%84-%EC%A0%95%EB%A7%90-%EA%B4%9C%EC%B0%AE%EC%9D%84%EA%B9%8C%EC%9A%94/)

## 스터디 노트

### CSS 선택자

면접에서 제대로 대답하지 못한 부분. 사용할 때는 크게 생각 안하고 쓰다보니 까먹는 부분이라 다시 한 번 정리.

| 종류      | 형태    | 예시   | 용도(필요한 경우만 적음) |
| -------- | ------ | ----- | --- |
| 전체 선택자 | * | * |
| 태그 선택자 | 태그 | h1 |
| 아이디 선택자 | #아이디 | #header |
| 클래스 선택자 | .클래스 | .item |
| 후손 선택자 | 선택자A 선택자B | header h1 | header 태그 아래 위치한 태그 |
| 자손 선택자 | 선택자A > 선택자B | header > h1 | header 태그 **바로 한 단계 아래**에 위치한 모든 태그 |
| 속성 선택자 | 선택자[속성] | |
|          | 선택자[속성=값] | input[type=text] |
|          | 선택자[속성~=값] | div[data-role~=row] | 속성 안의 값이 특정 값을 단어로 포함하는 태그 |
|          | 선택자[속성|=값] | div[data-role|=row] | 속성 안의 값이 특정 값을 단어로 포함하는 태그 |
|          | 선택자[속성^=값] | div[data-role^=row] | 속성 안의 값이 특정 값으로 시작하는 태그 |
|          | 선택자[속성$=값] | div[data-role$=9] | 속성 안의 값이 특정 값으로 끝나는 태그 |
|          | 선택자[속성*=값] | div[data-role*=row] | 속성 안의 값이 특정 값을 포함하는 태그 |
| 동위 선택자 | 선택자A + 선택자B | h1 + div | 선택자A 바로 뒤에 위치하는 선택자B를 선택하는 태그 |
|          | 선택자A ~ 선택자B | h1 ~ div | 선택자A 뒤에 위치하는 선택자B를 선택하는 태그 |
| 구조 선택자 | 선택자:first-child | li:first-child |
|          | 선택자:last-child | li:last-child |
|          | 선택자:nth-child(수열) | li:nth-child(2n+1) | 형제관계 중에서 앞에서 수열 번째에 해당하는 태그를 선택 |
|          | 선택자:nth-last-child(수열) | li:nth-child(2n+1) | 형제관계 중에서 뒤에서 수열 번째에 해당하는 태그를 선택 |
|          | 선택자:first-of-type(수열) | li:first-of-type(수열) |
|          | 선택자:last-of-type(수열) | li:last-of-type(수열) |
|          | 선택자:nth-type-of(수열) | li:nth-type-of(수열) |
| 반응 선택자 | 선택자:active | div:active |
|          | 선택자:hover | div:hover |
| 상태 선택자 | :checked | input:checked |
|          | :focus | input:focus |
|          | :enabled | input:enabled |
|          | :disabled | input:disabled |
| 링크 선택자 | :link | a:link |
|          | :visited | a:visited |
| 문자 선택자 | ::first-letter | p::first-letter |
|          | ::first-line | p::first-line |
|          | ::after | p::after | 태그 앞에 위치하는 공간을 선택 |
|          | ::before | p::before | 태그 뒤에 위치하는 공간을 선택 |
|          | ::selection | p::selection | 사용자가 드래그한 글자를 선택 |
| 부정 선택자 | 선택자:not(선택자) | li:not(.item) |

* `:` : 가상 클래스 선택자
* `::` : 문자 클래스 선택자

* 전체 선택자: (범위) body 태그 내부 뿐 아니라 html, head, title, style 태그 까지 포함된다.
* 아이디 선택자: id 속성은 웹 페이지 내부에서 중복되면 안 된다. 사실 CSS는 id 속성 중복으로 문제가 생기지는 않는다. JavaScript 사용시 문제가 생길 수 있어 중복을 피한다. 공간 분할 태그에 id 속성을 적용하고 레이아웃을 구성하기도 한다.
* 태그 선택자와 클래스 선택자: 태그 중 특정 class 값을 가지고 있는 태그에 속성을 적용할 경우 `tag`.`class` 형태로 합쳐서 사용한다. (ex. `li.item`)
* 예제
  * `li > a:first-child`: li 요소의 모든 첫번째 a 요소
  * `li:first-child > a`: 첫번째 li 요소의 a 요소

### 단위

* em: 배수를 나타내는 단위. (ex. 1배수 = 1em = 100%)

### 색상 선택

* HEX: `#000000`, 16진수로 표현된 숫자 코드로 각 색상 요소에 00부터 FF까지의 숫자를 입력한다. RGB에 비해 파일 용량을 미세하게 줄일 수 있다.
* RGBA: `rgba(red, green, blue)`, 각 매개변수에 0~255 사이의 값을 넣는다.
* RGBA: `rgba(red, green, blue, alpha)`, `alpha` 값은 투명도를 의미한다(0~1).
* HSL: `hsl(hue, saturation, lightness)`
* HSLA: `hsl(hue, saturation, lightness, alpha)`

### 자주 헷갈리는 내용 체크

#### inline과 inline-block의 차이

width, height, margin 속성 적용 방식이 다르다.
`inline` 속성은 width, height 속성이 적용되지 않고 margin은 좌우로만 적용된다.
`inline-block` 속성은 width, height, margin 속성이 모두 적용된다.

#### display: none과 visibility: hidden의 차이

`display: none`이 적용된 요소는 태그가 아예 제거된다.
`visibility: hidden`이 적용된 요소는 화면에서 보이지 않는다.

#### 박스 속성

* `box-sizing: content-box`: 박스 너비는 width, height 속성에 margin, **border**, **padding** 속성이 포함된다. (기본)
* `box-sizing: border-box`: 박스 너비는 width와 height 속성에 margin 속성이 포함된다.

* [참고자료](https://poiemaweb.com/css3-flexbox)