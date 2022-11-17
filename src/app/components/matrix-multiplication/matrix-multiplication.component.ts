import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatrixMultiplicationService } from './matrix-multiplication.service';

interface MyObj {
  myString: string;
  myNumber: number;
}

let obj: MyObj = JSON.parse('{ "myString": "string", "myNumber": 4 }');

@Component({
  selector: 'app-matrix-multiplication',
  templateUrl: './matrix-multiplication.component.html',
  styleUrls: ['./matrix-multiplication.component.css'],
})
export class MatrixMultiplicationComponent implements OnInit {
  mtService: MatrixMultiplicationService;
  mTable: any[][];
  pTable: any[][];
  matrixQuantity: number;
  dimensions: any[];
  iMatrix: number;
  fileInfo: any[];
  errMessage: MatSnackBar;

  constructor(private messageSnackBar: MatSnackBar) {
    this.mtService = new MatrixMultiplicationService();
    this.mTable = this.mtService.getMTable();
    this.pTable = this.mtService.getPTable();
    this.matrixQuantity = 0;
    this.dimensions = new Array();
    this.iMatrix = 0;
    this.fileInfo = new Array();
    this.errMessage = messageSnackBar;
  }

  ngOnInit(): void {}

  insertMatrix(rows: string, columns: string) {
    if (this.iMatrix < this.matrixQuantity) {
      if (this.dimensions.length == 0) {
        this.mtService.addDimension(Number(rows));
      }
      this.mtService.addDimension(Number(columns));
      this.iMatrix += 1;
      this.dimensions = this.mtService.getDimensions();
      console.log('Dimensions: ' + this.dimensions);
    } else {
      this.messageSnackBar.open(
        'THE MAX NUMBER OF MATRIXES IS MET.',
        'Got it!',
        {
          duration: 5000,
        }
      );
    }
  }

  setMatrixQuantity(quantity: string) {
    this.mtService.setMatrixQuantity(Number(quantity));
    this.matrixQuantity = this.mtService.getMatrixQuantity();
    this.mTable = this.mtService.getMTable();
    this.pTable = this.mtService.getPTable();
  }

  executeAlgo() {
    this.mtService.executeMatrixOptimization();
    this.mTable = this.mtService.getMTable();
    this.pTable = this.mtService.getPTable();
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

  /**
   * Uploads file chosen and sets the program with configuration it contains.
   */
  uploadFile() {
    console.log('DATA FROM JSON: ' + this.fileInfo);
    this.setMatrixQuantity(this.fileInfo[0]);
    let dimensions = this.fileInfo[1];
    this.insertMatrix(dimensions[0], dimensions[2]);
    for (let i = 4; i < dimensions.length; i++) {
      if (dimensions[i] != 'x') {
        this.insertMatrix(dimensions[i - 1], dimensions[i]);
      }
    }
    //this.executeAlgo();
  }

  /**
   * Creates a file with the algorithm configuration and saves it in .json syntax.
   */
  saveFile() {
    let content = '{\n';
    content += '"matrixes":';
    content += '"' + this.matrixQuantity + '",\n';
    content += '"dimensions": "';
    for (let i = 0; i < this.dimensions.length - 1; i++) {
      content += this.dimensions[i] + 'x';
    }
    content += this.dimensions[this.dimensions.length - 1];
    content += '"\n}';
    let FileSaver = require('file-saver');
    let file = new File([content], 'matrixMultOptimization.json', {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(file);
  }
  downloadConfiguration() {
    this.saveFile();
  }
}
