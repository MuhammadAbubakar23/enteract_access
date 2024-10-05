import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedeviceComponent } from './createdevice.component';

describe('CreatedeviceComponent', () => {
  let component: CreatedeviceComponent;
  let fixture: ComponentFixture<CreatedeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
