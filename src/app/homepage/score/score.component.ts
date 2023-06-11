import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  constructor(private service: ServiceService, private router: Router) {}

  country: any = [
    { name: '魔羯座', score: null, percent: null},
    { name: '水瓶座', score: null, percent: null},
    { name: '天蠍座', score: null, percent: null},
    { name: '天秤座', score: null, percent: null},
    { name: '巨蟹座', score: null, percent: null},
  ];

  max = 0;
  maxTop = 0;
  maxIndex = -1;
  progressStyle = { '0%': '#108ee9', '50%': '#2db7f5', '100%': '#87d068' }
  higherStyle = { '0%': '#B54FFF', '50%': '#FF30FF', '100%': '#FF8C8C' }

  score0 = 0;
  score1 = 0;
  score2 = 0;
  score3 = 0;
  score4 = 0;

  scoreArray: any[] = [];

  findMax() {
    // 找出最大數
    this.max = Math.max(
      this.country[0].score,
      this.country[1].score,
      this.country[2].score,
      this.country[3].score,
      this.country[4].score
    );

    this.maxTop = this.max * 1.1;

    // 數值百分比放入
    this.score0 = (this.country[0].score / this.maxTop) * 100;
    this.score1 = (this.country[1].score / this.maxTop) * 100;
    this.score2 = (this.country[2].score / this.maxTop) * 100;
    this.score3 = (this.country[3].score / this.maxTop) * 100;
    this.score4 = (this.country[4].score / this.maxTop) * 100;
    this.inputNumber();

    this.scoreArray[0] = this.country[0].score;
    this.scoreArray[1] = this.country[1].score;
    this.scoreArray[2] = this.country[2].score;
    this.scoreArray[3] = this.country[3].score;
    this.scoreArray[4] = this.country[4].score;

    this.maxIndex = this.scoreArray.findIndex((element)=> element == this.max);

    console.log('我最大!!!')
    console.log(this.scoreArray)
    console.log(this.max)
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
      if (this.country[0].percent < this.score0) {
        this.country[0].percent += 1;
        // console.log(this.country[0].percent);
        this.judge0();
      } else {
        console.log('finish!');
      }
    }, 100);
  }

  judge1() {
    setTimeout(() => {
      if (this.country[1].percent < this.score1) {
        this.country[1].percent += 1;
        // console.log(this.country[1].percent);
        this.judge1();
      } else {
        console.log('finish!');
      }
    }, 100);
  }

  judge2() {
    setTimeout(() => {
      if (this.country[2].percent < this.score2) {
        this.country[2].percent += 1;
        // console.log(this.country[2].percent);
        this.judge2();
      } else {
        console.log('finish!');
      }
    }, 100);
  }

  judge3() {
    setTimeout(() => {
      if (this.country[3].percent < this.score3) {
        this.country[3].percent += 1;
        // console.log(this.country[3].percent);
        this.judge3();
      } else {
        console.log('finish!');
      }
    }, 100);
  }

  judge4() {
    setTimeout(() => {
      if (this.country[4].percent < this.score4) {
        this.country[4].percent += 1;
        // console.log(this.country[4].percent);
        this.judge4();
      } else {
        console.log('finish!');
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
    this.country = this.service.country;
    this.findMax();
  }
}
