import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemachineuserComponent } from './createmachineuser.component';

describe('CreatemachineuserComponent', () => {
  let component: CreatemachineuserComponent;
  let fixture: ComponentFixture<CreatemachineuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemachineuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemachineuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
