import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeinfoComponent } from './changeinfo.component';

describe('ChangeinfoComponent', () => {
  let component: ChangeinfoComponent;
  let fixture: ComponentFixture<ChangeinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeinfoComponent]
    });
    fixture = TestBed.createComponent(ChangeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
