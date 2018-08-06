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
	constructor(iconNum, folderNum) {
		this._icon = iconNum;
		this._folder = folderNum;
		this.section = document.querySelector('section');
	}
		
	initializeScreen() {
		const icons = document.querySelectorAll('.icon');
		const desktop = document.querySelector('.desktop');
		icons.forEach(el => {
			const icon = new Icon(desktop)
			return icon.initializeIcon();
		});

		var folder = document.querySelector('.folder');
		folder = new Folder(makeRandom(document.body.clientWidth), makeRandom(document.body.clientHeight), desktop);
		folder.initializeFolder();
	}
};

class Icon {
	constructor(desktop) {
		this._x = makeRandom(document.body.clientWidth);
		this._y = makeRandom(document.body.clientHeight);
		this._desktop = desktop;
	}
	
	makeRandom(param) {
		return Math.floor(Math.random() * param);
	};

	initializeIcon() {
		var icons = this._desktop.querySelectorAll('.icon');
		icons.forEach(el => {
			el.style.top = this._x + 'px';
			el.style.left = this._y + 'px';
			el.addEventListener('mousedown', dragFunc);
		})
	}
};

class Folder extends Icon {
	constructor(x, y, desktop) {
		super();
		this._x = x;
		this._y = y;
		this._desktop = desktop;
	}

	initializeFolder() {
		const folder = this._desktop.querySelector('.folder');
		folder.style.top = this._x + 'px';
		folder.style.left = this._y + 'px';
		folder.addEventListener('mousedown', dragFunc);
		folder.addEventListener('dblclick', this.openWindow);
		// folder.ondblclick = this.openWindow(this._desktop); // desktop을 넘겨줄 수 있는 방법?
	}
	
	openWindow() {
		const window = new Window(makeRandom(document.body.clientWidth), makeRandom(document.body.clientHeight));
		return window.initializeWindow();
	}
	
};

class Window {
	constructor(x, y, desktop) {
		this._x = x;
		this._y = y;
		// this._desktop = desktop;
	}
	
	initializeWindow() {
		const desktop = document.querySelector('.desktop');
		const window = document.createElement('div');
		window.setAttribute('class', 'window');
		// this._desktop.append(window);
		desktop.append(window);
		window.textContent = 'This is window!';
		// window.onmousedown = dragFunc; // addEventListener와 어떻게 다른 걸까?
		window.addEventListener('mousedown', dragFunc);
		window.ondblclick = this.closeWindow;
	}

	closeWindow() {
		this.remove();
	}
};
