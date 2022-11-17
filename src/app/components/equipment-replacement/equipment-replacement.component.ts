import { Component, OnInit } from '@angular/core';
import { equipmentReplacementService } from './equipment-replacement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-equipment-replacement',
  templateUrl: './equipment-replacement.component.html',
  styleUrls: ['./equipment-replacement.component.css'],
})
export class EquipmentReplacementComponent implements OnInit {
  ERService: equipmentReplacementService;
  costsTable: any[];
  planningTable: any[][];
  replacementPlanTable: any[][];
  resaleTable: number[];
  maintenanceTable: number[];
  cost: number;
  term: number;
  expectancy: number;
  currentYear: number;
  errMessage: MatSnackBar;
  fileInfo: any[];

  constructor(private messageSnackBar: MatSnackBar) {
    this.ERService = new equipmentReplacementService();
    this.costsTable = new Array();
    this.planningTable = new Array();
    this.replacementPlanTable = new Array();
    this.resaleTable = new Array();
    this.maintenanceTable = new Array();
    this.currentYear = 0;
    this.cost = 0;
    this.term = 0;
    this.expectancy = 0;
    this.errMessage = messageSnackBar;
    this.fileInfo = new Array();
  }

  ngOnInit(): void {}

  setTables(cost: string, term: string, expectancy: string) {
    this.cost = Number(cost);
    this.term = Number(term);
    this.expectancy = Number(expectancy);
    this.ERService.setPlanningTable(this.cost, this.term, this.expectancy);
    this.planningTable = this.ERService.getPlanningTable();
  }

  setYearValues(resale: string, maintenance: string) {
    this.resaleTable.push(Number(resale));
    this.maintenanceTable.push(Number(maintenance));
    if (this.currentYear < this.term) {
      this.ERService.modifyPlanningTableEntry(
        Number(resale),
        Number(maintenance),
        this.currentYear
      );
      this.currentYear += 1;
    } else {
      this.messageSnackBar.open('THE TABLE IS ALREADY FULL', 'Got it!', {
        duration: 5000,
      });
    }
  }

  executeERAlgo() {
    this.costsTable = this.ERService.computeCostsTable(
      this.resaleTable,
      this.maintenanceTable
    );
    console.log('COST TABLE IS: ' + this.costsTable);
    this.replacementPlanTable = this.ERService.equipmentReplacementAlgo();
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
    let i = 6;
    let limit = this.fileInfo.length;
    this.setTables(this.fileInfo[1], this.fileInfo[2], this.fileInfo[3]);

    while (i < limit) {
      if (this.fileInfo[i] != '') {
        console.log(
          'OBJECT ATTRIBUTES ARE: ' +
            this.fileInfo[i] +
            ' - ' +
            this.fileInfo[i + 1]
        );
        this.setYearValues(this.fileInfo[i], this.fileInfo[i + 1]);
        i += 3;
      }
      i++;
    }
    this.executeERAlgo();
  }
  /**
   * Creates a file with the algorithm configuration and saves it in .json syntax.
   */
  saveFile() {
    let content = '[\n{\n';
    content += '"cost":';
    content += '"' + this.cost + '",\n';
    content += '"term":"';
    content += this.term + '",\n';
    content += '"expectancy":';
    content += '"' + this.expectancy + '"';
    content += '\n},';
    for (let i = 0; i < this.resaleTable.length - 1; i++) {
      content += '\n{\n';
      content += '"resale":';
      content += '"' + this.resaleTable[i] + '",\n';
      content += '"maintenance":';
      content += '"' + this.maintenanceTable[i];
      content += '"\n},';
    }
    content += '\n{\n';
    content += '"resale":';
    content += '"' + this.resaleTable[this.resaleTable.length - 1] + '",\n';
    content += '"maintenance":';
    content += '"' + this.maintenanceTable[this.maintenanceTable.length - 1];
    content += '"\n}\n]';
    let FileSaver = require('file-saver');
    let file = new File([content], 'equipmentReplacement.json', {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(file);
  }
  downloadConfiguration() {
    this.saveFile();
  }
}
