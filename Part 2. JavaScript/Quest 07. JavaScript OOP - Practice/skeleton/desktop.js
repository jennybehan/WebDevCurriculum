function dragFunc(e) {
	movePosition(e.pageX, e.pageY);

	function movePosition(pageX, pageY) {
		e.target.style.left = pageX - e.target.offsetWidth / 2 + 'px';
		e.target.style.top = pageY - e.target.offsetHeight / 2 + 'px';
	}

	function onMouseMove(e) {
		movePosition(e.pageX, e.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	this.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
}

function makeIcons(x, y, num) {
	for(var i = 0; i <= num; i++) {
		var iconList = [];
		iconList[i] = new Icon(x, y, num);
	}
	return iconList;
}

class Desktop {
	// 배경화면
	constructor(width, height, iconNum, folderNum) {
		this._width = width;
		this._height = height;
		this._icon = iconNum;
		this._folder = folderNum;
		this.section = document.querySelector('section');
		this.screen = document.createElement('div');

		this.randomX = this.makeRandom(width);
		this.randomY = this.makeRandom(height);

		this.setIcon = new Icon(this.randomX, this.randomY, iconNum);
		this.setFolder = new Folder(200, 300);
	}

	makeRandom(param) {
		return Math.floor(Math.random() * param/2)
	}

	initializeScreen() {
		// 기본 바탕화면 표시
		this.width = this._width;
		this.height = this._height;
		this.screen.setAttribute('class', 'screen')
		this.screen.setAttribute('style', `width: ${this.width}px; height: ${this.height}px;`)
		this.section.append(this.screen);
		
		this.setIcon.initializeIcon();
		this.setIcon.initializeIcon();
		this.setFolder.initializeFolder();
	}
};

class Icon {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}
	
	initializeIcon() {
		this.icon = document.createElement('div');
		this.icon.setAttribute('class', 'icon');
		this.icon.setAttribute('style', `left: ${this._x}px; top: ${this._y}px`);
		
		var screen = document.querySelector('.screen');
		screen.append(this.icon);

		this.icon.onmousedown = dragFunc;
	}
};

class Folder extends Icon {
	constructor(x, y) {
		super();
		this._x = x;
		this._y = y;
	}

	initializeFolder() {
		this.folder = document.createElement('div');
		this.folder.setAttribute('class', 'icon folder');
		this.folder.setAttribute('style', `left: ${this._x}px; top: ${this._y}px`);
		
		var screen = document.querySelector('.screen');
		screen.append(this.folder);

		this.folder.onmousedown = dragFunc;
		this.folder.ondblclick = this.openWindow;
	}

	openWindow() {
		const window = document.createElement('div');
		window.setAttribute('class', 'window');

		var screen = document.querySelector('.screen');
		screen.append(window);
		window.textContent = 'window';
		window.onmousedown = dragFunc;
	}

};

class Window {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}

	initializeWindow() {
		this.window = document.createElement('div');
		this.window.setAttribute('class', 'window');
		this.window.setAttribute('style', `left: ${this._x}px; top: ${this._y}px`);

		var screen = document.querySelector('.screen');
		screen.append(this.window);
	}
};
