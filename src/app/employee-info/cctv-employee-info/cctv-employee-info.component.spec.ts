import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvEmployeeInfoComponent } from './cctv-employee-info.component';

describe('CctvEmployeeInfoComponent', () => {
  let component: CctvEmployeeInfoComponent;
  let fixture: ComponentFixture<CctvEmployeeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CctvEmployeeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CctvEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
