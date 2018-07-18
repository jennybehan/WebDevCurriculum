# 01. Hello, HTML

## Checklist

### HTML 4.x 이후의 HTML 표준의 변천사는 어떻게 되나요?

|  시기      | 버전    | 주체   | 주요내용               |
| --------- | ------ | ----- | -------------------- |
| 1997.12   | HTML4.0| W3C   | HTML 표준안 권고
| 1998.4    | HTML4.0| W3C   | HTML 표준안의 공식적 표준화, IE에서 지원
| 1999      | HTML4.0| W3C   | HTML 표준 제정(2000년 이후로 업데이트 되지 않음)
| 2002-2008 | XHTML2.0| W3C   | 2009년 개발 중단
| 2004      | -     | WHATWG | W3C에 제안한 내용들을 반려당하자 웹 브라우저 업체들(Mozilla, Opera 등)이 브라우저 호환성을 위해 W3C와 별도로 웹표준을 만들기 위해 워킹그룹(WHATWG)을 만듬, Web Application 1.0을 제안
| 2008.1    | HTML5 | WHATWG | 공식 작업 초안을 발표
| 2011.1    | HTML5 | WHATWG | HTML5 표준을 HTML로 변경. W3C는 HTML5 출시 프로젝트를 별도로 진행
| 2012      | HTML5 | HTML W/G | W3C와 WHATWG가 함께 HTML5 표준을 작성하고 초안을 발표함
| 2014.10   | HTML5 | HTML W/G | 정식 권고안 발표*
| 2012.11   | HTML5 | W3C | HTML5 Candidate Recommendation 단계
| 2016.11   | HTML5.1 | W3C | HTML5.1 표준안 확정
| 2017.12    | HTML5.2 | W3C | HTML5.2 표준안 확정

### 변경사항 알아보기

* 멀티미디어: HTML5에서는 다양한 멀티미디어 기능이 추가되어 (플래시 등의 프로그램 불필요) 부가적인 프로그램 없이 브라우저 기능만으로 가능한 일들이 많아졌다.

* 시멘틱 태그: 시멘틱한 마크업 태그(`<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>` 등) 추가, 문서 선언(DTD) 간소화(`<!DOCTYPE html>`), CSS로 대체할 수 있는 태그 삭제

* CSS3 스타일 지원

* 그래픽: `<svg>`, `<canvas>`을 통해 2차원 그래픽을 지원하고, CSS3와 WebGL을 이용해 3차원 그래픽 구현이 가능하다.

* 서버통신: 이전까지는 서버에 요청하고 서버에서 데이터를 받아오는 단방향 방식으로 구현되었으나 서버와 소켓 통신이 가능해져 양방향 통신을 수행할 수 있게 되었다.(ex. 실시간 채팅, 실시간 온라인 게임)

* 그외: 장치에 접근해 장치의 정보와 기능을 사용할 수 있음, 오프라인에서도 어플리케이션 실행이 가능.

### MS와 IE는 왜 역사에 오점을 남기게 되었을까요?

1995년 처음 웹 브라우저를 출시하던 당시 MS는 넷스케이프를 따라잡기 위해 윈도우에 IE를 끼워 브라우저 점유율을 높였다.

점유율로 인해 사실상 W3C의 표준 웹 브라우저가 된 IE에 MS 사에서 만든 액티브액스 플러그인이 들어가게 되고, 웹사이트들이 무거워진다. 이를 막기 위해 2004년 W3C 회의에서 모질라 재단, 오페라에서 새로운 HTML 표준 제안서를 제출하고 거절당하게 된다.

이처럼 다른 웹브라우저 벤더들이 모여 표준을 통해 기기나 브라우저에 상관없이 동일한 사용자 경험을 위해 웹 표준을 만들고자 할 때, IE는 웹 표준을 준수하지 않고 자사에서 독자적으로 만든 스펙들을 적용하여 웹 개발자와 사용자 모두에게 부정적인 경험을 주었다.

CSS의 경우 선택자나 주요 기능이 제대로 지원되지 않고 UTF-8 지원도 제대로 되지 않는다. 게다가 IE는 버전 별로도 서로 다른 스펙을 가지고 있어 개발자들이 대응하기 위해 어려움을 겪는다.

이처럼 MS와 IE는 웹 경험의 개선보다는 자사 프로그램 사용을 늘리기 위한 목적으로 운영체제와 브라우저, 플러그인 등을 함께 사용하도록 강제하였고, 이 과정에서 웹 표준 제정을 지연시켰으며 여전히 호환성 문제를 남겨두었다.

* [참고: 브라우저 호환성(MDN)](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/Persona/Browser_compatibility)

### `<section>`과 `<div>`, `<header>`, `<footer>`, `<article>` 엘리먼트의 차이점은 무엇인가요?

1. `<div>`를 제외한 다른 엘리먼트들은 모두 HTML5에서 도입된 섹션 요소(Sectioning content, outlining 알고리즘에 따른 구조적인 문서 구성)입니다. `<div>`는 단순히 문서의 공간을 분할하고 내용을 감싸기 위한 컨테이너 역할을 하는 반면, 섹션 요소들은 각각의 엘리먼트가 감싸고 있는 영역에 그 자체로 의미를 부여합니다. 따라서 섹셔닝 컨텐트들을 통해 HTML4까지 암묵적으로 문서의 구조를 만들었던 것보다 훨씬 의미론적으로 문서 구조를 표현할 수 있게 되었습니다.

