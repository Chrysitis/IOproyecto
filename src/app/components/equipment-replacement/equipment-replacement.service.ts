export class equipmentReplacementService {
  costsTable: any[];
  planningTable: any[][];
  replacementPlanTable: any[][];
  timeRoutesTable: any[];
  gTimeTable: any[];
  initialCost: number;
  term: number;
  expectancy: number;
  constructor() {
    this.costsTable = new Array();
    this.planningTable = new Array();
    this.replacementPlanTable = new Array();
    this.timeRoutesTable = new Array();
    this.gTimeTable = new Array();
    this.term = 0;
    this.initialCost = 0;
    this.expectancy = 0;
  }

  setTables(
    initialCost: number,
    term: number,
    expectancy: number,
    resale: number,
    maintenance: number
  ) {}

  setPlanningTable(cost: number, term: number, expectancy: number) {
    this.initialCost = cost;
    this.term = term;
    this.expectancy = expectancy;
    this.planningTable = this.setMatrixSize(this.expectancy - 1);
    this.replacementPlanTable = this.setMatrixSize(this.term);
    //this.timeRoutesTable = this.setMatrixSize(this.term);
  }

  getPlanningTable() {
    return this.planningTable;
  }

  modifyPlanningTableEntry(resale: number, maintenance: number, index: number) {
    this.planningTable[index][1] = resale;
    this.planningTable[index][2] = maintenance;
  }

  computeCostsTable(resaleTable: number[], maintenanceTable: number[]) {
    this.costsTable.push(0);
    console.log('RESALE TABLE IS: ' + resaleTable);
    console.log('MAINTENANCE TABLE IS: ' + maintenanceTable);
    let i = 0;
    let j = 0;
    while (i <= this.expectancy) {
      let cost = 0;
      let resalePrice = resaleTable[i];
      let maintenance = 0;
      while (j <= i) {
        maintenance += maintenanceTable[j];
        j++;
      }
      j = 0;
      i++;
      cost = this.initialCost + maintenance - resalePrice;
      this.costsTable.push(cost);
    }
    return this.costsTable;
  }
  equipmentReplacementAlgo() {
    console.log('********** EXECUTING ER ALGORITHM **********');
    // Inserts trivial case.
    this.gTimeTable.push(0);
    let gTimeTableIndex = 0;
    let gTimesCalculation = new Array();
    let timeRoutes = new Array();
    let time = this.term - 1;
    let index = 0;
    while (time >= 0) {
      //console.log('gTimeTable IS: ' + this.gTimeTable);
      let period = time + 1;
      //console.log('TIME IS: ' + time + ' AND PERIOD IS: ' + time);
      let periodIncrement = 0;
      while (period <= this.term && periodIncrement < this.expectancy) {
        //console.log('CALCULATING TIME: ' + time + ' WITH PERIOD: ' + period);
        let Ctp = this.costsTable[period - time];
        let Gp = 0;
        if (period != 8) {
          Gp = this.gTimeTable[this.term - period];
        }
        timeRoutes.push(period);
        let cost = Ctp + Gp;
        gTimesCalculation.push(cost);

        period++;
        periodIncrement++;
      }
      //console.log('********** OUT OF FIRST WHILE **********');
      // Gets G(n) minimun value and adds it to gTimeTable.
      //console.log('gTimesCalculation IS: ' + gTimesCalculation);
      //console.log('THE MIN VALUES IS: ' + this.getMinValue(gTimesCalculation));
      console.log('timeRoutesTable IS: ' + this.timeRoutesTable);
      this.timeRoutesTable = this.getMinValuesPeriod(
        gTimesCalculation,
        timeRoutes
      );
      this.gTimeTable.push(this.getMinValue(gTimesCalculation));
      gTimesCalculation.length = 0; // Deletes the computations from G(n).
      timeRoutes.length = 0;
      gTimeTableIndex++;
      index++;
      time--;
      //console.log('\n\n********** CHANGING TIME **********\n\n');
    }
    //console.log('********** OUT OF LAST WHILE **********');
    //console.log('PLANNINGS ARE: ' + this.gTimeTable);
    return (this.replacementPlanTable = this.setReplacementTable());
  }

  setReplacementTable() {
    // Fill the first columns with times.
    for (let i = 0; i < this.replacementPlanTable.length; i++) {
      this.replacementPlanTable[i][0] = i;
    }
    // Fill the second column with the best calculations.
    let reversedIndex = this.replacementPlanTable.length - 1;
    for (let i = 0; i < this.replacementPlanTable.length; i++) {
      this.replacementPlanTable[i][1] = this.gTimeTable[reversedIndex];
      reversedIndex--;
    }

    // Fill the third column with the time routes.
    let index = 0;
    let limit = this.timeRoutesTable.length;
    let routes = new Array();
    //this.timeRoutesTable = this.timeRoutesTable.reverse();
    let i = this.replacementPlanTable.length - 2;
    while (i >= 0) {
      if (this.timeRoutesTable[index] != -1) {
        console.log(
          'INSERTING INTO THIRD COLUMN: ' + this.timeRoutesTable[index]
        );
        routes.push(this.timeRoutesTable[index]);
      } else {
        console.log('ROUTES TO INSERT: ' + routes);
        this.replacementPlanTable[i][2] = routes.toString();
        routes.length = 0;
        i--;
      }
      index++;
    }

    return this.replacementPlanTable;
  }

  getMinValuesPeriod(array: number[], periods: number[]) {
    let minValPeriods = new Array();
    let minVal = this.getMinValue(array);
    let i = 0;
    let limit = array.length;
    while (i < limit) {
      if (minVal == array[i]) {
        this.timeRoutesTable.push(periods[i]);
      }
      i++;
    }
    this.timeRoutesTable.push(-1);
    console.log('timeRoutesTable is: ' + this.timeRoutesTable);
    return this.timeRoutesTable;
  }

  getMinValue(array: number[]) {
    let minVal = array[0];
    for (let val of array) {
      if (minVal >= val) {
        minVal = val;
      }
    }
    return minVal;
  }

  setMatrixSize(rows: number) {
    let newMatrix: number[][] = new Array();
    for (let i = 0; i <= rows; i++) {
      let row: number[] = new Array();
      for (let i = 0; i < 3; i++) {
        row[i] = 0;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j < 3; j++) {
        if (j == 0) {
          newMatrix[i][j] = i + 1;
        }
      }
    }
    return newMatrix;
  }
}
