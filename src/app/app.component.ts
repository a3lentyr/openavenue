import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data = [];
  dataColumn = [];
  dataRow = [];
  background = [];
  REFbackground = [
    "vvvr", "r", "v", "_C", "rr", "0", "_r",
    "r", "vv", "0", "rr", "0", "rrv", "v",
    "_A", "v", "rrv", "vv", "_E", "v", "r",
    "vv", "r", "_B", "0", "r", "rr", "_F",
    "0", "vvr", "v", "rr", "vvr", "v", "0",
    "_v", "0", "vv", "_D", "r", "0", "rrrv"

  ];

  REFcardData = [1, 1, 1, 11, 11, 11, 11, 2, 2, 2, 12, 12, 12, 12, 3, 3, 3, 13, 13, 13, 13, 4, 4, 4, 14, 14, 14, 14, 5, 5, 5, 5, 15, 15, 15, 6, 6, 6, 6, 16, 16, 16]
  cardData = [];

  playIndex = 0;
  cityData = [];
  REFcityData = ["A", "B", "C", "D", "E"];

  currentCityIndex = 0;
  currentCityAdvance = 0;
  currentCityAdvanceList = [];

  playHistory = [];
  seed = 1;
  initSeed = Math.floor(Math.random() * 10000);

  mapRandom = false;

  currentScore = 0;
  totalScore = 0;
  scoreHistory = []

  constructor() {
    for (let index = 0; index < 6 * 7; index++) {
      this.data.push(0);

    }
    for (let index = 0; index < 6; index++) {
      this.dataColumn.push(index);
    }
    for (let index = 0; index < 7; index++) {
      this.dataRow.push(index);
    }
    this.initPlay();
  }


  initPlay() {
    this.background = this.REFbackground.slice();

    if (this.mapRandom) {
      this.shuffle(this.background);

    }

    this.cardData = this.shuffle(this.REFcardData.slice());
    this.cityData = this.shuffle(this.REFcityData.slice());

    this.currentCityIndex = 0;
    this.currentCityAdvance = 0;
    this.currentCityAdvanceList = [];
    this.playIndex = 0;
    this.playHistory = [];
    this.scoreHistory = [];
    this.currentScore = 0;
    this.totalScore = 0;

    this.data = [];
    for (let index = 0; index < 6 * 7; index++) {
      this.data.push(0);
    }

    if (this.cardData[this.playIndex] > 10) {
      this.currentCityAdvance += 1;
      this.currentCityAdvanceList.push(0);
    }
    this.computeCompleteScore();
  }

  advancePlay() {

    if (this.currentCityAdvance >= 4) {
      this.advanceCity();
    }

    this.playIndex += 1;
    if (this.cardData[this.playIndex] > 10) {
      this.currentCityAdvance += 1;
      this.currentCityAdvanceList.push(0);
    }

    this.currentScore = this.countScore(this.findCurrentCity(), []);
    this.computeCompleteScore();
  }

  findCurrentCity() {
    var cityString = "_" + this.cityData[this.currentCityIndex];
    return this.background.indexOf(cityString);
  }

  advanceCity() {
    this.currentCityAdvance = 0;
    this.currentCityAdvanceList = [];

    this.currentCityIndex += 1;
  }

  getCurrentCity() {
    return "assets/_" + this.cityData[this.currentCityIndex] + ".png";
  }

  reversePlay() {
    if (this.playIndex <= 0) {
      return
    }
    var index = this.playHistory.pop();
    this.data[index] = 0;

    if (this.cardData[this.playIndex] > 10) {
      this.currentCityAdvance -= 1;
      this.currentCityAdvanceList.pop();
    }

    this.playIndex -= 1;
    if (this.cardData[this.playIndex] > 10) {
      this.reverseCity();
    }
    this.currentScore = this.countScore(this.findCurrentCity(), []);
    this.computeCompleteScore();
  }

  reverseCity() {


    if (this.currentCityAdvance <= 0) {
      this.currentCityAdvance = 4;
      this.currentCityAdvanceList = [0, 0, 0, 0]

      this.currentCityIndex -= 1;
    }
  }

  getCurrentCard() {
    return (this.cardData[this.playIndex] % 10) - 1;
  }

  getRotate(row, column) {

    if (row > 7) {
      switch (column + 1) {
        case 1:
          return 180;
        case 2:
          return -90;
        case 3:
          return 0;
        case 4:
          return 90;
        case 6:
          return 90;

        default:
          return 0;
      }
    }

    switch (this.data[row + column * 7]) {
      case 1:
        return 180;
      case 2:
        return -90;
      case 3:
        return 0;
      case 4:
        return 90;
      case 6:
        return 90;

      default:
        return 0;
    }

  }

  getHiddenAngle(row, column) {

    if (row > 7) {
      return (column < 4);
    }

    switch (this.data[row + column * 7]) {
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;

      default:
        return false;
    }
  }

  getHiddenline(row, column) {

    if (row > 7) {
      return (column > 3);
    }

    switch (this.data[row + column * 7]) {
      case 5:
        return true;
      case 6:
        return true;

      default:
        return false;
    }
  }

  getHiddentext(row, column) {
    switch (this.data[row + column * 7]) {
      case 0:
        return false;

      default:
        return true;
    }
  }

  isCurrentYellow() {
    return this.cardData[this.playIndex] > 10;
  }

  onClick(row, column) {

    if (this.data[row + column * 7] > 0) {
      return
    }
    this.data[row + column * 7] = this.getCurrentCard() + 1;
    this.playHistory.push(row + column * 7);
    this.advancePlay();
  }

  getBackground(row, column) {
    return "assets/" + this.background[row + column * 7] + ".png";
  }

  getRoadCount(index) {
    let count = 0;
    this.data.forEach(element => {
      if (element == index)
        count++;
    });
    return count;
  }

  /**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(this.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  random() {
    var x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  onSeedChange(value) {
    if (value != "") {
      this.initSeed = value;
      this.seed = value;
      this.initPlay();
    }

  }

  countScore(cell, explored) {
    if (this.data[cell] == 0) {
      return 0;
    }

    if (explored.includes(cell)) {
      return 0;
    }
    explored.push(cell);

    var resultR = (this.background[cell].match(/r/g) || []).length - (this.background[cell].match(/_r/g) || []).length;
    var resultV = (this.background[cell].match(/v/g) || []).length - (this.background[cell].match(/_v/g) || []).length;
    var result = resultR + resultV;

    switch (this.data[cell]) {
      case 1:
        if (cell >= 7) {
          if ([2, 3, 5].includes(this.data[cell - 7]))
            result += this.countScore(cell - 7, explored);
        }
        if (cell % 7 != 0) {
          if ([3, 4, 6].includes(this.data[cell - 1]))
            result += this.countScore(cell - 1, explored);
        }
        break;
      case 2:
        if (cell < 7 * 5) {
          if ([1, 4, 5].includes(this.data[cell + 7]))
            result += this.countScore(cell + 7, explored);
        }
        if (cell % 7 != 0) {
          if ([3, 4, 6].includes(this.data[cell - 1]))
            result += this.countScore(cell - 1, explored);
        }
        break;
      case 3:
        if (cell < 7 * 5) {
          if ([1, 4, 5].includes(this.data[cell + 7]))
            result += this.countScore(cell + 7, explored);
        }
        if (cell % 7 != 6) {
          if ([1, 2, 6].includes(this.data[cell + 1]))
            result += this.countScore(cell + 1, explored);
        }
        break;
      case 4:
        if (cell >= 7) {
          if ([2, 3, 5].includes(this.data[cell - 7]))
            result += this.countScore(cell - 7, explored);
        }
        if (cell % 7 != 6) {
          if ([1, 2, 6].includes(this.data[cell + 1]))
            result += this.countScore(cell + 1, explored);
        }
        break;
      case 5:
        if (cell >= 7) {
          if ([2, 3, 5].includes(this.data[cell - 7]))
            result += this.countScore(cell - 7, explored);
        }
        if (cell < 7 * 5) {
          if ([1, 4, 5].includes(this.data[cell + 7]))
            result += this.countScore(cell + 7, explored);
        }
        break;
      case 6:
        if (cell % 7 != 6) {
          if ([1, 2, 6].includes(this.data[cell + 1]))
            result += this.countScore(cell + 1, explored);
        }
        if (cell % 7 != 0) {
          if ([3, 4, 6].includes(this.data[cell - 1]))
            result += this.countScore(cell - 1, explored);
        }
        break;

      default:
        break;
    }
    return result;

  }

  computeCompleteScore() {
    var newHistory = [];
    this.totalScore = 0;

    var previousScore = 0;
    for (let index = 0; index < this.cityData.length; index++) {
      const element = this.cityData[index];
      if (index == this.currentCityIndex) {
        var score = this.countScore(this.background.indexOf("_" + element), []);

        if (score <= 0 || score <= previousScore) {
          score = -5;
        }

        this.totalScore += score;
        newHistory.push([element, score]);

      } else {
        if (index < this.currentCityIndex) {
          newHistory.push(this.scoreHistory[index]);
          previousScore = this.scoreHistory[index][1]
        } else {
          newHistory.push(["?", 0]);
        }
      }
    }

    newHistory.push(["Castle 1", this.countScore(this.background.indexOf("_v"), [])]);
    newHistory.push(["Castle 2", this.countScore(this.background.indexOf("_r"), [])]);

    this.scoreHistory = newHistory;

  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentCity(row, column) {
    return this.background[row + column * 7] == "_" + this.cityData[this.currentCityIndex];
  }
}
