import { Key } from './search-binary-trees.component';

export class SearchBinaryTreesService {
  keys: any[];
  aTable: any[][];
  rTable: any[][];
  maxKeys: number;
  totalWeight: number;

  constructor() {
    this.keys = new Array();
    this.aTable = new Array();
    this.rTable = new Array();
    this.maxKeys = 0;
    this.totalWeight = 0;
  }

  addKey(newKey: Key) {
    this.totalWeight += newKey.value;
    this.keys.push(newKey);
    this.sortKeys();
  }

  getKeys() {
    return this.keys;
  }

  getATable() {
    return this.aTable;
  }

  getRTable() {
    return this.rTable;
  }

  getMaxKeys() {
    return this.maxKeys;
  }
  setMaxKeys(max: number) {
    this.maxKeys = max;
  }

  executeTreeOptimization() {
    this.aTable = this.setMatrixSize(this.maxKeys);
    this.rTable = this.setMatrixSize(this.maxKeys);

    let limit = this.aTable.length;
    // Sets base cases: A[i][i] = pi
    for (let i = 0; i < limit; i++) {
      for (let j = 0; j < limit; j++) {
        if (i == j - 1) {
          //this.aTable[i][j] = this.keys[i].value;
          this.aTable[i][j] = this.roundNum(this.keys[i].value);
          this.rTable[i][j] = i + 1;
        }
      }
    }

    // Applies formula: min (A[i][k-1] + A[k+1][j] + pi + ... + pk + ... + pj )
    console.log('LIMIT IS: ' + limit);
    let index = 0;
    //while (this.isTableInComplete) {
    while (index < limit) {
      this.printMatrix(this.aTable);
      console.log('WHILE (this.isTableInComplete)');
      let i = 0;
      while (i < limit) {
        console.log('WHILE (i < limit) ');
        let j = 0;
        while (j < limit) {
          console.log('WHILE (j < limit) ');
          let k = i;
          if (this.aTable[i][j] == -1) {
            //this.aTable[i][j] = this.computeMinValue(k, i, j);
            this.aTable[i][j] = this.roundNum(this.computeMinValue(k, i, j));
            j = limit;
          } else {
            j++;
          }
        }
        i++;
      }
      index++;
    }

    console.log('MATRIX IS: ' + this.aTable);
    return this.aTable;
  }

  printMatrix(matrix: any[][]) {
    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i]);
    }
  }

  isTableInComplete() {
    let j = this.aTable.length;
    return this.aTable[0][j] == -1;
  }
  computeMinValue(k: number, i: number, j: number) {
    //this.aTable[i][j] = this.aTable[i][k-1] + this.aTable[k+1][j]
    let values: number[] = new Array();
    let kValues: number[] = new Array();
    let prob = 0;
    // Add probabilities from pi + ... + pk + ... pj
    for (let x = i; x < j; x++) {
      prob += this.keys[x].value;
    }
    while (k < j) {
      console.log('WHILE (k < j) ');
      kValues.push(k);
      values.push(this.aTable[i][k] + this.aTable[k + 1][j] + prob);
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
    this.rTable[i][j] = kValues[values.indexOf(res)] + 1;
    return res;
  }

  setProbabilities() {
    let limit = this.keys.length;
    let full = 0;
    for (let i = 0; i < limit; i++) {
      //this.keys[i].value = this.roundNum(this.keys[i].value / this.totalWeight);
      this.keys[i].value = this.keys[i].value / this.totalWeight;
      full += this.keys[i].value;
    }
    /*
    console.log('PROBABILITIES SUM IS: ' + full);

    console.log('PROBABILITIES ARE: ');
    for (let i = 0; i < this.keys.length; i++) {
      console.log(this.keys[i].name + ' - ' + this.keys[i].value);
    }
    */
  }
  sortKeys() {
    this.keys = this.keys.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
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
    for (let i = 0; i <= rows; i++) {
      let row: any[] = new Array();
      for (let j = 0; j <= rows; j++) {
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
