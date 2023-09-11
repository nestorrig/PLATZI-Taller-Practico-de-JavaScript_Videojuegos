// * https://imgs.search.brave.com/8aQHpKcVbNEb58GqCtM45lpCKhYXmUIsNFV0eLAysCg/rs:fit:1200:1027:1/g:ce/aHR0cDovL3d3dy5h/cnF1aXRlY3RvaXQu/Y29tL2ltYWdlcy9m/cm9udC9odG1sNS9I/VE1MNV9DYW52YXNf/Q2hlYXRfU2hlZXQu/cG5n
// * Canvas Cheat Sheet

const canvas = document.querySelector('#Canvas');
const game = canvas.getContext('2d');
const buttons = document.querySelectorAll('button')

let moves = 0;
let elementSize
let canvasSize

const playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', printMap);
window.addEventListener('resize', printMap);
window.addEventListener('keydown', moveByKeys);
buttons.forEach(button => {
    button.addEventListener('click', moveByButtons)
});

function printMap() {
    canvasSize = window.innerWidth > window.innerHeight 
    ? Math.ceil(window.innerHeight * 0.7)
    : Math.ceil(window.innerWidth * 0.8);
    console.log(canvasSize);
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = Math.ceil(canvasSize/10 - 2);
    startGame()
}
function startGame() {
    game.font = `${elementSize}px Verdana`;
    game.textAlign = 'start';
    game.textBaseline  = 'top';

    const map = maps[2] // select de map
    .match(/[IXO\-]+/g) // match each line
    .map(line=>line.split("")) // make a array for each line, every letter is a array element

    map.forEach((row, rowNumber) => {
        row.forEach((column, columnNumber) => {
            const emoji = emojis[column];
            const xPosition = elementSize * columnNumber;
            const yPosition = elementSize * rowNumber;
            game.fillText(emoji, xPosition, yPosition)

            if (column === 'O' && moves === 0) {
                playerPosition.x = xPosition
                playerPosition.y = yPosition
                // console.log(playerPosition);
                game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
            }
        });
    });
}

function mapLimit() {
    const canvasLimit = elementSize* 10
    console.log(
        canvasLimit, canvasSize
    );
    if (playerPosition.x >= canvasLimit) {
        playerPosition.x -= elementSize
    }
    if (playerPosition.x < 0) {
        playerPosition.x += elementSize
    }
    if (playerPosition.y >= canvasLimit) {
        playerPosition.y -= elementSize
    }
    if (playerPosition.y < 0) {
        playerPosition.y += elementSize
    }
}
function movePlayer(direction) {
    moves++
    // console.log(moves);
    switch (direction) {
        case 'moveUp':
            playerPosition.y -= elementSize
            break;
        case 'moveLeft':
            playerPosition.x -= elementSize
            break;
        case 'moveRight':
            playerPosition.x += elementSize
            break;
        case 'moveDown':
            playerPosition.y += elementSize
            break;
        default:
            break;
    }
    mapLimit()
    console.log(playerPosition);

    printMap()
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
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
        movePlayer(validKey);
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
        movePlayer(validButton);
    }
}