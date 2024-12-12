import { TestBed } from '@angular/core/testing';

import { TimeslotDataService } from './timeslot-data.service';

describe('TimeslotDataService', () => {
  let service: TimeslotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeslotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
