'use strict';

class PageComponent {
  constructor(options) {
    this._el = options.el;

    this._el.addEventListener('mousedown', this._onMouseDown.bind(this) );
    this._el.addEventListener('mousemove', this._onMouseMove.bind(this) );
    this._el.addEventListener('mouseup', this._onMouseUp.bind(this) );
  }


  _onMouseDown(event) {
    let dragged = event.target.closest('.draggable');

    if (!dragged) return;

    this._el.draggedEl = dragged;

    let draggedRect = dragged.getBoundingClientRect();

    dragged._shiftX = event.clientX - draggedRect.left;
    dragged._shiftY = event.clientY - draggedRect.top;

   dragged.ondragstart = () => false;
  }

  _onMouseMove(event) {
    let dragged = this._el.draggedEl;

    if (!dragged) return;

    this._move(dragged, event);
  }

  _onMouseUp(event) {
    this._el.draggedEl = null;
  }

  _move(element, event) {
    document.body.appendChild(element);
    element.style.position = 'absolute';

    let left = event.pageX - element._shiftX;
    let top = event.pageY - element._shiftY;

    let elementRect = element.getBoundingClientRect();

    let elementDistanceToTop =  event.clientY - element._shiftY;
    let elementDistanceToBottom =  this._el.clientHeight - (event.clientY - element._shiftY + element.clientWidth);

    if ( elementDistanceToTop < 0 ) { window.scrollBy(0, elementDistanceToTop) } ;
    if ( elementDistanceToBottom < 0 ) { window.scrollBy(0, -elementDistanceToBottom) } ;


    if (left < 0 ) left = 0;
    if (top < 0 )  top = 0;

    element.style.left = left + 'px';
    element.style.top = top + 'px';
  }

}

let pageComp = new PageComponent( {el: document.documentElement} );

//let draggables = Array.from( document.querySelectorAll('.draggable') );

//alert(draggables.length); 

//draggables.forEach( (i) => { alert(new Draggable({el: i}) ) } );
//draggables.forEach( (i) =>  new Draggable( {el: i} ) );    
