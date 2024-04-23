const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.toggle('flip');
    
    if (!hasFlippedCard) {
        
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // second click
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
    
}

function checkForMatch() {
    // do the cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        //did not match
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 500)
        
    }
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));