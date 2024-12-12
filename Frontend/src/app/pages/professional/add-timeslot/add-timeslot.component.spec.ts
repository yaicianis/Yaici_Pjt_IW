import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeslotComponent } from './add-timeslot.component';

describe('AddTimeslotComponent', () => {
  let component: AddTimeslotComponent;
  let fixture: ComponentFixture<AddTimeslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimeslotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
