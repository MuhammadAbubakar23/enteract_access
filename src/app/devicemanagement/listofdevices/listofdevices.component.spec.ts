import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofdevicesComponent } from './listofdevices.component';

describe('ListofdevicesComponent', () => {
  let component: ListofdevicesComponent;
  let fixture: ComponentFixture<ListofdevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofdevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofdevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
