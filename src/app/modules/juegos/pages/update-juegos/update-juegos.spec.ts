import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJuegos } from './update-juegos';

describe('UpdateJuegos', () => {
  let component: UpdateJuegos;
  let fixture: ComponentFixture<UpdateJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
