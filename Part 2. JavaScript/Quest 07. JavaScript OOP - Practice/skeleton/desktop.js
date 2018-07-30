class Desktop {
	// 배경화면
	constructor(width, height, iconNum, folderNum) {
		this._width = width;
		this._height = height;
		this._icon = iconNum;
		this._folder = folderNum;
		this.section = document.querySelector('section');
		this.screen = document.createElement('div');

		function makeRandom(param) {
			return Math.floor(Math.random() * param/2)
		}

		this.randomX = makeRandom(width);
		this.randomY = makeRandom(height);

		this.setIcon = new Icon(this.randomX, this.randomY, iconNum);
		this.setFolder = new Folder(this.randomX, this.randomY);
	}

	initializeScreen() {
		// 기본 바탕화면 표시
		this.width = this._width;
		this.height = this._height;
		this.screen.setAttribute('class', 'screen')
		this.screen.setAttribute('style', `width: ${this.width}px; height: ${this.height}px;`)
		this.section.append(this.screen);

		// this.setIcon = function (x, y, num) {
		// 	var iconList = [];
		// 	console.log(x, y, num)
		// 	for (var i = 0; i <= 10; i++) { 
		// 		iconList[i] = new Icon(x, y, num);
		// 	}
		// };

		// this.setIcon;
		
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

		this.icon.onmousedown = function(e) {
			moveAt(e.pageX, e.pageY);

			function moveAt(pageX, pageY) {
				e.target.style.left = pageX - e.target.offsetWidth / 2 + 'px';
				e.target.style.top = pageY - e.target.offsetHeight / 2 + 'px';
			}
		
			function onMouseMove(e) {
				moveAt(e.pageX, e.pageY);
			}
		
			document.addEventListener('mousemove', onMouseMove);
		
			this.onmouseup = function() {
				document.removeEventListener('mousemove', onMouseMove);
				this.onmouseup = null;
			};
		}
	}
};

class Folder extends Icon {
	constructor(x, y, color) {
		super(x, y);
		this._color = color;
	}

	initializeFolder() {
		this.folder = document.createElement('div');
		this.folder.setAttribute('class', 'icon');
		this.folder.setAttribute('style', `left: ${this._x}px; top: ${this._y}px`);
		this.folder.setAttribute('style', 'background: yellow');

		var screen = document.querySelector('.screen');
		screen.append(this.folder);
		
		function openWindow() {
			const window = document.createElement('div');
			window.setAttribute('class', 'window');

			var screen = document.querySelector('.screen');
			screen.append(window);
		}

		this.folder.ondblclick = function() {
			openWindow();
		}
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

	dragWindow() {
		// 윈도우 드래그
		// icon drag와 어떻게 달라지나
	}
};
