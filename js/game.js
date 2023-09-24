// * https://imgs.search.brave.com/8aQHpKcVbNEb58GqCtM45lpCKhYXmUIsNFV0eLAysCg/rs:fit:1200:1027:1/g:ce/aHR0cDovL3d3dy5h/cnF1aXRlY3RvaXQu/Y29tL2ltYWdlcy9m/cm9udC9odG1sNS9I/VE1MNV9DYW52YXNf/Q2hlYXRfU2hlZXQu/cG5n
// * Canvas Cheat Sheet

const canvas = document.querySelector('#Canvas');
const game = canvas.getContext('2d');
const buttons = document.querySelectorAll('button')
const spanLives = document.querySelector('#Lives')
const spanTime = document.querySelector('#Time')
const spanRecord = document.querySelector('#Record')

let moves = 0;
let elementSize
let canvasSize

let level = 0
let lives = 3
let collisionEstatus = false

let timeStart
let timeInterval
let playerInterval

const playerPosition = {
    x: undefined,
    y: undefined
}
const doorPosition = {
    x: undefined,
    y: undefined
}
const giftPosition = {
    x: undefined,
    y: undefined
}
const bombsPositions = []
const collisionPositions = []

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
    // console.log(canvasSize);
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = Math.ceil(canvasSize/10 - 1.5);
    startGame()
}
function startGame() {
    game.font = `${elementSize}px Verdana`;
    game.textAlign = '';

    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 20)
    }
    if (localStorage.getItem('record')) { // validamos si existe un record anterior
        spanRecord.innerHTML = localStorage.getItem('record')
    }
    const map = maps[level] // select de map

    if (!map) {
        gameWin()
        return
    }
    spanLives.innerHTML = emojis['HEART'].repeat(lives) // show lives in HTML

    const printedMap = map
    .match(/[IXO\-]+/g) // match each line
    .map(line=>line.split("")) // make a array for each line, every letter is a array element
    
    game.clearRect(0,0,canvasSize, canvasSize); // clean the map

    printedMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const emoji = emojis[column];
            const xPosition = elementSize * (columnIndex);
            const yPosition = elementSize * (rowIndex + 1);
            game.fillText(emoji, xPosition, yPosition)

            if (column === 'O' && moves === 0) {
                doorPosition.x = xPosition
                doorPosition.y = yPosition
                
                playerPosition.x = xPosition
                playerPosition.y = yPosition
                game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
            }
            if (column === 'X' && moves === 0) {
                bombsPositions.push({
                    x: xPosition,
                    y: yPosition
                })
            }
            if (column === 'I') {
                giftPosition.x = xPosition
                giftPosition.y = yPosition
            }
        });
    });
    if (collisionEstatus) {
        game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    }
}

function mapLimit() {
    const canvasLimit = elementSize * 10

    if (playerPosition.x >= canvasLimit) {
        playerPosition.x -= elementSize
    }
    if (playerPosition.x < 0) {
        playerPosition.x += elementSize
    }
    if (playerPosition.y > canvasLimit) {
        playerPosition.y -= elementSize
    }
    if (playerPosition.y <= 0) {
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
    printMap()
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

    bombsPositions.forEach(bomb => {
        if (bomb.x === playerPosition.x) {
            if (bomb.y === playerPosition.y) {
                collision()
            }
        }
    });
    collisionPositions.forEach(collision => {
        game.fillText(emojis['BOMB_COLLISION'], collision.x, collision.y)
    })
    if (giftPosition.x === playerPosition.x) {
        if (giftPosition.y === playerPosition.y) {
            nextLevel()
        }
    }
}
function collision() {
    collisionEstatus = true
    collisionPositions.push({
        x: playerPosition.x,
        y: playerPosition.y
    })
    lives--
    if (lives <= 0) {
        lostGame()
    }
    playerPosition.x = doorPosition.x
    playerPosition.y = doorPosition.y
    startGame()
}
function nextLevel() {
    level++
    console.log(timeInterval);
    reset()
}
function lostGame() {
    level = 0
    lives = 3
    timeStart = undefined
    clearInterval(timeInterval);
    reset()
}
function gameWin() {
    clearInterval(timeInterval)
    window.removeEventListener('keydown', moveByKeys);
    buttons.forEach(button => {
        button.removeEventListener('click', moveByButtons)
    });
    if (!localStorage.getItem('record')) {
        spanRecord.innerHTML = spanTime.outerText
        localStorage.setItem('record', spanTime.outerText)
        localStorage.setItem('recordTime', playerInterval)
        showFinalMessage('newRecord', spanRecord.outerText )
        return
    }
    if (playerInterval < localStorage.getItem('recordTime')) {
        localStorage.clear()
        spanRecord.innerHTML = spanTime.outerText
        localStorage.setItem('record', spanTime.outerText)
        localStorage.setItem('recordTime', playerInterval)
        showFinalMessage('newRecord', spanRecord.outerText)
        return
    }
    showFinalMessage('no', spanRecord.outerText, spanTime.outerText)
}
function reset() {
    moves = 0
    collisionPositions.length = 0
    bombsPositions.length = 0
    startGame()
}
function showTime() {
    const currentTime = Date.now() - timeStart;
    playerInterval = Date.now() - timeStart;
    // Calcular los minutos, segundos y milisegundos
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;

    // Formatear los valores en una cadena en el formato deseado
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

    const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;

    spanTime.innerHTML = formattedTime;
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