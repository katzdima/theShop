import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  data;
  constructor(private _categoriesService: CategoriesService) { }

  ngOnInit() {
    this._categoriesService.getAllCategoies().subscribe((res)=>{
      this.data=res;
      console.log(`on init :${this.data.data[0].name}`);
    })
  }

}
