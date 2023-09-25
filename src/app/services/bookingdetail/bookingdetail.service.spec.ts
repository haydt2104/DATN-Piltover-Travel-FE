import { TestBed } from '@angular/core/testing';

import { BookingdetailService } from './bookingdetail.service';

describe('BookingdetailService', () => {
  let service: BookingdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
