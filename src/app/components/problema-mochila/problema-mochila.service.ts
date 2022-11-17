export class knapsackService {
  solutionMatrix: any[][];
  colorMatrix: any[][];
  objects: any[];
  objectsAttributes: any[][];
  result: any[][];
  objectsQnty: number;
  capacity: number;

  constructor() {
    this.solutionMatrix = new Array();
    this.colorMatrix = new Array();
    this.objects = new Array();
    this.objectsAttributes = new Array();
    this.result = new Array();
    this.objectsQnty = 0;
    this.capacity = 0;
  }

  addObject(object: any[]) {
    this.objectsAttributes[this.objectsQnty] = object;
    this.objects.push(object[0]);
    this.objectsQnty += 1;
    this.solutionMatrix = this.setMatrixSize();
    this.colorMatrix = this.setMatrixSize();
    this.colorMatrix = this.setColorMatrix();
    console.log('New object added: ' + this.objects);
    console.log('Solution Matrix: ' + this.solutionMatrix);
  }

  setColorMatrix() {
    let newColorMatrix: any[][] = new Array();
    for (let i = 0; i < this.colorMatrix.length; i++) {
      for (let j = 0; j < this.colorMatrix[i].length; j++) {
        this.colorMatrix[i][j] = 'blank';
      }
    }
    return this.colorMatrix;
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

  getColorMatrix() {
    return this.colorMatrix;
  }

  setCapacity(capacity: number) {
    this.capacity = capacity;
    this.solutionMatrix = this.setMatrixSize();
  }

  getCapacity() {
    return this.capacity;
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
        row[i] = 0;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i <= this.capacity; i++) {
      for (let j = 0; j < this.objects.length; j++) {
        if (i == j) {
          newMatrix[i][j] = 0;
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
      this.colorMatrix[0][i] = 'red';
    }
    // Fill with the current object as soon at it fits.
    while (currentObject < this.objectsQnty) {
      for (let i = 1; i <= this.capacity; i++) {
        if (i >= this.objectsAttributes[currentObject][2]) {
          this.solutionMatrix[i][currentObject] =
            this.objectsAttributes[currentObject][1];
          this.colorMatrix[i][currentObject] = 'green';
        } else {
          this.colorMatrix[i][currentObject] = 'red';
        }
      }

      // If there is room for more than one object, it is replaced by this new value.
      let accumulatedWeight = 0;
      let accumulatedValue = 0;
      let arrObject: any[] = new Array();
      for (let x = 0; x <= currentObject; x++) {
        arrObject.push(x);
        console.log('X: ' + x);
      }
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

          /*
          this.solutionMatrix[i][currentObject] = this.getMaxValue(
            this.subarray(arrObject),
            i
          );
          */
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

  /**
   *
   * @param arr
   * @param weight
   * @returns
   */
  getMaxValue(arr: any[][], weight: number) {
    let values: any[] = new Array();
    for (let i = 0; i < arr.length; i++) {
      //console.log('FIRST FOR ITERATION');
      let accumulatedWeight = 0;
      let accumulatedValue = 0;
      console.log('ARR[i] IS: ' + arr[i]);
      for (let j = 0; j < arr[i].length; j++) {
        //console.log('SECOND FOR ITERATION');
        accumulatedWeight += this.objectsAttributes[i][2];
        accumulatedValue += this.objectsAttributes[i][1];
        console.log('ACCUMULATED VALUE IS: ' + accumulatedValue);
      }
      if (accumulatedWeight <= weight) {
        values.push(accumulatedValue);
      }
    }
    console.log('VALUES TO CHOOSE MAX FROM: ' + values);
    console.log('MAX VALUE: ' + this.maxValue(values));
    return this.maxValue(values);
  }

  /**
   *
   * @param arr
   */
  maxValue(arr: any[]) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= max) {
        max = arr[i];
      }
    }
    return max;
  }

  /**
   *
   * @param arr the array to compute.
   * @returns subarrays of a given array.
   */
  subarray(arr: any[]) {
    let sub: any[] = new Array();
    for (let i = 0; i <= arr.length - 1; i++) {
      for (let j = arr.length - 1; j >= i; j--) {
        sub.push(arr.slice(i, j + 1));
      }
    }
    return sub;
  }
}
