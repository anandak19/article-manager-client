import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyOneArticle } from './view-my-one-article';

describe('ViewMyOneArticle', () => {
  let component: ViewMyOneArticle;
  let fixture: ComponentFixture<ViewMyOneArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyOneArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyOneArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
