import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreataeaccessComponent } from './creataeaccess.component';

describe('CreataeaccessComponent', () => {
  let component: CreataeaccessComponent;
  let fixture: ComponentFixture<CreataeaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreataeaccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreataeaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
