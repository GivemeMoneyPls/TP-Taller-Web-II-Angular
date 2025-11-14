import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarConfirmar } from './recuperar-confirmar';

describe('RecuperarConfirmar', () => {
  let component: RecuperarConfirmar;
  let fixture: ComponentFixture<RecuperarConfirmar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarConfirmar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarConfirmar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
