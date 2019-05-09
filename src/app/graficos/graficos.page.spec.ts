import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosPage } from './graficos.page';

describe('GraficosPage', () => {
  let component: GraficosPage;
  let fixture: ComponentFixture<GraficosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
