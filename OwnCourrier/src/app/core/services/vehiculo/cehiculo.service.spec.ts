import { TestBed } from '@angular/core/testing';

import { VehiculoService } from './vehiculo.service';

describe('CehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
