import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentReplacementComponent } from './equipment-replacement.component';

describe('EquipmentReplacementComponent', () => {
  let component: EquipmentReplacementComponent;
  let fixture: ComponentFixture<EquipmentReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentReplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
