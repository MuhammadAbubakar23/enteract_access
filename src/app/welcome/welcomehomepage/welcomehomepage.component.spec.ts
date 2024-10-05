import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomehomepageComponent } from './welcomehomepage.component';

describe('WelcomehomepageComponent', () => {
  let component: WelcomehomepageComponent;
  let fixture: ComponentFixture<WelcomehomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomehomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomehomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
