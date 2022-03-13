function PixelArt(rows, columns, element) {
  this.activeColor = 'transparent';
  this.isDragging = false;
  this.element = element;
  this.rows = rows;
  this.columns = columns;
}

PixelArt.prototype.generateRandomColor = function() {
  return '#' + Math.floor(Math.random() * 16777216).toString(16);
}


PixelArt.prototype.fillColor = function(e) {
  if (e.target.matches('.cell')) {
    e.target.style.backgroundColor = activeColor;
  }
}

PixelArt.prototype.setActiveColor = function(e) {
  console.log('here');
  const color = e.target.style.backgroundColor;
  this.activeColor = color;
}

PixelArt.prototype.onMouseDown = function(e) {
  if (e.target.matches('.cell')) {
    e.target.style.backgroundColor = this.activeColor;
    this.isDragging = true;
  }
}

PixelArt.prototype.onMouseUp = function() {
  this.isDragging = false;
}

PixelArt.prototype.onMouseMove = function(e) {
  if (this.isDragging && e.target.matches('.cell')) {
    e.target.style.backgroundColor = this.activeColor;
  }
}

PixelArt.prototype.bindEvents = function(rowsContainer, colorsContainer) {
  rowsContainer.addEventListener('mousedown', this.onMouseDown.bind(this));
  rowsContainer.addEventListener('mousemove', this.onMouseMove.bind(this));
  rowsContainer.addEventListener('mouseup', this.onMouseUp.bind(this));

  colorsContainer.addEventListener('click', this.setActiveColor.bind(this));
}

PixelArt.prototype.init = function() {
  // display grid
  const fragment = document.createDocumentFragment();
  const rowsContainer = document.createElement('div');
  for (let i = 0; i < this.rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    const rowFragment = document.createDocumentFragment();
    for (let j = 0; j < this.columns; j++) {
      const column = document.createElement('div');
      column.classList.add('cell');
      rowFragment.appendChild(column);
    }
    row.appendChild(rowFragment);
    fragment.appendChild(row);
  }
  rowsContainer.appendChild(fragment);

  // display colors
  const colorsContainer = document.createElement('div');
  const colors = document.createElement('div');
  colors.classList.add('row');
  const colorsFragment = document.createDocumentFragment();
  for (let i = 0; i < this.columns; i++) {
    const color = document.createElement('div');
    color.classList.add('cell');
    color.style.backgroundColor = this.generateRandomColor();
    colorsFragment.appendChild(color);
  }
  colors.appendChild(colorsFragment);
  colorsContainer.appendChild(colors);

  this.bindEvents(rowsContainer, colorsContainer);

  // add both to the body
  const el = document.querySelector(this.element);
  el.appendChild(rowsContainer);
  el.appendChild(colorsContainer);
}