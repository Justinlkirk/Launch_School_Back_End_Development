const CARD_NAME_INDEX = 0,
  ACE_HIGH_VALUE = 11,
  ACE_LOW_VALUE = 1,
  CARD_VALUE_INDEX = 1;

function totalHandValue(hand, bustThreshold) {
  let handTotal = 0;
  hand.forEach((card) => {
    handTotal += card[CARD_VALUE_INDEX];// The card value is stored in index 1
  });
  
  if (handTotal > bustThreshold) {
    for (let card of hand) {
      if (card[CARD_NAME_INDEX] === 'Ace') {
        handTotal += ACE_LOW_VALUE - ACE_HIGH_VALUE;
      }// Decreases hand total by the difference between the low and high values of an Ace
      if (handTotal <= bustThreshold) return handTotal;
    }
  }// Sets each Ace to 1 until under the bust threshold
  
  return handTotal;
}// Totals the hand value with Aces starting as 11 and going to 1 if needed

console.log(totalHandValue([['Ace', 11], ['Ace', 11], ['9', 9]], 21));