import { TestBed } from '@angular/core/testing';

import { RecentvisitorsService } from './recentvisitors.service';

describe('RecentvisitorsService', () => {
  let service: RecentvisitorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentvisitorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
