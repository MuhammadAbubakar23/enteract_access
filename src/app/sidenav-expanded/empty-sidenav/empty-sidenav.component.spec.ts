import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySidenavComponent } from './empty-sidenav.component';

describe('EmptySidenavComponent', () => {
  let component: EmptySidenavComponent;
  let fixture: ComponentFixture<EmptySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
