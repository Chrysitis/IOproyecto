import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemaMochilaComponent } from './problema-mochila.component';

describe('ProblemaMochilaComponent', () => {
  let component: ProblemaMochilaComponent;
  let fixture: ComponentFixture<ProblemaMochilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemaMochilaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemaMochilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
