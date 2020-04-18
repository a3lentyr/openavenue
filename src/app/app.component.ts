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

  onClick(row, column) {
    this.data[row + column * 7] = (this.data[row + column * 7] + 1) % 7
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
}
