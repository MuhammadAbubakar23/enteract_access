import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofaccessesComponent } from './listofaccesses.component';

describe('ListofaccessesComponent', () => {
  let component: ListofaccessesComponent;
  let fixture: ComponentFixture<ListofaccessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofaccessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofaccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
