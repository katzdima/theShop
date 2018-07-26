import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  data;
  constructor(private _productsService: ProductsService) { }

  ngOnInit() {
    this._productsService.getAllProducts().subscribe((res) => {
      this.data = res;
      console.log(`on init :${this.data.data[0].name}`);
    })
  }

}
