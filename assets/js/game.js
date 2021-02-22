export function getRandom() {
  var d1 = Math.floor(Math.random() * 10);
  var d2 = Math.floor(Math.random() * 10);
  var d3 = Math.floor(Math.random() * 10);
  var d4 = Math.floor(Math.random() * 10);

  return "" + d1 + d2 + d3 + d4 + "";
}

export function getResult(guess, secret) {
  var bulls = 0;
  var cows = 0;

  //check for bulls
  for(var k=0; k<secret.length; k++) {
    if(guess.charAt(k)==secret.charAt(k)) {
      bulls++;
    }
    //check for cows
    else {
      for(var i=0; i<secret.length; i++) {
        if(guess.charAt(k)==secret.charAt(i)) {
          cows++;
        }
      }
    }
  }

  return "Bulls: " + bulls + " Cows: " + cows;
}

//checks for valid input
export function valid(guess) {
  if(guess.length !== 4) {
    return false;
  }
  for(var k=0; k<guess.length-1; k++) {
    if(guess.charAt(k)==guess.charAt(k+1)) {
      return false;
    }
  }

  return !(isNaN(parseInt(guess)));
}
