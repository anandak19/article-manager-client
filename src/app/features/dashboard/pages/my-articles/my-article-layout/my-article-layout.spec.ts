import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticleLayout } from './my-article-layout';

describe('MyArticleLayout', () => {
  let component: MyArticleLayout;
  let fixture: ComponentFixture<MyArticleLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyArticleLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyArticleLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
