class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	constructor() {
		this.notePad = document.querySelector('.wrapper');
		this.initializeNotePad();
	}
	
	initializeNotePad() {
		this.newTabList();
		this.newTab();
		this.newMemo();
		this.newLogin();
	}

	newTabList() {
		this.tabList = new TabList();
	}
	
	newTab() {
		this.tab = new Tab();
	}
	
	newMemo() {
		this.memo = new Memo();
	}

	newLogin() {
		this.login = new Login();
	}
};

class Memo {
	constructor() {
		this._memoBoard = document.querySelector('.memo-board-new');
		this._submitBtn = this._memoBoard.querySelector('.submit-btn');
		this._memoTitle = this._memoBoard.querySelector('.title');
		this._memoBody = this._memoBoard.querySelector('.memo');
		this._submitBtn.addEventListener('click', this.saveMemo.bind(this));
	}

	getNewState() {
		const dataObj = {};
		dataObj.title = this._memoTitle.value;
		dataObj.body = this._memoBody.value;
		const data = JSON.stringify(dataObj)
		return data;
	}
	
	saveMemo() {
		const data = this.getNewState();

		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8080/memo', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log('created new memo')
			} else {
				console.log('error!')
			}
		}
		xhr.send(data)
		window.location.reload();
	}
}

class TabList {
	constructor() {
		this._tabList = document.querySelector('.tab');
		this._list = document.querySelector('.tab ul');
		this._submitBtn = document.querySelector('.submit-btn');
		this.loadTabList();
	}

	selectTabItem(dataItem) {
		console.log(dataItem)
		const selectedItem = {
			id: dataItem.id,
			// title: dataItem.title.split('./memo/')[1].split('.txt')[0],
			data: dataItem.data
		}
		// this._submitBtn.setAttribute('disabled', '');
		return new Tab(selectedItem).getCurrentState();
	}

	loadTabList() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8080/memo');
		
		xhr.onload = () => {
			const dataObj = JSON.parse(xhr.responseText);
			if (xhr.status === 200 || xhr.status === 201) {
				const fileList = dataObj.data;
				fileList && fileList.map((file, index) => {
					const listItem = document.createElement('li');
					const dataItem = {
						id: index,
						title: file.filePath,
						data: file.data
					}
					listItem.classList.add('list-item');
					listItem.textContent = dataItem.title.split('./memo/')[1].split('.txt')[0];
					this._list.appendChild(listItem)
					// listItem.addEventListener('click', this.selectTabItem.bind(dataItem))
					listItem.addEventListener('click', () => {
						// click 시 id 가 넘어가서 해당 id의 데이터(상태)를 가져와야 함
						// 여기서 data, title의 상태가 변경되어야 할까?
						console.log(dataItem)
						const selectedItem = {
							id: dataItem.id,
							title: dataItem.title.split('./memo/')[1].split('.txt')[0],
							data: dataItem.data
						}
						this._submitBtn.setAttribute('disabled', '');
						return new Tab(selectedItem).getCurrentState();
					})
				})
			} else {
				console.error(xhr.responseText)
			}
		}
		xhr.send(null);
	}
}

class Tab {
	constructor(item) {
		this._memoBoard = document.querySelector('.memo-board-new');
		this._memoTitle = this._memoBoard.querySelector('.title');
		this._memoBody = this._memoBoard.querySelector('.memo');
		this._updateBtn = document.querySelector('.update-btn');
		this._memoTitle.addEventListener('change', this.getNewState.bind(this));
		this._memoBody.addEventListener('change', this.getNewState.bind(this));
		this._updateBtn.addEventListener('click', this.updateMemo.bind(this));
		this._data = item;
		// this.getCurrentState()
	}
	
	getCurrentState() {
		this._memoTitle.value = this._data.title;
		this._memoBody.textContent = this._data.data;
		const memoState = {
			id: this._data.id,
			title: this._data.title,
			data: this._data.data
		}
		const data = JSON.stringify(memoState);
		return data;
	}
	
	getNewState() {
		console.log(this._memoBody.value)
		console.log(this._memoTitle.value);
		// const id = this._data.id;
		const prevData = JSON.parse(this.getCurrentState());
		// const dataObj = {
		// 	id: prevData.id,
		// 	title: this._memoTitle.value,
		// 	body: this._memoBody.value,
		// };
		const dataObj = {};
		console.log(this)
		dataObj.id = prevData.id;
		dataObj.title = this._memoTitle.value;
		dataObj.body = this._memoBody.value;
		console.log(dataObj)
		const data = JSON.stringify(dataObj)
		return data;
	}

	updateMemo() {
		const data = this.getNewState();
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8080/memo', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				// console.log(data)
				console.log('created new memo')
			} else {
				console.log('error!')
			}
		}
		xhr.send(data)
		// window.location.reload();
		// const changingTitle = this._previewTitle.textContent;
		// const changingBody = this._previewBody.textContent;

		// this._memoTitle.value = changingTitle.split('.txt')[0];
		// this._memoTitle.setAttribute("disabled", "") // [TODO ]title 변경도 반영하기
		// this._memoBody.value = changingBody;
	}

	loadTabItem(fileName) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8080/memo/' + fileName);
		xhr.onload = () => {
			if (xhr.status === 200) {
				fileName = fileName && fileName.split('.txt')[0];
				const fileData = JSON.parse(xhr.responseText).data;
				const selectedTitle = document.querySelector('.title');
				const selectedBody = document.querySelector('.memo');
				const selectedData = {}
				selectedTitle.value = fileName || "";
				selectedBody.textContent = fileData;

				selectedData.title = selectedTitle.value;
				selectedData.body = selectedBody.value;
			} else {
				console.error(xhr.responseText)
			}
		}
		xhr.send(null);
	}
}

class Login {
	constructor() {
		this.notePad = document.querySelector('.wrapper');
		this.loginBox = this.notePad.querySelector('.login')
		this.loginBtn = this.notePad.querySelector('.login-btn');
		this.loginBtn.addEventListener('click', this.login.bind(this))
	}

	login() {
		let login = 'false';
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8080/login', true);
		if (xhr.status === 200) {
			const id = this.loginBox.querySelector('.userId').value;
			const pw = this.loginBox.querySelector('.userPw').value;
			console.log('login', id, pw)
			// login = true;
			// this.loginStatus(login === 'true'); 
		} else {
			// login = false;
			// this.loginStatus(login === 'false');
			console.error(xhr.responseText)
		}
		xhr.send(null);
	}

	logout() {
		let login = 'false';
		const xhr = new XMLHttpRequest();
		// xhr.open
	}
}