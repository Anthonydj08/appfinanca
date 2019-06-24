import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMapaPage } from './tela-mapa.page';

describe('TelaMapaPage', () => {
  let component: TelaMapaPage;
  let fixture: ComponentFixture<TelaMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaMapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
