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
  fileContent: string;
  fileInfo: any[];
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
    this.fileContent = '';
    this.errMessage = messageSnackBar;
    this.fileInfo = new Array();
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

  chooseFile(event: any): void {
    let fileList: FileList = event.target.files;
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let data: any;
    let res = new Array();
    let self = this;
    fileReader.onloadend = function (x) {
      data = fileReader.result;
      let d = data.split('\n');
      for (let i = 1; i < d.length; i++) {
        let info = d[i].split('"');
        //res.push(info[3]);
        self.fileInfo.push(info[3]);
      }
    };
    fileReader.readAsText(file);
  }
  uploadFile() {
    this.setGamesQuantity(this.fileInfo[0]);
    this.setHomeProbability(this.fileInfo[1]);
    this.setAwayProbability(this.fileInfo[2]);
    let format = this.fileInfo[3];
    for (let c of format) {
      if (c == 'H') {
        this.addHomeGame();
      } else {
        this.addAwayGame();
      }
    }
  }

  getColor(game: String) {
    if (game == 'H') {
      return 'green';
    }
    return 'red';
  }
}
