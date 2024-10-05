import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvCarComponent } from './cctv-car.component';

describe('CctvCarComponent', () => {
  let component: CctvCarComponent;
  let fixture: ComponentFixture<CctvCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CctvCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CctvCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
