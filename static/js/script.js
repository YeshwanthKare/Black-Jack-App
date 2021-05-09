const ageInDays = () => {
    let birthYear = prompt("What is your year of Birth... my friend!");
    let div = document.getElementById("flex-box-result");
    let age = (2021 - birthYear) * 365;
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "ageInDays")
    let node = document.createTextNode(`Your age is ${age} days old`);

    h1.appendChild(node);
    div.appendChild(h1);
}

const resetFunction = () => {
    document.getElementById("ageInDays").remove();
}

const generateCat = () => {
    let div = document.getElementById("cat-gen");
    let image = document.createElement("img")
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image)   
}

const rpsGame = (yourChoice) => {
    // console.log(yourChoice)
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    botChoice = botNumber(randomNumber())
    console.log(botChoice)
    var results = decideWinner(humanChoice, botChoice);
    var message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);
}

const randomNumber = () => {
    return Math.floor(Math.random() * 3);
}

const botNumber = (number) => {
    return ['rock', 'paper', 'scissors'][number]
}

const decideWinner = (humanChoice, botChoice) => {
    var rpsDatabase = {
        "rock": {"rock": 0.5, "paper": 0, "scissors": 1},
        "paper": {"rock": 1, "paper":0.5, "scissors": 0},
        "scissors": {"rock": 0, "paper": 1, "scissors": 0.5}
    }

    var humanScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [ humanScore, botScore ]
}

const finalMessage = ([humanChoice, botChoice]) => {
    if(humanChoice === 0){
        return {"message": "You Lost!", "color": "red"};
    }else if(humanChoice === 0.5){
        return{"message": "You Tied!", "color": "yellow"};
    }else {
        return{ "message": "You Won!", "color": "green"};
    }
}

const rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
    var rpsImagedatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src
    }

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var messageDiv = document.createElement("div");
    var botDiv = document.createElement("div");

    humanDiv.innerHTML = `<img src="${rpsImagedatabase[humanImageChoice]}" height=150 width=150 style="box-shadow: 0px 10px 50px rgba(32, 83, 233, 1)">`
    messageDiv.innerHTML = `<h1 style="color: ${finalMessage['color']}; font-size: 60px">${finalMessage["message"]}</h1>`
    botDiv.innerHTML = `<img src="${rpsImagedatabase[botImageChoice]}" height=150 width=150 style="box-shadow: 0px 10px 50px rgba(233, 83, 32, 1)">`


    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);


}

// Challenge 4: Random buttons

let all_buttons = document.getElementsByTagName("button");


let copyAllButtons = []

for(let button of all_buttons){
    copyAllButtons.push(button.classList[1])
}

console.log(copyAllButtons);

const buttonColorChange = (buttonThingy) => {
    if(buttonThingy.value === 'red'){
        buttonsRed()
    }else if (buttonThingy.value === 'green'){
        buttonsGreen()
    }else if (buttonThingy.value === 'random'){
        buttonsRandom()
    }else if(buttonThingy.value === 'reset'){
        buttonsReset();
    }
}

const buttonsRed = () => {
    for(let button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add("btn-danger");
    }
}

const buttonsGreen = () => {
    for(let button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add("btn-success");
    }
}

const buttonsReset = () => {
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

const buttonsRandom = () => {
    for(let i = 0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        let choices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"]
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5: BlackJack

const blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]}
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer'];
const CARDS = blackjackGame['cards']


document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);

document.querySelector("#blackjack-deal-button").addEventListener("click", removeImages)

let yourAudio = new Audio('/static/sounds/swish.m4a')
let winAudio = new Audio('/static/sounds/cash.mp3')
let lossAudio = new Audio('/static/sounds/aww.mp3')

function blackjackHit ()  {
    let card = randomCard();
    console.log(card)
    showHit(card, YOU)
    updateCard(card, YOU)
    showScore(YOU)
}

function showHit(card, activePlayer) {
    if(activePlayer['score'] <= 21){
        let image = document.createElement('img');
        image.src = `/static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(image);
        yourAudio.play()
    }
    
}

function randomCard () {
    const randomNumber = Math.floor(Math.random() * 13);
    return CARDS[randomNumber];
}

function removeImages () {

    let winner = computeWinner()

    showWinner(winner)
    
    const yourImgaes = document.querySelector(YOU['div']).querySelectorAll('img');
    for(let i = 0; i < yourImgaes.length; i++){
        yourImgaes[i].remove();
    }

    const dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');
    for(let i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

   
    document.querySelector(YOU['scoreSpan']).textContent = 0
    document.querySelector(DEALER['scoreSpan']).textContent = 0

    document.querySelector(YOU['scoreSpan']).style.color = '#ffffff'
    document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff'
}

function updateCard (card, activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
            console.log(activePlayer['score'])
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
        
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card]
    }

}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']

    }
}

function dealerLogic() {
    let card = randomCard();
    console.log(card)
    showHit(card, DEALER)
    updateCard(card, DEALER)
    showScore(DEALER)
}

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){

        if( YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log('You Won!');
            winner = YOU
        }else if(YOU['score'] < DEALER['score'] || DEALER['score'] <= 21){
            console.log('You Lost!')
            winner = DEALER
        }else if(YOU['score'] === DEALER['score']) {
            console.log('You Drew!');
        }
    }else if( YOU['score'] > 21 && DEALER['score'] <= 21){
        console.log('You Lost!');
        winner = DEALER
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        console.log('You Drew!')
    }
    console.log("Winner is: ", winner)
    return winner;
}


function showWinner(winner) {
    let message, messageColor;
    if(winner === YOU){
        message = 'You Won!'
        messageColor = 'green'
        winAudio.play()
    }else if(winner === DEALER){
        message = 'You Lost!'
        messageColor = 'red'
        lossAudio.play()
    }else{
        message = 'You Drew!'
        messageColor = 'black'
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor
}

