/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResdesSociaisComponent } from './resdesSociais.component';

describe('ResdesSociaisComponent', () => {
  let component: ResdesSociaisComponent;
  let fixture: ComponentFixture<ResdesSociaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResdesSociaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResdesSociaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component);
  });
});
