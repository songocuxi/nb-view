import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerProcessComponent } from './farmer-process.component';

describe('FarmerProcessComponent', () => {
  let component: FarmerProcessComponent;
  let fixture: ComponentFixture<FarmerProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerProcessComponent]
    });
    fixture = TestBed.createComponent(FarmerProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
