import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from, map } from 'rxjs';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent {
  country: any = [];

  isFinish = false;

  mission: any = [];

  submitButton() {
    // 記得打開
    for (var i = 0; i < this.country.length; i++) {
      if (!this.mission[i].select1 || !this.mission[i].select2) {
        this.nzMessageService.error('請確認組別選擇皆有選完事件!!');
        return;
      }
    }
    this.handleSubmit();
    this.nzMessageService.success('提交完成');
    // this.nzMessageService.error('打開組別確認 & 鎖按鈕!!');
  }

  submitCancel(): void {
    this.nzMessageService.info('已經取消');
  }

  handleSubmit() {
    from(this.mission).subscribe((obj: any) => {
      this.handleMission(obj);
      this.handleSelect1(obj);
      this.handleSelect2(obj);
      this.handleScourge(obj);

      console.log(obj);
    });
    this.liquidate();
    this.badScoreInput();
    this.service.country = this.country;
    this.service.mission = this.mission;
    this.router.navigate(['/input']);
    console.log('完成~~~');
    console.log(this.service.country);
    console.log(this.mission);
  }

  // 處理任務
  handleMission(obj: any) {
    obj.isMission1 ? (obj.m1score = 300) : (obj.m1score = 0);
    obj.isMission2 ? (obj.m2score = 1000) : (obj.m2score = 0);
    obj.isMission3 ? (obj.m3sPoint = -9) : (obj.m3sPoint = 0);
  }

  // 處理選擇1
  handleSelect1(obj: any) {
    if (obj.select1 == '1-1') {
      obj.s1score = 300;
      obj.s1sPoint = 9;
    } else if (obj.select1 == '1-2') {
      obj.s1score = 500;
      obj.s1sPoint = 9;
    } else if (obj.select1 == '2-1') {
      obj.s1score = 250;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '2-2') {
      obj.s1score = 250;
      obj.s1sPoint = -1;
    } else if (obj.select1 == '2-3') {
      obj.s1score = 250;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-1') {
      obj.s1score = 600;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-2') {
      obj.s1score = 100;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-3') {
      obj.s1score = -50;
      obj.s1sPoint = 0;
    } else {
      // 預防bug
      obj.s1score = 0;
      obj.s1sPoint = 0;
    }
  }

  // 處理選擇2
  handleSelect2(obj: any) {
    if (obj.select2 == '4-1') {
      obj.s2score = 800;
      obj.s2sPoint = 9;
    } else if (obj.select2 == '4-2') {
      obj.s2score = 300;
      obj.s2sPoint = 9;
    } else if (obj.select2 == '5-1') {
      obj.s2score = 1000;
      obj.s2sPoint = 5;
    } else if (obj.select2 == '5-2') {
      obj.s2score = 0;
      obj.s2sPoint = 5;
      obj.s2bad = 800;
    } else if (obj.select2 == '5-3') {
      obj.s2score = -300;
      obj.s2sPoint = 5;
      obj.s2bad = 500;
    } else if (obj.select2 == '6-1') {
      obj.s2score = 200;
      obj.s2sPoint = 0;
    } else {
      // 預防bug
      obj.s2score = 0;
      obj.s2sPoint = 0;
    }
  }

  // 處理天譴值
  handleScourge(obj: any) {
    // 選擇是否有S值，如果有會有 bad 天譴值 (需先判斷有無預設的bad值)
    if (!obj.s1bad) {
      obj.s1sPoint > 0 ? (obj.s1bad = obj.s1score * 2) : (obj.s1bad = 0);
    }
    if (!obj.s2bad) {
      obj.s2sPoint > 0 ? (obj.s2bad = obj.s2score * 2) : (obj.s2bad = 0);
    }
  }

  // 清算歷史總成績
  liquidate() {
    for (var i = 0; i < this.country.length; i++) {
      // 清算文明分數
      this.country[i].score0 +=
        this.mission[i].m1score +
        this.mission[i].m2score +
        this.mission[i].s1score +
        this.mission[i].s2score;

      // 清算 S 值
      this.country[i].sPoint0 +=
        this.mission[i].s1sPoint +
        this.mission[i].s2sPoint +
        this.mission[i].m3sPoint;

      // 結束封建時代 S值統一 +50
      this.country[i].sPoint0 += 50;
    }
  }

  badScoreInput() {
    for (var i = 0; i < this.country.length; i++) {
      // 添加bad1
      this.country[i].s1bad = this.mission[i].s1bad;

      // 添加bad2
      this.country[i].s2bad = this.mission[i].s2bad;
    }
  }

  // 幫 mission 陣列元素命名
  giveName() {
    for (var i = 0; i < this.country.length; i++) {
      this.mission[i].name = this.country[i].name;
    }
  }

  constructor(
    private service: ServiceService,
    private router: Router,
    private nzMessageService: NzMessageService
  ) {
    this.country = this.service.country;
    this.mission = this.service.mission;
    this.giveName();
    console.log('this.country');
    console.log(this.country);
  }
}
