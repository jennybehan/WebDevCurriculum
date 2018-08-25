class Notepad {
	constructor() {
		this.notePad = document.querySelector('.memo-board-wrapper');
		this.newMemoBtn = document.querySelector('.newmemo-btn');
		this.submitBtn = document.querySelector('.submit-btn');
		this.updateBtn = document.querySelector('.update-btn');
		this._memoTitle = document.querySelector('.title');
		this._memoText = document.querySelector('.text');
		this.tabList = document.querySelector('.tab-list ul');
		this.tabItem = document.querySelector('.list-item');
		this.submitBtn.addEventListener('click', this.saveMemo.bind(this));
		this.newMemoBtn.addEventListener('click', this.makeNewMemo.bind(this));
		this.updateBtn.addEventListener('click', this.saveMemo.bind(this))
		this.initializeNotePad();
	}
	
	initializeNotePad() {
		this.getMemoData();
		this.setLogin();
	}
	
	setLogin() {
		this.notePad.login = new Login();
	}
	
	makeNewMemo() {
		this._memoTitle.value = '';
		this._memoText.value = '';
	}

	setMemoData(memo) {
		this._memoTitle.value = memo.title;
		this._memoText.value = memo.text;
	}
	
	getTabList(memo) {
		this.tabItem = document.createElement('li');
		this.tabItem.classList.add('list-item');
		this.tabList.appendChild(this.tabItem);
		this.tabItem.textContent = memo.title;
		this.tabItem.onclick = () => {
			this.setMemoData(memo)
		}
	}

	saveMemo() {
		let dataObj = {};
		dataObj.title = this._memoTitle.value.split('./memo/')[1];
		dataObj.text = this._memoText.value;
		const data = JSON.stringify(dataObj)
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
		this.setMemoData(JSON.parse(data));
		xhr.send(data)
		window.location.reload();
	}
	
	getMemoData() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8080/memo');
		xhr.onload = () => {
			if (xhr.status === 200 || xhr.status === 201) {
				const dataObj = JSON.parse(xhr.responseText);
				const memoList = dataObj.data;
				console.log(memoList)
				memoList.map((memo, index) => {
					memo.id = index;
					this.getTabList(memo);
				})
				return memoList;
			} else {
				console.error(xhr.responseText);
			}
		}
		xhr.send(null);
	}
};

// class Login {
// 	constructor() {
// 		this.notePad = document.querySelector('.wrapper');
// 		this.loginBox = this.notePad.querySelector('.login')
// 		this.loginBtn = this.notePad.querySelector('.login-btn');
// 		this.logoutBtn = this.notePad.querySelector('.logout-btn');
// 		this.loginBtn.addEventListener('click', this.login.bind(this));
// 		this.logoutBtn.addEventListener('click', this.logout.bind(this));
// 		this.loginStatus;
// 		console.log('this.login: ', this.loginStatus)
// 	}

// 	login() {
// 		this.loginStatus = false;
// 		const id = this.loginBox.querySelector('.userId').value;
// 		const pw = this.loginBox.querySelector('.userPw').value;
// 		const loginData = {
// 			id, pw
// 		}
// 		const xhr = new XMLHttpRequest();
// 		xhr.open('POST', 'http://localhost:8080/login', true);
// 		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
// 		xhr.onload = () => {
// 			if (xhr.status === 200) {
// 				console.log('login')
// 				this.loginStatus = true;
// 			} else {
// 				console.error(xhr.responseText);
// 			}
// 		}
// 		xhr.send(JSON.stringify(loginData));
// 	}

// 	logout() {
// 		const xhr = new XMLHttpRequest();
// 		xhr.open('GET', 'http://localhost:8080/logout', true);
// 		xhr.onload = () => {
// 			if (xhr.status === 200) {
// 				console.log('logout')
// 				this.loginStatus = false;
// 			} else {
// 				console.error(xhr.responseText);
// 			}
// 		}
// 		xhr.send(null);
// 	}
// }