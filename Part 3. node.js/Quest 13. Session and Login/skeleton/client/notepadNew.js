class Notepad {
    constructor(dom) {
        this.dom = dom;
        this.tabList = new TabList()
        this._initDom();
        this._bindEvents();
    }

    _initDom() {
        this.dom.appendChild(this.tabList.dom)
    }

    _bindEvents() {
        this.dom.addEventListener('loadMemo', (e) => {
            const memoDom = this.dom.querySelector('.memo');
            if (memoDom) {
                memoDom.parentNode.removeChild(memoDom);
            }
            this.dom.appendChild(e.detail.memo.dom)
        })
    }
}

class TabList {
    constructor() {
        this.tabs = [];
        this._tabIndex = 0;
        this._initDom();
        this._initData();
        this._bindEvents();
    }

    _initData() {
		fetch('http://localhost:8080/memo', {
			method: 'GET',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then((res) => res.json())
		.then((result) => {
			result.data.map((dataItem, index) => {
                const data = new Tab(index, dataItem)
                this.tabs.push(data);
                this.tabs.map((tab, index) => {
                    document.querySelector('.title').textContent = tab.title;
                    this.dom.querySelector('.tabs').appendChild(tab.dom);
                })
            })
		}).catch(err => console.error(err));
	}

    _initDom() {
        this.dom = document.querySelector('.template .tab-list').cloneNode(true); // cloneNode 안하고 그냥 하는 것과의 차이?
    }

    _bindEvents() {
        this.addTab();
        this.removeTab();
    }
    
    addTab() {
        const newMemoBtn = this.dom.querySelector('.newmemo-btn');
        newMemoBtn.addEventListener('click', () => {
            const newTab = new Tab(this._tabIndex++);
            this.tabs.push(newTab); // this.tabs.concat(newTab);
            this.dom.querySelector('.tabs').appendChild(newTab.dom);

            newTab.dom.addEventListener('unselectAll', () => { // 기존 탭에도 넣어야 함
                this.tabs.forEach(tab => {
                    tab.dom.classList.remove('selected'); // 모두 적용
                })
            })
        })
    }

    removeTab() {
        this.dom.addEventListener('closeTab', (e) => {
            const targetTab = e.detail.tab;
            let targetIdx;

            this.tabs.forEach((tab, idx) => {
                if (tab.index === targetTab.index) {
                    targetIdx = idx;
                }
            })
            this.tabs.splice(targetIdx, 1); // 배열에서 지우기
            targetTab.dom.parentNode.removeChild(targetTab.dom);
        })
    }
}

class Tab {
    constructor(index, data) {
        this.index = index;
        this.title = data ? data.title : 'title'
        this._initDom();
        this._bindEvents();
        this.memo = data ? new Memo(data.content) : new Memo();
    }

    _initDom() {
        this.dom = document.querySelector('.template .tab').cloneNode(true);
        this.dom.querySelector('.title').textContent = this.title;
    }

    _bindEvents() {
        this._removeData();
        this._loadNotePad();
    }

    // 1. x 버튼 누르면 tab 삭제
    _removeData() {
        const removeTab = this.dom.querySelector('.removetab-btn');
        removeTab.addEventListener('click', () => {
            fetch(`http://localhost:8080/memo/${this.title}`, {
		    	method: 'DELETE',
		    	headers: { 
		    		'Content-Type': 'application/json',
		    		'Accept': 'application/json'
                },
                body: JSON.stringify({data: {
                        title: this.title, 
                    }
                })
            })
            // tabs 배열에서도 없애야 함 -> event bubbling
            // node 삭제와 dom 삭제 모두 이벤트 버블링으로 tabList로 보내서 처리
            this.dom.dispatchEvent(new CustomEvent('closeTab', {
                bubbles: true,
                detail: { tab: this }
            }))
        })
    }

    // 2. title, memo 로드
    _loadNotePad() {
        this.dom.addEventListener('click', () => {
            this.dom.dispatchEvent(new CustomEvent('unselectAll'));
            this.dom.classList.add('selected');

            this.loadMemo();
            this.loadTitle();
            this._saveContent(this.index);
        })
    }

    loadMemo() {
        this.dom.dispatchEvent(new CustomEvent('loadMemo', {
            bubbles: true,
            detail: { memo: this.memo || this.memo.content }
        }))
    }

    loadTitle() {
        const titleArea = document.querySelector('.memo .title');
        titleArea.value = this.title;
        this.memo.dom.addEventListener('changeTitle', (e) => {
            this.title = e.detail.title || this.title;
			this.dom.querySelector('.title').innerHTML = this.title;
        })
    }

    _saveContent(index) {
        const titleArea = document.querySelector('.memo .title');
        document.querySelector('.submit-btn').addEventListener('click', () => {
            console.log(this.index)
            this.saveMemo({
                index,
                title: titleArea.value,
                content: this.memo.content
            })
        })
    }

    saveMemo({index, title, content}) {
        fetch('http://localhost:8080/memo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({data: {
                title,
                content
            }})
		})
		.then(result => {
			const newData = {
				index,
				title,
				content
            }
		}).then(
			// memo가 업데이트 되어야 함
		).catch(err => console.error(err));
    }
}

class Memo {
    constructor(content) {
        this.content = content || '';
        this._initDom();
        this._bindEvents();
    }

    _initDom() {
        this.dom = document.querySelector('.main .memo').cloneNode(true);
    }

    _bindEvents() {
        this.setTitle();
        this.setContent();
    }

    setTitle() {
        const titleArea = this.dom.querySelector('.title');
        titleArea.addEventListener('blur', () => {
            this.dom.dispatchEvent(new CustomEvent('changeTitle', {
                bubbles: true,
                detail: { title: titleArea.value }
            }))
        })
    }

    setContent() {
        const contentArea = this.dom.querySelector('.content');
        // 원래 데이터가 있는 경우 초기값은 불러와야 함
        if (this.content) {
            contentArea.value = this.content;
        }
        contentArea.addEventListener('blur', () => {
            this.content = contentArea.value;
        })
    }
}

class Login {
    
}