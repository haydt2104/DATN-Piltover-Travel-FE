import { TestBed } from '@angular/core/testing';

import { TourrevenueService } from './tourrevenue.service';

describe('TourrevenueService', () => {
  let service: TourrevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourrevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
