// 더 해볼 내용
// * api 연동, CDN 등으로 가져와보기
// * 사진이 바뀔 때 배경도 함께 바뀌기

// let loadPictures = function() {
//     let request = new XMLHttpRequest();
//     var catUrl = 'http://thecatapi.com/api/images';
//     request.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             let response = JSON.parse(this.responseText);
//             renderPictures(response);
//         }
//     }
//     request.open('GET', catUrl, true);
//     request.setRequestHeader('Accept', 'application/json');
//     request.send();
// }
// loadPictures();

const pictureListCat = [
    'cat_01.jpg',
    'cat_02.jpg',
    'cat_03.jpg',
    'cat_04.jpg',
    'cat_05.jpg',
    'cat_06.jpg',
    'cat_07.jpeg',
    'cat_08.jpg',
    'cat_09.jpg',
    'cat_10.jpg',
];

const pictureListDog = [
    'dog_01.jpeg',
    'dog_02.jpg',
    'dog_03.jpg',
    'dog_04.jpg',
    'dog_05.jpg',
    'dog_06.jpg',
    'dog_07.jpg',
    'dog_08.jpg',
    'dog_09.jpg',
    'dog_10.jpg',
]

const pictureDummy = [
    pictureListCat,
    pictureListDog
]

const textList = [
    'Welcome!',
    '패스트파이브가 싫어요',
    '귀여운 댕댕이',
    '오늘은 신나는 금요일!',
    'Knowre'
];

function changeColor() {
    const colorList = [
        '#c9d2fc',
        '#FC7E7E',
        '#F2CC7B',
        '#A2D8C0',
        '#6490f0'
    ];
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    return randomColor;
}

function makeRandom(param) {
    return Math.floor(Math.random() * param.length)
}

class Window {
    constructor() {
        this.changeBgBtn = document.querySelector('.newColor');
        this.changeBgBtn.addEventListener('click', this.changeBackground);
    }
    
    initialize() {
        const dummy = new Dummy();
        const text = new Text();
        const time = new Time();

        dummy.initializeDummy();
        text.initializeText();
        time.initializeTime();
    }
    
    changeBackground() {
        const background = document.querySelector('body');
        background.setAttribute('style', `background-color: ${changeColor()}`);
    }
}

class Dummy {
    constructor() {
        this.newPictureBtn = document.querySelector('.newPictures');
        this.newPictureBtn.addEventListener('click', this.changeDummy.bind(this));
        this.picture = document.querySelector('.picture-frame');
    }
    
    initializeDummy() {
        const pickedDummy = pictureDummy[makeRandom(pictureDummy)];
        const picture = new Picture(pickedDummy);
        picture.initializePicture();
    }

    changeDummy() {
        this.initializeDummy();
        const tooltip = new Tooltip();
        tooltip.initializeTooltip();
    }
}

class Tooltip {
    constructor() {
        this.tooltip = document.querySelector('.tooltip');
        this.controlTooltip = setTimeout(this.removeTooltip.bind(this), 3000);
    }
    
    initializeTooltip() {
        this.tooltip.classList.add('visible');
    }

    removeTooltip() {
        this.tooltip.classList.remove('visible');
    }

}

class Picture {
    constructor(pickedDummy) {
        this.picture = document.querySelector('.picture-frame');
        this.picture.addEventListener('click', this.changePicture.bind(this));
        this.pickedDummy = pickedDummy;
    }

    initializePicture() {
        const pickedPicture = this.pickedDummy[makeRandom(this.pickedDummy)];
        this.picture.setAttribute('style', `background-image: url('./assets/${pickedPicture}')`)
    }
    
    changePicture() {
        this.initializePicture();
    }
}

class Text {
    constructor() {
        this.greetingBtn = document.querySelector('.newGreetings');
        this.greetingBtn.addEventListener('click', this.changeText.bind(this));
        this.mainText = document.querySelector('h1');
    }

    initializeText() {
        const initialText = textList[makeRandom(textList)];
        this.mainText.textContent = initialText;
    }

    changeText() {
        const randomText = textList[makeRandom(textList)];
        this.mainText.textContent = randomText;
        this.mainText.setAttribute('style', `color: ${changeColor()}`);
    }
}

class Time {
    constructor() {
        this.timeBox = document.querySelector('.time-box');
        this.today = this.timeBox.querySelector('.date');
        this.timeNow = this.timeBox.querySelector('.time');
        this.setTime = setInterval(this.initializeTime.bind(this), 1000);
    }
    
    initializeTime() {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let seconds = now.getSeconds();
        let session = "오전";
        
        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour = hour - 12;
            session = "오후";
        } else if (hour < 10) {
            hour = "0" + hour;
        }
        
        minute = (minute < 10) ? "0" + minute : minute;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        let timeNow = session + " " + hour + ":" + minute + ":" + seconds
        let today = year + '년 ' + month + '월 ' + date + '일';
        
        this.today.textContent = today;
        this.timeNow.textContent = timeNow;
        this.setTime;
    }
}