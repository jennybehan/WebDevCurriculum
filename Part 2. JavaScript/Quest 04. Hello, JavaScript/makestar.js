// input에 대한 typechecking 혹은 형변환 필요
var input = Number(window.prompt('star input'));
var star = '';

if (input) {
    for (var i = 1; i <= input; i++) { // row
        for (var j = 1; j <= input - i ; j++) { // white space
            star += ' ';
        }
        for (var k = 1; k <= 2 * i - 1 ; k++) { // star
            star += '*';
        }
        star += '\n';
    }
}

console.log(star);