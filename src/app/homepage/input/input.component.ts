import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServiceService } from '../../service.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})



export class InputComponent {

  constructor(private service: ServiceService, private router: Router) {}

  country : any = [
    { name: '魔羯座', score: null, percent: null },
    { name: '水瓶座', score: null, percent: null },
    { name: '天蠍座', score: null, percent: null },
    { name: '天秤座', score: null, percent: null },
    { name: '巨蟹座', score: null, percent: null },
  ];

  inputButton(){
    this.service.country = this.country;
    console.log(this.country)
    this.router.navigate(['/score'])
  }
}
