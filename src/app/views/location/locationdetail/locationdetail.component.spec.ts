import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdetailComponent } from './locationdetail.component';

describe('LocationdetailComponent', () => {
  let component: LocationdetailComponent;
  let fixture: ComponentFixture<LocationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
