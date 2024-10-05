import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofgroupsComponent } from './listofgroups.component';

describe('ListofgroupsComponent', () => {
  let component: ListofgroupsComponent;
  let fixture: ComponentFixture<ListofgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
