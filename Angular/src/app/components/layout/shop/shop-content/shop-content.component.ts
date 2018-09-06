import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.css']
})


export class  ShopContentComponent implements OnInit {
  data;
  constructor(private _productsService: ProductsService) { }

  ngOnInit() {
    this._productsService.getAllProducts().subscribe((res) => {
      this.data = res;
      console.log(`on init :${this.data.data[0].name}`);
      console.log(this.data);
    })
  }

}
