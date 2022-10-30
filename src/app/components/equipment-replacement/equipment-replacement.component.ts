import { Component, OnInit } from '@angular/core';
import { equipmentReplacementService } from './equipment-replacement.service';

@Component({
  selector: 'app-equipment-replacement',
  templateUrl: './equipment-replacement.component.html',
  styleUrls: ['./equipment-replacement.component.css'],
})
export class EquipmentReplacementComponent implements OnInit {
  ERService: equipmentReplacementService;
  costsTable: any[];
  planningTable: any[][];
  constructor() {
    this.ERService = new equipmentReplacementService();
    this.costsTable = new Array();
    this.planningTable = new Array();
  }

  ngOnInit(): void {}

  setTerm(term: string) {
    this.ERService.setPlanningTable(Number(term));
    this.planningTable = this.ERService.getPlanningTable();
  }
}
