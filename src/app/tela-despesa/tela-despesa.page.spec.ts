import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDespesaPage } from './tela-despesa.page';

describe('TelaDespesaPage', () => {
  let component: TelaDespesaPage;
  let fixture: ComponentFixture<TelaDespesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaDespesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaDespesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
