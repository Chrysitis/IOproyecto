import { Component, OnInit } from '@angular/core';
import { StateTables } from './Floyd/StateTables';
import { shortestPathService } from './shortestPath.service';

@Component({
  selector: 'app-rutas-cortas',
  templateUrl: './shortestPath.component.html',
  styleUrls: ['./shortestPath.component.css'],
})
export class shortestPathComponent implements OnInit {
  graph: shortestPathService;
  vertex: string[];
  table: number[];
  tableN: number[][];
  pTable: number[][];
  stateTables: StateTables[];
  res: string[] | undefined;
  fileContent: string | ArrayBuffer | null = '';
  linkWeight = '';
  lastVertex: string;
  t: number;
  currentStateTable: number;
  fileToUpload: File | null = null;
  fileInfo: any[];

  constructor(graph: shortestPathService) {
    this.graph = new shortestPathService();
    this.vertex = this.graph.getVertex();
    this.table = this.graph.getTable();
    this.tableN = this.graph.getTableN();
    this.pTable = this.graph.getPTable();
    this.lastVertex = '';
    this.t = 0;
    this.currentStateTable = 0;
    this.res = new Array();
    this.stateTables = new Array();
    this.fileInfo = new Array();
  }

  ngOnInit(): void {}

  addVertex(newVertex: string) {
    this.graph.addVertex(newVertex);
    this.vertex = this.graph.getVertex();
    this.tableN = this.graph.getTableN();
    this.pTable = this.graph.getPTable();
    this.lastVertex = newVertex;
    this.t += 1;
  }

  addVertexLink(vertexOrigin: string, vertexDestiny: string, weight: string) {
    this.graph.addLink(vertexOrigin, vertexDestiny, weight);
    this.table = this.graph.getTable();
    this.tableN = this.graph.getTableN();
    this.pTable = this.graph.getPTable();
  }

  getVertex() {
    return this.graph.getVertex();
  }

  getNodeQuantity() {
    return this.graph.getNodeQuantity();
  }

  getNextStateTable() {
    let prevTable: StateTables = new StateTables(
      this.currentStateTable,
      this.tableN,
      this.pTable
    );
    this.stateTables.push(prevTable);
    let result = this.graph.floydWarshallAlgorithmK(
      this.tableN,
      this.pTable,
      this.currentStateTable
    );
    //console.log('AFTER ALGOTIHM STATE TABLE: ' + result[0]);
    //console.log('AFTER ALGOTIHM P TABLE: ' + result[1]);
    this.tableN = result;
    //this.pTable = result[1];
    this.currentStateTable += 1;
  }

  getPrevStateTable() {
    this.currentStateTable -= 1;
    let state = this.stateTables.pop();
    if (state != undefined) {
      this.currentStateTable = state.getState();
      this.tableN = state.getStateTable();
      this.pTable = state.getPTable();
    }
  }

  chooseFile(event: any): void {
    let fileList: FileList = event.target.files;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let data: any;
    let res = new Array();
    let self = this;
    // Parses file and extracts the important information: games quantity, probabilities and format.
    fileReader.onloadend = function (x) {
      data = fileReader.result;
      let d = data.split('\n');
      console.log('SPLIT BY \\n: ' + d);
      for (let i = 1; i < d.length; i++) {
        let info = d[i].split('"');
        console.log('SPLIT BY \\": ' + info);
        self.fileInfo.push(info[3]);
      }
    };
    fileReader.readAsText(file);
  }

  uploadFile() {
    let limitvertex = this.fileInfo[0].length;
    let limitlinks = this.fileInfo[1].length;
    let i1 = 0;
    let i2 = 0;
    while (i1 < limitvertex) {
      if (this.fileInfo[0][i1] != undefined) {
        this.addVertex(this.fileInfo[0][i1]);
      }
      i1++;
    }
    while (i2 < limitlinks) {
      if (this.fileInfo[1][i2] != undefined) {
        if (
          !isNaN(this.fileInfo[1][i2 + 2]) &&
          !isNaN(this.fileInfo[1][i2 + 3])
        ) {
          console.log('Is a number');
          this.addVertexLink(
            this.fileInfo[1][i2],
            this.fileInfo[1][i2 + 1],
            this.fileInfo[1][i2 + 2] + this.fileInfo[1][i2 + 3]
          );
          i2 = i2 + 4;
          continue;
        }
        if (isNaN(this.fileInfo[1][i2 + 3])) {
          console.log('NaN');
          this.addVertexLink(
            this.fileInfo[1][i2],
            this.fileInfo[1][i2 + 1],
            this.fileInfo[1][i2 + 2]
          );
          i2 = i2 + 3;
        }
      }
    }
  }

  public handleFileInput(files: FileList): void {
    //let file = fileList[0];
    this.fileToUpload = files.item(0);
    /*
    console.log(e.composedPath);
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
    };
    //fileReader.readAsText(file);
    this.res = this.fileContent?.toString().split(',');
  } */
  }
}
