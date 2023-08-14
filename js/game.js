// * https://imgs.search.brave.com/8aQHpKcVbNEb58GqCtM45lpCKhYXmUIsNFV0eLAysCg/rs:fit:1200:1027:1/g:ce/aHR0cDovL3d3dy5h/cnF1aXRlY3RvaXQu/Y29tL2ltYWdlcy9m/cm9udC9odG1sNS9I/VE1MNV9DYW52YXNf/Q2hlYXRfU2hlZXQu/cG5n
// * Canvas Cheat Sheet

const canvas = document.querySelector('#Canvas');
const game = canvas.getContext('2d');

let elementSize
let canvasSize

window.addEventListener('load', printMap);
window.addEventListener('resize', printMap);

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

    game.font = elementSize + 'px Veradna';
    game.textAlign = 'start';

    for (let i = 0; i < 10; i++) {
        for (let j = 1; j <= 10; j++) {
            game.fillText(emojis['X'], elementSize * i, elementSize * j)
        }
    }
}