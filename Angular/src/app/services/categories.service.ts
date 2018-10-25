import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable()
export class CategoriesService {
  categoriesApiUrl = 'http://localhost:3000/api/categories/';
  setSelectedCat:string;
  categoryListener = new Subject<string>();
  
  constructor(private _http: HttpClient) { }

  getAllCategoies() {
    return this._http.get(this.categoriesApiUrl);
  }

  getCategoryById(id:string){
    return this._http.get(this.categoriesApiUrl+id);
  }

  setSelectedCategory(selected:string){
    this.setSelectedCat = selected;
    if(this.setSelectedCat=='all'){
      this.categoryListener.next('all');
    }
    else{
      this.categoryListener.next(this.setSelectedCat);
    }
  }
  
  getSelectedCategory(){
    return this.categoryListener.asObservable();
  }
}
