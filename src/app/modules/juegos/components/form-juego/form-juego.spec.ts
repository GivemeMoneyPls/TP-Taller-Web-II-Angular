import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJuego } from './form-juego';

describe('FormJuego', () => {
  let component: FormJuego;
  let fixture: ComponentFixture<FormJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
