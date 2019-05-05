import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReceitaPage } from './tela-receita.page';

describe('TelaReceitaPage', () => {
  let component: TelaReceitaPage;
  let fixture: ComponentFixture<TelaReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
