import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarJuegos } from './gestionar-juegos';

describe('GestionarJuegos', () => {
  let component: GestionarJuegos;
  let fixture: ComponentFixture<GestionarJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
