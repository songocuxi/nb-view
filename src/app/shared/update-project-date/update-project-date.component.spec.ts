import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectDateComponent } from './update-project-date.component';

describe('UpdateProjectDateComponent', () => {
  let component: UpdateProjectDateComponent;
  let fixture: ComponentFixture<UpdateProjectDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProjectDateComponent]
    });
    fixture = TestBed.createComponent(UpdateProjectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
