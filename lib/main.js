'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var userStates = [];
function getURL() {
  var URL = 'http://localhost:3000/';
  return URL;
}

function getStatesURL() {
  var STATES = 'states/';
  return STATES;
}

function doFetch() {
  fetch('' + getURL() + getStatesURL()).then(function (res) {
    return res.json();
  }).then(function (data) {
    return compareArrays(data);
  }).catch(function (err) {
    return console.warn(err);
  });
}

function doFetchForCheckStateName() {
  fetch('' + getURL() + getStatesURL).then(function (res) {
    return res.json();
  }).then(function (state) {
    return console.log(state);
  }).then(function (err) {
    return console.log(err);
  });
}

function formatBody() {
  var timerDivEl = createTimerDiv();

  //createFigure()
  var videoFigureElement = createFigure();
  videoFigureElement.classList.add('image');

  // createIframe
  var iframeVideoEl = createIframe();
  iframeVideoEl.classList.add('has-ratio');
  iframeVideoEl.setAttribute('src', 'https://www.youtube.com/embed/22HXTrqn468');
  iframeVideoEl.setAttribute('width', '640');
  iframeVideoEl.setAttribute('height', '360');
  iframeVideoEl.setAttribute('frameborder', '0');

  // grab div hero-body-column
  var heroBodyElement = document.getElementById('hero-body-column');
  heroBodyElement.classList.add('has-text-centered');
  // grab hero-body-column-video
  var heroBodyVideoElement = document.getElementById('hero-body-column-video');

  // grab div hero-body-column-list
  var heroBodyListElement = document.getElementById('hero-body-column-list');

  // create createFieldSet
  var fieldSetElement = createFieldSet();
  fieldSetElement.classList.add('field');

  // create div for field
  var divFieldElement = createDiv();
  divFieldElement.classList.add('field', 'is-grouped');

  var h1Title = createHElement();
  h1Title.classList.add('title', 'is-2', 'is-spaced');
  h1Title.innerText = "Welcome to Friends Game";

  var h2Title = createH2Element();
  h2Title.classList.add('subtitle', 'is-4');
  h2Title.innerText = "If you want to win you must add all the 50 States in a period of 6 minutes.";

  var inputElement = createInputElement();
  inputElement.classList.add('input', 'is-info');
  inputElement.id = 'get-state';
  inputElement.type = 'text';
  inputElement.placeholder = 'Add State...';
  inputElement.addEventListener("keydown", function (e) {
    // check if key pressed was enter key.
    if (e.key == 'Enter') {
      doAddState();
    }
  });

  var buttonAdd = createButton();
  buttonAdd.classList.add('button', 'is-dark');
  buttonAdd.setAttribute('onClick', 'doAddState()');
  buttonAdd.textContent = 'Add State';
  buttonAdd.classList.add('mt-4');

  //adding video element
  videoFigureElement.appendChild(iframeVideoEl);
  // heroBodyVideoElement.appendChild(videoFigureElement)

  // adding elements to heroBodyElement
  heroBodyElement.appendChild(h1Title);
  heroBodyElement.appendChild(h2Title);
  heroBodyElement.appendChild(videoFigureElement);
  heroBodyElement.appendChild(timerDivEl);
  heroBodyElement.appendChild(divFieldElement);

  // adding elements to fieldSetElement
  divFieldElement.appendChild(inputElement);
  divFieldElement.appendChild(buttonAdd);

  var ulElement = createULElement();
  ulElement.id = 'state-ul';

  // ulElement.appendChild(liElement)
  //format div list
  heroBodyListElement.appendChild(ulElement);
}

function validate() {
  // grab input from user
  var inputText = document.getElementById('get-state').value;
  // check if input is not empty or null
  if (inputText != '' && inputText != null) return true;

  // if not empty we add the state to the list
  return false;
}

function addLiToUl() {
  if (userStates.length < 50) {
    // grab ul element
    var ulStateElement = document.getElementById('state-ul');
    // create a new li element
    var liElement = createLIElement();
    // grab input text
    var getStateInpuElement = document.getElementById('get-state');
    liElement.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
    liElement.innerText = getStateInpuElement.value;
    // console.log(state.value);

    // create span to add icon to delete state
    var buttonTrash = createButton();
    buttonTrash.classList.add('button', 'is-light');

    var spanDelete = createSpanElement();
    spanDelete.id = 'remove-state';
    spanDelete.classList.add('icon');
    // spanDelete.setAttribute('onClick', 'removeState()')
    //add listener to button spanDelete
    spanDelete.addEventListener('click', removeState);
    // get trash icon create
    var iconTrashElement = createIconFaTrashAlt();
    iconTrashElement.classList.add('far', 'fa-trash-alt');
    spanDelete.appendChild(iconTrashElement);

    // append spanDelete to button
    // buttonTrash.appendChild(spanDelete)
    // liElement.appendChild(buttonTrash)

    liElement.appendChild(spanDelete);
    ulStateElement.appendChild(liElement);
    // ulStateElement.appendChild(spanDelete)
    userStates.push(getStateInpuElement.value);
    console.log(userStates);

    //clear inputElement and get focus
    getStateInpuElement.value = "";
    getStateInpuElement.focus();
  }
  if (userStates.length === 50) {
    addSubmitButton();
  }
}

function addSubmitButton() {
  // check if button submit exists
  // let test = document.getElementById('button-submit')
  // if (test.textContent == 'Submit') {
  //  return
  // }
  var heroBodyListElement = document.getElementById('hero-body-column-list');
  var buttonSubmit = createButton();
  buttonSubmit.textContent = 'Submit';
  buttonSubmit.setAttribute('onClick', 'calculate()');
  buttonSubmit.id = 'button-submit';
  buttonSubmit.classList.add('button', 'is-warning');
  heroBodyListElement.appendChild(buttonSubmit);
}

function doAddState() {
  if (validate()) {
    addLiToUl();
  } else {
    var inputElement = document.getElementById('get-state');
    alert('Must enter a State!');
    inputElement.focus();
  }
}

function calculate() {
  if (userStates.length < 50) {
    console.log('You are missing states');
  } else {
    doFetch();
  }
}

function compareArrays(states) {
  // console.log(states);
  // let test = [1,2,3]
  // let prueba = [{name: 1}, {name: 2}, {name: 3}]
  // let result = cv => test.includes(cv.name)
  // if (prueba.every(result)) {
  //   console.log("you won");
  // } else{
  //   console.log("loser");
  // }

  var result = function result(currentState) {
    return userStates.includes(currentState.name);
  };
  if (states.every(result)) {
    alert("You are a SMARTYPANTS");
    // console.log("you won");
  } else {
    alert('You lose!');
    // console.log("loser");
  }
}

function removeState(e) {
  var liElementToRemove = e.currentTarget.parentNode;
  // console.log(liElementToRemove);
  // console.log('currentarget ', e.currentTarget);
  // console.log('currentarget.parentNode ', e.currentTarget.parentNode)
  // console.log('currentarget.parentNode.text ', e.currentTarget.parentNode.innerText)
  var liText = e.currentTarget.parentNode.innerText;
  // console.log('litext es: ', liText, ' typeof is: ', typeof liText);
  findAndRemoveFromUserStatesArray(liText);
  liElementToRemove.remove();
}

function findAndRemoveFromUserStatesArray(value) {
  console.log('hay que remover: ', value);
  // find remove element from user array input.
  var newAr = userStates.filter(function (state) {
    return state != value;
  });
  console.log(newAr);
  userStates = [].concat(_toConsumableArray(newAr));
}

// listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  formatBody();
});