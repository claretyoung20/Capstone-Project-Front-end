import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStaffDialogComponent } from './error-staff-dialog.component';

describe('ErrorStaffDialogComponent', () => {
  let component: ErrorStaffDialogComponent;
  let fixture: ComponentFixture<ErrorStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
