class Notepad {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	constructor() {
		this.notePad = document.querySelector('main');
		this.setNotePad();
	}
	
	setNotePad() {
		this.notePad.newMemoBtn = document.querySelector('.new-memo');
		this.notePad.getListBtn = document.querySelector('.list-memo');
		this.notePad.memo = document.querySelector('.memo-board');
		this.notePad.submitBtn = document.querySelector('.submit-btn')
		
		this.notePad.memoTitle = document.querySelector('.title').value;
		this.notePad.memoData = document.querySelector('.memo').value;

		this.notePad.newMemo = this.newMemo;
		this.notePad.removeMemo = this.removeMemo;
		
		this.notePad.newMemoBtn.addEventListener('click', this.newMemo);
		this.notePad.newMemoBtn.addEventListener('click', this.changeButtonText);
		
		this.notePad.submitBtn.addEventListener('click', this.saveMemo.bind(this));
		this.notePad.getListBtn.addEventListener('click', this.loadList.bind(this));
	}
	
	newMemo() {
		this.memo = new Memo();
	}

	changeButtonText() {
		if (this.textContent === '메모 작성 취소') {
			this.textContent = '새 메모 작성'
		} else {
			this.textContent = '메모 작성 취소'
		}
	}

	loadList() {
		fetch('/memo', {
			method: 'GET',
			headers: {'Content-Type': 'text/plain; charset=utf-8'}
		})
	}

	saveMemo() {
		const fileName = this.notePad.querySelector('.title').value;
		const fileText = this.notePad.querySelector('.memo').value;
		const fileData = {
			"title": fileName, 
			"body": fileText
		}
		fetch('/memo', {
				method: 'POST',
				body: JSON.stringify(fileData),
				headers: {'Content-Type': 'application/json'}
			})
			.then(res => {
				if (res.ok) {
					console.log('res: ', res);
					return;
				}
				throw new Error('Request failed');
			})
			.catch(err => {
				console.log(err)
			})
			this.loadMemo(fileName);
	}

	loadMemo() {
		fetch('/memo', {
			method: 'GET',
			headers: {'Content-Type': 'text/plain; charset=utf-8'}
		})
		.then(res => {
			console.log(res)
		})
	}

	editMemo() {

	}
};

class Memo {
	constructor() {
		this.memo = document.querySelector('.memo-board');
		this.memo.classList.toggle('visible');
	}

	setSelectedMemo(id) {
		this.memo.id = id;
		console.log(this.memo)
	}
}

class List {
	constructor() {
		this.list = document.querySelector('nav');
		this.list.classList.toggle('visible');
	}

	selectListItem() {

	}
}