const scoreBoard = document.getElementById('score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const button = document.getElementById('startGame');
const gameCountDisplay = document.getElementById('gameCount');
const bestScoreDisplay = document.getElementById('bestScore');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const hitSound = new Audio('sound/bank.mp3');
const victorySound = new Audio('sound/victory.mp3');

let lastHole;
let timeUp = false;
let score = 0;
let gameCount = 0;
let bestScore = parseInt(localStorage.getItem('whackBestScore')) || 0;
let isGameStarted = false;
let gameEnded = false;

if (bestScoreDisplay) {
    bestScoreDisplay.textContent = bestScore;
}

function getRandTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one but');
        return getRandHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = getRandTime(200, 1000);
    const hole = getRandHole(holes);
    hole.classList.add('up');
    
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp && !gameEnded) peep();
    }, time);
}

button.addEventListener('click', startGame);

function startGame() {

    gameEnded = false;
    isGameStarted = true;
    
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => el.remove());

    gameCount++;
    if (gameCountDisplay) {
        gameCountDisplay.textContent = gameCount;
    }
    console.log(`Игра №${gameCount} началась!`);
    console.log(`Текущий рекорд: ${bestScore}`);

    score = 0;
    scoreBoard.textContent = 0;
    timeUp = false;

    peep();

    setTimeout(() => {
        timeUp = true;

        if (gameEnded) {
            console.log('Игра уже завершена, сообщение не показываем');
            return;
        }
        
        console.log(`Игра №${gameCount} окончена! Счёт: ${score}`);

        if (score > bestScore) {
            bestScore = score;
            if (bestScoreDisplay) {
                bestScoreDisplay.textContent = bestScore;
            }
            localStorage.setItem('whackBestScore', bestScore);
            console.log('НОВЫЙ РЕКОРД!');
            showVictoryMessage();
        } else {
            if (isGameStarted) {
                showGameOverMessage();
            }
        }
        
        isGameStarted = false;
    }, 10000);
}

function bank(e) {
    if (!e.isTrusted) return;
    if (gameEnded) return;

    const hole = this.parentElement;
    if (!hole.classList.contains('up')) {
        console.log('Крот уже спрятался или был ударен!');
        return;
    }

    const mole = this;
    mole.classList.add('hit');

    hitSound.currentTime = 0;
    hitSound.play();

    score++;
    scoreBoard.textContent = score;

    setTimeout(() => {
        mole.classList.remove('hit');
        hole.classList.remove('up');
    }, 350);

    if (score > bestScore) {
        bestScore = score;
        if (bestScoreDisplay) {
            bestScoreDisplay.textContent = bestScore;
        }
        localStorage.setItem('whackBestScore', bestScore);
        console.log('НОВЫЙ РЕКОРД!', bestScore);
        
        if (!timeUp && !gameEnded) {
            gameEnded = true;
            timeUp = true;
            console.log('ПОБЕДА!');
            showVictoryMessage();
        }
    }
}

moles.forEach(mole => mole.addEventListener('click', bank));

function resetStats() {
    const confirmReset = confirm('❗ Ты уверена, что хочешь сбросить всю статистику?\nИгры: ' + gameCount + '\nРекорд: ' + bestScore);
    
    if (!confirmReset) return;

    gameCount = 0;
    bestScore = 0;
    gameEnded = true;
    
    if (gameCountDisplay) {
        gameCountDisplay.textContent = gameCount;
    }
    if (bestScoreDisplay) {
        bestScoreDisplay.textContent = bestScore;
    }
    
    localStorage.removeItem('whackBestScore');
    
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => el.remove());
    
    score = 0;
    scoreBoard.textContent = 0;
    timeUp = true;
    isGameStarted = false;
    
    console.log('Статистика сброшена!');
    console.log(`Игры: ${gameCount}, Рекорд: ${bestScore}`);
}

if (resetStatsBtn) {
    resetStatsBtn.addEventListener('click', resetStats);
}

function showVictoryMessage() {
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => el.remove());

    victorySound.currentTime = 0;
    victorySound.play();
    
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: relative;">
            <button id="closeVictoryBtn" style="
                position: absolute;
                top: -20px;
                right: -20px;
                background: #ff4444;
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: transform 0.2s;
                font-family: 'Amatic SC', cursive;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">✕</button>
        </div>
        <h1>НОВЫЙ РЕКОРД!</h1>
        <p>Ты набрал ${score} очков!</p>
        <p>Поздравляем с победой!</p>
        <button id="playAgainBtn">Играть снова</button>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd700, #ff6b6b);
        padding: 40px 60px;
        border-radius: 20px;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        font-size: 2rem;
        color: #fff;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: victoryPop 0.5s ease;
        max-width: 500px;
        width: 90%;
    `;

    const playBtn = message.querySelector('#playAgainBtn');
    playBtn.style.cssText = `
        background: #fff;
        color: #ff6b6b;
        border: none;
        padding: 10px 30px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        transition: transform 0.2s;
        margin-top: 10px;
    `;
    playBtn.addEventListener('click', () => {
        message.remove();
        startGame();
    });

    const closeBtn = message.querySelector('#closeVictoryBtn');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });
    closeBtn.addEventListener('click', () => {
        message.remove();
        gameEnded = true;
        timeUp = true;
        console.log('Окно победы закрыто, игра остановлена');
    });

    document.body.appendChild(message);
}

function showGameOverMessage() {
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => el.remove());
    
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: relative;">
            <button id="closeGameOverBtn" style="
                position: absolute;
                top: -20px;
                right: -20px;
                background: #ff4444;
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: transform 0.2s;
                font-family: 'Amatic SC', cursive;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">✕</button>
        </div>
        <h1>Время вышло!</h1>
        <p>Ты набрал ${score} очков</p>
        <p>Рекорд: ${bestScore}</p>
        <p>Попробуй побить рекорд в следующей игре!</p>
        <button id="playAgainBtn">Играть снова</button>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4a4a4a, #2d2d2d);
        padding: 40px 60px;
        border-radius: 20px;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        font-size: 2rem;
        color: #fff;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: victoryPop 0.5s ease;
        max-width: 500px;
        width: 90%;
    `;

    const playBtn = message.querySelector('#playAgainBtn');
    playBtn.style.cssText = `
        background: #ffc600;
        color: #2d2d2d;
        border: none;
        padding: 10px 30px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        transition: transform 0.2s;
        margin-top: 10px;
    `;
    playBtn.addEventListener('click', () => {
        message.remove();
        startGame();
    });

    const closeBtn = message.querySelector('#closeGameOverBtn');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });
    closeBtn.addEventListener('click', () => {
        message.remove();
        gameEnded = true;
        timeUp = true;
        console.log('Окно "Время вышло" закрыто, игра остановлена');
    });

    document.body.appendChild(message);
}