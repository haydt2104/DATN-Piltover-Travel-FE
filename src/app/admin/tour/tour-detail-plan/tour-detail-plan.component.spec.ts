import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailPlanComponent } from './tour-detail-plan.component';

describe('TourDetailPlanComponent', () => {
  let component: TourDetailPlanComponent;
  let fixture: ComponentFixture<TourDetailPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourDetailPlanComponent]
    });
    fixture = TestBed.createComponent(TourDetailPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
