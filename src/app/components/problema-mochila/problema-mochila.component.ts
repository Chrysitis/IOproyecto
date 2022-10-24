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
  objects: any[];
  objectsAttributes: any[][];
  errMessage: MatSnackBar;

  constructor(private messageSnackBar: MatSnackBar) {
    this.knapsack = new knapsackService();
    this.solutionMatrix = this.knapsack.getSolutionMatrix();
    this.objects = this.knapsack.getObjects();
    this.objectsAttributes = this.knapsack.getObjectsAttributes();
    this.errMessage = messageSnackBar;
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
  }

  resetKnapsackCapacity() {
    this.knapsack.resetAttributes();
    console.log('AFTER RESETTING: ');
    console.log('OBJECTS: ' + this.knapsack.getObjects());
    console.log('SOLUTION MATRIX: ' + this.knapsack.getSolutionMatrix());
  }

  solve() {
    //this.solutionMatrix = this.knapsack.knapsackProblem1_0();
  }
}
