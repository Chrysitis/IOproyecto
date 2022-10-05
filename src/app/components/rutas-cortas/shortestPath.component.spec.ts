import { ComponentFixture, TestBed } from '@angular/core/testing';

import { shortestPathComponent } from './shortestPath.component';

describe('shortestPathComponent', () => {
  let component: shortestPathComponent;
  let fixture: ComponentFixture<shortestPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ shortestPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(shortestPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});