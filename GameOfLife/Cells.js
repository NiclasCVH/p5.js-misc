class Cell {
	constructor(x,y,dim,xi,yi) {
		
		//general attributes
		this.startX = x,
		this.startY = y,
		this.endX = x + dim - 1,
		this.endY = y + dim - 1,
		this.dim = dim,
		this.xi = xi,
		this.yi = yi
		this.brightness = 0
		this.isSelected = false

		//Conway's attributes
		this.alive0 = 0
		this.alive1 = 0

	}

	checkNeighbours() {
		var aliveNeighbours = 0
		for (var y = -1; y <= 1; y++) {
			var neighbourYI = this.yi + y;
			for (var x = -1; x <= 1; x++) {
				var neighbourXI = this.xi + x;
				if (neighbourYI > -1 && neighbourYI < cells.length && neighbourXI > -1 && neighbourXI < cells[0].length) {
					if (x !== 0 || y !== 0){
						aliveNeighbours = aliveNeighbours + cells[neighbourYI][neighbourXI].alive0;
					}
				}
			}
		}
		return aliveNeighbours
	}

	returnNeighbours() {
		var neighbours = []
		for (var y = -1; y <= 1; y++) {
			var neighbourYI = this.yi + y;
			for (var x = -1; x <= 1; x++) {
				var neighbourXI = this.xi + x;
				if (neighbourYI > -1 && neighbourYI < cells.length && neighbourXI > -1 && neighbourXI < cells[0].length) {
					if (x !== 0 || y !== 0){
						neighbours.push([neighbourYI,neighbourXI])
					}
				}
			}
		}

		return neighbours
	}

	evolve() {
		var n = this.checkNeighbours()

		if (this.alive0 == 1) {}
			if (n < 2 || n > 3) {
				this.alive1 = 0
			}

		if (this.alive0 == 0) {
			if (n == 3) {
				this.alive1 = 1
			}
		}
	}

	update() {

		if (running == 1) {
			this.alive0 = this.alive1
			this.brightness = this.alive0*255
		} else if (this.isSelected) {
			this.brightness = 255
		} else {
			this.brightness = this.alive1*255
		}

		fill(this.brightness)
		square(this.startX,this.startY,this.dim)
	}
}