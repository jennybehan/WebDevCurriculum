class Desktop {
	constructor(background) {
		this.background = background;
		this.cursor = cursor;
	}

	getScreen() {
		// 기본화면 불러오기	
	}
	
	getCursor() {
		// 커서 초기화
	}

	moveCursor() {
		// 커서 움직임
	}

	clickCursor() {
		// 요소 선택	
	}

	dragCursor() {
		// 선택한 요소를 드래그
	}

	doubleClickCursor() {
		// 선택한 요소의 윈도우를 오픈
	}

	// 배경화면
	// - 배경화면
	// - 아이콘과 폴더가 차지하는 자리에 대한 정보?
	
	// 커서
	// - 커서의 움직임
	// - 커서의 클릭
	// - 커서의 드래그
	// - 커서의 더블클릭
};

class Icon {
	constructor(x, y, width, height, color) {
		// 좌표 필요
		this.x = x;
		this.y = y;
		// 아이콘 크기
		this.width = width;
		this.height = height;
		// 아이콘 모양
		this.color = color;
		// - 예는 도형 클래스를 상속받을 수 있어야 하는 건가?
	}

	initiateIcon() {
		// 기본 아이콘 요소 생성
	}

	dragable() {
		// 아이콘 드래그
	}
};

class Folder extends Icon {
	constructor(x, y, width, height, color) {
		super(x, y, width, height, color);
	}
	
	openWindow() {
		// 더블클릭이 되면 -> 이것도 다른 메서드로 빼야 하나?
		// 윈도우 열기
	}
};

class Window {
	constructor(x, y, width, height) {
		super(x, y, width, height);
	}

	dragable() {
		// 윈도우 드래그
	}
};
