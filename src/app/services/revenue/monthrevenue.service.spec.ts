import { TestBed } from '@angular/core/testing';

import { MonthrevenueService } from './monthrevenue.service';

describe('MonthrevenueService', () => {
  let service: MonthrevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthrevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
