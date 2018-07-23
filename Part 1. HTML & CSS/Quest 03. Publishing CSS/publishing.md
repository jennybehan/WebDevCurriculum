## checklist

### CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?

기본 selector들 간에 공통으로 적용되는 스타일 속성이 있는 경우에는 selector를 그대로 사용해도 되지만, 동일한 selector라도 다른 스타일이 적용되는 경우가 훨씬 많으므로 그런 경우 class를 사용한다.
또 상속받은 스타일에서 예외를 처리할 때에도 class를 사용하여 style을 적용한다.

동일한 코드가 반복될 경우에는 아예 class를 따로 빼서 여러 번 적용할 수 있도록 작성하고 하나의 요소에 여러 클래스를 적용할 수 있다.

## 스터디 노트


* `body`: body 요소에 스타일 속성을 적용합니다. 본문 내의 요소는 속성 값을 상속 할 수 있습니다. 일부 속성의 기본값은 'inherit'입니다. 본문 내의 요소와 일치하는 스타일 선언은 상속된 스타일을 재정의 합니다.
* `*` (universal selector) : 모든 개별 요소에 스타일 속성을 적용합니다. 상속된 스타일 속성 및 기본 '초기값'을 대체합니다. 상속을 차단합니다. 요소와 일치하는 선택자 중 다른 선택자보다 구체적인 CSS 선택자는 * 로 적용된 스타일 속성을 대체합니다.

```
요소에 적절한 기본값을 제공하기 위해 글꼴, 색상 등과 같이 기본적으로 상속되는 스타일 속성에는 body를 사용하여 모든 경우에 대해 명시적으로 코드를 작성하는 경우를 줄입니다.
전체 선택자(`*`)는 사용하지 않는 편이 좋습니다. 그것은 본문 내의 다른 요소들간의 상속을 방해하고, 이를 해결하기 위해 더 많은 CSS 규칙을 작성하도록 할 것입니다. 
페이지 렌더링 속도를 늦추는 요인이 될 수도 있습니다.
```

> [참고](https://softwareengineering.stackexchange.com/questions/178049/css-use-universal-selector-vs-html-or-body-selector)

* `box-sizing`: 박스모델에서 width와 height를 계산하는 방식은 box-sizing 속성으로 조정하며 기본 스타일은 box-sizing: content-box다. 
content-box일 경우 width와 height 속성은 오로지 콘텐츠만을 포함하여 측정되며, padding, border, margin을 포함하지 않는다.
box-sizing: border-box로 재정의하는 경우 width와 height 속성이 padding 및 border를 포함하며, margin을 포함하지 않는다.(IE에서 쿼크모드일 때 사용됨)
즉, box-sizing이 content-box이면 오로지 content만 width에 포함시키기 때문에 padding, border, margin 모두 박스모델 밖에 있다. 그래서 이 경우에 padding이나 border를 추가하면 레이아웃이 깨지게 된다.
box-sizing을 border-box로 적용하면, padding과 border가 박스모델에 포함되므로 width, height가 유지되어 레이아웃이 깨지지 않는다.

