import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesService {
  categoriesApiUrl = 'http://localhost:3000/api/categories/';
  constructor(private _http: HttpClient) { }
  getAllCategoies() {
    return this._http.get(this.categoriesApiUrl);
  }
}
