import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofaccountsComponent } from './listofaccounts.component';

describe('ListofaccountsComponent', () => {
  let component: ListofaccountsComponent;
  let fixture: ComponentFixture<ListofaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofaccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
