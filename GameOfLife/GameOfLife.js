
let numofcells = 30
let gridSize = 20
let canvasSize = numofcells * gridSize
let running = 0

let cells = []

let cursor = [0,0]

function setup() {
	frameRate(8)
	createCanvas(canvasSize,canvasSize)
	createCells(gridSize)
}

function draw() {
	background(0);

	if (running == 0) {
		createGrid(gridSize,255);
	} else {
		createGrid(gridSize,0);
	}

	var n = 0

	if (running == 1) {
		for (var y = 0; y < cells.length; y++) {
			for (var x = 0; x < cells[0].length; x++) {
				if (cells[y][x].alive0 == 1) {
					cells[y][x].evolve();
					n++
					var neighbours = cells[y][x].returnNeighbours()
					for (var neighbour of neighbours) {
						cells[neighbour[0]][neighbour[1]].evolve()
						n++
					}
				}
			}
		}
	}

	print(n)

	for (var y = 0; y < cells.length; y++) {
		for (var x = 0; x < cells[0].length; x++) {
			cells[y][x].update();
		}
	}
}

function mousePressed() {
	//get back to this using modular arithmetic!!
	
	if (mouseX <= width && mouseY <= height) {
		var cursorX = 0
		for (x = 0; x < mouseX; x = x + gridSize) {
			cursorX = x/gridSize
		}

		var cursorY = 0
		for (y = 0; y < mouseY; y = y + gridSize) {
			cursorY = y/gridSize 
		}

		cells[cursor[1]][cursor[0]].isSelected = false

		cursor[0] = cursorX
		cursor[1] = cursorY

		cells[cursor[1]][cursor[0]].isSelected = true
	}
}

function keyPressed() {
	if (keyCode === ENTER){
		if (running == 0) {
			running = 1
		} else {
			running = 0
			for (var y = 0; y < cells.length; y++) {
				for (var x = 0; x < cells[0].length; x++) {
					cells[y][x].alive1 = 0
					cells[y][x].alive0 = 0
				}
			}
		}
	}

	cells[cursor[1]][cursor[0]].isSelected = false

	if (keyCode === LEFT_ARROW && cursor[0] > 0) {
		cursor[0] = cursor[0] - 1
	}

	if (keyCode === RIGHT_ARROW && cursor[0] < cells[0].length) {
		cursor[0] = cursor[0] + 1
	}

	if (keyCode === UP_ARROW && cursor[1] > 0) {
		cursor[1] = cursor[1] - 1
	}

	if (keyCode === DOWN_ARROW && cursor[1] < cells.length) {
		cursor[1] = cursor[1] + 1
	}

	cells[cursor[1]][cursor[0]].isSelected = true

	if (keyCode === 32) {
		cells[cursor[1]][cursor[0]].alive0 = 1
		cells[cursor[1]][cursor[0]].alive1 = 1
	}

}

function createGrid(size,color) {

	stroke(color)
	for (var x = 0; x <= width; x = x + size) {
		line(x,0,x,height)
	}

	for (var y = 0; y <= height; y = y + size) {
		line(0,y,width,y)
	}
}

function createCells(size) {
	for (var y = 0; y < height; y = y + size) {
		cells[y/size] = []
		for (var x = 0; x < width; x = x + size) {
			cells[y/size][x/size] = new Cell(x,y,size,x/size,y/size)
		}
	}
}
