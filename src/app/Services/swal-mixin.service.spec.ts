import { TestBed } from '@angular/core/testing';

import { SwalMixinService } from './swal-mixin.service';

describe('SwalMixinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwalMixinService = TestBed.get(SwalMixinService);
    expect(service).toBeTruthy();
  });
});
