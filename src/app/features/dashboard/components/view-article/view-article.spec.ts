import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticle } from './view-article';

describe('ViewArticle', () => {
  let component: ViewArticle;
  let fixture: ComponentFixture<ViewArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
