import { TestBed } from '@angular/core/testing';

import { MessageRenderingService } from './message-rendering.service';

describe('MessageRenderingService', () => {
  let service: MessageRenderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRenderingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
