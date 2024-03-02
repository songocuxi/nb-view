import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectNameComponent } from './update-project-name.component';

describe('UpdateProjectNameComponent', () => {
  let component: UpdateProjectNameComponent;
  let fixture: ComponentFixture<UpdateProjectNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProjectNameComponent]
    });
    fixture = TestBed.createComponent(UpdateProjectNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
