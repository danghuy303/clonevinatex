import { TestBed } from '@angular/core/testing';

import { QuytrinhServiceService } from './quytrinh-service.service';

describe('QuytrinhServiceService', () => {
  let service: QuytrinhServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuytrinhServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
