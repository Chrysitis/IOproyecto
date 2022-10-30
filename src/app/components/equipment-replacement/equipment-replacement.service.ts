export class equipmentReplacementService {
  costsTable: any[];
  planningTable: any[][];
  term: number;
  constructor() {
    this.costsTable = new Array();
    this.planningTable = new Array();
    this.term = 0;
  }

  setTables(
    initialCost: number,
    term: number,
    expectancy: number,
    resale: number,
    maintenance: number
  ) {}

  setPlanningTable(term: number) {
    this.term = term;
    this.planningTable = this.setMatrixSize();
  }

  getPlanningTable() {
    return this.planningTable;
  }

  setMatrixSize() {
    let newMatrix: number[][] = new Array();
    for (let i = 0; i <= this.term - 1; i++) {
      let row: number[] = new Array();
      for (let i = 0; i < 3; i++) {
        row[i] = 0;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i <= this.term - 1; i++) {
      for (let j = 0; j < 3; j++) {
        if (j == 0) {
          newMatrix[i][j] = i;
        }
      }
    }
    return newMatrix;
  }
}
