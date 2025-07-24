let gridContainer = document.querySelector(".gridContainer");
let slider = document.querySelector("#slider");
let resetBtn = document.querySelector("#resetBtn");
let colorBtn = document.querySelector("#colorBtn");
let drawBtn = document.querySelector("#drawBtn");
let eraseBtn = document.querySelector("#eraseBtn");
let interfaceBtns = document.querySelectorAll(".interfaceBtns")
let checkbox = document.querySelector(".colorCheckbox");

let isMouseDown = false;
let isRandomColors = false;
let isDrawing = true;

drawBtn.addEventListener("click", (e) => {
    isDrawing = true;
    drawBtn.style.background = "green";
    eraseBtn.style.background = "red";
})

eraseBtn.addEventListener("click", (e) => {
    isDrawing = false;
        drawBtn.style.background = "red";
        eraseBtn.style.background = "green";
})

// default grid off start
generateGridOfPixels(16);

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r}, ${g}, ${b})`;
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
                    e.target.style.background = "white";
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
                e.target.style.background = "white";
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
        pixel.style.background = "white";
    })
})

colorBtn.addEventListener("click", () => {
    isRandomColors = !isRandomColors;
    isRandomColors ? colorBtn.style.background = "linear-gradient(to right, "
    + "rgba(255, 0, 0, 0.5), rgba(255, 165, 0, 0.5),rgba(255, 255, 0, 0.5), "
    + "rgba(0, 128, 0, 0.5), rgba(0, 0, 255, 0.5), rgba(128, 0, 128, 0.5), "
    + "rgba(255, 105, 180, 0.5))" :
    colorBtn.style.background = "#e7e7e7";
})