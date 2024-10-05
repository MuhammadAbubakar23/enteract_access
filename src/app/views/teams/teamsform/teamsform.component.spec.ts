import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsformComponent } from './teamsform.component';

describe('TeamsformComponent', () => {
  let component: TeamsformComponent;
  let fixture: ComponentFixture<TeamsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
