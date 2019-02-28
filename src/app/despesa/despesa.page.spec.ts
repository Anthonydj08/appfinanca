import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaPage } from './despesa.page';

describe('DespesaPage', () => {
  let component: DespesaPage;
  let fixture: ComponentFixture<DespesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
