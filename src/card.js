"use strict;"
class Card {
  constructor(id, icon) {
    this.style
    this.hidden = true    //is the card hidden or not
    this.ikoni = icon
    this.id = 'card-'+id
    this.found = false;
  }

  icon() {
    return (this.hidden == true) ? 'oi oi-aperture text-primary' : this.ikoni
  }

  create() {
    let cardIcon = document.createElement("i");
    cardIcon.id = this.id
    cardIcon.className = this.icon()
    cardIcon.style = this.style
    return cardIcon
  }

  inside(element) {
    //this was propably something i was supposed to delete or change because its not a good thing to do here :/
    return element.appendChild(this.create())
  }

  startListen() {
    this.bound = this.click.bind(this);
    //this.bound = deck.push(this)
    document.getElementById(this.id).addEventListener('click',this.bound)
    //document.getElementById(this.id).addEventListener('click', this.bound)
  }

  stopListen() {
    //return document.getElementById(this.id).removeEventListener('click', this.bound);
  }

  click() {
    // this is something that should not be done like this but this pushes the clicked card to function that checks if its pair or not
    game.push(this)
  }

  reload() {
    //reload the card
    document.getElementById(this.id).className = this.icon(); //document.getElementById(id).className = this.icon();
    document.getElementById(this.id).style = this.style;
  }

}
