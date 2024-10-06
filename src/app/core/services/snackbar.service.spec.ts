import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    });

    service = TestBed.inject(SnackbarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should display an error message with the correct parameters', () => {
    const message = 'Error message';
    
    service.error(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      message,
      'Close',
      { duration: 5000, panelClass: ['snack-error'] }
    );
  });
});
