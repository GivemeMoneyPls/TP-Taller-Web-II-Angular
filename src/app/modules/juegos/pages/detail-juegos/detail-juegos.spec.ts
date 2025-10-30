import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJuegos } from './detail-juegos';

describe('DetailJuegos', () => {
  let component: DetailJuegos;
  let fixture: ComponentFixture<DetailJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
