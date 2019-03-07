import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoPage } from './objetivo.page';

describe('ObjetivoPage', () => {
  let component: ObjetivoPage;
  let fixture: ComponentFixture<ObjetivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
