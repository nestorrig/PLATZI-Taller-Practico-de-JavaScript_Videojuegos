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
    const tecla = event.key
    console.log(event);
    switch (tecla) {
        case "ArrowUp":
        case "w":
            // moverPersonaje(tecla)
            alert('se preciona la tecla ' + tecla)
            break;
        case "ArrowLeft":
        case "a":
            // moverPersonaje(tecla)
            alert('se preciona la tecla ' + tecla)
            break;
        case "ArrowRight":
        case "d":
            // moverPersonaje(tecla)
            alert('se preciona la tecla ' + tecla)
            break;
        case "ArrowDown":
        case "s":
            // moverPersonaje(tecla)
            alert('se preciona la tecla ' + tecla)
            break;
        default:
            break;
    }
}
// function moveByKeys(event) {
//     const moveFunctions = {
//         ArrowUp: moveUp,
//         ArrowLeft: moveLeft,
//         ArrowRight: moveRight,
//         ArrowDown: moveDown
//     };
    
//     const moveFunction = moveFunctions[event.key];
//     if (moveFunction) {
//         moveFunction();
//     }
// }
function moveByButtons(event) {
    console.log(event.target.id);
    const direction = event.target.id
    switch (direction) {
        case "up":
            // moverPersonaje(direction)
            alert('se preciono el boton ' + direction)
            break;
        case "left":
            // moverPersonaje(direction)
            alert('se preciono el boton ' + direction)
            break;
        case "right":
            // moverPersonaje(direction)
            alert('se preciono el boton ' + direction)
            break;
        case "down":
            // moverPersonaje(direction)
            alert('se preciono el boton ' + direction)
            break;
        default:
            break;
    }
}