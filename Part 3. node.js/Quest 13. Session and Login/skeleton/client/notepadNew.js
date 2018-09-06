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
            console.log(e.detail.memo)
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
            console.log(result.data)
			result.data.map((dataItem, index) => {
                const data = new Tab(index, dataItem)
                this.tabs.push(data);
                this.tabs.map(tab => {
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
    
    // 1. + 버튼 누르면 tab 추가
    addTab() {
        const newMemoBtn = this.dom.querySelector('.newmemo-btn');
        newMemoBtn.addEventListener('click', () => {
            console.log(this)
            const newTab = new Tab(this._tabIndex++);
            // * 새로운 탭 Node 추가와 dom 추가
            this.tabs.push(newTab); // this.tabs.concat(newTab);
            console.log(this.tabs, newTab)
            this.dom.querySelector('.tabs').appendChild(newTab.dom);

            newTab.dom.addEventListener('unselectAll', () => {
                this.tabs.forEach(tab => {
                    tab.dom.classList.remove('selected'); // 모두 적용
                })
            })
        })
    }
    // 2. tab 누르면 메모 로드
    loadMemo() {
        this.dom.dispatchEvent(new CustomEvent('loadMemo', {
            bubbles: true,
            detail: { memo: this.memo }
        }))

        this.memo.dom.addEventListener('changeTitle', (e) => {
            console.log(e)
        })
    }

    // 3. tab 제거 이벤트 버블링 받아오기 : eventTarget이 this.dom임!
    removeTab() {
        this.dom.addEventListener('closeTab', (e) => {
            const targetTab = e.detail.tab;
            let targetIdx;

            this.tabs.forEach((tab) => {
                if (tab.index === targetTab.index) {
                    targetIdx = tab.index;
                }
            })
            this.tabs.splice(targetIdx, 1); // 배열에서 지우기
            targetTab.dom.parentNode.removeChild(targetTab.dom); // ***
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
        this._removeTab();
        this._loadNotePad();
    }

    // 1. x 버튼 누르면 tab 삭제
    _removeTab() {
        const removeTab = this.dom.querySelector('.removetab-btn');
        removeTab.addEventListener('click', () => {
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
            this.dom.dispatchEvent(new CustomEvent('unselectAll')); // 전체에 선택되었다는 것 뺌
            this.dom.classList.add('selected');

            this.loadMemo();
            this.loadTitle();
        })
    }

    loadMemo() {
        this.dom.dispatchEvent(new CustomEvent('loadMemo', {
            bubbles: true,
            detail: { memo: this.memo }
        }))
    }

    loadTitle() {
        this.memo.dom.addEventListener('changeTitle', (e) => {
            this.title = e.detail.title;
            this.dom.querySelector('.title').textContent = this.title;
        })
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
        this._saveContent();
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
        contentArea.addEventListener('blur', () => {
            this.content = contentArea.value;
        })
    }

    _saveContent() {
        const titleArea = this.dom.querySelector('.title');
        this.dom.querySelector('.submit-btn').addEventListener('click', () => {
            this.saveMemo({
                title: titleArea.value,
                content: this.content
            })
        })
    }

    saveMemo({title, content}) {
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
				// id: this.tabList.tabList.length,
				title,
				content
            }
			// this.tabList.append(newData)
		}).then(
			// this.memo.update({ title, text })
		).catch(err => console.error(err));
    }
}

class Login {
    
}