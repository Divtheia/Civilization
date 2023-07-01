import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent {
country: any = [];

isFinish = false;

mission: any = [
  {isMission1: false, select1: null, isMission2: false, select2: null, isMission3: false},
  {isMission1: false, select1: null, isMission2: false, select2: null, isMission3: false},
  {isMission1: false, select1: null, isMission2: false, select2: null, isMission3: false},
  {isMission1: false, select1: null, isMission2: false, select2: null, isMission3: false},
  {isMission1: false, select1: null, isMission2: false, select2: null, isMission3: false},
]

submitButton() {
  console.log('mission');
  console.log(this.mission);
  this.nzMessageService.success('提交完成');
}

submitCancel(): void {
  this.nzMessageService.info('已經取消');
}

  constructor(private service: ServiceService, private router: Router,private nzMessageService: NzMessageService) {
    this.country = this.service.country;
    console.log('this.country');
    console.log(this.country);
  }
}
