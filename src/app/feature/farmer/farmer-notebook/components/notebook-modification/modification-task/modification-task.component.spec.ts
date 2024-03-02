import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationTaskComponent } from './modification-task.component';

describe('ModificationTaskComponent', () => {
  let component: ModificationTaskComponent;
  let fixture: ComponentFixture<ModificationTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationTaskComponent]
    });
    fixture = TestBed.createComponent(ModificationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
