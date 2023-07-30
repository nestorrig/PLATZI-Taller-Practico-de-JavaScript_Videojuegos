// * https://imgs.search.brave.com/8aQHpKcVbNEb58GqCtM45lpCKhYXmUIsNFV0eLAysCg/rs:fit:1200:1027:1/g:ce/aHR0cDovL3d3dy5h/cnF1aXRlY3RvaXQu/Y29tL2ltYWdlcy9m/cm9udC9odG1sNS9I/VE1MNV9DYW52YXNf/Q2hlYXRfU2hlZXQu/cG5n
// * Canvas Cheat Sheet

const canvas = document.querySelector('#Canvas');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    game.fillStyle = 'purple';
    game.fillRect(0,0,100,100);
    game.clearRect(50,50,50,50);
    game.clearRect(0,0,50,50);
    
    
    game.font = '30px Verdana'
    game.fillStyle = "brown"
    game.textAlign = 'start';
    game.fillText('Platzi', 0, 30);
}