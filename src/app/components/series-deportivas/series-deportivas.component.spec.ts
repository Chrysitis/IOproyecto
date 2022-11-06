import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDeportivasComponent } from './series-deportivas.component';

describe('SeriesDeportivasComponent', () => {
  let component: SeriesDeportivasComponent;
  let fixture: ComponentFixture<SeriesDeportivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesDeportivasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesDeportivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
