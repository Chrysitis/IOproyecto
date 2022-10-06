export class StateTables {
  state: number;
  stateTable: number[][];
  pTable: number[][];

  constructor(state: number, stateTable: number[][], pTable: number[][]) {
    this.state = state;
    this.stateTable = stateTable;
    this.pTable = pTable;
  }

  getState() {
    return this.state;
  }

  getStateTable() {
    return this.stateTable;
  }

  getPTable() {
    return this.pTable;
  }
}
