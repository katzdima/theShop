import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Category , CategoryRes} from '../../../../interfaces/category';


@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categories: Category[];

  constructor(private _categoriesService: CategoriesService) { }

  ngOnInit() {
    this._categoriesService.getAllCategoies().subscribe((res: CategoryRes)=>{
      this.categories=res.data;
    })
    
  }
  selectCategory(category){
    this._categoriesService.setSelectedCategory(category._id);
  }

  selectAllCategories(){
    this._categoriesService.setSelectedCategory('all');
  }

}
