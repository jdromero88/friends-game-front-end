'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var userStates = [];
function getURL() {
  // const URL = 'http://localhost:3000/'
  // return URL
  return 'http://localhost:3000/';
}

function getStatesURL() {
  // const STATES = 'states/'
  // return STATES
  return 'states/';
}

function getStateSearch() {
  return 'state/search';
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

function doFetchForCheckStateName(state) {
  var confObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: state })
  };

  fetch('' + getURL() + getStateSearch(), confObj).then(function (res) {
    return res.json();
  }).then(function (state) {
    if (state.message != 'typo') {
      console.log(state);
      console.log(state.name);
      addLiToUl(state.name);
    } else {
      alert('You maybe have a typo.');
      var inputText = document.getElementById('get-state');
      inputText.focus();
    }
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
  h1Title.innerText = "Welcome to Thanksgiving Friends Game";

  var h2Title = createH2Element();
  h2Title.classList.add('subtitle', 'is-4');
  h2Title.innerText = "If you want to win you must add all the 50 States in a period of 6 minutes.";

  var inputElement = createInputElement();
  inputElement.classList.add('input', 'is-info');
  inputElement.id = 'get-state';
  inputElement.type = 'text';
  inputElement.placeholder = 'Add State...';
  // input disabled till game start
  inputElement.setAttribute('disabled', 'true');
  inputElement.addEventListener("keydown", function (e) {
    // check if key pressed was enter key.
    if (e.key == 'Enter') {
      doAddState();
    }
  });

  var buttonAdd = createButton();
  buttonAdd.id = 'add-state';
  buttonAdd.classList.add('button', 'is-dark');
  buttonAdd.setAttribute('onClick', 'doAddState()');
  buttonAdd.textContent = 'Add State';
  buttonAdd.classList.add('mt-4');
  // button disabled till game start
  buttonAdd.setAttribute('disabled', 'true');
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

  // invoke getStartGameButton()
  getStartGameButton();
}

function validate() {
  // grab input from user
  var inputText = document.getElementById('get-state').value;
  // check if input is not empty or null
  if (inputText != '' && inputText != null) return true;

  // if not empty we add the state to the list
  return false;
}

function addLiToUl(state) {
  if (userStates.length < 50) {
    // grab ul element
    var ulStateElement = document.getElementById('state-ul');
    // create a new li element
    var liElement = createLIElement();
    // grab input text is going to be innescesary now because Im receiving the state as parameter
    var getStateInpuElement = document.getElementById('get-state');
    liElement.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
    liElement.innerText = state;
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

    liElement.appendChild(spanDelete);
    ulStateElement.appendChild(liElement);
    // add the state parameter to the array
    userStates.push(state);
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
  // feature to add: check if button submit exists I dont add more that one
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
    var inputText = document.getElementById('get-state').value;
    doFetchForCheckStateName(inputText);
    // addLiToUl()
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

function startGame() {

  // activate input
  var inputElement = document.getElementById('get-state');
  inputElement.disabled = false;
  // activate button to add state
  var buttonAdd = document.getElementById('add-state');
  buttonAdd.disabled = false;
  inputElement.focus();
  countDown();
}

function getStartGameButton() {
  var button = document.getElementById('btn-start-game');
  button.setAttribute('onClick', 'startGame()');
}

function countDown() {
  // variables to reset the timer when time runs out
  var startingMinutes = parseInt(document.getElementById('minutes').textContent, 10);
  var startingSeconds = parseInt(document.getElementById('seconds').textContent, 10);

  // grab minutes and seconds from span and convert them to integer
  var minutes = startingMinutes;
  var seconds = startingSeconds;

  // grab elements to update the span tags
  var minutesElement = document.getElementById('minutes');
  var secondsElement = document.getElementById('seconds');

  //  interval to execute this timeleft every 1 seconds
  var tiempo = setInterval(timeLeft, 1000);

  // Decreased timer
  function timeLeft() {
    console.log(seconds);
    if (seconds <= 0) {
      seconds = startingSeconds + 1;
      if (checkMinutes(minutes)) {
        return;
      }
      minutes--;
      minutesElement.innerText = minutes;
    }
    seconds--;
    secondsElement.innerText = seconds;
  }

  //
  function checkMinutes(minutes) {
    if (minutes == 0) {
      console.log('Game Over');
      // deactivate input
      var inputElement = document.getElementById('get-state');
      inputElement.disabled = true;
      alert('Times up');
      clearInterval(tiempo);
      // reset minutes and seconds
      minutesElement.innerText = startingMinutes;
      secondsElement.innerText = startingSeconds;
      return true;
    }
  }
}

// listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  formatBody();
});