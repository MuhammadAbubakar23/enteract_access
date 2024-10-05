import { TestBed } from '@angular/core/testing';

import { NavdatashareService } from './navdatashare.service';

describe('NavdatashareService', () => {
  let service: NavdatashareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavdatashareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
