import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFailedComponent } from './checkout-failed.component';

describe('CheckoutFailedComponent', () => {
  let component: CheckoutFailedComponent;
  let fixture: ComponentFixture<CheckoutFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutFailedComponent]
    });
    fixture = TestBed.createComponent(CheckoutFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
