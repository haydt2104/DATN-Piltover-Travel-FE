import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHotelComponent } from './top-hotel.component';

describe('TopHotelComponent', () => {
  let component: TopHotelComponent;
  let fixture: ComponentFixture<TopHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopHotelComponent]
    });
    fixture = TestBed.createComponent(TopHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
