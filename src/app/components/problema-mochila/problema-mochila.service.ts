export class knapsackService {
  solutionMatrix: any[][];
  objects: any[];
  objectsAttributes: any[][];
  result: any[][];
  objectsQnty: number;
  capacity: number;

  constructor() {
    this.solutionMatrix = new Array();
    this.objects = new Array();
    this.objectsAttributes = new Array();
    this.result = new Array();
    this.objectsQnty = 0;
    this.capacity = 0;
  }

  addObject(object: any[]) {
    this.objectsAttributes[this.objectsQnty] = object;
    this.objects.push(object[0]);
    this.solutionMatrix = this.setMatrixSize();
    this.objectsQnty += 1;
    console.log('New object added: ' + this.objects);
    console.log('Solution Matrix: ' + this.solutionMatrix);
  }

  getObjects() {
    return this.objects;
  }

  getResult() {
    return this.result;
  }

  getSolutionMatrix() {
    return this.solutionMatrix;
  }

  getObjectsAttributes() {
    return this.objectsAttributes;
  }

  setCapacity(capacity: number) {
    this.capacity = capacity;
    this.solutionMatrix = this.setMatrixSize();
  }

  resetAttributes() {
    //this.objects.forEach(this.objects.pop());
    this.objects.length = 0;
    this.solutionMatrix.length = 0;
    this.capacity = 0;
  }

  setMatrixSize() {
    let newMatrix: number[][] = new Array();
    for (let i = 0; i <= this.capacity; i++) {
      let row: number[] = new Array();
      for (let i = 0; i < this.objects.length; i++) {
        row[i] = -1;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i <= this.capacity; i++) {
      for (let j = 0; j < this.objects.length; j++) {
        if (i == j) {
          newMatrix[i][j] = -1;
        }
      }
    }
    return newMatrix;
  }

  knapsackProblem1_0() {
    let currentObject = 0;
    // Fill base cases. ( 0 capacity )
    for (let i = 0; i < this.objectsQnty; i++) {
      this.solutionMatrix[0][i] = 0;
    }
    while (currentObject < this.objectsQnty) {
      // Fill with the current object as soon at it fits.
      for (let i = 1; i <= this.capacity; i++) {
        if (i >= this.objectsAttributes[currentObject][2])
          this.solutionMatrix[i][currentObject] =
            this.objectsAttributes[currentObject][1];
      }

      // If there is room for more than one object, it is replaced by this new value.
      let accumulatedWeight = 0;
      let accumulatedValue = 0;
      for (let k = 0; k <= currentObject; k++) {
        accumulatedWeight += this.objectsAttributes[k][2];
        accumulatedValue += this.objectsAttributes[k][1];
        for (let i = 1; i < this.capacity; i++) {
          if (
            accumulatedWeight <= i &&
            this.solutionMatrix[i][currentObject] <= accumulatedValue
          ) {
            this.solutionMatrix[i][currentObject] = accumulatedValue;
          } else {
            accumulatedValue -= this.objectsAttributes[k][1];
          }
        }
      }

      // If the field of the previous column is higher, then it is replaced by said value.
      for (let i = 1; i <= this.capacity; i++) {
        for (let j = 1; j <= this.objectsQnty; j++) {
          if (this.solutionMatrix[i][j] < this.solutionMatrix[i][j - 1]) {
            this.solutionMatrix[i][j] = this.solutionMatrix[i][j - 1];
          }
        }
      }
      currentObject += 1;
    }

    return this.solutionMatrix;
  }
}
