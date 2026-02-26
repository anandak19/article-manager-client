import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyArticles } from './list-my-articles';

describe('ListMyArticles', () => {
  let component: ListMyArticles;
  let fixture: ComponentFixture<ListMyArticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMyArticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMyArticles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
