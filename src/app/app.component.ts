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
  background = [
    "vvvr", "r", "v", "_C", "rr", "0", "_r",
    "r", "vv", "0", "rr", "0", "rrv", "v",
    "_A", "v", "rrv", "vv", "_E", "v", "r",
    "vv", "r", "_B", "0", "r", "rr", "_F",
    "0", "vvr", "v", "rr", "vvr", "v", "0",
    "_v", "0", "vv", "_D", "r", "0", "rrrv"

  ];

  cardData = [1, 1, 1, 11, 11, 11, 11, 2, 2, 2, 12, 12, 12, 12, 3, 3, 3, 13, 13, 13, 13, 4, 4, 4, 14, 14, 14, 14, 5, 5, 5, 5, 15, 15, 15, 6, 6, 6, 6, 16, 16, 16]

  playIndex = 0;
  cityData = ["A", "B", "C", "D", "E"];
  currentCityIndex = 0;
  currentCityAdvance = 0;
  currentCityAdvanceList = [];

  playHistory = [];

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
    //this.background = this.shuffle(this.background);

    this.cardData = this.shuffle(this.cardData);
    this.cityData = this.shuffle(this.cityData);
    this.currentCityIndex = 0;
    this.currentCityAdvance = 0;
    this.playIndex = 0;

    if (this.cardData[this.playIndex] > 10) {
      this.currentCityAdvance += 1;
      this.currentCityAdvanceList.push(0);
    }
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
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
}
