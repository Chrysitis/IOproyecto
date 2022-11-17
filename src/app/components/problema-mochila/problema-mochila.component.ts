import { Component, OnInit } from '@angular/core';
import { knapsackService } from './problema-mochila.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-problema-mochila',
  templateUrl: './problema-mochila.component.html',
  styleUrls: ['./problema-mochila.component.css'],
})
export class ProblemaMochilaComponent implements OnInit {
  knapsack: knapsackService;
  solutionMatrix: any[][];
  colorMatrix: any[][];
  objects: any[];
  objectsAttributes: any[][];
  errMessage: MatSnackBar;
  fileInfo: any[];

  constructor(private messageSnackBar: MatSnackBar) {
    this.knapsack = new knapsackService();
    this.solutionMatrix = this.knapsack.getSolutionMatrix();
    this.colorMatrix = this.knapsack.getColorMatrix();
    this.objects = this.knapsack.getObjects();
    this.objectsAttributes = this.knapsack.getObjectsAttributes();
    this.errMessage = messageSnackBar;
    this.fileInfo = new Array();
  }

  ngOnInit(): void {}

  addObject(objectName: string, objectValue: string, objectWeight: string) {
    if (objectName != '' && objectValue != '' && objectWeight != '') {
      if (!this.objects.includes(objectName)) {
        let objectValueNumber = Number(objectValue);
        let objectWeightNumber = Number(objectWeight);
        let newObject = [objectName, objectValueNumber, objectWeightNumber];
        this.knapsack.addObject(newObject);
        this.solutionMatrix = this.knapsack.getSolutionMatrix();
      } else {
        this.messageSnackBar.open('The object already exists.', 'Got it!', {
          duration: 5000,
        });
      }
    } else {
      this.messageSnackBar.open('All values must be specified.', 'Got it!', {
        duration: 5000,
        verticalPosition: 'top',
      });
    }
  }

  setKnapsackCapacity(capacity: string) {
    let capacityNum = Number(capacity);
    this.knapsack.setCapacity(capacityNum);
    this.solutionMatrix = this.knapsack.getSolutionMatrix();
    /*
    if (capacityNum <= 0 || capacityNum > 10) {
      this.messageSnackBar.open(
        'Knapsack capactiy must be between 1 and 10, inclusive',
        'Got it!',
        {
          duration: 5000,
        }
      );
    } else {
      this.knapsack.setCapacity(capacityNum);
      this.solutionMatrix = this.knapsack.getSolutionMatrix();
      this.messageSnackBar.open(
        'Knapsack capacity set to ' + capacity,
        'Got it!',
        {
          duration: 5000,
        }
      );
    }
    */
  }

  resetKnapsackCapacity() {
    this.knapsack.resetAttributes();
    console.log('AFTER RESETTING: ');
    console.log('OBJECTS: ' + this.knapsack.getObjects());
    console.log('SOLUTION MATRIX: ' + this.knapsack.getSolutionMatrix());
  }

  solve() {
    this.solutionMatrix = this.knapsack.knapsackProblem1_0();
    let array = [1, 2, 3, 4, 5, 6, 7];
    var result = array.flatMap((v, i) => array.slice(i + 1).map((w) => v + w));

    //console.log(this.subarray(array));
    //array.push(10, 11, 12);
    console.log(array);
  }

  getClassColor(i: number, j: number) {
    //return this.colorMatrix[i][j];
    return this.knapsack.getColorMatrix()[i][j];
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
    this.setKnapsackCapacity(this.fileInfo[1]);
    //this.insertMatrix(dimensions[0], dimensions[2]);
    let limit = this.fileInfo.length;
    let i = 4;
    while (i < limit) {
      if (this.fileInfo[i] != '') {
        this.addObject(
          this.fileInfo[i],
          this.fileInfo[i + 1],
          this.fileInfo[i + 2]
        );
        i += 5;
      }
    }
    //this.executeAlgo();
  }

  /**
   * Creates a file with the algorithm configuration and saves it in .json syntax.
   */
  saveFile() {
    let content = '[\n{\n';
    content += '"capacity":';
    content += '"' + this.knapsack.getCapacity() + '"';
    content += '\n},';
    for (let i = 0; i < this.objectsAttributes.length - 1; i++) {
      content += '\n{\n';
      content += '"name":';
      content += '"' + this.objectsAttributes[i][0] + '",\n';
      content += '"value":';
      content += '"' + this.objectsAttributes[i][1] + '",\n';
      content += '"weight":';
      content += '"' + this.objectsAttributes[i][2];
      content += '"\n},';
    }
    content += '\n{\n';
    content += '"name":';
    content +=
      '"' +
      this.objectsAttributes[this.objectsAttributes.length - 1][0] +
      '",\n';
    content += '"value":';
    content +=
      '"' +
      this.objectsAttributes[this.objectsAttributes.length - 1][1] +
      '",\n';
    content += '"weight":';
    content +=
      '"' + this.objectsAttributes[this.objectsAttributes.length - 1][2];
    content += '"\n}\n]';
    let FileSaver = require('file-saver');
    let file = new File([content], 'knapsack.json', {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(file);
  }
  downloadConfiguration() {
    this.saveFile();
  }
}
