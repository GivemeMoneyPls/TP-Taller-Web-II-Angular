import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJuego } from './create-juego';

describe('CreateJuego', () => {
  let component: CreateJuego;
  let fixture: ComponentFixture<CreateJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
