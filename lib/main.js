'use strict';
let states = []

function getURL() {
    const URL = 'http://localhost:3000/'
    return URL
}

function setState(states) {
  states = [...states]
  console.log(states);
  console.log(states[0]);
}

function getStatesURL() {
    const STATES = 'states/'
    return STATES
}

document.addEventListener('DOMContentLoaded', function () {
  let heroBodyElement = document.getElementById('hero-body-column')
  let test = createHElement()
  test.innerText = "HOLA MUNDO"
  heroBodyElement.appendChild(test)
  doFetch();
});


function doFetch() {
  fetch(`${getURL()}${getStatesURL()}`)
  .then(res => res.json())
  .then(data => setState(data))
  .catch(err => console.warn(err))
}
