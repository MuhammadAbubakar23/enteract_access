import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofcardsComponent } from './listofcards.component';

describe('ListofcardsComponent', () => {
  let component: ListofcardsComponent;
  let fixture: ComponentFixture<ListofcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
