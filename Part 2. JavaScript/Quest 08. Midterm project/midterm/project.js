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

class Window {
    constructor() {
        const changeBgBtn = document.querySelector('.newColor');
        changeBgBtn.onclick = this.changeBackground;
    }
    
    initialize() {
        const picture = new Picture();
        const text = new Text();
        const time = new Time();
        time.initializeTime();
    }
    
    changeBackground() {
        const background = document.querySelector('body');
        const bgColorList = [
            '#c9d2fc',
            '#FC7E7E',
            '#F2CC7B',
            '#A2D8C0',
            '#6490f0'
        ];

        const randomBackground = bgColorList[Math.floor(Math.random() * bgColorList.length)];
        background.setAttribute('style', `background-color: ${randomBackground}`);
    }
}

class Picture {
    constructor() {
        const picture = document.querySelector('.picture-frame');
        picture.onclick = this.changePicture;
    }
    
    changePicture() {
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

        const pickedPicture = pictureListCat[Math.floor(Math.random() * 10)];
        this.setAttribute('style', `background-image: url('./assets/${pickedPicture}')`)
    }
    
    changeDummy() {
        const dummies = [
        ]
    }

    initializePicture() {
    }
}

class Text {
    constructor() {
        const greetingBtn = document.querySelector('.newGreetings');
        greetingBtn.onclick = this.changeText;
    }

    changeText() {
        const mainText = document.querySelector('h1');
        const textList = [
            'Welcome!',
            '패스트파이브가 싫어요',
            'ㅠㅠ',
            '오늘은 신나는 금요일!',
            'Knowre'
        ];

        const randomText = textList[Math.floor(Math.random() * textList.length)];
        mainText.classList.add('blink');
        mainText.textContent = randomText;
    }
}

class Time {
    constructor() {
        const timeBox = document.querySelector('.time-box');
        this.year = document.getElementById('year');
        this.month = document.getElementById('month');
        this.date = document.getElementById('date');
        this.hour = document.getElementById('hour');
        this.minute = document.getElementById('minute');
        this.second = document.getElementById('second');
    }

    initializeTime() {
        var time = new Date();
        this.year.textContent = time.getFullYear() + '.';
        this.month.textContent = time.getMonth() + 1  + '.';
        this.date.textContent = time.getDate()  + '.';
        this.hour.textContent = time.getHours() + '.';
        this.minute.textContent = time.getMinutes() + '.';
        // this.second.textContent = time.getSeconds();
    }
}