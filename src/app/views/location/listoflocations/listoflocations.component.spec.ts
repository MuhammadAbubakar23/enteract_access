import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoflocationsComponent } from './listoflocations.component';

describe('ListoflocationsComponent', () => {
  let component: ListoflocationsComponent;
  let fixture: ComponentFixture<ListoflocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListoflocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoflocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
