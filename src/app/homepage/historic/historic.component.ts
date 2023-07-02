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

  mission: any = [
    {
      isMission1: false,
      select1: null,
      isMission2: false,
      select2: null,
      isMission3: false,
    },
    {
      isMission1: false,
      select1: null,
      isMission2: false,
      select2: null,
      isMission3: false,
    },
    {
      isMission1: false,
      select1: null,
      isMission2: false,
      select2: null,
      isMission3: false,
    },
    {
      isMission1: false,
      select1: null,
      isMission2: false,
      select2: null,
      isMission3: false,
    },
    {
      isMission1: false,
      select1: null,
      isMission2: false,
      select2: null,
      isMission3: false,
    },
  ];

  submitButton() {
    console.log('mission');
    this.handleSubmit();
    this.nzMessageService.success('提交完成');
  }

  submitCancel(): void {
    this.nzMessageService.info('已經取消');
  }

  handleSubmit() {
    from(this.mission).subscribe((obj: any) => {
      this.handleMission(obj);
      this.handleSelect1(obj);
      this.handleSelect2(obj);

      // 選擇是否有S值，如果有會有 bad 天譴值 (需先判斷有無預設的bad值)
      if(!obj.s1bad) {
        obj.s1sPoint> 0 ? obj.s1bad = obj.s1score * 1.5 : obj.s1bad = 0;
      }
      if(!obj.s2bad) {
        obj.s2sPoint> 0 ? obj.s2bad = obj.s2score * 1.5 : obj.s2bad = 0;
      }
      console.log(obj);
    });
  }

  // 處理任務
  handleMission(obj: any) {
    obj.isMission1 ? (obj.m1score = 300) : (obj.m1score = 0);
    obj.isMission2 ? (obj.m2score = 1000) : (obj.m2score = 0);
    console.log(obj.isMission1);
    console.log(obj.isMission2);
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
      obj.s1score = 200;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '2-2') {
      obj.s1score = 200;
      obj.s1sPoint = -1;
    } else if (obj.select1 == '2-3') {
      obj.s1score = 350;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-1') {
      obj.s1score = 350;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-2') {
      obj.s1score = 150;
      obj.s1sPoint = 0;
    } else if (obj.select1 == '3-3') {
      obj.s1score = -50;
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
        obj.s2bad = 500;
      } else if (obj.select2 == '5-3') {
        obj.s2score = -300;
        obj.s2sPoint = 5;
        obj.s2bad = 200;
      } else if (obj.select2 == '6-1') {
        obj.s2score = 300;
        obj.s2sPoint = 0;
      }
    }

  constructor(
    private service: ServiceService,
    private router: Router,
    private nzMessageService: NzMessageService
  ) {
    this.country = this.service.country;
    console.log('this.country');
    console.log(this.country);
  }
}
