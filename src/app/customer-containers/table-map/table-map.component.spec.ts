/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableMapComponent } from './table-map.component';

describe('TableMapComponent', () => {
  let component: TableMapComponent;
  let fixture: ComponentFixture<TableMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
