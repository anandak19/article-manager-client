import { TestBed } from '@angular/core/testing';

import { UserArticleService } from './user-article-service';

describe('UserArticleService', () => {
  let service: UserArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