* [참고링크 1](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines)
* [참고링크 2](https://www.w3.org/TR/html5/dom.html#sectioning-content-2)

2. `<section>`은 웹 문서의 섹션 부분을 의미하고, `<header>`와 `<footer>`는 각각 페이지나 섹션의 머릿말, 꼬릿말을 의미합니다. `<article>`은 의미를 지닌 단락 컨텐츠를 의미하며, 독립적으로 구분될 수 있고 재사용 될 수 있는 영역을 구성할 수 있습니다(글, 기사 등).

3. `<section>`안에는 제목 요소(`<h1>`~`<h6>`)가 포함되어 내용을 구분합니다. `<article>`안에 `<header>`, `<footer>`, `<section>`가 포함될 수 있습니다.

### 블럭 레벨 엘리먼트와 인라인 엘리먼트의 차이는 무엇일까요?

* 블럭 레벨 엘리먼트는 이전에 온 엘리먼트가 뭐였는지와 상관없이 항상 새 줄에서 시작하여 **사용할 수 있는 전체 너비를 사용**합니다.
* 인라인 레벨 엘리먼트는 블럭 레벨과 달리 요소의 흐름을 끊지 않으며, 새 줄을 만들지 않고 주어진 줄 내부 어디에든 위치할 수 있습니다.

* 블럭 레벨 엘리먼트는 인라인 레벨 엘리먼트와 다른 블럭 레벨 엘리먼트를 포함할 수 있습니다. 블록 레벨 엘리먼트는 페이지 전체 구조와 골격을 잡는 역할을 합니다. 인라인 엘리먼트 내부에 속할 수 없습니다.
* 인라인 레벨 엘리먼트는 다른 인라인 레벨 엘리먼트만 포함할 수 있습니다.

* CSS 박스 모델과 혼동하면 안되지만 CSS의 `display` 속성을 통해 변경가능 합니다.

---

## 스터디 노트

### 문서 메타데이터

> `<meta>`, `<base>`, `<link>`, `<script>`, `<style>`, `<title>`

* 반드시 `<head>`요소 내에 있어야 한다.

* `<meta>`: 아래의 다른 메타 요소로 표현할 수 없는 내용을 표현. 빈요소로 종료 태그가 없다.
* `<base>`: 문서에 포함된 상대 URL들의 기준 URL을 나타냄. 문서당 하나만 존재함.
* `<link>`: 현재 문서와 외부 리소스와의 관계를 명시. 주로 스타일 시트 링크에 사용
* `<script>`: 문서에 포함될 스크립트 코드
* `<style>`: 문서의 스타일 정보
* `<title>`: 브라우저의 타이틀. 페이지의 탭에 보여지는 문서의 제목 표시. 텍스트만 포함 가능.

* `<meta http-equiv="X-UA-Compatible" content="IE=edge">`: 브라우저 호환을 위해 버전을 선택할 수 있도록 한 메타태그 ([참고 링크](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do))

#### Document Character set encoding

* HTML5에서 사용되기 시작.
* `charset`은 페이지 문자 인코딩 속성
> `<meta charset="utf-8">`
> `utf-8`: UCS Transformation Format 8, 각 문자는 1-4 바이트로 나타나며, ASCII 코드와 역호환된다. 모든 표준 유니코드 문자를 표현할 수 있다.
* 유니코드를 위한 문자 부호화
* meta data에 속하는 `<title>`과 body에서 사용하는 `<h1>`태그. `<title>`은 문서에 포함되지 않음.
* 문자인코딩을 하지 않는 경우 Cross-site scripting 공격을 당하게 될 수 있다.

### OGP(Open Graph Protocol)

> `og:title` : 그래프 안에 보여지는 오브젝트의 제목
> `og:type` : 오브젝트의 타입. 어떤 타입인지에 따라 다른 속성들이 필요해 질 수 있음.
> `og:image` : 그래프 안에서 표현할 오브젝트를 나타내는 이미지의 url
> `og:url` : 그래프에서 id값으로 사용될 오브젝트의 URL

```html
<meta property="og:title" content="this is title">
<meta property="og:type" content="video.movie">
<meta property="og:url" content="http://www.imdb.com/title/tt0117500">
<meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg">
```

* [참고](http://ogp.me/)

### Sectioning content

### Table 사용

> (...) either one of the following: zero or more `<tbody>` elements one or more `<tr>` elements
> * [참고](http://devdocs.io/html/element/table)

### <button> vs <a> vs <input type="button" />

* 버튼 요소는 기본적으로 `<form>` 요소 안에 포함된 요소다. 기본적으로 이 요소는 `<input type="submit">`과 동일하게 작동한다.

* `<a>` 태그에는 의미있는 주소가 들어간다(시멘틱). `<button>`은 `<form>` 바깥에서는 특별한 의미를 가지지 않는다.

* [참고](https://css-tricks.com/use-button-element/)

> `<button>` 요소는 `<input>` 요소보다 스타일이 훨씬 쉽습니다. 텍스트 값만 허용하는 `<input>`과 달리, 내부 HTML 콘텐츠 (`<em>`, `<strong>` 또는 `<img>`)를 추가하고 `::after` 및 `::before`를 사용하여 복잡한 요소를 렌더링 할 수 있습니다.

* [출처](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

Q. svg로 만들어진 아이콘만 있는 버튼의 경우 해당 내용이 무슨 버튼인 지 알 수 없으므로 `<a>` 요소를 쓰는 게 나을까?