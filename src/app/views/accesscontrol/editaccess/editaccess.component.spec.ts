import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccessComponent } from './editaccess.component';

describe('EditaccessComponent', () => {
  let component: EditaccessComponent;
  let fixture: ComponentFixture<EditaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
