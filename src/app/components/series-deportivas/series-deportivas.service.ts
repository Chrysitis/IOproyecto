export class seriesDeportivasService {
  gamesQuantity: number;
  kGames: number;
  probabilityMatrix: any[][];
  seriesFormat: any[];
  homeWinningProbA: number;
  awayWinningProbB: number;
  awayWinningProbA: number;
  homeWinningProbB: number;

  constructor() {
    this.gamesQuantity = 0;
    this.kGames = 0;
    this.probabilityMatrix = new Array();
    this.seriesFormat = new Array();
    this.homeWinningProbA = 0;
    this.awayWinningProbB = 0;
    this.awayWinningProbA = 0;
    this.homeWinningProbB = 0;
  }

  setGamesQuantity(quantity: number) {
    this.kGames = Math.floor(quantity / 2) + 1;
    console.log('THE QUANTITY OF GAMES IS: ' + this.kGames);
    this.probabilityMatrix = this.setMatrixSize(this.kGames);
    this.gamesQuantity = quantity;
  }

  getGamesQuantity() {
    return this.gamesQuantity;
  }

  addGame(game: string) {
    this.seriesFormat.push(game);
  }

  getSeriesFormat() {
    return this.seriesFormat;
  }

  getHomeProbabilityA() {
    return this.homeWinningProbA;
  }

  getAwayProbabilityB() {
    return this.awayWinningProbB;
  }

  getAwayProbabilityA() {
    return this.awayWinningProbA;
  }

  getHomeProbabilityB() {
    return this.homeWinningProbB;
  }

  setHomeProbability(probability: number) {
    this.homeWinningProbA = probability;
    this.awayWinningProbB = 1 - this.homeWinningProbA;
    console.log('Home winning probability of A: ' + this.homeWinningProbA);
    console.log('Away winning probability of B: ' + this.awayWinningProbB);
  }

  setAwayProbability(probability: number) {
    this.awayWinningProbA = probability;
    this.homeWinningProbB = 1 - this.awayWinningProbA;
    console.log('Away winning probability of A: ' + this.awayWinningProbA);
    console.log('Home winning probability of B: ' + this.homeWinningProbB);
  }

  getProbabilitiesMatrix() {
    return this.probabilityMatrix;
  }

  executeSportSeriesAlgorithm() {
    // Fills base cases. t[i][0] = 0 and t[0][j] = 1
    let limit = this.probabilityMatrix.length;
    for (let i = 0; i < limit; i++) {
      this.probabilityMatrix[i][0] = 0;
    }
    for (let i = 0; i < limit; i++) {
      this.probabilityMatrix[0][i] = 1;
    }

    // Fills every other entry depending on the probability.

    for (let i = 1; i < limit; i++) {
      for (let j = 1; j < limit; j++) {
        let currentGame = this.kGames - i + this.kGames - j;
        let probability = this.seriesFormat[currentGame];
        console.log('GAME PLAYING: ' + currentGame);
        if (probability == 'H') {
          let val =
            this.homeWinningProbA * this.probabilityMatrix[i - 1][j] +
            this.awayWinningProbB * this.probabilityMatrix[i][j - 1];
          //this.probabilityMatrix[i][j] =
          //Math.round(val * 100 + Number.EPSILON) / 100;
          this.probabilityMatrix[i][j] = this.roundNum(val);

          console.log(
            'COMPUTATION IS: ' +
              this.homeWinningProbA +
              ' * ' +
              this.probabilityMatrix[i - 1][j] +
              ' + ' +
              this.awayWinningProbB +
              ' * ' +
              this.probabilityMatrix[i][j - 1] +
              ' = ' +
              val
          );
        } else {
          let val =
            this.awayWinningProbA * this.probabilityMatrix[i - 1][j] +
            this.homeWinningProbB * this.probabilityMatrix[i][j - 1];
          //this.probabilityMatrix[i][j] =
          //Math.round(val * 100 + Number.EPSILON) / 100;
          this.probabilityMatrix[i][j] = this.roundNum(val);

          console.log(
            'COMPUTATION IS: ' +
              this.awayWinningProbA +
              ' * ' +
              this.probabilityMatrix[i - 1][j] +
              ' + ' +
              this.homeWinningProbB +
              ' * ' +
              this.probabilityMatrix[i][j - 1] +
              ' = ' +
              val
          );
        }
      }
    }

    this.probabilityMatrix[0][0] = '';
    return this.probabilityMatrix;
  }

  roundNum(num: any) {
    var cant = 4;
    var s = num.toString();
    var l = s.length;
    var decimalLength = s.indexOf('.') + 1;

    if (l - decimalLength <= cant) {
      return num;
    }

    var isNeg = num < 0;
    var decimal = num % 1;
    var entera = isNeg ? Math.ceil(num) : Math.floor(num);

    var decimalFormated = Math.floor(Math.abs(decimal) * Math.pow(10, cant));

    var finalNum =
      entera + (decimalFormated / Math.pow(10, cant)) * (isNeg ? -1 : 1);

    return finalNum;
  }

  setMatrixSize(rows: number) {
    let newMatrix: any[][] = new Array();
    for (let i = 0; i <= rows; i++) {
      let row: number[] = new Array();
      for (let i = 0; i <= rows; i++) {
        row[i] = 0;
      }
      newMatrix.push(row);
    }

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= rows; j++) {
        if (j == 0) {
          newMatrix[i][j] = 0;
        }
      }
    }

    // Fills each and every entry based on home or away probability.
    for (let game of this.seriesFormat) {
    }
    // Position t[0][0] = ''
    newMatrix[0][0] = '';
    return newMatrix;
  }
}
