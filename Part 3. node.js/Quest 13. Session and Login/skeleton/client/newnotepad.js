class Notepad {
	constructor() {
		this.deselectTab = null;
		this.handleSelectTab = this.handleSelectTab.bind(this);
		this.handleSubmitMemo = this.handleSubmitMemo.bind(this);
		this._submitBtn = document.querySelector('.submit-btn');
		this.loginBtn = document.querySelector('.login-btn');
		this.loginBtn.addEventListener('click', this.initializeLogin)
		this.logoutBtn = document.querySelector('.logout-btn');
		this.logoutBtn.addEventListener('click', this.logout.bind(this))
		this.loggedIn = false;
		this.initializeData();
	}
	
	initializeLogin() {
		this.loggedIn = true;
		this.id = document.querySelector('.userId').value;
		this.pw = document.querySelector('.userPw').value;
		this.loginInfoBox = document.querySelector('.login-info');
		this.noti = document.querySelector('.login-noti');

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
				this.noti.textContent = `${this.user.id} 님이 로그인하셨습니다.`; 
				this.loginInfoBox.classList.add('disable')
			} else if (res.status === 302) {
				window.alert('로그인 실패');
			} else {
				return;
			}
		}).catch(err => console.error(err));
			
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

	// handleMemoSubmit() {
	// 	this.domTabList = document.querySelectorAll('.list-item');
	// 	this.domTabList.forEach((el, index) => {
	// 		if (this.currentTab.id !== index) {
	// 			// el.addEventListener('click', this.handleSubmitMemo)
	// 			// this.domTabList[index].onclick = this.handleSubmitMemo();
	// 			this.domTabList[index].addEventListener('click', this.handleSubmitMemo)
	// 		}
	// 	})
	// }

	initializeData() {
		fetch('http://localhost:8080/memo')
			.then((res) => res.json())
			.then((result) => {
				// id를 클라이언트에서 임시적으로 넣어줍니다.
				result.data.map((data, index) => {
					data.id = index;
				})
				this.tabList = new TabList(result.data);
				this.tabList.onSelectTab(this.handleSelectTab);
				this.memo = new Memo();
				this.memo.onSubmit(this.handleSubmitMemo);
			}).catch(err => console.error(err));
		}
		
		
	handleSelectTab(id) {
		this.currentTab = this.tabList.tabList.find(tabItem => tabItem.id === id);
		this.memo.update(this.currentTab);
		this.currentTab.updateData(this.currentTab)
		if (this.currentTab) {
			this._submitBtn.value = '수정';
		}
	}

	handleSubmitMemo({ title, text }) {
		console.log(this)
		if (this.currentTab === null) {
			fetch('http://localhost:8080/memo')
				.then(() => {
					const newData = {
						title: this.memo._memoTitle.value,
						// title: this.memo._memoTitle.value.split('.txt')[0].split('./memo/')[1],
						text: this.memo._memoText.value,
					}
					console.log(newData)
					return newData;
				})
				.then(newData => this.currentTab.updateData(newData))
				.catch(err => console.error(err));
		} else {
			fetch('http://localhost:8080/memo', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ 
					title, text
				})
			})
			.then(result => {
				const newData = {
					id: this.tabList.tabList.length,
					title,
					text
				}
				this.tabList.append(newData);
			// }).then(res => {
			// 	if(res.status === 200) {
			// 		window.location.reload()
			// 	}
			}).then(
				window.location.reload()
			).catch(err => console.error(err));
		}
	}

	// render() {
	// 	this.tabList.render();
	// 	this.memo.render();
	// }
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
		console.log(tab)
		const newTab = new Tab(tab);
		if (this.handleSelectTab) newTab.onSelectTab(this.handleSelectTab);
		this.tabList.push(newTab);
	}

	onSubmit(handleSubmitMemo) {
		this.tabItem.addEventListener('click', () => {
			handleSubmitMemo({
				title: this._memoTitle.value,
				text: this._memoText.value
			});
		})
	}

	// render() {
	// 	this.tabList.forEach(tab => tab.render());
	// }
}

class Tab {
	constructor(tabData) {
		this.id = tabData.id;
		this.title = tabData.title;
		this.text = tabData.text;
		this.loadTabList();
	}

	updateData({ title, text }) {
		this.title = title;
		this.text = text;
	}

	loadTabList() {
		this.tabList = document.querySelector('.tab-list ul');
		this.tabItem = document.createElement('li');
		this.tabItem.classList.add('list-item');
		this.tabItem.addEventListener('click', this.onSelectTab);
		this.tabItem.addEventListener('click', this.onSubmit);
		this.tabItem.textContent = this.title.split('.txt')[0].split('./memo/')[1];
		this.tabList.append(this.tabItem);
	}

	onSelectTab(handleSelectTab) {
		this.tabItem && this.tabItem.addEventListener('click', () => {
			handleSelectTab(this.id);
			// 다른 탭을 누를 때 해당 탭 내용을 저장.
			// -> 현재 탭과 id가 다른 탭을 누르면 저장함
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

