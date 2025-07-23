let gridContainer = document.querySelector(".gridContainer");
let pixels = document.querySelector(".pixel");
let slider = document.querySelector("#slider");

// default grid off start
generateGridOfPixels(16);

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
}

function clearGrid() {
    gridContainer.textContent = "";
}

slider.addEventListener("input", (e) => {
    clearGrid();
    generateGridOfPixels(e.target.value);
})
