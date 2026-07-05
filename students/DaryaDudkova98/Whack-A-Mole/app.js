const scoreBoard = document.getElementById('score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const button = document.getElementById('startGame');
const gameCountDisplay = document.getElementById('gameCount');
const bestScoreDisplay = document.getElementById('bestScore');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const timerDisplay = document.getElementById('timer');
const hitSound = new Audio('sound/bank.mp3');
const victorySound = new Audio('sound/victory.mp3');

let lastHole;
let timeUp = false;
let score = 0;
let gameCount = 0;
let bestScore = parseInt(localStorage.getItem('whackBestScore')) || 0;
let isGameStarted = false;
let gameEnded = false;
let timerInterval = null;
let isNewRecord = false;


let gameDuration = 30;

document.querySelectorAll('.time-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    gameDuration = parseInt(this.dataset.time);
    timerDisplay.textContent = gameDuration;
    console.log(`⏱️ Время игры: ${gameDuration} секунд`);
  });
});

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
        return getRandHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    if (timeUp || gameEnded) return;
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
    clearInterval(timerInterval);
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => el.remove());

    gameEnded = false;
    isGameStarted = true;
    timeUp = false;
    isNewRecord = false;

    gameCount++;
    if (gameCountDisplay) {
        gameCountDisplay.textContent = gameCount;
    }

    score = 0;
    scoreBoard.textContent = 0;


    let timeLeft = gameDuration;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        timerDisplay.textContent = Math.ceil(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp = true;
            isGameStarted = false;
            
            if (isNewRecord || score > bestScore) {
                if (score > bestScore) {
                    bestScore = score;
                    if (bestScoreDisplay) {
                        bestScoreDisplay.textContent = bestScore;
                    }
                    localStorage.setItem('whackBestScore', bestScore);
                }
                showVictoryMessage();
            } else {
                showGameOverMessage();
            }
        }
    }, 100);

    peep();

    setTimeout(() => {
        if (!timeUp) {
            clearInterval(timerInterval);
            timeUp = true;
            isGameStarted = false;
            
            if (isNewRecord || score > bestScore) {
                if (score > bestScore) {
                    bestScore = score;
                    if (bestScoreDisplay) {
                        bestScoreDisplay.textContent = bestScore;
                    }
                    localStorage.setItem('whackBestScore', bestScore);
                }
                showVictoryMessage();
            } else {
                showGameOverMessage();
            }
        }
    }, gameDuration * 1000 + 500);
}

function bank(e) {
    if (!e.isTrusted) return;
    if (gameEnded || timeUp || !isGameStarted) return;

    const hole = this.parentElement;
    if (!hole.classList.contains('up')) return;

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
        isNewRecord = true;
        bestScore = score;
        if (bestScoreDisplay) {
            bestScoreDisplay.textContent = bestScore;
        }
        localStorage.setItem('whackBestScore', bestScore);
        console.log('🎯 НОВЫЙ РЕКОРД!', bestScore);
    }
}

moles.forEach(mole => mole.addEventListener('click', bank));

function resetStats() {
    const confirmReset = confirm('❗ Ты уверена, что хочешь сбросить всю статистику?\nИгры: ' + gameCount + '\nРекорд: ' + bestScore);
    if (!confirmReset) return;

    gameCount = 0;
    bestScore = 0;
    gameEnded = true;
    clearInterval(timerInterval);
    isNewRecord = false;
    
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
    timerDisplay.textContent = gameDuration;
}

if (resetStatsBtn) {
    resetStatsBtn.addEventListener('click', resetStats);
}

function showVictoryMessage() {
    clearInterval(timerInterval);
    gameEnded = true;
    timeUp = true;
    isGameStarted = false;

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
                z-index: 1001;
            ">✕</button>
        </div>
        <h1 style="font-size: 4rem; margin: 0 0 10px 0;">НОВЫЙ РЕКОРД!</h1>
        <p style="font-size: 2.5rem; margin: 10px 0;">Ты набрал <strong>${score}</strong> очков!</p>
        <p style="font-size: 2rem; margin: 10px 0;">Поздравляем с победой!</p>
        <button id="playAgainBtn" style="
            background: #fff;
            color: #ff6b6b;
            border: none;
            padding: 12px 35px;
            border-radius: 10px;
            font-size: 1.8rem;
            font-family: 'Amatic SC', cursive;
            cursor: pointer;
            transition: transform 0.2s;
            margin-top: 15px;
            font-weight: bold;
        ">Играть снова</button>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd700, #ff6b6b);
        padding: 40px 50px;
        border-radius: 20px;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        color: #fff;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: victoryPop 0.5s ease;
        max-width: 500px;
        width: 90%;
        border: 3px solid #fff;
    `;

    const playBtn = message.querySelector('#playAgainBtn');
    playBtn.addEventListener('mouseenter', () => {
        playBtn.style.transform = 'scale(1.05)';
    });
    playBtn.addEventListener('mouseleave', () => {
        playBtn.style.transform = 'scale(1)';
    });
    playBtn.addEventListener('click', () => {
        message.remove();
        startGame();
    });

    const closeBtn = message.querySelector('#closeVictoryBtn');
    closeBtn.addEventListener('click', () => {
        message.remove();
        gameEnded = true;
        timeUp = true;
        console.log('Окно победы закрыто');
    });

    document.body.appendChild(message);
}

function showGameOverMessage() {
    clearInterval(timerInterval);
    gameEnded = true;
    timeUp = true;
    isGameStarted = false;
    
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
                z-index: 1001;
            ">✕</button>
        </div>
        <h1 style="font-size: 4rem; margin: 0 0 10px 0;">Время вышло!</h1>
        <p style="font-size: 2.5rem; margin: 10px 0;">Ты набрал <strong>${score}</strong> очков</p>
        <p style="font-size: 2rem; margin: 10px 0;">Рекорд: <strong>${bestScore}</strong></p>
        <p style="font-size: 1.8rem; margin: 10px 0;">Попробуй побить рекорд в следующей игре!</p>
        <button id="playAgainBtn" style="
            background: #ffc600;
            color: #2d2d2d;
            border: none;
            padding: 12px 35px;
            border-radius: 10px;
            font-size: 1.8rem;
            font-family: 'Amatic SC', cursive;
            cursor: pointer;
            transition: transform 0.2s;
            margin-top: 15px;
            font-weight: bold;
        ">Играть снова</button>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4a4a4a, #2d2d2d);
        padding: 40px 50px;
        border-radius: 20px;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        color: #fff;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: victoryPop 0.5s ease;
        max-width: 500px;
        width: 90%;
        border: 3px solid #ffc600;
    `;

    const playBtn = message.querySelector('#playAgainBtn');
    playBtn.addEventListener('mouseenter', () => {
        playBtn.style.transform = 'scale(1.05)';
    });
    playBtn.addEventListener('mouseleave', () => {
        playBtn.style.transform = 'scale(1)';
    });
    playBtn.addEventListener('click', () => {
        message.remove();
        startGame();
    });

    const closeBtn = message.querySelector('#closeGameOverBtn');
    closeBtn.addEventListener('click', () => {
        message.remove();
        gameEnded = true;
        timeUp = true;
        console.log('Окно "Время вышло" закрыто');
    });

    document.body.appendChild(message);
}