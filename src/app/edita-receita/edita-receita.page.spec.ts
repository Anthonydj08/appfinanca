import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaReceitaPage } from './edita-receita.page';

describe('EditaReceitaPage', () => {
  let component: EditaReceitaPage;
  let fixture: ComponentFixture<EditaReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
