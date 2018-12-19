import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSalesComponent } from './export-sales.component';

describe('ExportSalesComponent', () => {
  let component: ExportSalesComponent;
  let fixture: ComponentFixture<ExportSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
