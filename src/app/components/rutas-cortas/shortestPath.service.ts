import { Graph } from './Floyd/Graph';

export class shortestPathService {
  graph: Graph;
  vertex: string[];
  table: number[];
  tableN: number[][];
  pTable: number[][];
  res: string[] | undefined;
  fileContent: string | ArrayBuffer | null = '';
  vertexId: number;
  constructor() {
    this.graph = new Graph();
    this.vertexId = 0;
    this.vertex = new Array();
    this.table = new Array();
    this.tableN = new Array();
    this.pTable = new Array();
    this.res = new Array();
  }

  addVertex(newVertex: string) {
    this.vertex[this.vertexId] = newVertex;
    this.vertexId++;
    this.tableN = this.updateTableSize();
    this.pTable = this.updateTableSize();
  }

  addLink(vertexOrigin: string, vertexDestiny: string, weight: string) {
    this.tableN[this.vertex.indexOf(vertexOrigin)][
      this.vertex.indexOf(vertexDestiny)
    ] = parseInt(weight, 10);
    this.table[
      this.vertex.indexOf(vertexOrigin) * this.vertex.length +
        this.vertex.indexOf(vertexDestiny)
    ] = parseInt(weight, 10);
  }

  printVertex() {
    let res = '';
    for (let i = 0; i < this.vertex.length; i++) {
      res += this.vertex[i] + '\n';
    }
    return res;
  }

  getVertex() {
    return this.vertex;
  }
  getTable() {
    return this.table;
  }
  getTableN() {
    return this.tableN;
  }
  getPTable() {
    return this.pTable;
  }
  getNodeQuantity() {
    return this.vertex.length;
  }

  updateTableSize() {
    let newMatrix: number[][] = new Array();
    for (let i = 0; i < this.vertex.length; i++) {
      let row: number[] = new Array();
      for (let i = 0; i < this.vertex.length; i++) {
        row[i] = -1;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i < this.vertex.length; i++) {
      for (let j = 0; j < this.vertex.length; j++) {
        if (i == j) {
          newMatrix[i][j] = 0;
        }
      }
    }

    console.log(newMatrix);
    return newMatrix;
  }

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
    };
    fileReader.readAsText(file);
    this.res = this.fileContent?.toString().split(',');
  }

  floydWarshallAlgorithmK(
    stateTable: number[][],
    pTable: number[][],
    state: number
  ) {
    let k = state;
    let i;
    let j;
    let p = state + 1;
    // Pick all vertices as source
    // one by one
    for (i = 0; i < stateTable.length; i++) {
      // Pick all vertices as destination
      // for the above picked source
      for (j = 0; j < stateTable.length; j++) {
        // If vertex k is on the shortest
        // path from i to j, then update
        // the value of dist[i][j]
        if (stateTable[i][j] == -1) {
          if (stateTable[i][k] != -1 && stateTable[k][j] != -1) {
            stateTable[i][j] = stateTable[i][k] + stateTable[k][j];
            pTable[i][j] = p;
          }
        } else if (
          stateTable[i][k] + stateTable[k][j] < stateTable[i][j] &&
          stateTable[k][j] != -1 &&
          stateTable[i][k] != -1 &&
          stateTable[i][j] != -1
        ) {
          stateTable[i][j] = stateTable[i][k] + stateTable[k][j];
          pTable[i][j] = p;
        }
      }
    }
    let res = stateTable;
    //return [res, pTable];
    return res;
  }
}
