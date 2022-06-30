import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { PricesService } from 'src/app/Services/Prices.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/Services/currency.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  bannerData: any =[];
  currency : string = "USD"
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private priceService: PricesService,
              private router: Router,
              private currencyService : CurrencyService) { }

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe(val =>{
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    })
  }
  getBannerData(){
    this.priceService.getTrendingCurrency(this.currency)
    .subscribe(res=>{
      console.log(res);
      this.bannerData = res;
    })
  }
  getAllData(){
    this.priceService.getCurrency(this.currency)
    .subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToDetails(row: any){
    this.router.navigate(['coin-detail',row.id])
  }
}
