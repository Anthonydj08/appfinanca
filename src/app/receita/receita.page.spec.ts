import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaPage } from './receita.page';

describe('ReceitaPage', () => {
  let component: ReceitaPage;
  let fixture: ComponentFixture<ReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
