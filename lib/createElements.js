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
  // let faTrashAltIcon = document.createElement('i')
  // faTrashAltIcon.classList.add('far', 'fa-trash-alt')
  // return faTrashAltIcon
}

function createFieldSet() {
  return document.createElement('fieldset');
}
function createDiv() {
  return document.createElement('div');
}