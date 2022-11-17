export class MatrixMultiplicationService {
  mTable: any[][];
  pTable: any[][];
  matrixQuantity: number;
  dimensions: any[];

  constructor() {
    this.mTable = new Array();
    this.pTable = new Array();
    this.matrixQuantity = 0;
    this.dimensions = new Array();
  }

  getMTable() {
    return this.mTable;
  }

  getPTable() {
    return this.pTable;
  }

  getDimensions() {
    return this.dimensions;
  }

  addDimension(dimension: number) {
    this.dimensions.push(dimension);
    this.matrixQuantity += 1;
  }

  getMatrixQuantity() {
    return this.matrixQuantity;
  }

  setMatrixQuantity(quantity: number) {
    this.matrixQuantity = quantity;
    this.mTable = this.setMatrixSize(this.matrixQuantity);
    this.pTable = this.setMatrixSize(this.matrixQuantity);
  }

  executeMatrixOptimization() {
    let limit = this.mTable.length;

    // Sets base cases: A[i][i] = pi
    for (let i = 0; i < limit; i++) {
      for (let j = 0; j < limit; j++) {
        if (i == j - 1) {
          //this.aTable[i][j] = this.keys[i].value;
          this.mTable[i][j] =
            this.dimensions[i] *
            this.dimensions[i + 1] *
            this.dimensions[i + 2];
          this.pTable[i][j] = i + 1;
        }
      }
    }
    // Applies formula: M[i][j] = min (M[i][k] + A[k+1][j] + di-1 * dj * dk )
    console.log('LIMIT IS: ' + limit);
    let index = 0;
    //while (this.isTableInComplete) {

    while (index < limit) {
      let i = 0;
      while (i < limit) {
        let j = 0;
        while (j < limit) {
          let k = i;
          if (this.mTable[i][j] == -1) {
            this.mTable[i][j] = this.computeMinValue(k, i, j);
            //this.mTable[i][j] = this.roundNum(this.computeMinValue(k, i, j));
            j = limit;
          } else {
            j++;
          }
        }
        i++;
      }
      index++;
    }

    return this.mTable;
  }

  copyIndex(index: number) {
    let res = 0;
    while (res < index) {
      res++;
    }
    return res;
  }

  computeMinValue(k: number, i: number, j: number) {
    //this.aTable[i][j] = this.aTable[i][k-1] + this.aTable[k+1][j]
    let values: number[] = new Array();
    let kValues: number[] = new Array();
    console.log('COMPUTING: M[' + (i + 1) + '][' + (j + 1) + ']');
    while (k < j) {
      let cost = 1;
      // Multiplies: di-1 * dj * dk
      console.log(i + ' - ' + (j + 1) + ' - ' + (k + 1));
      console.log(
        this.dimensions[i] +
          ' * ' +
          this.dimensions[j + 1] +
          ' * ' +
          this.dimensions[k + 1]
      );

      cost =
        this.dimensions[i] * this.dimensions[j + 1] * this.dimensions[k + 1];
      console.log(
        '\tCOMPUTING: M[' +
          (i + 1) +
          '][' +
          (k + 1) +
          ']' +
          ' + M[' +
          (k + 2) +
          '][' +
          (j + 1) +
          ']' +
          ' + ' +
          cost
      );
      console.log(
        '\t' + this.mTable[i][k] + ' + ' + this.mTable[k + 1][j] + ' + ' + cost
      );
      console.log('COSTS IS: ' + cost);
      kValues.push(k);
      values.push(this.mTable[i][k] + this.mTable[k + 1][j] + cost);
      k++;
    }

    console.log('VALUES TO GET MIN FROM ARE: ' + values);
    return this.getMinValue(values, kValues, i, j);
  }

  getMinValue(values: number[], kValues: number[], i: number, j: number) {
    let res = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i] < res) {
        res = values[i];
      }
    }
    this.pTable[i][j] = kValues[values.indexOf(res)] + 1;
    return res;
  }

  roundNum(num: any) {
    var cant = 3;
    var s = num.toString();
    var l = s.length;
    var decimalLength = s.indexOf('.') + 1;

    if (l - decimalLength <= cant) {
      return num;
    }

    var isNeg = num < 0;
    var decimal = num % 1;
    var entera = isNeg ? Math.ceil(num) : Math.floor(num);

    var decimalFormated = Math.floor(Math.abs(decimal) * Math.pow(10, cant));

    var finalNum =
      entera + (decimalFormated / Math.pow(10, cant)) * (isNeg ? -1 : 1);

    return finalNum;
  }

  setMatrixSize(rows: number) {
    let newMatrix: any[][] = new Array();
    for (let i = 0; i < rows; i++) {
      let row: any[] = new Array();
      for (let j = 0; j < rows; j++) {
        // Base case: A[i][i-1] = 0 & A[j+1][j] = 0
        if (i == j) {
          row[j] = 0;
        } else if (j < i) {
          row[j] = '-';
        } else {
          row[j] = -1;
        }
      }
      newMatrix.push(row);
    }
    return newMatrix;
  }
}
