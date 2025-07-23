let gridContainer = document.querySelector(".gridContainer");
let slider = document.querySelector("#slider");
let resetBtn = document.querySelector("#resetBtn");
let colorBtn = document.querySelector("#colorBtn");
let mouseDown = false;
let randomColors = false;

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
            if (mouseDown) {
                if (!randomColors) {
                    e.target.style.background = "black";
                } else {
                    e.target.style.background = getRandomColor();
                }
            }
        })
        pixel.addEventListener("mousedown", (e) => {
            if (!randomColors)  {
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
    mouseDown = true;
})

document.addEventListener("mouseup", (e) => {
    mouseDown = false;
})

resetBtn.addEventListener("click", (e) => {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.style.background = "white";
    })
})

colorBtn.addEventListener("click", () => {
    randomColors ? randomColors = false : randomColors = true;
})