class Notepad {
	constructor() {
		this.deselectTab = null;
		this.handleSelectTab = this.handleSelectTab.bind(this);
		this.handleSubmitMemo = this.handleSubmitMemo.bind(this);
		this._submitBtn = document.querySelector('.submit-btn');
		this.loginBtn = document.querySelector('.login-btn');
		this.logoutBtn = document.querySelector('.logout-btn');
		this.loginBtn.addEventListener('click', this.initializeLogin)
		this.logoutBtn.addEventListener('click', this.logout.bind(this))
		this.loggedIn = false;
		this.initializeData();
		this.initializeUser();
	}

	getCookie(){
		const cookieList = document.cookie.split(';');
		for(let i = 0; i < cookieList.length; i++){ 
			return cookieList[i].trim().match()
		} return null;
	}

	initializeUser() {
		fetch('http://localhost:8080/user', {
			method: 'GET'
		}).then(res => {
			if(res.status === 200) { 
				return res.json();
			}
			else throw new Error();
		}).then(result => {
			this.noti = document.querySelector('.login-noti');
			this.loginInfoBox = document.querySelector('.login-info');
			this.noti.textContent = `${result.user} 님이 로그인하셨습니다.`; 
			this.loginInfoBox.classList.add('disable')
			this.getCookie(result.user)
			// cookie
			let cookie = this.getCookie();
			console.log(cookie)
			this.textBoard = document.querySelector('.text');
			this.textBoard.focus();
			// this.textBoard.setSelectionRange(startPoint, endPoint);
		}).catch(err => console.log(err))
	}

	initializeLogin() {
		this.loggedIn = true;
		this.id = document.querySelector('.userId').value;
		this.pw = document.querySelector('.userPw').value;

		this.user = {
			"id": this.id,
			"pw": this.pw
		}

		fetch('http://localhost:8080/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.user)
		}).then(res => {
			if(res.status === 200) {
				const cookieValue= this.id + ";";
				document.cookie = "name=" + cookieValue;
				console.log("쿠키 Cookies : " + "name=" + cookieValue);
				// 지난 번에 열었던 메모
				// 지난 번에 열었던 메모의 커서
				// 메모 리스트
				// -> 디렉토리가 따로 있어야 하나?
				window.alert('로그인 성공')
				return res.json();
			}
		})
		.then(window.location.reload())
		.catch(err => console.error(err));
			
	}

	logout() {
		this.loggedIn = false;
		this.noti = document.querySelector('.login-noti');
		this.loginInfoBox = document.querySelector('.login-info');
		fetch('http://localhost:8080/logout', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.user),
		}).then(res => {
			if(res.status === 200) {
				this.noti.textContent = null;
				this.loginInfoBox.classList.remove('disable')
				window.location.reload();
			}
		}).catch(err => console.error(err));
	}

	initializeData() {
		fetch('http://localhost:8080/memo', {
			method: 'GET',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then((res) => res.json())
		.then((result) => {
			this.tabList = new TabList(result.data);
			this.tabList.onSelectTab(this.handleSelectTab);
			this.memo = new Memo();
			this.memo.onSubmit(this.handleSubmitMemo);
		}).catch(err => console.error(err));
	}
		
	handleSelectTab(title) {
		this.currentTab = this.tabList.tabList.find(tabItem => tabItem.title === title);
		const fileName = this.currentTab.title;
		fetch(`http://localhost:8080/memo/${fileName}`, {
			method: 'GET',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then((res) => res.json())
		.then((result) => {
			this.currentTab.text = result.data;
			this.memo.update(this.currentTab);
			this.currentTab.updateData(this.currentTab);
			if (this.currentTab) {
				this._submitBtn.value = '수정';
			}
			return this.currentTab.text;
		}).then(() => {
			this.otherTabs = this.tabList.tabList.filter(tabItem => tabItem.title !== title);
			if (this.otherTabs) {
				this.otherTabs.map(tab => tab.tabItem.addEventListener('click', () => {
					const textBoard = document.querySelector('.text');
					const text = textBoard.value;
					fetch(`http://localhost:8080/memo/${fileName}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						body: JSON.stringify({data: {title, text}})
					})
					.then(result => console.log(result))
					.catch(err => console.error(err))
				}))
			}
		})
		.catch(err => console.error(err));
	}
	
	handleSubmitMemo({ title, text }) {
		fetch('http://localhost:8080/memo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({data: {title, text}})
		})
		.then(result => {
			const newData = {
				id: this.tabList.tabList.length,
				title,
				text
			}
			this.tabList.append(newData);
		}).then(
			window.location.reload()
		).catch(err => console.error(err));
	}
};

class Memo {
	constructor() {
		this._memoBoard = document.querySelector('.memo-board-new');
		this._submitBtn = this._memoBoard.querySelector('.submit-btn');
		this._memoTitle = document.querySelector('.title');
		this._memoText = document.querySelector('.text');
		this._makeNewBtn = document.querySelector('.newmemo-btn');
		this._makeNewBtn.addEventListener('click', this.makeNewMemo.bind(this))
	}

	onSubmit(handleSubmitMemo) {
		this._submitBtn.addEventListener('click', () => {
			handleSubmitMemo({
				title: this._memoTitle.value,
				text: this._memoText.value
			});
		})
	}

	deselectTab() {
		this.currentTab = null;
	}
	
	makeNewMemo() {
		this.deselectTab();
		this.memo = null;
		this._memoTitle.value = '';
		this._memoText.value = '';
		this._submitBtn.value = '노트 등록';
	}

	update({ title, text }) {
		this._memoTitle.value = title;
		this._memoText.value = text;
	}
}

class TabList {
	constructor(tabDataList) {
		this.tabItem = document.querySelector('.list-item');
		this.tabList = tabDataList.map(tabData => new Tab(tabData));
		this.handleSelectTab = null;
	}

	onSelectTab(handleSelectTab) {
		this.handleSelectTab = handleSelectTab;
		this.tabList.forEach(tab => tab.onSelectTab(handleSelectTab))
	}

	append(tab) {
		const newTab = new Tab(tab);
		if (this.handleSelectTab) newTab.onSelectTab(this.handleSelectTab);
		this.tabList.concat(newTab);
	}

	onSubmit(handleSubmitMemo) {
		this.tabItem.addEventListener('click', () => {
			handleSubmitMemo({
				title: this._memoTitle.value,
				text: this._memoText.value
			});
		})
	}
}

class Tab {
	constructor(tabData) {
		this.title = tabData.title ? tabData.title : tabData;
		this.loadTabList();
	}

	updateData({ title, text }) {
		this.title = title;
		this.text = text;
	}

	loadTabList() {
		this.tabListWrapper = document.querySelector('.tab-list ul');
		this.tabItem = document.createElement('li');
		this.tabItem.classList.add('list-item');
		this.tabItem.addEventListener('click', this.onSelectTab);
		this.tabItem.addEventListener('click', this.getMemoData);
		this.tabItem.textContent = this.title;
		this.tabListWrapper.append(this.tabItem);
	}
	
	onSelectTab(handleSelectTab) {
		this.tabItem && this.tabItem.addEventListener('click', () => {
			handleSelectTab(this.title);
			this.tabList = document.querySelectorAll('.list-item');
		})
	}

	// 현재 데이터
	getData() {
		return {
			id: this.id,
			title: this.title,
			text: this.text
		}
	}
}

