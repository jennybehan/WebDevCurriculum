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

	makeRandom(param) {
		return Math.floor(Math.random() * param);
	};
		
	initializeScreen() {
		var icons = document.querySelectorAll('.icon'); // icon은 두개야..
		icons.forEach(el => {
			return new Icon(makeRandom(document.body.clientWidth), makeRandom(document.body.clientHeight))
		});
		// icons.forEach(el => {
		// 	return el.initializeIcon();
		// })

		var folder = document.querySelector('.folder');
		folder = new Folder(makeRandom(document.body.clientWidth), makeRandom(document.body.clientHeight));
		folder.initializeFolder();
	}
};

class Icon {
	constructor(x, y) {
		this._x = x;
		this._y = y;
		this.desktop = document.querySelector('.desktop');
	}
	
	initializeIcon() {
		var icons = this.desktop.querySelectorAll('.icon');
		icons.forEach(el => {
			el.style.top = this._x + 'px';
			el.style.left = this._y + 'px';
			el.addEventListener('mousedown', dragFunc);
		})
	}
};

class Folder extends Icon {
	constructor(x, y) {
		super();
		this._x = x;
		this._y = y;
	}

	initializeFolder() {
		console.log(this)
		var folder = this.desktop.querySelector('.folder');
		folder.style.top = this._x + 'px';
		folder.style.left = this._y + 'px';
		folder.addEventListener('mousedown', dragFunc);
	}

	openWindow() {
	}

};

class Window {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}

	initializeWindow() {
		
	}
};
