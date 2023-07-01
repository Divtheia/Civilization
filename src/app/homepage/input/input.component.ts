import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  country: any = [];

  constructor(private service: ServiceService, private router: Router) {
    this.country = this.service.country;
    console.log('this.country');
    console.log(this.country);
  }

  // S值公式
  formulaSPoint(e: number | null) {
    if (e) {
      // 判斷文明值是否為S值，負數代表減少S值
      if (e > 0) {
        return Math.ceil(e / 100);
      } else {
        return e;
      }
      // 判斷是否為null
    } else {
      return null;
    }
  }

  // 計算S值
  countSPoint() {
    // 計算國家0
    this.country[0].sPoint1 = this.formulaSPoint(this.country[0].score1);
    this.country[0].sPoint2 = this.formulaSPoint(this.country[0].score2);
    this.country[0].sPoint3 = this.formulaSPoint(this.country[0].score3);
    this.country[0].sPoint4 = this.formulaSPoint(this.country[0].score4);
    this.country[0].sPoint5 = this.formulaSPoint(this.country[0].score5);
    this.country[0].sPoint6 = this.formulaSPoint(this.country[0].score6);
    this.country[0].sPoint7 = this.formulaSPoint(this.country[0].score7);

    // 計算國家1
    this.country[1].sPoint1 = this.formulaSPoint(this.country[1].score1);
    this.country[1].sPoint2 = this.formulaSPoint(this.country[1].score2);
    this.country[1].sPoint3 = this.formulaSPoint(this.country[1].score3);
    this.country[1].sPoint4 = this.formulaSPoint(this.country[1].score4);
    this.country[1].sPoint5 = this.formulaSPoint(this.country[1].score5);
    this.country[1].sPoint6 = this.formulaSPoint(this.country[1].score6);
    this.country[1].sPoint7 = this.formulaSPoint(this.country[1].score7);

    // 計算國家2
    this.country[2].sPoint1 = this.formulaSPoint(this.country[2].score1);
    this.country[2].sPoint2 = this.formulaSPoint(this.country[2].score2);
    this.country[2].sPoint3 = this.formulaSPoint(this.country[2].score3);
    this.country[2].sPoint4 = this.formulaSPoint(this.country[2].score4);
    this.country[2].sPoint5 = this.formulaSPoint(this.country[2].score5);
    this.country[2].sPoint6 = this.formulaSPoint(this.country[2].score6);
    this.country[2].sPoint7 = this.formulaSPoint(this.country[2].score7);

    // 計算國家3
    this.country[3].sPoint1 = this.formulaSPoint(this.country[3].score1);
    this.country[3].sPoint2 = this.formulaSPoint(this.country[3].score2);
    this.country[3].sPoint3 = this.formulaSPoint(this.country[3].score3);
    this.country[3].sPoint4 = this.formulaSPoint(this.country[3].score4);
    this.country[3].sPoint5 = this.formulaSPoint(this.country[3].score5);
    this.country[3].sPoint6 = this.formulaSPoint(this.country[3].score6);
    this.country[3].sPoint7 = this.formulaSPoint(this.country[3].score7);

    // 計算國家4
    this.country[4].sPoint1 = this.formulaSPoint(this.country[4].score1);
    this.country[4].sPoint2 = this.formulaSPoint(this.country[4].score2);
    this.country[4].sPoint3 = this.formulaSPoint(this.country[4].score3);
    this.country[4].sPoint4 = this.formulaSPoint(this.country[4].score4);
    this.country[4].sPoint5 = this.formulaSPoint(this.country[4].score5);
    this.country[4].sPoint6 = this.formulaSPoint(this.country[4].score6);
    this.country[4].sPoint7 = this.formulaSPoint(this.country[4].score7);
  }

  inputButton() {
    this.service.country = this.country;
    this.countSPoint();
    console.log(this.country);
    this.router.navigate(['/score']);
  }
}
