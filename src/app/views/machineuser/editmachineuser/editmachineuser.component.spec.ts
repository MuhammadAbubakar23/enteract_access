import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmachineuserComponent } from './editmachineuser.component';

describe('EditmachineuserComponent', () => {
  let component: EditmachineuserComponent;
  let fixture: ComponentFixture<EditmachineuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmachineuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmachineuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
