// * https://imgs.search.brave.com/8aQHpKcVbNEb58GqCtM45lpCKhYXmUIsNFV0eLAysCg/rs:fit:1200:1027:1/g:ce/aHR0cDovL3d3dy5h/cnF1aXRlY3RvaXQu/Y29tL2ltYWdlcy9m/cm9udC9odG1sNS9I/VE1MNV9DYW52YXNf/Q2hlYXRfU2hlZXQu/cG5n
// * Canvas Cheat Sheet

const canvas = document.querySelector('#Canvas');
const game = canvas.getContext('2d');
const buttons = document.querySelectorAll('button')

let elementSize
let canvasSize

window.addEventListener('load', printMap);
window.addEventListener('resize', printMap);
window.addEventListener('keydown', moveByKeys);
buttons.forEach(button => {
    button.addEventListener('click', moveByButtons)
});

function printMap() {
    canvasSize = window.innerWidth > window.innerHeight 
    ? window.innerHeight * 0.7
    : window.innerWidth * 0.8;
    console.log(canvasSize);
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10) - 1;
    startGame()
}
function startGame() {

    game.font = `${elementSize}px Verdana`;
    game.textAlign = 'start';

    const map = maps[2] // select de map
    .match(/[IXO\-]+/g) // match each line
    .map(line=>line.split("")) // make a array for each line, every letter is a array element

    map.forEach((row, rowNumber) => {
        row.forEach((column, columnNumber) => {
            const emoji = emojis[column];
            const xPosition = elementSize * (columnNumber + 0);
            const yPosition = elementSize * (rowNumber + 1);
            game.fillText(emoji, xPosition, yPosition)
        });
    });
}
function moveByKeys(event) {
    const direction = event.key;
    const keys = {
        ArrowUp: 'moveUp',
        ArrowLeft: 'moveLeft',
        ArrowRight: 'moveRight',
        ArrowDown: 'moveDown',
        w: 'moveUp',
        a: 'moveLeft',
        d: 'moveRight',
        s: 'moveDown'
    };
    const validKey = keys[direction];
    if (validKey) {
        // moveFunction();
        console.log(validKey);
    }
}
function moveByButtons(event) {
    const direction = event.target.id

    const buttonsId = {
        up: 'moveUp',
        left: 'moveLeft',
        right: 'moveRight',
        down: 'moveDown',
    };

    const validButton = buttonsId[direction];
    if (validButton) {
        // moveFunction();
        console.log(validButton);
    }
}