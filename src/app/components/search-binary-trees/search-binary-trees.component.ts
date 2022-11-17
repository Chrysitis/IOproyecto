import { Component, OnInit } from '@angular/core';
import { SearchBinaryTreesService } from './search-binary-trees.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type Key = {
  name: string;
  value: number;
};

@Component({
  selector: 'app-search-binary-trees',
  templateUrl: './search-binary-trees.component.html',
  styleUrls: ['./search-binary-trees.component.css'],
})
export class SearchBinaryTreesComponent implements OnInit {
  SBTservice: SearchBinaryTreesService;
  keyNames: any[];
  keyValues: any[];
  keys: any[];
  aTable: any[][];
  rTable: any[][];
  mode: boolean;
  maxKeys: number;
  keysQuantity: number;
  fileInfo: any[];
  errMessage: MatSnackBar;

  constructor(private messageSnackBar: MatSnackBar) {
    this.SBTservice = new SearchBinaryTreesService();
    this.keyNames = new Array();
    this.keyValues = new Array();
    this.keys = new Array();
    this.aTable = this.SBTservice.getATable();
    this.rTable = this.SBTservice.getRTable();
    this.mode = false;
    this.maxKeys = 0;
    this.keysQuantity = 0;
    this.fileInfo = new Array();
    this.errMessage = messageSnackBar;
  }

  ngOnInit(): void {}

  setMaxKeys(maxKeys: string) {
    this.SBTservice.setMaxKeys(Number(maxKeys));
    this.maxKeys = this.SBTservice.getMaxKeys();
  }

  setMode(mode: string) {
    if (mode == '0') {
      this.mode = false;
    } else {
      this.mode = true;
    }
  }

  executeAlgo() {
    if (!this.mode) {
      this.SBTservice.setProbabilities();
    }
    this.aTable = this.SBTservice.executeTreeOptimization();
    this.rTable = this.SBTservice.getRTable();
  }
  insertKey(keyName: string, keyValue: string) {
    let newKey: Key = {
      name: keyName,
      value: Number(keyValue),
    };
    if (this.keysQuantity < this.maxKeys) {
      this.SBTservice.addKey(newKey);
      this.keys = this.SBTservice.getKeys();
      this.keysQuantity += 1;
      console.log('SORTED KEYS OBJECTS ARRAYS IS: ');

      for (let i = 0; i < this.keys.length; i++) {
        console.log(this.keys[i].name + ' - ' + this.keys[i].value);
      }
    } else {
      this.messageSnackBar.open('THE MAX NUMBER OF KEYS IS MET.', 'Got it!', {
        duration: 5000,
      });
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

  /**
   * Uploads file chosen and sets the program with configuration it contains.
   */
  uploadFile() {
    console.log('DATA FROM JSON: ' + this.fileInfo);
    let i = 5;
    let limit = this.fileInfo.length;
    this.setMaxKeys(this.fileInfo[1]);
    this.setMode(this.fileInfo[2]);
    while (i < limit) {
      if (this.fileInfo[i] != undefined) {
        console.log(
          'OBJECT ATTRIBUTES ARE: ' +
            this.fileInfo[i] +
            ' - ' +
            this.fileInfo[i + 1]
        );
        this.insertKey(this.fileInfo[i], this.fileInfo[i + 1]);
        i++;
      }
      i++;
    }
    this.executeAlgo();
  }

  /**
   * Creates a file with the algorithm configuration and saves it in .json syntax.
   */
  saveFile() {
    let content = '[\n{\n';
    content += '"max":';
    content += '"' + this.maxKeys + '",\n';
    content += '"mode": "';
    content += this.mode ? '1' : '0';
    content += '"\n},';
    for (let i = 0; i < this.keys.length - 1; i++) {
      content += '\n{\n';
      content += '"key":';
      content += '"' + this.keys[i].name + '",\n';
      content += '"value":';
      content += '"' + this.keys[i].value;
      content += '"\n},';
    }
    content += '\n{\n';
    content += '"key":';
    content += '"' + this.keys[this.keys.length - 1].name + '",\n';
    content += '"value":';
    content += '"' + this.keys[this.keys.length - 1].value;
    content += '"\n}\n]';
    let FileSaver = require('file-saver');
    let file = new File([content], 'searchBinaryTrees.json', {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(file);
  }
  downloadConfiguration() {
    this.saveFile();
  }
}
