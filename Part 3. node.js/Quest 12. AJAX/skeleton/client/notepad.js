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
		
		this.notePad.newMemoBtn.addEventListener('click', this.newMemo);
		this.notePad.getListBtn.addEventListener('click', this.newList);

		this.notePad.newMemoBtn.addEventListener('click', this.changeButtonText);		
		this.notePad.submitBtn.addEventListener('click', this.saveMemo.bind(this));
	}
	
	newMemo() {
		this.memo = new Memo();
	}

	newList() {
		this.list = new List();
	}

	changeButtonText() {
		if (this.textContent === '메모 작성 취소') {
			this.textContent = '새 메모 작성'
		} else {
			this.textContent = '메모 작성 취소'
		}
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
					console.log(res.body)
				}
				throw new Error('Request failed');
			})
			.catch(err => {
				console.log(err)
			})
			
	}

	// deleteMemo(item, url) {
	// 	fetch(url + '/' + item, {
	// 		method: 'DELETE',
	// 		headers: {'Content-Type': 'text/plain; charset=utf-8'}
	// 	})
	// 	.then(res => {
	// 		res.json();
	// 		res.redirect('/');
	// 	})
	// }
};

class Memo {
	constructor() {
		this.memoBoard = document.querySelector('.memo-board');
		this.memoBoard.classList.toggle('visible');	
	}
}

class List {
	constructor() {
		this.listBoard = document.querySelector('.memo-list');
		// this.memoList = document.querySelectorAll('.memo-list ul')
		this.listBoard.classList.toggle('visible');	
		this.listBoard.addEventListener('click', this.loadList.bind(this))
	}

	loadList() {
		console.log(this)
		fetch('/memo', {
			method: 'GET',
			headers: {'Content-Type': 'text/plain; charset=utf-8'}
		})
		.then(res => {
			if (res.ok) {
				console.log(res)
				const navList = document.createElement('li');
				navList.textContent = res.body;
				return;
			}
			throw new Error('Request failed');
		})
		.catch(err => {
			console.log(err)
		})
	}

}