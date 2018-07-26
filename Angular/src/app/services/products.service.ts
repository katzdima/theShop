import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {
  productsApiUrl = 'http://localhost:3000/api/products/';
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get(this.productsApiUrl);
  }
}
