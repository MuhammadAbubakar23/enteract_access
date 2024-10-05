import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccesspointComponent } from './editaccesspoint.component';

describe('EditaccesspointComponent', () => {
  let component: EditaccesspointComponent;
  let fixture: ComponentFixture<EditaccesspointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaccesspointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaccesspointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
