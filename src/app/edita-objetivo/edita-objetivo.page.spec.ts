import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaObjetivoPage } from './edita-objetivo.page';

describe('EditaObjetivoPage', () => {
  let component: EditaObjetivoPage;
  let fixture: ComponentFixture<EditaObjetivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaObjetivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaObjetivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
