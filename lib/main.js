'use strict';
let userStates = []
function getURL() {
    const URL = 'http://localhost:3000/'
    return URL
}

function getStatesURL() {
    const STATES = 'states/'
    return STATES
}

document.addEventListener('DOMContentLoaded', function () {
  formatBody()
});


function doFetch() {
  fetch(`${getURL()}${getStatesURL()}`)
  .then(res => res.json())
  .then(data => compareArrays(data))
  .catch(err => console.warn(err))
}


function formatBody(){
  // grab div hero-body-column
  let heroBodyElement = document.getElementById('hero-body-column')
  // grab div hero-body-column-list
  let heroBodyListElement = document.getElementById('hero-body-column-list')

  let h1Title = createHElement()
  h1Title.classList.add('title', 'is-2', 'is-spaced')
  h1Title.innerText = "Welcome to Friends Game"

  let h2Title = createH2Element()
  h2Title.classList.add('subtitle', 'is-4')
  h2Title.innerText = "If you want to win you must add all the 50 States."

  let inputElement = createInputElement()
  inputElement.classList.add('input', 'is-info')
  inputElement.id = 'get-state'
  inputElement.type = 'text'
  inputElement.placeholder = 'Add State...'
  inputElement.addEventListener("keydown", (e) => {
    // check if key pressed was enter key.
    if (e.key == 'Enter') {
      addLiToUl()
    }
  })

  let buttonAdd = createButton()
  buttonAdd.setAttribute('onClick', 'addLiToUl()')
  buttonAdd.textContent = 'Add'

  //format "header"
  heroBodyElement.appendChild(h1Title)
  heroBodyElement.appendChild(h2Title)
  heroBodyElement.appendChild(inputElement)
  heroBodyElement.appendChild(buttonAdd)

  let ulElement = createULElement()
  ulElement.id = 'state-ul'


  // ulElement.appendChild(liElement)
  //format div list
  heroBodyListElement.appendChild(ulElement)
}

function addLiToUl() {
  if (userStates.length < 50) {
    // grab ul element
    let ulStateElement = document.getElementById('state-ul')
    // create a new li element
    let liElement = createLIElement()
    // grab input text
    let getStateInpuElement = document.getElementById('get-state')
    liElement.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
    liElement.innerText = getStateInpuElement.value
    // console.log(state.value);

    // create span to add icon to delete state
    let spanDelete = createSpanElement()
    spanDelete.id = 'remove-state'
    spanDelete.classList.add('icon', 'button')

    // get trash icon create
    let iconTrashElement = createIconFaTrashAlt()
    iconTrashElement.classList.add('far', 'fa-trash-alt')
    spanDelete.appendChild(iconTrashElement)

    ulStateElement.appendChild(liElement)
    ulStateElement.appendChild(spanDelete)
    userStates.push(getStateInpuElement.value)
    console.log(userStates);
  } else {
    let heroBodyListElement = document.getElementById('hero-body-column-list')
    let buttonSubmit = createButton()
    buttonSubmit.textContent = 'Submit'
    buttonSubmit.setAttribute('onClick', 'calculate()')
    heroBodyListElement.appendChild(buttonSubmit)
  }

}

function calculate() {
  if (userStates.length < 50) {
    console.log('You are missing states');
  }else {
    doFetch()
  }
}

function compareArrays(states){
  // console.log(states);
  // let test = [1,2,3]
  // let prueba = [{name: 1}, {name: 2}, {name: 3}]
  // let result = cv => test.includes(cv.name)
  // if (prueba.every(result)) {
  //   console.log("you won");
  // } else{
  //   console.log("loser");
  // }

  let result = currentState => userStates.includes(currentState.name)
  if (states.every(result)) {
    alert("You are a SMARTYPANTIES");
    console.log("you won");
  } else{
    alert('You lose!')
    console.log("loser");
  }
}
