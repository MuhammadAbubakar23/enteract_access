import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineformComponent } from './machineform.component';

describe('MachineformComponent', () => {
  let component: MachineformComponent;
  let fixture: ComponentFixture<MachineformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
