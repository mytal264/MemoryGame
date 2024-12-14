let startTime, timerInterval;
const animals = [
    'Cat', 'Dog', 'Fox', 'Bear', 'Lion', 'Tiger', 'Wolf', 'Panda', 'Elephant',
    'Zebra', 'Koala', 'Giraffe', 'Leopard', 'Rabbit', 'Hedgehog', 'Penguin',
    'Dolphin', 'Whale', 'Shark', 'Frog', 'Owl', 'Snake', 'Eagle', 'Monkey',
    'Parrot', 'Deer', 'Horse', 'Camel', 'Crocodile', 'Llama'
];
function startGame() {
    const name = document.getElementById('name').value;
    const pairs = parseInt(document.getElementById('cards').value);

    if (!name || pairs <= 0 || pairs > 30) {
        alert('Please enter a valid name and a number of pairs between 1 and 30.');
        return;
    }

    document.getElementById('player-name').innerText = `Player: ${name}`;
    setupGameBoard(pairs);

    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function setupGameBoard(pairs) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    const totalCards = pairs * 2;
    const cardValues = Array.from({ length: pairs }, (_, i) => i + 1);
    const cards = [...cardValues, ...cardValues];
    shuffle(cards);

    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = animals[value];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick() {
    const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (flippedCards.length === 1) {
        checkMatch(flippedCards[0], this);
    }
}

function checkMatch(card1, card2) {
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (document.querySelectorAll('.card.matched').length === document.querySelectorAll('.card').length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = elapsedTime;
}

function endGame() {
    clearInterval(timerInterval);
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('final-time').textContent = `You completed the game in ${elapsedTime} seconds!`;

    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
}

function resetGame() {
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('timer').textContent = '0';
}
