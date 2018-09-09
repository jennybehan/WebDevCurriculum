class Notepad {
    constructor(dom) {
        this.dom = dom;
        this.tabList = new TabList()
        this._initDom();
        this._bindEvents();
        this._initLogin();
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

        this.dom.addEventListener('unselectAll', (e) => {
            const tabsDom = this.dom.querySelectorAll('.tabs .tab')
            tabsDom.forEach(tab => {
                tab.classList.remove('selected');
            });
        })
    }

    _initLogin() {
        document.querySelector('.login-btn').addEventListener('click', () => {
            new Login();
        })
    }
}

class TabList {
    constructor() {
        this.tabs = [];
        this._initDom();
        this._initData();
        this._bindEvents();
    }

    _initData() {
		fetch('/memo', {
			method: 'GET',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then((res) => res.json())
		.then((result) => {
			result.data.map(dataItem => {
                const data = new Tab(dataItem)
                this.tabs.push(data);
                this.tabs.map(tab => {
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
            const newTab = new Tab();
            this.tabs.push(newTab);
            this.dom.querySelector('.tabs').appendChild(newTab.dom);

            newTab.dom.addEventListener('unselectAll', () => { // 기존 탭에도 넣어야 함
                this.tabs.forEach(tab => {
                    tab.dom.classList.remove('selected');
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
    constructor(data) {
        this._id = data ? data._id : Math.random().toString(36).substr(2, 9);
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
        this._loadNotePad(this._id);
    }

    // 1. x 버튼 누르면 tab 삭제
    _removeData() {
        const removeTab = this.dom.querySelector('.removetab-btn');
        removeTab.addEventListener('click', () => {
            fetch(`/memo/${this._id}`, {
		    	method: 'DELETE',
		    	headers: { 
		    		'Content-Type': 'application/json',
		    		'Accept': 'application/json'
                },
                body: JSON.stringify({
                        _id: this._id, 
                })
            })
            this.dom.dispatchEvent(new CustomEvent('closeTab', {
                bubbles: true,
                detail: { tab: this }
            }))
        })
    }

    // 2. title, memo 로드
    _loadNotePad(_id) {
        this.dom.addEventListener('click', () => {
            this.dom.dispatchEvent(new CustomEvent('unselectAll', {
                bubbles: true
            }));
            this.dom.classList.add('selected');

            this.loadMemo();
            this.loadTitle();
            this._saveContent(_id);
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

    _saveContent(_id) {
        const titleArea = document.querySelector('.memo .title');
        document.querySelector('.submit-btn').addEventListener('click', () => {
            this.saveMemo({
                _id,
                title: titleArea.value,
                content: this.memo.content
            })
        })
    }

    saveMemo({_id, title, content}) {
        fetch('/memo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
                title,
                content,
                _id
            })
		})
		.then(result => {
			const newData = {
                title,
				content,
				_id,
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
    constructor() {
        this._initUser();
        this._bindEvents();
    }
    
    _bindEvents() {
        this._initLogin();
    }

    _initUser() {
        fetch('/user', {
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
            let cookie = this.getCookie();
            console.log(cookie)
            // this.textBoard = document.querySelector('.text');
            // this.textBoard.focus();
            // this.textBoard.setSelectionRange(startPoint, endPoint);
        }).catch(err => console.log(err))
    }

    _initLogin() {
        this.id = document.querySelector('.userId').value;
		this.pw = document.querySelector('.userPw').value;

		this.user = {
			"id": this.id,
			"pw": this.pw
		}

		fetch('/login', {
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
				window.alert('로그인 성공')
				return res.json();
			}
		})
		.then(window.location.reload())
		.catch(err => console.error(err));
    }

    _logout() {
		this.loggedIn = false;
		this.noti = document.querySelector('.login-noti');
		this.loginInfoBox = document.querySelector('.login-info');
		fetch('/logout', {
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
}