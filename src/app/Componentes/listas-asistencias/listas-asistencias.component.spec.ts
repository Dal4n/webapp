import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasAsistenciasComponent } from './listas-asistencias.component';

describe('ListasAsistenciasComponent', () => {
  let component: ListasAsistenciasComponent;
  let fixture: ComponentFixture<ListasAsistenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListasAsistenciasComponent]
    });
    fixture = TestBed.createComponent(ListasAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
