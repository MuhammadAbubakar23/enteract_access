import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateaccesspointComponent } from './createaccesspoint.component';

describe('CreateaccesspointComponent', () => {
  let component: CreateaccesspointComponent;
  let fixture: ComponentFixture<CreateaccesspointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateaccesspointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateaccesspointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
