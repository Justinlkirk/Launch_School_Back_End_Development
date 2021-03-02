// Dependencies begin
const readline = require('readline-sync');
// Dependencies end

// Globals begin
const ALLOWED_MODES = ['21', '31', '41', '51'],
  TYPES_OF_CARDS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'],
  AMOUNT_PER_TYPE = 4,
  AMOUNT_TO_SHUFFLE = 1000,
  CARD_NAME_INDEX = 0,
  DEALER_CARD_TO_REVEAL_INDEX = 0,
  CARD_VALUE_INDEX = 1,
  ACE_HIGH_VALUE = 11,
  ACE_LOW_VALUE = 1,
  JACK_QUEEN_KING_VALUE = 10,
  PLAYER_OPTIONS = ['hit', 'stay'],
  VALID_HIT_INPUT = ['hit', 'h'],
  VALID_STAY_INPUT = ['stay', 's'],
  VALID_NEW_RULES_INPUTS = ['new rules', 'nr', 'n r'],
  VALID_YES_INPUTS = ['yes', 'y'],
  VALID_NO_INPUTS = ['no', 'n'];

let newRules,
  deck = createDeck(TYPES_OF_CARDS, AMOUNT_PER_TYPE);
// Globals end

// Code body begins
welcome();

do {
  
  //Establishing rules begin
  const BUST_THRESHOLD = askWhichStyleOf21(),
    DEALER_STOP_THRESHOLD = BUST_THRESHOLD - 4,
    ROUNDS_PER_MATCH = askHowManyRounds(),
    STARTING_HAND_SIZE = (BUST_THRESHOLD - 1) / 10;
    
  let keepPlaying = true,
    newRound = true,
    roundNumber = 0,
    playerWins = 0,
    dealerWins = 0,
    deck,
    playerHand,
    dealerHand,
    winner;
  // Establishing rules end
  
  do {
    
  // Establishing round defaults begin
  if (newRound) {
    playerHand = [];
    dealerHand = [];
    winner = '';
    roundNumber += 1;
    deck = createDeck(TYPES_OF_CARDS, AMOUNT_PER_TYPE);
    shuffleDeck(deck);
    
    if(playerWins === ROUNDS_PER_MATCH || dealerWins === ROUNDS_PER_MATCH) {
      playerWins = 0;
      dealerWins = 0;
    }
    console.clear();
  }
  // Establishing round defaults end
  
  // Gameplay begin
  console.log(`Welcome to round ${roundNumber}. The score is,\nPlayer: ${playerWins}\nDealer: ${dealerWins}`);
  
  for (let i = 0; i < STARTING_HAND_SIZE; i++) {
    playerHand.push(dealCard(deck));
    dealerHand.push(dealCard(deck));
  }// Deals each card one at a time
  let playerTotal = totalHandValue(playerHand, BUST_THRESHOLD);
  let dealerTotal = totalHandValue(dealerHand, BUST_THRESHOLD);
  let dealerShow = dealerHand[DEALER_CARD_TO_REVEAL_INDEX][CARD_NAME_INDEX];
  
  displayHand(playerHand, dealerShow, playerTotal);
  
  playerTotal = playersTurn(playerHand, deck, BUST_THRESHOLD, playerTotal, dealerShow);
  if (playerTotal <= BUST_THRESHOLD) dealerTotal = dealersTurn(dealerHand, deck, dealerTotal, BUST_THRESHOLD, DEALER_STOP_THRESHOLD);
  else if (playerTotal > BUST_THRESHOLD) {
    console.log('You busted!');
    winner = 'Dealer';
  }
  // Gameplay end
  
  // Determine what to do next begin
  if (winner === '' && dealerTotal <= BUST_THRESHOLD) {
    winner = determineWinner(playerTotal, dealerTotal);
  }
  else if (dealerTotal > BUST_THRESHOLD && playerTotal < BUST_THRESHOLD) winner = 'Player';
  
  if (winner === 'Draw') console.log(`With a score of ${playerTotal} to ${dealerTotal} this is a draw!`);
  else if (winner === 'Player') {
    console.log(`You won with a score of ${playerTotal} to ${dealerTotal}!`);
    playerWins += 1;
  }
  else if (winner === 'Dealer') {
    console.log(`You lost with a score of ${playerTotal} to ${dealerTotal}!`);
    dealerWins += 1;
  }// Logs to the console how the game ended and increments the necessary variable
  
  if (playerWins === ROUNDS_PER_MATCH) {
    console.log(`The player wins the match with a score of ${playerWins} to ${dealerWins}!`);
    keepPlaying = askWhatToDoNext(newRules);
  }
  else if (dealerWins === ROUNDS_PER_MATCH) {
    console.log(`The dealer wins the match with a score of ${dealerWins} to ${playerWins}!`);
    keepPlaying = askWhatToDoNext(newRules);
  }
  
  readline.question('Enter anything to continue.');// Gives a pause between rounds
  // Determine what to do next end
  }while (keepPlaying)
}while(newRules)
// Code body ends

