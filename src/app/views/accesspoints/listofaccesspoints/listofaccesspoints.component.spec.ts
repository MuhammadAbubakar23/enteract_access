import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofaccesspointsComponent } from './listofaccesspoints.component';

describe('ListofaccesspointsComponent', () => {
  let component: ListofaccesspointsComponent;
  let fixture: ComponentFixture<ListofaccesspointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofaccesspointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofaccesspointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
