import { Graph } from "./Floyd/Graph";
import { GraphNode } from "./Floyd/GraphNode";

export class shortestPathService {

  graph: Graph;
  vertex: string[];
  table: number[]
  tableN: number[][]
  vertexId: number;
  constructor() {
    this.graph = new Graph();
    this.vertexId = 0;
    this.vertex = new Array();
    this.table = new Array();
    this.tableN = new Array();
  }

  addVertex(newVertex: string) {
    let newNode = new GraphNode(newVertex, this.vertexId);
    this.vertex[this.vertexId] = newVertex;
    console.log("VERTEX IS: " + this.vertex);
    this.vertexId++;
  }

  addLink(vertexOrigin: string, vertexDestiny: string, weight: string) {

    this.table[this.vertex.indexOf(vertexOrigin) * this.table.length + this.vertex.indexOf(vertexDestiny)] = parseInt(weight, 10);
    console.log(this.tableN);
  }

  printVertex() {
    let res = "";
    for(let i = 0; i < this.vertex.length; i++) {
      res += this.vertex[i] + "\n"
    }
    return res;
  }

  getVertex() {
    return this.vertex;
  }
  getTable() {
    return this.table;
  }
  getNodeQuantity() {
    return this.vertex.length;
  }

}