import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  country = [
    { name: '魔羯座', score: null, percent: null },
    { name: '水瓶座', score: null, percent: null },
    { name: '天蠍座', score: null, percent: null },
    { name: '天秤座', score: null, percent: null },
    { name: '巨蟹座', score: null, percent: null },
  ];

  getData() {
    return this.country; //呼叫getData的方法的時候，回傳資料
  }
  constructor() {}
}
