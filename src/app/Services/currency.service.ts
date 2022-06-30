import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedcurrency$ : BehaviorSubject<string> = new BehaviorSubject<string>("USD")
constructor() { }
  getCurrency(){
    return this.selectedcurrency$.asObservable();
  }
  setCurrency(currency : string){
    this.selectedcurrency$.next(currency);
  }
}
