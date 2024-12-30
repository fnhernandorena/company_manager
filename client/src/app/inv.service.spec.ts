import { TestBed } from '@angular/core/testing';

import { InvService } from './inv.service';

describe('InvService', () => {
  let service: InvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
