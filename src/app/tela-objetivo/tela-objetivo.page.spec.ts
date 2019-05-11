import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaObjetivoPage } from './tela-objetivo.page';

describe('TelaObjetivoPage', () => {
  let component: TelaObjetivoPage;
  let fixture: ComponentFixture<TelaObjetivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaObjetivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaObjetivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
