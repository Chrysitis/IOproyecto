import { Component, OnInit } from '@angular/core';
import { seriesDeportivasService } from './series-deportivas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-series-deportivas',
  templateUrl: './series-deportivas.component.html',
  styleUrls: ['./series-deportivas.component.css'],
})
export class SeriesDeportivasComponent implements OnInit {
  seriesDeportivas: seriesDeportivasService;
  gamesQuantity: number;
  probabilityMatrix: any[][];
  seriesFormat: any[];
  winningProbA: number;
  formatCount: number;
  homeWinningProbA: number;
  awayWinningProbB: number;
  awayWinningProbA: number;
  homeWinningProbB: number;
  errMessage: MatSnackBar;

  constructor(private messageSnackBar: MatSnackBar) {
    this.seriesDeportivas = new seriesDeportivasService();
    this.gamesQuantity = 0;
    this.probabilityMatrix = new Array();
    this.seriesFormat = new Array();
    this.winningProbA = 0;
    this.formatCount = 0;
    this.homeWinningProbA = 0;
    this.awayWinningProbB = 0;
    this.awayWinningProbA = 0;
    this.homeWinningProbB = 0;
    this.errMessage = messageSnackBar;
  }

  ngOnInit(): void {}

  addHomeGame() {
    //this.seriesDeportivas.addGame('H');
    //this.seriesFormat = this.seriesDeportivas.getSeriesFormat();
    if (this.formatCount < this.gamesQuantity) {
      //this.seriesFormat.push('H');
      this.seriesDeportivas.addGame('H');
      this.seriesFormat = this.seriesDeportivas.getSeriesFormat();
      this.formatCount += 1;
    } else {
      this.messageSnackBar.open('ALL THE GAMES ARE SET.', 'Got it!', {
        duration: 5000,
      });
    }
  }

  addAwayGame() {
    //this.seriesDeportivas.addGame('A');
    //this.seriesFormat = this.seriesDeportivas.getSeriesFormat();
    if (this.formatCount < this.gamesQuantity) {
      //this.seriesFormat.push('A');
      this.seriesDeportivas.addGame('A');
      this.seriesFormat = this.seriesDeportivas.getSeriesFormat();
      this.formatCount += 1;
    } else {
      this.messageSnackBar.open('ALL THE GAMES ARE SET.', 'Got it!', {
        duration: 5000,
      });
    }
  }

  setHomeProbability(probability: string) {
    this.seriesDeportivas.setHomeProbability(Number(probability));
    this.homeWinningProbA = this.seriesDeportivas.getHomeProbabilityA();
    this.awayWinningProbB = this.seriesDeportivas.getAwayProbabilityB();
  }

  setAwayProbability(probability: string) {
    this.seriesDeportivas.setAwayProbability(Number(probability));
    this.awayWinningProbA = this.seriesDeportivas.getAwayProbabilityA();
    this.homeWinningProbB = this.seriesDeportivas.getHomeProbabilityB();
  }

  setGamesQuantity(quantity: string) {
    this.seriesDeportivas.setGamesQuantity(Number(quantity));
    this.probabilityMatrix = this.seriesDeportivas.getProbabilitiesMatrix();
    this.gamesQuantity = this.seriesDeportivas.getGamesQuantity();
  }

  executeAlgo() {
    this.probabilityMatrix =
      this.seriesDeportivas.executeSportSeriesAlgorithm();
  }

  getColor(game: String) {
    if (game == 'H') {
      return 'green';
    }
    return 'red';
  }
}
