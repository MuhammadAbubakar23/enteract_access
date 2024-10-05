import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVisitorsComponent } from './recent-visitors.component';

describe('RecentVisitorsComponent', () => {
  let component: RecentVisitorsComponent;
  let fixture: ComponentFixture<RecentVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentVisitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
