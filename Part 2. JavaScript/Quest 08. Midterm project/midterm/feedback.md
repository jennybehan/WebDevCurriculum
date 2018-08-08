## Feedback

1. <template> tag

페이지가 로드될 때 렌더링되지 않지만 나중에 JS를 사용하여 **런타임 중에 인스턴스화** 될 수 있는 클라이언트 측 내용을 보유하는 메커니즘이다.

`Class Tooltip` 같은 것을 `querySelector`로 매번 클래스 내부 생성자에서 찾으면 매 클래스마다 이런 식으로 찾아줘야 하지만 <template> 태그를 사용하면 생성자에서 해당 태그를 참조하여 여러 번 재사용 할 수 있음.

2. `Window` 클래스가 자식 요소를 멤버변수로 가지고 있어야 함.

```javascript
class Window {
    constructor() {
        this.changeBgBtn = document.querySelector('.newColor');
        this.changeBgBtn.addEventListener('click', this.changeBackground);
    }
    
    initialize() {
        // 여기서 this를 바인딩 해서 Window가 자식 요소를 멤버변수로 가지고 있게 해야 한다.
        // const와 this로 생성하는 것의 차이???
        const dummy = new Dummy();
        const text = new Text();
        const time = new Time();

        this.dummy.initializeDummy();
        this.text.initializeText();
        this.time.initializeTime();
    }

    // ...
}
```

```javascript
class Window {
    constructor() {
        this.changeBgBtn = document.querySelector('.newColor');
        this.changeBgBtn.addEventListener('click', this.changeBackground);
    }
    
    initialize() {
        this.dummy = new Dummy();
        this.text = new Text();
        this.time = new Time();
        // 자식 요소를 멤버변수로 가지고 있도록 
        // - 디버깅 할 때도 편리하고 구조상으로도 Window가 각각의 요소를 가지고 있는 게 맞음

        this.dummy.initializeDummy();
        this.text.initializeText();
        this.time.initializeTime();
    }

    // ...
}
```

3. `Window` 클래스 안에 있는 `changeBackground()` 멤버함수를 아예 `Background` 클래스로 뺄 수 있음

4. Text, Background color가 바뀔 때 색이 서로 다르게 나올 수 있도록 컨트롤 하려면? 

5. DOM/JS 분리 및 의존성 분리 아직도 헷갈림

