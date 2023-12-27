import { TestBed } from '@angular/core/testing';

import { CreateNewUserService } from './create-new-user.service';

describe('CreateNewUserService', () => {
  let service: CreateNewUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
