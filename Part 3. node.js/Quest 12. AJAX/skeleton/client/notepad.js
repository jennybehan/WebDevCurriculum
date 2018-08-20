class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	constructor() {
		this.notePad = document.querySelector('.wrapper');
		this.initializeNotePad();
	}
	
	initializeNotePad() {
		this.newList();
		this.newMemo();
	}
	
	newMemo() {
		this.memo = new Memo();
	}

	newList() {
		this.list = new List();
		this.list.loadList();
	}
};

class Memo {
	constructor() {
		this._newMemoBoard = document.querySelector('.memo-board-new');
		this._submitBtn = this._newMemoBoard.querySelector('.submit-btn');
		this._memoTitle = this._newMemoBoard.querySelector('.title');
		this._memoBody = this._newMemoBoard.querySelector('.memo');
		this._updateBtn = document.querySelector('.update-btn');
		this._previewTitle = document.querySelector('.memo-preview-title');
		this._previewBody = document.querySelector('.memo-preview');
		this._submitBtn.addEventListener('click', this.saveMemo.bind(this));
		this._updateBtn.addEventListener('click', this.updateMemo.bind(this));
	}

	saveMemo() {
		let dataObj = {};
		dataObj.title = this._memoTitle.value;
		dataObj.body = this._memoBody.value;
		const data = JSON.stringify(dataObj)

		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8080/memo', true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = () => {
			// console.log(xhr.status) // 201 이어야 하지 않나? 왜 200으로 나오지
			// -> 201을 서버에서 설정해줘야 함!
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log('created new memo')
			} else {
				console.log('error!')
			}
		}
		xhr.send(data)
		window.location.reload();
	}

	updateMemo() {
		const changingTitle = this._previewTitle.textContent;
		const changingBody = this._previewBody.textContent;

		this._memoTitle.value = changingTitle.split('.txt')[0];
		this._memoTitle.setAttribute("disabled", "") // [TODO ]title 변경도 반영하기
		this._memoBody.value = changingBody;
	}
}

class List {
	constructor() {
		this._listBoard = document.querySelector('.memo-list');
		this._list = document.querySelector('.memo-list ul');
		this._listBoard.classList.toggle('visible');
		this.initializeList();
	}
	
	initializeList() {
		this.loadListItem();
	}

	loadList() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8080/memo');
		
		xhr.onload = () => {
			const dataObj = JSON.parse(xhr.responseText);
			if (xhr.status === 200 || xhr.status === 201) {
				const fileList = dataObj.data;
				fileList.map(file => {
					const listItem = document.createElement('li');
					listItem.classList.add('list-item');
					listItem.textContent = file.filePath.split('./memo/')[1];
					this._list.appendChild(listItem)
					listItem.onclick = (e) => {
						return this.loadListItem(e.target.textContent);
					}
				})
			} else {
				console.error(xhr.responseText)
			}
		}
		xhr.send(null);
	}

	loadListItem(fileName) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8080/memo/' + fileName);
		xhr.onload = () => {
			if (xhr.status === 200 || xhr.status === 201) {
				const fileData = JSON.parse(xhr.responseText).data;
				const previewData = document.querySelector('.memo-preview');
				previewData.textContent = fileData;
				const previewTitle = document.querySelector('.memo-preview-title');
				previewTitle.textContent = fileName;
			} else {
				console.error(xhr.responseText)
			}
		}
		xhr.send(null);
	}
}