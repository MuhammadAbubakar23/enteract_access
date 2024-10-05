import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationformComponent } from './locationform.component';

describe('LocationformComponent', () => {
  let component: LocationformComponent;
  let fixture: ComponentFixture<LocationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
