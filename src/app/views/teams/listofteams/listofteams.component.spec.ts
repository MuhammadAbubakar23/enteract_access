import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofteamsComponent } from './listofteams.component';

describe('ListofteamsComponent', () => {
  let component: ListofteamsComponent;
  let fixture: ComponentFixture<ListofteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
