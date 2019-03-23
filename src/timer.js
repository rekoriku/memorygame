"use strict;"
class Timer {
  constructor() {
    this.date
    this.intervalId
  }

start() {
  this.date = new Date()
  this.intervalId = setInterval(() => this.current("timer"), 1000);
  console.log('timer started')
}

current() {
  let currentTime = new Date()
  let time = Math.round((currentTime-this.date)/1000)
  document.getElementById("timer").innerHTML = 'Time: ' + time + ' seconds'
}

stop() {
  clearInterval(this.intervalId)
  let endTime = new Date()
  return endTime-this.date
}

}
