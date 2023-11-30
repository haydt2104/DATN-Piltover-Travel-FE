import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDiscountComponent } from './insert-discount.component';

describe('InsertDiscountComponent', () => {
  let component: InsertDiscountComponent;
  let fixture: ComponentFixture<InsertDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertDiscountComponent]
    });
    fixture = TestBed.createComponent(InsertDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
