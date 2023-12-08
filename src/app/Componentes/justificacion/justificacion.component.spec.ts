import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionComponent } from './justificacion.component';

describe('JustificacionComponent', () => {
  let component: JustificacionComponent;
  let fixture: ComponentFixture<JustificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JustificacionComponent]
    });
    fixture = TestBed.createComponent(JustificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