// Functions begin
function askWhatToDoNext(_) {
  do {
    let userInput = readline.question('Type yes to keep playing, no to exit, or new rules to change the game: ').toLowerCase();
    if (VALID_NEW_RULES_INPUTS.includes(userInput)) {
      newRules = true;
      return false;
    }// Exits inner loop to go to top of outer loop
    else if (VALID_YES_INPUTS.includes(userInput)) return true;
    else if (VALID_NO_INPUTS.includes(userInput)) {
      newRules = false;
      return false;
    }// Exits both loops to exit program
    else (console.log(`${userInput} was not recognized. Please try again.`))
  } while(true);// Keeps looping till a valid user input is provided
}// Updates new rules and returns a boolean to update keepPlaying based off user input

function determineWinner(usersTotal, computersTotal) {
  if (usersTotal > computersTotal) return 'Player';
  else if (usersTotal < computersTotal) return 'Dealer';
  else return 'Draw';
}// Determine who the winner is and returns the answer

function dealersTurn(dealersCards, currentDeck, computersTotal, bustThreshold, stopThreshold) {
  displayDealersHand(dealersCards, computersTotal);
  whatWillDealerDo(computersTotal, stopThreshold, bustThreshold);
  readline.question('Press any key to continue.');
  
  while (computersTotal < stopThreshold) {
    console.clear();
    dealersCards.push(dealCard(currentDeck));
    computersTotal = totalHandValue(dealersCards, bustThreshold);
    displayDealersHand(dealersCards, computersTotal);
    
    whatWillDealerDo(computersTotal, stopThreshold, bustThreshold);
    if (computersTotal > bustThreshold) console.log('Dealer busted!');
    
    readline.question('Press any key to continue.');// Creates a pause between each dealer action
  }
  console.clear();
  return computersTotal;
}// Hits until it is within four of the bust threshold then returns its total

function whatWillDealerDo(computersTotal, stopThreshold, bustThreshold) {
  if (computersTotal < stopThreshold) console.log('Dealer is going to hit.');
  else if (computersTotal <= bustThreshold) console.log('Dealer is going to stay.');
}

function displayDealersHand(dealersCards, computersTotal) {
  let hand = joinOr(dealersCards.map((card) => card[CARD_NAME_INDEX]), ', ', 'and');
  console.log(`Dealers hand is ${hand} for a total of ${computersTotal}.`);
}// Logs the dealers hand and total to the console

function playersTurn(usersCards, currentDeck, bustThreshold, currentTotal, dealersRevealedCard) {
  while(currentTotal < bustThreshold) {
    let userInput = readline.question(`Would you like to ${joinOr(PLAYER_OPTIONS, ' ', 'or')}: `).toLowerCase();
    if (VALID_HIT_INPUT.includes(userInput)) {
      console.clear();
      usersCards.push(dealCard(currentDeck));
      currentTotal = totalHandValue(usersCards, bustThreshold);
      displayHand(usersCards, dealersRevealedCard, currentTotal);
    }
    else if (VALID_STAY_INPUT.includes(userInput)) {
      console.clear();
      return currentTotal;
    }
    else console.log(`Sorry ${userInput} was not a recognized input. Please try again.`)
  };
  console.clear();
  return currentTotal;
}// Loops until the player either busts or chooses to stay then returns their total

