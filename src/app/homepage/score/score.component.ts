import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  country: any = [];
  constructor(private service: ServiceService, private router: Router) {
    this.country = this.service.country;
    this.score0 = this.country[0].totalScore;
    this.score1 = this.country[1].totalScore;
    this.score2 = this.country[2].totalScore;
    this.score3 = this.country[3].totalScore;
    this.score4 = this.country[4].totalScore;
    console.log(this.country);
  }

  max = 0;
  maxTop = 0;
  maxIndex = -1;
  progressStyle = { '0%': '#108ee9', '50%': '#2db7f5', '100%': '#87d068' };
  higherStyle = { '0%': '#B54FFF', '50%': '#FF30FF', '100%': '#FF8C8C' };

  // 計算總分
  score0 = 0;
  score1 = 0;
  score2 = 0;
  score3 = 0;
  score4 = 0;

  // 跑分百分比
  percent0 = 0;
  percent1 = 0;
  percent2 = 0;
  percent3 = 0;
  percent4 = 0;

  percentArray: any[] = [];


  findMax() {
    // 找出最大數
    this.max = Math.max(
      this.score0,
      this.score1,
      this.score2,
      this.score3,
      this.score4
    );

    this.maxTop = this.max * 1.1;

    // 數值百分比放入
    this.percent0 = (this.score0 / this.maxTop) * 100;
    this.percent1 = (this.score1 / this.maxTop) * 100;
    this.percent2 = (this.score2 / this.maxTop) * 100;
    this.percent3 = (this.score3 / this.maxTop) * 100;
    this.percent4 = (this.score4 / this.maxTop) * 100;
    this.inputNumber();

    this.percentArray[0] = this.score0;
    this.percentArray[1] = this.score1;
    this.percentArray[2] = this.score2;
    this.percentArray[3] = this.score3;
    this.percentArray[4] = this.score4;

    this.maxIndex = this.percentArray.findIndex(
      (element) => element == this.max
    );

    console.log('我最大!!!');
    console.log(this.percentArray);
    console.log(this.max);
    // console.log(this.country[this.maxIndex].score)
  }

  // 百分比歸零
  inputNumber() {
    this.country[0].percent = 0;
    this.country[1].percent = 0;
    this.country[2].percent = 0;
    this.country[3].percent = 0;
    this.country[4].percent = 0;
  }

  // 跑分：判斷百分比↓↓↓↓↓↓
  judge0() {
    setTimeout(() => {
      if (this.country[0].percent < this.percent0) {
        this.country[0].percent += 1;
        this.judge0();
      } else {
        // console.log('finish0!');
      }
    }, 100);
  }

  judge1() {
    setTimeout(() => {
      if (this.country[1].percent < this.percent1) {
        this.country[1].percent += 1;
        this.judge1();
      } else {
        // console.log('finish1!');
      }
    }, 100);
  }

  judge2() {
    setTimeout(() => {
      if (this.country[2].percent < this.percent2) {
        this.country[2].percent += 1;
        this.judge2();
      } else {
        // console.log('finish2!');
      }
    }, 100);
  }

  judge3() {
    setTimeout(() => {
      if (this.country[3].percent < this.percent3) {
        this.country[3].percent += 1;
        this.judge3();
      } else {
        // console.log('finish3!');
      }
    }, 100);
  }

  judge4() {
    setTimeout(() => {
      if (this.country[4].percent < this.percent4) {
        this.country[4].percent += 1;
        this.judge4();
      } else {
        // console.log('finish4!');
      }
    }, 100);
  }

  promise = new Promise(() => {
    this.judge0();
    this.judge1();
    this.judge2();
    this.judge3();
    this.judge4();
  });

  // 跑分：判斷百分比↑↑↑↑↑↑↑

  ngOnInit(): void {
    this.findMax();
  }
}
