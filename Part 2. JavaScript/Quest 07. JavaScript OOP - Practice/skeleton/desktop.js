function dragFunc(e) {
	movePosition(e.pageX, e.pageY);

	function movePosition(pageX, pageY) {
		e.target.style.left = pageX - e.offsetX + 'px';
		e.target.style.top = pageY - e.offsetY + 'px';
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

function makeRandom(param) {
	return Math.floor(Math.random() * param/2)
}

class Desktop {
	constructor(iconNum) {
		this._desktop = document.querySelector('.desktop');
		this._icons = this._desktop.querySelectorAll('.icon');
		this._folder = this._desktop.querySelector('.folder');
		// this._iconNum = this.makeIcon(iconNum);
	}

	// [TO DO]
	// 넘겨받는 숫자에 따라 icon 생성
	// makeIcon(num) {
	// 	for(var i = 0; i <= num; i++) {
	// 		var icon = document.createElement('div');
	// 		icon.setAttribute('class', 'icon');
	// 		this._desktop.append(icon);
	// 	}
	// }

	initializeScreen(iconNum) {
		this._icons.forEach(el => {
			const icon = new Icon(this._desktop);
			return icon.initializeIcon(this._icons);
		});
		
		this._folder = new Folder(this._desktop);
		this._folder.initializeFolder();
	}
};

class Icon {
	constructor(desktop) {
		this._x = makeRandom(document.body.clientWidth);
		this._y = makeRandom(document.body.clientHeight);
		this._desktop = desktop;
	}
	
	initializeIcon(icons) {
		this._icons = icons;
		this._icons.forEach(el => {
			el.style.top = this._x + 'px';
			el.style.left = this._y + 'px';
			el.addEventListener('mousedown', dragFunc);
		})
	}
};

class Folder{
	constructor(desktop) {
		this._x = makeRandom(document.body.clientWidth);
		this._y = makeRandom(document.body.clientHeight);
		this._desktop = desktop;
		this._folder = this._desktop.querySelector('.folder');	
	}

	initializeFolder() {
		this._folder.style.top = this._x + 'px';
		this._folder.style.left = this._y + 'px';
		this._folder.addEventListener('mousedown', dragFunc);
		this._folder.addEventListener('dblclick', this.openWindow.bind(this));
	}
	
	openWindow() {
		// this: folder
		const window = new Window(
									makeRandom(document.body.clientWidth), 
									makeRandom(document.body.clientHeight), 
									this._desktop
								);
		return window.initializeWindow();
	}
	
};

class Window {
	constructor(x, y, desktop) {
		this._x = x;
		this._y = y;
		this._desktop = desktop;
	}
	
	initializeWindow() {
		const window = document.createElement('div');
		window.setAttribute('class', 'window');
		this._desktop.append(window);
		window.textContent = 'This is window!';
		window.addEventListener('mousedown', dragFunc);
		window.addEventListener('dblclick', this.closeWindow);
	}

	closeWindow() {
		this.remove();
	}
};
