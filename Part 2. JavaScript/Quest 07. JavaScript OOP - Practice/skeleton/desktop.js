class Desktop {
	// 배경화면
	// - 배경화면 초기화: (window.innerWidth, window.innerHeight)
	// - 아이콘과 폴더가 차지하는 자리에 대한 정보
	
	// 아이콘
	// - 아이콘과 폴더 불러오기: (존재여부, 갯수)
	
	// 커서
	// - 커서의 움직임
	// - 커서의 클릭
	// - 커서의 드래그
	// - 커서의 더블클릭
	
	constructor(width, height, cursor, icon, folder) {
		this._width = width;
		this._height = height;
		this._cursor = cursor;
		this._icon = icon;
		this._folder = folder;

		// 아이콘은 여기서 초기화 해서 가져올 수 있는 것인가
		// 아니면 메서드로 가져와야 하는 것인가..
		// this.icon = icon;
		// this.forder = folder;
		
		// Closure로 메서드 숨기기
		// this.getScreen = function() {
			
		// }
	
		// this.getCursor = function() {
			
		// }
	}

	getScreen() {
		// 기본 바탕화면 표시
		this.width = this._width;
		this.height = this._height;
		const section = document.querySelector('section');
		const screen = document.createElement('div');
		screen.setAttribute('class', 'screen')
		screen.setAttribute('style', `width: ${this.width}px; height: ${this.height}px;`)
		section.append(screen);

		const setIcon = new Icon(Math.floor(Math.random() * this._width/2), Math.floor(Math.random() * this._height/2));
		setIcon.getIcon();
	}

	
	// Cursor Class를 따로 빼야하는 건 아닐까?
	
	// getCursor() {
	// 	// 커서 초기화
	// 	return this.cursor;
	// }

	// moveCursor() {
	// 	// 커서 움직임 - 이건 커서의 기능으로 들어가야 할 것 같음
	// }
 
	clickItem() {
		// 요소 선택	
	}

	dragItem() {
		// 선택한 요소를 드래그
	}
};

class Icon {
	// 좌표
	// 아이콘 모양은 그냥 클래스를 주는 걸로 해결(CSS)
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}

	// [TO DO]
	// const icon = ... 코드 반복

	
	getIcon() {
		// 기본 아이콘 요소 생성
		const icon = document.createElement('div');
		icon.setAttribute('class', 'icon');
		icon.setAttribute('style', `left: ${this._x}px; top: ${this._y}px`);
		
		const screen = document.querySelector('.screen');
		screen.append(icon);
		this.dragIcon();
	}

	dragIcon() {
		// 아이콘 드래그
		icon.onmouseover = function(event) {
		}
		
		icon.onmouseout = function(event) {
			event.target.removeAttribute('draggable', true);
		}
		
		icon.onmousedown = function(event) {
			event.target.setAttribute('draggable', true);
		}

		// icon.drag = functon(event) {
		// 	event.target.
		// }

		icon.drop = function(event) {
			console.log(event.clientX)
			console.log(event.clientY)
			event.target.append('.screen');
		}

		// drop();
	}
	
	draggable() {}
	dragStart() {}
	dragOver() {}

};

class Folder extends Icon {
	// 개수
	// method 상속
	// folder만의 모양
	// 새창
	// 드래그

	constructor(x, y) {
		super(x, y);
	}
	
	openWindow() {
		// 더블클릭이 되면 -> ?.. 결국 Desktop의 모든 걸 상속 받아야 하나? 아니면 이런 기능들을 따로 빼야하나?
		// 윈도우 열기
	}
};

class Window {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	dragWindow() {
		// 윈도우 드래그
		// icon drag와 어떻게 달라지나
	}
};
