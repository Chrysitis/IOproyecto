import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBinaryTreesComponent } from './search-binary-trees.component';

describe('SearchBinaryTreesComponent', () => {
  let component: SearchBinaryTreesComponent;
  let fixture: ComponentFixture<SearchBinaryTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBinaryTreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBinaryTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
