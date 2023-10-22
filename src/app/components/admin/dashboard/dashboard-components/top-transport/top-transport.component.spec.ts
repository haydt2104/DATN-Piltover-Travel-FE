import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTransportComponent } from './top-transport.component';

describe('TopTransportComponent', () => {
  let component: TopTransportComponent;
  let fixture: ComponentFixture<TopTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTransportComponent]
    });
    fixture = TestBed.createComponent(TopTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
