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
}
