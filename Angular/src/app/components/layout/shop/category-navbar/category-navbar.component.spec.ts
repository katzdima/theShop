import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavbarComponent } from './category-navbar.component';

describe('CategoryNavbarComponent', () => {
  let component: CategoryNavbarComponent;
  let fixture: ComponentFixture<CategoryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
