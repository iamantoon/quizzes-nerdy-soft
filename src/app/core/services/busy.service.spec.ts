import { TestBed } from '@angular/core/testing';
import { BusyService } from './busy.service';

describe('BusyService', () => {
  let service: BusyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusyService]
    });
    service = TestBed.inject(BusyService);
  });

  it('should start busy state correctly', () => {
    service.busy();
    expect(service.busyRequestCount).toBe(1);
    expect(service.loading).toBeTrue();
  });

  it('should stop busy state correctly', () => {
    service.busy();
    service.idle();
    expect(service.busyRequestCount).toBe(0);
    expect(service.loading).toBeFalse();
  });

  it('should prevent negative busyRequestCount', () => {
    service.idle();
    expect(service.busyRequestCount).toBe(0);
    expect(service.loading).toBeFalse();
  });

  it('should handle multiple busy and idle calls', () => {
    service.busy();
    service.busy();
    expect(service.busyRequestCount).toBe(2);
    expect(service.loading).toBeTrue();

    service.idle();
    expect(service.busyRequestCount).toBe(1);
    expect(service.loading).toBeTrue();

    service.idle();
    expect(service.busyRequestCount).toBe(0);
    expect(service.loading).toBeFalse();
  });
});
