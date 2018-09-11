import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
