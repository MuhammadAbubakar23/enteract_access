import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofpermissionsComponent } from './listofpermissions.component';

describe('ListofpermissionsComponent', () => {
  let component: ListofpermissionsComponent;
  let fixture: ComponentFixture<ListofpermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofpermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
