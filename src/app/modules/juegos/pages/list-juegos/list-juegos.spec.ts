import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJuegos } from './list-juegos';

describe('ListJuegos', () => {
  let component: ListJuegos;
  let fixture: ComponentFixture<ListJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
