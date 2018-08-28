class Notepad {
	constructor() {
		this.currentTab = null;
		this.handleSelectTab = this.handleSelectTab.bind(this);
		this.handleSubmitMemo = this.handleSubmitMemo.bind(this);
		this._submitBtn = document.querySelector('.submit-btn');
		this.initializeData();
	}

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
			})
	}

	deselectTab() {
		this.currentTab = null;
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
		if (this.currentTab) {
			fetch('http://localhost:8080/memo')
				.then(() => {
					const newData = {
						title: this.memo._memoTitle.value,
						text: this.memo._memoText.value,
					}
					return newData;
				})
				.then((newData) => this.currentTab.updateData(newData))
		} else {
			fetch('http://localhost:8080/memo', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ title, text })
			})
			
			.then((result) => {
				const newData = {
					id: this.tabList.tabList.length,
					title,
					text
				}
				this.tabList.append(newData);
			})
			.then(() => window.location.reload())
		}
	}

	render() {
		this.tabList.render();
		this.memo.render();
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

	makeNewMemo() {
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
		this.tabList.push(newTab);
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
		this.tabItem.textContent = this.title.split('./memo/')[1];
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