function totalHandValue(hand, bustThreshold) {
  let handTotal = 0;
  hand.forEach((card) => {
    handTotal += card[CARD_VALUE_INDEX];// The card value is stored in index 1
  });
  
  if (handTotal > bustThreshold) {
    for (let card of hand) {
      if (card[CARD_NAME_INDEX] === 'Ace') {
        handTotal += ACE_LOW_VALUE - ACE_HIGH_VALUE;// Decreases hand total by the difference between the low and high values of an Ace
        if (handTotal <= bustThreshold) return handTotal;
      }
    }
  }// Sets each Ace to 1 until under the bust threshold
  
  return handTotal;
}// Totals the hand value with Aces starting as 11 and going to 1 if needed

function displayHand(usersCards, dealersRevealedCard, usersTotal) {
  let hand = joinOr(usersCards.map((card) => card[CARD_NAME_INDEX]), ', ', 'and');
  console.log(`Dealer is showing a ${dealersRevealedCard}`);
  console.log(`Your hand is ${hand} for a total of ${usersTotal}.`);
}// Logs your hand and the dealers face up card to the console

function dealCard(currentDeck) {
  return currentDeck.shift()
}// Removes the first card from the deck and returns it

function shuffleDeck(deckToShuffle) {
  for (let i = 0; i < AMOUNT_TO_SHUFFLE; i++) {
    let firstLocation = Math.floor(Math.random() * deckToShuffle.length);
    let secondLocation = Math.floor(Math.random() * deckToShuffle.length);
    let tempValueHolder = deckToShuffle[firstLocation];
    
    deckToShuffle[firstLocation] = deckToShuffle[secondLocation];
    deckToShuffle[secondLocation] = tempValueHolder;
  }
}// Shuffles the deck by swapping locations AMOUNT_TO_SHUFFLE times

function welcome(){
  console.log("Welcome to the 21 simulator!");
}// Logs to console the welcome statement

function askHowManyRounds() {
  do {
    let userInput = Number(readline.question('How many rounds would you like in each match?: '));
    if (userInput > 0 && Math.floor(userInput) === userInput) return userInput;
    else console.log(`Sorry ${userInput} is not a valid round count. Please enter a whole number greater than 0.`);
  } while(true);
}// Requires the user to input a number of rounds thats a whole number greater than 0

function askWhichStyleOf21() {
  do {
    let userInput = readline.question(`Would you like to play ${joinOr(ALLOWED_MODES, ', ', 'or')}: `);
    
    if(ALLOWED_MODES.includes(userInput)) return Number(userInput);
    else console.log(`${userInput} was not recognized. Please try again.`)
  } while(true);
}// Has the user choose the game mode based off ALLOWED_MODES

function joinOr(array, seperator = ', ', finalSeperator = 'or') {
  return array.slice(0, -1).join(seperator) + seperator + finalSeperator + " " + array.slice(-1);
}

function createDeck(cardTypes, numberPerType) {
  let tempDeck = [];
  
  cardTypes.forEach((typeOfCard) => {
    for (let i = 0; i < numberPerType; i++) {
      if (typeOfCard === 'Ace') tempDeck.push([typeOfCard, ACE_HIGH_VALUE]);
      else if (typeOfCard === 'Jack' || typeOfCard === 'Queen' || typeOfCard === 'King') tempDeck.push([typeOfCard, JACK_QUEEN_KING_VALUE])
      else tempDeck.push([typeOfCard, Number(typeOfCard)]);
    }
  });
  
  return tempDeck;
}// Returns a deck based off which cards should be in it and how many of each
// Functions end