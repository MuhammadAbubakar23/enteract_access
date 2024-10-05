import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofmachineusersComponent } from './listofmachineusers.component';

describe('ListofmachineusersComponent', () => {
  let component: ListofmachineusersComponent;
  let fixture: ComponentFixture<ListofmachineusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofmachineusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofmachineusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
