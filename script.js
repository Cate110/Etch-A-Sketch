// DOM elements 
const gridContainer = document.querySelector(".grid-container");
const optionButtons = document.querySelectorAll(".option-button");
const colorSelection = document.querySelector(".color-selector")
let slider = document.querySelector(".size-range");
const clearGrid = document.querySelector("#clear-grid");
let color = "black";

//Function to create the grid
function createGrid (gridSize) {
    let gridArea = gridSize * gridSize;
    for (let i = 0; i < gridArea; i++) {
        let gridElement = document.createElement("div");
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        gridContainer.insertAdjacentElement("beforeend", gridElement);
    }
    let gridCells = gridContainer.querySelectorAll("div");
    gridCells.forEach(gridCell => gridCell.addEventListener("mouseover", colorGrid));
}

//Each color option
function colorGrid() {
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('gray');
            break;  
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('gray');
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('gray');
            break;
    } 
}

// Clear Button
function eraseAllColor() {
    let gridCells = gridContainer.querySelectorAll('div');
    gridCells.forEach(gridCell => gridCell.style.backgroundColor = '#ffffff');
}

// Updates color variable when a color button is clicked
function changeColor(event) {
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'gray':
            color = 'gray';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    } 
}

//Updates the grid size 
function cellSize() {
    let gridCells = gridContainer.querySelectorAll('div');
    gridCells.forEach(gridCell => gridCell.remove());
    createGrid(slider.value);
}


function userColorSelection(event) {
    color = event.target.value;
}

//Range bar and display
let displaySize = document.querySelector('#size-label');
displaySize.textContent = `Grid size: ${slider.value} x ${slider.value}`;
slider.addEventListener('mousemove', function() {
  displaySize.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})

// On page load, default size
createGrid(16);

// Event Listeners
clearGrid.addEventListener('click', eraseAllColor);
optionButtons.forEach(optionButton => optionButton.addEventListener('click', changeColor));
slider.addEventListener('mouseup', cellSize);
colorSelection.addEventListener('change', userColorSelection, false);
colorSelection.addEventListener('input', userColorSelection, false);