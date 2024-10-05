import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesspointdetailComponent } from './accesspointdetail.component';

describe('AccesspointdetailComponent', () => {
  let component: AccesspointdetailComponent;
  let fixture: ComponentFixture<AccesspointdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesspointdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesspointdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
