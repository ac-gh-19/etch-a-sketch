let gridContainer = document.querySelector(".gridContainer");
let slider = document.querySelector("#slider");
let resetBtn = document.querySelector("#resetBtn");
let colorBtn = document.querySelector("#colorBtn");
let drawBtn = document.querySelector("#drawBtn");
let eraseBtn = document.querySelector("#eraseBtn");
let gridBtn = document.querySelector("#gridBtn");
let interfaceBtns = document.querySelectorAll(".interfaceBtns")
let checkbox = document.querySelector(".colorCheckbox");

let isMouseDown = false;
let isRandomColors = false;
let isDrawing = true;
let isGrid = true;

const retroPixelColors = [
    "rgba(62, 141, 207, 0.7)",   // Electric blue
    "rgba(255, 110, 199, 0.7)",  // Neon pink
    "rgba(0, 255, 197, 0.7)",    // Minty aqua
    "rgba(255, 215, 0, 0.7)",    // Warm gold
    "rgba(184, 51, 255, 0.7)",   // Bright violet
    "rgba(255, 87, 34, 0.7)",    // Retro orange
    "rgba(57, 255, 20, 0.7)",    // Neon green
    "rgba(255, 20, 147, 0.7)",   // Deep pink
    "rgba(64, 224, 208, 0.7)",   // Turquoise
    "rgba(255, 60, 172, 0.7)"    // Flamingo pink
];
  

drawBtn.addEventListener("click", (e) => {
    isDrawing = true;
    drawBtn.style.background = "green";
    eraseBtn.style.background = "red";
})

gridBtn.addEventListener("click", (e) => {
    isGrid = !isGrid;
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        if (isGrid) {
            pixel.style.border =  ".5px solid hsl(0, 0%, 0%, 20%)";
        } else {
            pixel.style.border = "none";
        }
    })
    isGrid ? gridBtn.style.background = "green" : gridBtn.style.background = "red";
})

eraseBtn.addEventListener("click", (e) => {
    isDrawing = false;
        drawBtn.style.background = "red";
        eraseBtn.style.background = "green";
})

// default grid off start
generateGridOfPixels(16);

function getRandomColor() {
    let color = retroPixelColors[Math.floor(Math.random() * retroPixelColors.length)];
    return color;
}

function createRowOfPixels(numInRow) {
    // creates a container where we can push divs into, this
    // allows us to return a whole row to append onto the grid
    let row = document.createElement("div");
    row.style.display = "flex";

    for (let i = 0; i < numInRow; ++i) {
        let newPixel = document.createElement("div");
        newPixel.classList.add("pixel");
        if (!isGrid) newPixel.style.border = "none";
        row.appendChild(newPixel);
    }
    return row;
}

function generateGridOfPixels(num) {
    for (let i = 0; i < num; ++i) {
        let newRow = createRowOfPixels(num);
        gridContainer.appendChild(newRow);
    }

    let pixels = document.querySelectorAll(".pixel");

    // adds event listener for each pixel to highlight when hovered/clicked
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseenter", (e) => {
            if (isMouseDown) {
                if (!isDrawing) {
                    e.target.style.background = "rgb(188, 171, 182)";
                }
                else if (!isRandomColors) {
                    e.target.style.background = "black";
                } else {
                    e.target.style.background = getRandomColor();
                }
            }
        })
        pixel.addEventListener("mousedown", (e) => {
            if (!isDrawing) {
                e.target.style.background = "rgb(188, 171, 182)";
            }
            else if (!isRandomColors)  {
                e.target.style.background = "black";
            } else {
                e.target.style.background = getRandomColor();
            }
        })
    })
}

function clearGrid() {
    gridContainer.textContent = "";
}

slider.addEventListener("input", (e) => {
    clearGrid();
    generateGridOfPixels(e.target.value);
})

document.addEventListener("mousedown", (e) => {
    isMouseDown
 = true;
})

document.addEventListener("mouseup", (e) => {
    isMouseDown
 = false;
})

interfaceBtns.forEach(btn => {
    btn.addEventListener("mousedown", (e) => {
        e.target.style.boxShadow = "0px 0px 6px 1px gray";
    })
    
    btn.addEventListener("mouseup", (e) => {
        e.target.style.boxShadow = "none";
    })
})

resetBtn.addEventListener("click", (e) => {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.style.background = "rgb(188, 171, 182)";
    })
})

colorBtn.addEventListener("click", () => {
    drawBtn.click();
    isRandomColors = !isRandomColors;
    isRandomColors ? colorBtn.style.background = "linear-gradient(to right, " +
    "rgba(62, 141, 207, 0.7), rgba(255, 110, 199, 0.7), rgba(0, 255, 197, 0.7), " +
    "rgba(255, 215, 0, 0.7), rgba(184, 51, 255, 0.7), rgba(255, 87, 34, 0.7), " +
    "rgba(57, 255, 20, 0.7), rgba(255, 20, 147, 0.7), rgba(64, 224, 208, 0.7), " +
    "rgba(255, 60, 172, 0.7))"
    : colorBtn.style.background = "#e7e7e7";
})