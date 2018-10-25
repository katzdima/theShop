import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormEditComponent } from './products-form-edit.component';

describe('ProductsFormEditComponent', () => {
  let component: ProductsFormEditComponent;
  let fixture: ComponentFixture<ProductsFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
