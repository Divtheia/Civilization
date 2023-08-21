import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { findIndex, from } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  country: any = [];
  mission: any = [];

  constructor(private service: ServiceService, private router: Router) {
    this.country = this.service.country;
    this.mission = this.service.mission;
    this.liquidate();
    console.log('this.country');
    console.log(this.country);
    console.log('this.mission');
    console.log(this.mission);
  }

  ngOnInit() {
    this.showText();
  }

  // S值公式
  formulaSPoint(point: number | null) {
    if (point) {
      // 判斷文明值是否為S值，負數代表減少S值
      if (point > 0) {
        return Math.ceil(point / 150);
      } else {
        return point;
      }
      // 判斷是否為null
    } else {
      return null;
    }
  }

  // 計算S值
  countSPoint() {
    for (var i = 0; i < this.country.length; i++) {
      this.country[i].sPoint1 = this.formulaSPoint(this.country[i].score1);
      this.country[i].sPoint2 = this.formulaSPoint(this.country[i].score2);
      this.country[i].sPoint3 = this.formulaSPoint(this.country[i].score3);
      this.country[i].sPoint4 = this.formulaSPoint(this.country[i].score4);
      this.country[i].sPoint5 = this.formulaSPoint(this.country[i].score5);
      this.country[i].sPoint6 = this.formulaSPoint(this.country[i].score6);
      this.country[i].sPoint7 = this.formulaSPoint(this.country[i].score7);
    }
  }

  // 清算總成績
  liquidate() {
    for (var i = 0; i < this.country.length; i++) {
      // 清算文明分數
      this.country[i].totalScore =
        this.isRNumber(this.country[i].score0) +
        this.isRNumber(this.country[i].score1) +
        this.isRNumber(this.country[i].score2) +
        this.isRNumber(this.country[i].score3) +
        this.isRNumber(this.country[i].score4) +
        this.isRNumber(this.country[i].score5) +
        this.isRNumber(this.country[i].score6) +
        this.isRNumber(this.country[i].score7) +
        this.country[i].scourgeScore;

      // 清算 S 值
      this.country[i].totalSPoint =
        this.isSNumber(this.country[i].sPoint0) +
        this.isSNumber(this.country[i].sPoint1) +
        this.isSNumber(this.country[i].sPoint2) +
        this.isSNumber(this.country[i].sPoint3) +
        this.isSNumber(this.country[i].sPoint4) +
        this.isSNumber(this.country[i].sPoint5) +
        this.isSNumber(this.country[i].sPoint6) +
        this.isSNumber(this.country[i].sPoint7);
    }
  }

  // 判斷分數：正數-文明分數，負數-S值(不必計算)
  isRNumber(num: number | null) {
    if (num != null && num >= 0) {
      return num;
    } else {
      return 0;
    }
  }

  // 判斷分數：判斷S值是否為null(不必計算)
  isSNumber(num: number | null) {
    if (num) {
      return num;
    } else {
      return 0;
    }
  }

  showText() {
    // show text 內容
    for (var i = 0; i < this.country.length; i++) {
      this.country[
        i
      ].text = `${this.country[i].name}  分數：${this.country[i].totalScore}`;
    }
  }

  // 天譴次數計算(新版 兩次關卡即天譴)
  scourgeCount() {
      from(this.country).subscribe((obj: any) => {
      var scoreArray = [
        obj.score1,
        obj.score2,
        obj.score3,
        obj.score4,
        obj.score5,
        obj.score6,
        obj.score7,
      ];

      var index = scoreArray.findIndex((e) => e == null);

      for (var i = 0; i < index; i++) {
        if (obj.scourgeArray[i] == null) {
          obj.scourgeArray[i] = 1;
        }
      }

      var num = 0;
      from(obj.scourgeArray).subscribe((e: any) => (num += e));
      obj.scourgeNum = num;

      // 回合數發生之天災 && 有修道天災減免
      if(num == 2) {
        obj.s1bad += 1500;
      } else if (num == 4) {
        obj.s1bad += 2000;
        // 第四回合有修道之減免
        if (scoreArray[3] != null && scoreArray[3] < 0) obj.s1bad = obj.s1bad / 2;
      } else if (num == 6) {
        obj.s1bad += 5000;
        // 第六回合有修道之減免
        if (scoreArray[5] != null && scoreArray[5] < 0) obj.s1bad = 1000;
      }

      console.log(scoreArray);
      console.log(obj);
    });
  }

  // 天譴次數計算(舊版 連兩次文明即天譴)
  // scourgeCount() {
  //   from(this.country).subscribe((obj: any) => {
  //     var scoreArray = [
  //       obj.score1,
  //       obj.score2,
  //       obj.score3,
  //       obj.score4,
  //       obj.score5,
  //       obj.score6,
  //       obj.score7,
  //     ];

  //     var index = scoreArray.findIndex((e) => e == null);

  //     for (var i = 0; i < index; i++) {
  //       if (obj.scourgeArray[i] == null && scoreArray[i] > 0) {
  //         obj.scourgeArray[i] = 1;
  //       } else if (obj.scourgeArray[i] == null && scoreArray[i] < 0) {
  //         // 當有-S值出現，所有scourgeArray清空
  //         obj.scourgeArray[i] = 0;
  //         for (var num = 0; num < obj.scourgeArray.length; num++) {
  //           obj.scourgeArray[num] = 0;
  //         }
  //         console.log('負數');
  //       }
  //     }

  //     var num = 0;
  //     from(obj.scourgeArray).subscribe((e: any) => (num += e));
  //     obj.scourgeNum = num;

  //     if(num/2 >=1) {
  //       obj.s1bad += 1000;
  //     }

  //     console.log(scoreArray);
  //     console.log(obj);
  //   });
  // }

  // 點擊閃電
  scourgeClick(obj: any) {
    // const scoreArray = [
    //   obj.score1,
    //   obj.score2,
    //   obj.score3,
    //   obj.score4,
    //   obj.score5,
    //   obj.score6,
    //   obj.score7,
    // ];

    // for (var i = 0; i < obj.scourgeArray.length; i++) {
    //   obj.scourgeArray[i] = 0;
    // }

    var num = 0;
    from(obj.scourgeArray).subscribe((e: any) => (num += e));
    obj.scourgeNum = num;

    // 天罰扣分
    obj.totalScore -= obj.s1bad;  // 為了顯示text分數
    obj.scourgeScore -= obj.s1bad; // 累積天災懲罰分數
    obj.s1bad = obj.s2bad;
    obj.s2bad = 0;

    // 最後一回合，所有天譴陣列歸零
    if (num == 6) {
      for (var i = 0; i < obj.scourgeArray.length; i++) {
        obj.scourgeArray[i] = 0;
      }
    }

    obj.scourgeNum = 1; // 扣完分閃電不顯示

    // 分數更新
    this.showText();

    this.service.country = this.country;
    console.log(obj);
  }

  inputButton() {
    this.service.country = this.country;
    this.countSPoint();
    this.liquidate();
    this.scourgeCount();
    console.log(this.country);
    this.router.navigate(['/score']);
  }
}
