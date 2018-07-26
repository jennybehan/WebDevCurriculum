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
		this.width = width;
		this.height = height;
		this.cursor = cursor;
		this.icon = icon;
		this.folder = folder;

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

let system = new Desktop(1000, 800, true, 1, 1);
system.getScreen();

class Icon {
	// 좌표
	// 아이콘 크기 - desktop 크기보다 작아야 한다는 체크를 해야 할까?
	// 아이콘 모양
	// - 어디까지 지정하나?
	// - 색상, 크기, 래디우스, ...?
	// - 예는 도형 클래스를 상속받을 수 있어야 하는 건가?

	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	getIcon() {
		// 기본 아이콘 요소 생성
	}

	dragIcon() {
		// 아이콘 드래그
	}
};

class Folder extends Icon {
	// 개수
	// method 상속
	// folder만의 모양
	// 새창
	// 드래그

	constructor(x, y, width, height, color) {
		super(x, y, width, height, color);
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
