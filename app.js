"use strict";

var MarkovTweet = function() {
  this.table = [];
};

MarkovTweet.prototype.addData = function(textArray) {
  for (var index = 0; index < textArray.length; index++) {
    this.addToChain(textArray[index]);
  }
}

/**
 * Takes a string and tokenizes it using a space as a delimiter.
 * Uses that token to build out the chain
 * @param {String} token - A line of text to add to the chain
 */
MarkovTweet.prototype.addToChain = function(token) {
  var expression = /[\s]/;
  var tokens = token.split(expression);

  for (var index = 0; index < tokens.length; index++) {
    var currentToken = tokens[index].toLowerCase(),
      nextToken = null;

    if (index + 1 < tokens.length) {
      nextToken  = tokens[index + 1].toLowerCase();
    }

    if (currentToken !== "" && nextToken !==  null){
      this.buildChain(currentToken, nextToken);
    }
  }
};


/**
 * Takes the currentToken and the nextToken in the string and searches for it in the data structure.
 * If we find the currentToken and the nextToken does not yet exist for that key then create it
 * If we find the currentToken and the nextToken does exist for the key then increment the total for that nextToken by 1
 * If we do not find the currentToken then create a new entry in the data structure
 * @param  {String} currentToken - Our key to search for in the data structure
 * @param  {String} nextToken    - The token found after the currentToken. Used to build out our map
 */
MarkovTweet.prototype.buildChain = function(currentToken, nextToken) {
  var found = false;

  for (var index = 0; index < this.table.length; index++) {
    var currentRow = this.table[index];
    var currentKey = currentRow.key;

    if (currentKey === currentToken) {

      found = true;
      var increased = false;

      //Now check if the next token exists somewhere
      for (var n = 0; n < currentRow.values.length; n++) {
        if (currentRow.values[n].next === nextToken) {
          currentRow.values[n].count++;
          currentRow.total++;
          increased = true;
          break;
        }
      }

      if (!increased) {
        this.table[index].values.push({
          "next": nextToken,
          "count": 1
        });

        this.table[index].total++;
      }
    }
  }

  if (!found && nextToken !== "") {
    this.table.push({
      "key": currentToken,
      "values": [{
        "next": nextToken,
        "count": 1
      }],
      "total": 1
    });
  }
};


/**
 * Takes the completed Markov Chain and generates a tweet
 * @return {String} - A string based on the Markov Chain.
 */
MarkovTweet.prototype.buildTweet = function() {
  var random = Math.floor(Math.random() * this.table.length);
  var tweet = this.table[random].key;
  var nextState = this.addToTweet(random);
  tweet += " " + nextState;

  while (tweet.length < 200) {
    var selection = this.findIndex(nextState);
    nextState = this.addToTweet(selection);

    if (nextState === -1) {
      break;
    }

    tweet += " " + nextState;
  }

  tweet = setFirstLetterAsUpperCase(tweet);

  if (tweet.charAt(tweet.length - 1) != '.') {
    tweet = tweet + '.';
  }

  for (var index = 0; index < tweet.length; index++) {
    if (index > 0 && index != tweet.length - 1 &&
      tweet.charAt(index - 1) == ' ' && tweet.charAt(index + 1) == ' ' &&
      tweet.charAt(index) == 'i') {
      tweet = setCharAt(tweet, index, 'I');
    }

    if (tweet.charAt(index) == '.') {
      tweet = tweet.substring(0, index + 1);
      break;
    }
  }

  return tweet;

};

function setFirstLetterAsUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setCharAt(str, index, chr) {
  if (index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

/**
 * Searches through the index of the current key, picks the next token and returns it.
 * @param {Number} rowIndex - The index of the current key.
 * @return {String}         - The next token to use in the Markov Process.
 */
MarkovTweet.prototype.addToTweet = function(rowIndex) {
  var currentRow = this.table[rowIndex];

  // No possible combination.
  if (currentRow === undefined) {
    return -1;
  }

  var totalChoices = currentRow.total;
  var random = Math.floor(Math.random() * totalChoices);

  var selection = 0;
  var index = 0;

  while(selection < random) {
    selection += currentRow.values[index].count;

    if (selection > random) {
      break;
    }

    index++;
  }

  return currentRow.values[index].next;
};

/**
 * finds the index of a key within the structure.
 * @param  {String} key - the key to search for
 * @return {Number}     - returns the index of the key if found, otherwise returns -1
 */
MarkovTweet.prototype.findIndex = function(key) {

  for (var index = 0; index < this.table.length; index++) {

    if (this.table[index].key === key) {
      return index;
    }
  }

  return -1;
};