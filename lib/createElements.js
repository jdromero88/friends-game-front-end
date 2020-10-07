'use strict';

function createPElement() {
  return document.createElement('p');
}

function createHElement() {
  return document.createElement('h1');
}

function createULElement() {
  return document.createElement('ul');
}

function createLIElement() {
  return document.createElement('li');
}

function createH2Element() {
  return document.createElement('h2');
}

function createInputElement() {
  return document.createElement('input');
}

function createButton() {
  return document.createElement('button');
}

function createSpanElement() {
  return document.createElement('span');
}

function createIconFaMap() {
  var faMapIcon = document.createElement('i');
  faMapIcon.classList.add('fas', 'fa-map-marker-alt');
  return faMapIcon;
}

function createIconFaTrashAlt() {
  return document.createElement('i');
}

function createFieldSet() {
  return document.createElement('fieldset');
}
function createDiv() {
  return document.createElement('div');
}

function createFigure() {
  return document.createElement('figure');
}

function createIframe() {
  return document.createElement('iframe');
}

function createTimerDiv() {
  var timerDiv = createDiv();
  timerDiv.id = 'timer';
  timerDiv.innerHTML = '\n  <div class="box">\n    <p>\n      <span class=\'tag\' id=\'minutes\'>5</span>:<span class=\'tag\' id=\'seconds\'>59</span>\n    </p>\n    <button class="button is-success" id=\'btn-start-game\'>Start</button>\n  </div>';
  return timerDiv;
}