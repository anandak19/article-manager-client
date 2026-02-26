import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneArticle } from './view-one-article';

describe('ViewOneArticle', () => {
  let component: ViewOneArticle;
  let fixture: ComponentFixture<ViewOneArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
