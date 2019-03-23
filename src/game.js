"use strict;"
class Game {
  constructor() {
    this.progress = 0
    this.failures = 0
    this.turns = 0
    this.deck = []        //array that will be filled with card objects
    this.arr = []         //temporary array to compare 2 values
    this.lock = false     //making sure that you cant compare cards when you are already comparing cards
    this.victory = false
    this.pushCalls = false    //check to see if we have called push method yet
    this.timer = new Timer()
  }

  createAll() {
    // go trough ICONNAMES array, get all icons and create pairs of cards.
    let val = 0
    for (let icon of ICONNAMES) {
      this.deck.push(new Card(val, icon))
      val++
      this.deck.push(new Card(val, icon))
      val++
    }
  }

  shuffle() {
    //this seems to be pretty popular algorithm for shuffling cards
    let index = this.deck.length;
    let random;

    while (0 !== index) {
      random = Math.floor(Math.random() * index);
      index--;

      [this.deck[index], this.deck[random]] = [this.deck[random], this.deck[index]];
    }

    return this.deck;
  };

  progressBar() {
    let bar = document.getElementById("bar")
    bar.style.width = this.progress + '%'
  }

//check if you have won the game and print end results
  victor() {
    if (Math.round(this.progress) === 100) {
      this.victory = true
      console.log('time used:' + this.timer.stop())
      console.log('turns: ' + this.turns)
      console.log('failures: ' + this.failures)
      document.getElementById("timer").innerHTML = 'Time: ' + this.timer.stop() / 1000 + ' seconds'
      document.getElementById("turns").innerHTML = 'Turns used: ' + this.turns
      document.getElementById("failures").innerHTML = 'Failed attempts: ' + this.failures
    }
  }
  //push card to array and after 2 pushed cards it will check if they are a pair
  push(card) {
    if (this.pushCalls === false) this.timer.start()
    this.pushCalls = true

    if (card.found === false && this.lock === false && this.arr.length < 2) {
      console.log('pushed card id: ' + card.id)
      card.hidden = false
      card.reload()
      this.arr.push(card)
    } 
    
    if (this.lock === false && this.arr.length == 2) {
      this.lock = true
      console.log(`compared cards id: ${this.arr[0].id} and id: ${this.arr[1].id}`)
      this.compare(this.arr[0], this.arr[1])
    }

  }
//compare function that compares 2 cards
  compare(a, b) {
    if (a.ikoni == b.ikoni && a.id != b.id && a.found == false && b.found == false) {
      console.log('pair found')
      a.style += 'color:red;'   //set color of a found pair
      b.style += 'color:red;'
      a.found = true    //set card to found
      b.found = true
      a.reload()        //reload card
      b.reload()
      this.progress += 2 / this.deck.length * 100
      this.turns++    
      this.arr = []       //empty array so we can make more compares
      this.lock = false   //make this method allow more compares
      this.victor()       //check if we won
      this.progressBar()  //increment progress bar
    } else {
      let self = this

      setTimeout(() => {
        console.log('no pair found')
        a.hidden = true
        b.hidden = true
        a.reload()
        b.reload()
        self.failures++
        self.turns++
        self.arr = []
        self.lock = false
      }, 800);

    }
  }

  init() {
    this.createAll()
    this.deck.length = cardAmount
    this.shuffle()

    let cards = this.deck
    //console.log(cards)

//create divs and set some options for cards
    for (let i = 0; i < cardAmount / cardsRow; i++) {
      let div = document.createElement('div');
      div.id = 'row-' + i;

      for (let j = 0; j < cardsRow; j++) {
        let id = (j + (i * cardsRow));

        cards[id].style = 'font-size:100px;color:black;text-shadow:2px 2px 4px #000000;'
        cards[id].hidden = true
        cards[id].inside(div)
        //div.appendChild(cards[cardId].startListen())
      }
      document.getElementById("content").appendChild(div);

    }

    for (let i = 0; i < cardAmount; i++) {
      cards[i].startListen(this.push)
      //cards[i].hidden = false
      // document.getElementById('card: '+i).addEventListener('click', game.push)
    }

  }

}

const cardAmount = 20
const cardsRow = 5
let game = new Game()
game.init()